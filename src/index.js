export default function search(inputArray, stringToken) {
	const regex = /\w+/g;
	const stringTerm = (stringToken.match(regex) || []);
	let index = new Map(); // Map<string, Set()>
	let result = new Set();

	if (!inputArray.length || !stringTerm.length) return [];

	inputArray.forEach(({ id, text }) => {
		const matchingWords = text.match(regex);
		
		matchingWords.forEach(word => {
			if (!index.has(word)) index.set(word, new Set());
			index.get(word).add(id);
		});
	});

	stringTerm.forEach((word) => {
		let docIds = index.get(word);
		if (docIds) {
			docIds.forEach(element => result.add(element));
		}
	});
		
	return Array.from(result);
}
