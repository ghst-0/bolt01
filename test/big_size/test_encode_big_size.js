import { deepStrictEqual, throws } from 'node:assert';
import test from 'node:test';
import { encodeBigSize } from './../../index.js';

const tests = [
  {
    args: {},
    description: 'A number to encode is required',
    error: 'ExpectedNumberToEncodeAsBigSize',
  },
  {
    args: {number: '0'},
    description: 'Zero value is encoded',
    expected: {encoded: '00'},
  },
  {
    args: {number: '252'},
    description: 'A single byte value is encoded',
    expected: {encoded: 'fc'},
  },
  {
    args: {number: '253'},
    description: 'The smallest two byte number is encoded',
    expected: {encoded: 'fd00fd'},
  },
  {
    args: {number: '65535'},
    description: 'The largest two byte number is encoded',
    expected: {encoded: 'fdffff'},
  },
  {
    args: {number: '65536'},
    description: 'The smallest four byte number is encoded',
    expected: {encoded: 'fe00010000'},
  },
  {
    args: {number: '4294967295'},
    description: 'The largest four byte number is encoded',
    expected: {encoded: 'feffffffff'},
  },
  {
    args: {number: '4294967296'},
    description: 'The smallest eight byte number is encoded',
    expected: {encoded: 'ff0000000100000000'},
  },
  {
    args: {number: '18446744073709551615'},
    description: 'The largest eight byte number is encoded',
    expected: {encoded: 'ffffffffffffffffff'},
  },
];

for (const { args, description, error, expected } of tests) {
  test(description, (t, end) => {
    if (error) {
      throws(() => encodeBigSize(args), new Error(error), 'Got error');
    } else {
      const {encoded} = encodeBigSize(args);

      deepStrictEqual(encoded, expected.encoded, 'Got expected result');
    }

    return end();
  });
}
