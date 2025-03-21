export default function search(inputArray, stringToken) {
  const regex = /\b[a-zA-Z]+(?:'[a-zA-Z]+)?(?!°[a-zA-Z])\b/g;
  const stringTerm = (stringToken.toLowerCase().match(regex) || []);
  const index = new Map();
  const result = new Map();
  const docWordCount = new Map();

  if (!inputArray.length || !stringTerm.length) return [];
  const docsCount = inputArray.length;

  inputArray.forEach(({ id, text }) => {
    const matchingWords = text.toLowerCase().match(regex);
    const totalWordCount = matchingWords.length;
    docWordCount.set(id, totalWordCount);

    const wordCount = {};
    matchingWords.forEach((word) => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    Object.entries(wordCount).forEach(([word, count]) => {
      const tf = count / totalWordCount;
      if (!index.has(word)) index.set(word, new Map());
      index.get(word).set(id, tf);
    });
  });
  /*
const avgDocWordCount = Array.from(docWordCount.values())
.reduce((acc, cur) => {
return acc += cur;
}) / docsCount;
*/
  stringTerm.forEach((word) => {
    // const K1 = 2.0;
    // const B = 0.75;
    const docIds = index.get(word);
    const idf = docIds ? Math.log2(1 + (docsCount - docIds.size + 1) / (docIds.size + 0.5)) : 0;
    if (docIds) {
      docIds.forEach((tf, id) => {
        /* const tfIdf = idf * (tf * (K1 + 1)) / (tf + K1 * ((1 - B) + B *
(docWordCount.get(id) / avgDocWordCount))); */
        const tfIdf = idf * tf;
        result.set(id, (result.get(id) || 0) + tfIdf);
      });
    }
  });

  return Array.from(result.entries())
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
    .map(([id]) => id);
}
