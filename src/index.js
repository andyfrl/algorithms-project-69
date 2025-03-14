export default function search(inputArray, stringToken) {
	const regex = /\w+/g;
	const stringTerm = (stringToken.match(regex) || []);
	let index = new Map();
	let result = new Map();

	if (!inputArray.length || !stringTerm.length) return [];
	const docsCount = inputArray.length;
	
	inputArray.forEach(({ id, text }) => {
		const matchingWords = text.match(regex);
		const totalWordCount = matchingWords.length;

		const wordCount = {};
		matchingWords.forEach(word => {
			wordCount[word] = (wordCount[word] || 0) + 1;
		});
		
		for (const [word, count] of Object.entries(wordCount)) {
			const tf = count / totalWordCount;
			if (!index.has(word)) index.set(word, new Map());
			index.get(word).set(id, tf);
		}

	});

	stringTerm.forEach((word) => {
		const docIds = index.get(word);
		const idf = docIds ? Math.log(docsCount / docIds.size) : 0;
		if (docIds) {
			docIds.forEach((tf, id) => {
				const tfIdf = tf * idf;
				result.set(id, (result.get(id) || 0) + tfIdf);
			});
		}

	});
	
	return Array.from(result)
		.sort((a,b) => b[1] - a[1])
		.map((el) => el[0]);
		
}
