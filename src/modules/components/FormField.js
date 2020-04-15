import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import * as recompose from 'recompose';
import defer from 'modules/components/defer';
import { required as requiredValidation } from 'modules/form/validation';
import RFTextField from 'modules/components/RFTextField';

const identity = (value) => (value === '' ? null : value);

class FormField extends React.Component {
  validate = (value, allValues) => {
    const { required, validate } = this.props;
    if (required) {
      const error = requiredValidation(['field'], { field: value }, this.props).field;
      if (error) return error;
    }

    if (!value || !validate) {
      return null;
    }

    return validate(value, allValues, this.props);
  };

  render() {
    const {
      autoFocus, disabled, mounted, validate, t, tReady, i18n, ...props
    } = this.props;
    return (
      <Field
        parse={identity}
        disabled={!autoFocus && (!mounted || disabled)}
        validate={this.validate}
        margin="normal"
        fullWidth
        component={RFTextField}
        autoFocus={autoFocus}
        {...props}
      />
    );
  }
}

FormField.displayName = 'FormField';

FormField.propTypes = {
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  mounted: PropTypes.bool,
  required: PropTypes.bool,
  validate: PropTypes.func,
};

export default recompose.compose(defer)(FormField);
