import React from 'react';
import FormField from 'modules/components/FormField';
import RFRating from 'modules/components/RFRating';

export default function FormFieldRating(props) {
  return <FormField parse={undefined} component={RFRating} {...props} />;
}

FormFieldRating.displayName = 'FormFieldRating';
