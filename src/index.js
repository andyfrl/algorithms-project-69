export default function search(inputArray, stringToken) {
	const regex = /\w+/g;
	const stringTerm = (stringToken.match(regex) || []);

	if (!inputArray.length || !stringTerm.length) return [];

	let termHashMap = new Map();
	stringTerm.forEach(element => termHashMap.set(element, 0));

	const result = inputArray.map(({ id, text }) => {
		let hasFullSetOfValues = true;
		let wordSum = 0;

		text.match(regex).forEach(matchingWord => {
			if (termHashMap.has(matchingWord)) {
				termHashMap.set(matchingWord, termHashMap.get(matchingWord) + 1);
			}
		});

		termHashMap.forEach((value, key) => {
			if (!value) hasFullSetOfValues = false;
			wordSum += value;
			termHashMap.set(key, 0);
		});
		
		return {id, hasFullSetOfValues, wordSum};

	});

	// descending sort only
	function comparator(a, b) {		
		if (b.hasFullSetOfValues && !a.hasFullSetOfValues) return 1;
		else if (a.hasFullSetOfValues === b.hasFullSetOfValues) {
			return b.wordSum - a.wordSum;
		} else {
			return -1;
		}
	}
		
	return result
		.sort(comparator)
		.map(({id}) => id);
}
