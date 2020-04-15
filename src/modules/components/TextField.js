import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiTextField from '@material-ui/core/TextField';

const styles = (theme) => ({
  inputLabel: {
    fontSize: theme.typography.fontSize,
  },
  input: {
    fontSize: theme.typography.fontSize,
    '& input[readonly]': {
      padding: '10px 14px',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[100],
    },
  },
});

function TextField(props) {
  const {
    classes,
    InputLabelProps: { className: InputLabelPropsClassName, ...InputLabelProps } = {},
    InputProps: { className: InputPropsClassName, ...InputProps } = {},
    ...other
  } = props;

  if (InputProps.readOnly) {
    InputProps.disableUnderline = true;
  }

  return (
    <MuiTextField
      InputLabelProps={{
        className: clsx(classes.inputLabel, InputLabelPropsClassName),
        ...InputLabelProps,
      }}
      InputProps={{
        className: clsx(classes.input, InputPropsClassName),
        ...InputProps,
        inputProps: { ...InputProps.inputProps, spellCheck: false },
      }}
      {...other}
    />
  );
}

TextField.displayName = 'TextField';

TextField.propTypes = {
  classes: PropTypes.object.isRequired,
  InputLabelProps: PropTypes.object,
  InputProps: PropTypes.object,
};

export default withStyles(styles)(TextField);
