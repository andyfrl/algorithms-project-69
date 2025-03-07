export default function search(inputArray, stringToken) {
	let result = [];
	const regex = new RegExp('\\w+', 'g');
	const stringTerm = (stringToken.match(regex) || [])[0];

	for (let i = 0; i < inputArray.length; i++) {
		const numberOfMatchingItems = inputArray[i].text
			.match(regex)
			.filter((el) => el === stringTerm).length;

		if (numberOfMatchingItems) {
			result.push({id: inputArray[i].id, relevance: numberOfMatchingItems});
		}
	}

	return result
		.sort((a, b) => b.relevance - a.relevance)
		.map(({id}) => id);

}
