export default function search(inputArray, stringToFind) {
	let res = [];
	for (let i = 0; i < inputArray.length; i++) {
		let curObj = inputArray[i];

		if (curObj.text.split(' ').includes(stringToFind)) {
			res.push(curObj.id);
		}
	}

	return res;
}
