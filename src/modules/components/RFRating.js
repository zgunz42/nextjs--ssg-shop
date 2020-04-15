/* eslint-disable react/prop-types */
import React from 'react';
import Rating from '@material-ui/lab/Rating';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

export default function RFRating(props) {
  const {
    input: { onChange, value, ...input },
    fullWidth,
    required,
    meta: {
      dirty, error, submitError, submitFailed,
    },
    ...other
  } = props;

  return (
    <>
      <FormLabel
        required={required}
        htmlFor="rating-1"
        component="label"
        variant="body2"
        color="textSecondary"
      >
        Rating
      </FormLabel>
      <br />
      <Rating
        color="primary"
        value={value === '' ? null : value}
        onChange={(event, newValue) => {
          onChange(newValue);
        }}
        {...other}
        {...input}
      />
      {(dirty || submitFailed) && (error || submitError) ? (
        <FormHelperText error={Boolean((dirty || submitFailed) && (error || submitError))}>
          {error || submitError}
        </FormHelperText>
      ) : null}
    </>
  );
}
