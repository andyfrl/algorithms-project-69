#!/usr/bin/env node

import search from '../src/index.js';

const inputArray = process.argv[process.argv.length - 2];
const inputString = process.argv[process.argv.length - 1];

console.log(search(inputArray, inputString));
