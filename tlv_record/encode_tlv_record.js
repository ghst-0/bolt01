import { encodeBigSize } from './../big_size/index.js';

const byteLengthOf = hex => hex.length / 2;
const encode = (type, len, val) => [type, len, val].join('');
const isHex = n => !(n.length % 2) && /^[0-9A-F]*$/i.test(n);

/** Encode data as a TLV record

  {
    type: <Message Type Number String>
    value: <Raw Value Hex String>
  }

  @throws
  <Error>

  @returns
  {
    encoded: <Encoded TLV Record Hex String>
  }
*/
export default ({type, value}) => {
  if (!isHex(value)) {
    throw new Error('ExpectedHexEncodedValueToEncodeTlvRecord');
  }

  const dataLength = encodeBigSize({number: byteLengthOf(value)}).encoded;
  const number = type;

  return {encoded: encode(encodeBigSize({number}).encoded, dataLength, value)};
};
