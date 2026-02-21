import { deepStrictEqual, throws } from 'node:assert';
import test from 'node:test';
import { encodeTlvRecord } from './../../index.js';

const tests = [
  {
    args: {type: '1', value: 'test'},
    description: 'A hex value is expected',
    error: 'ExpectedHexEncodedValueToEncodeTlvRecord',
  },
  {
    args: {type: '1', value: '00'},
    description: 'A zero byte value is encoded',
    expected: {encoded: '010100'},
  },
];

for (const { args, description, error, expected } of tests) {
  test(description, (t, end) => {
    if (error) {
      throws(() => encodeTlvRecord(args), new Error(error), 'Got error');
    } else {
      deepStrictEqual(encodeTlvRecord(args), expected, 'Got expected result');
    }

    return end();
  })
}
