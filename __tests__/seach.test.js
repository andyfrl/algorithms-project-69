// @ts-check

import { expect, test } from 'vitest';
import search from '../src/index.js';

// создание документа
// документ имеет два атрибута "id" и "text"
const doc1 = { id: 'doc1', text: "I can't shoot straight unless I've had a pint!" };
const doc2 = { id: 'doc2', text: "Don't shoot shoot shoot that thing at me." };
const doc3 = { id: 'doc3', text: "I'm your shooter." };
const docs = [doc1, doc2, doc3];
const pattern = 'shoot';
const expectedResult = ['doc2', 'doc1'];

test('search', () => {
  expect(search(docs, pattern)).toStrictEqual(expectedResult);
});

test('searchEmpty', () => {
	expect(search([], pattern)).toStrictEqual([]);
})