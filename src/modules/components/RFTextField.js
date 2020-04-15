import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'modules/components/TextField';

function RFTextField(props) {
  const {
    autoComplete,
    helperText,
    input: { name, ...input },
    InputProps,
    meta: {
      dirty, error, submitError, submitFailed, touched,
    },
    ...other
  } = props;

  return (
    <TextField
      error={Boolean(touched && (dirty || submitFailed) && (error || submitError))}
      {...input}
      {...other}
      id={name}
      name={name}
      InputProps={{
        inputProps: {
          autoComplete,
        },
        ...InputProps,
      }}
      helperText={touched && (dirty || submitFailed) ? error || submitError : helperText}
    />
  );
}

RFTextField.displayName = 'RFTextField';

RFTextField.propTypes = {
  autoComplete: PropTypes.string,
  helperText: PropTypes.node,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  InputProps: PropTypes.object,
  meta: PropTypes.shape({
    dirty: PropTypes.bool.isRequired,
    error: PropTypes.string,
    submitError: PropTypes.string,
    submitFailed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default RFTextField;
