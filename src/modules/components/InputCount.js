import React from 'react';
import { parseInt } from 'lodash';
import { Add, Remove } from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FilledInput from '@material-ui/core/FilledInput';

function InputCount({
  initial, minValue = 0, maxValue = Number.MAX_SAFE_INTEGER, ...rest
}) {
  const [count, setCount] = React.useState(minValue || initial || 0);

  const handleDecrement = () => {
    const nextCount = count - 1;
    if (nextCount > minValue) {
      setCount(nextCount);
    }
  };

  const handleIncrement = () => {
    const nextCount = count + 1;
    if (maxValue > nextCount) {
      setCount(nextCount);
    }
  };

  const handleChange = (nextCount) => {
    if (nextCount > minValue && maxValue > nextCount) {
      setCount(nextCount);
    }
  };

  const handleMouseDown = (e) => e.preventDefault();

  return (
    <FilledInput
      type="number"
      value={count}
      onChange={(event) => handleChange(parseInt(event.target.value))}
      startAdornment={(
        <InputAdornment position="start">
          <IconButton
            aria-label="remove"
            disabled={count - 1 === minValue}
            onClick={handleDecrement}
            onMouseDown={handleMouseDown}
          >
            <Remove />
          </IconButton>
        </InputAdornment>
      )}
      endAdornment={(
        <InputAdornment position="end">
          <IconButton
            aria-label="add"
            disabled={count + 1 === maxValue}
            onClick={handleIncrement}
            onMouseDown={handleMouseDown}
          >
            <Add />
          </IconButton>
        </InputAdornment>
      )}
      {...rest}
    />
  );
}

InputCount.defaultProps = {
  minValue: 0,
  maxValue: Number.MAX_SAFE_INTEGER,
};

export default InputCount;
