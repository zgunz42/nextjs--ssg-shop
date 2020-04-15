import { withStyles } from '@material-ui/core/styles';
import Button from 'modules/components/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { FormSpy } from 'react-final-form';
import { connect } from 'react-redux';

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
});

function ConnectRedux(props) {
  const { dispatch, children } = props;

  return (
    <>
      <FormSpy subscription={{ values: true }}>
        {({ values }) => {
          setTimeout(() => {
            dispatch({
              type: 'REACT_FINAL_FORM',
              payload: values,
            });
          }, 500);
          return null;
        }}
      </FormSpy>
      {children}
    </>
  );
}

ConnectRedux.displayName = 'ConnectRedux';

ConnectRedux.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  dispatch: PropTypes.func.isRequired,
};

const WrappedConnectRedux = connect()(ConnectRedux);

function FormButton(props) {
  const { classes, ...other } = props;

  const button = <Button type="submit" variant="contained" classes={classes} {...other} />;

  if (process.env.NODE_ENV !== 'production') {
    return <WrappedConnectRedux>{button}</WrappedConnectRedux>;
  }

  return button;
}

FormButton.displayName = 'FormButton';

FormButton.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormButton);
