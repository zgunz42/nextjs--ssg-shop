/* eslint-disable react/no-array-index-key */
import React from 'react';

/**
 * Return an array with the separator interspersed between
 * each element of the input array.
 *
 * > intersperse([1,2,3], 0)
 * [1,0,2,0,3]
 *
 */
function intersperse(array, separator) {
  return array
    .filter(x => x)
    .reduce((output, item, index) => {
      output.push(item);

      if (index < array.length - 1) {
        output.push(React.cloneElement(separator, { key: `interspersed-${index}` }));
      }

      return output;
    }, []);
}

export default intersperse;
