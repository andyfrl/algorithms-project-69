// @ts-check
import path from 'path';
import { expect, test } from 'vitest';
import search from '../src/index.js';
import { readFileSync } from 'node:fs';

/* -------- simple tests --------- */

const doc1 = { id: 'doc1', text: "I can't shoot straight unless I've had a pint!" };
const doc2 = { id: 'doc2', text: "Don't shoot shoot shoot that thing at me." };
const doc3 = { id: 'doc3', text: "I'm your shooter." };
const docs = [doc1, doc2, doc3];
const pattern = {
	oneWord: 'shoot',
	multiWord: 'shoot at me',
	multiWord2: 'shooter at me',
};
const expectedResult = {
	oneWord: ['doc2', 'doc1'],
	multiWord: ['doc2', 'doc1'],
	multiWord2: ['doc3', 'doc2'],
};

test('searchEmpty', () => {
	expect(search([], pattern.oneWord)).toStrictEqual([]);
})

test('searchOneWord', () => {
  	expect(search(docs, pattern.oneWord)).toStrictEqual(expectedResult.oneWord);
});

test('searchMultiWord', () => {
	expect(search(docs, pattern.multiWord)).toStrictEqual(expectedResult.multiWord);
});

test('searchMultiWord2', () => {
	expect(search(docs, pattern.multiWord2)).toStrictEqual(expectedResult.multiWord2);
});

/* -------- complex tests --------- */

const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);

const getDocumentText = (id) => {
	const documentPath = getFixturePath(id);
	const text = readFileSync(documentPath, 'utf8');
	return {id, text};
}

test('simpleSearch', () => {
	const searchText = 'trash island';
	const docIds = ['garbage_patch_NG', 'garbage_patch_ocean_clean', 'garbage_patch_wiki'];

	const documentPaths = docIds.map(getDocumentText);
	const result = search(documentPaths, searchText);

	expect(result).toEqual(docIds);
});

test('search with spam, pretext', () => {
	const searchText = 'the trash island is a';
	const docIds = ['garbage_patch_NG', 'garbage_patch_ocean_clean', 'garbage_patch_wiki', 'garbage_patch_spam'];

	const documentPaths = docIds.map(getDocumentText);
	const result = search(documentPaths, searchText);

	expect(result).toEqual(docIds);
});
