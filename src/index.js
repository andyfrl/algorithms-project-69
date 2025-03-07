export default function search(inputArray, stringToken) {
	let res = [];
	const regex = new RegExp('\\w+', 'g');
	const stringTerm = stringToken.match(regex)[0];

	for (let i = 0; i < inputArray.length; i++) {
		const curObj = inputArray[i];
		const stringArray = curObj.text.match(regex);

		if (stringArray.includes(stringTerm)) {
			res.push(curObj.id);
		}
	}

	return res;
}
