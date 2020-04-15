import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import Paper from 'modules/components/Paper';
import PropTypes from 'prop-types';
import React from 'react';

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
});

function FormFeedback(props) {
  const {
    children, classes, className, variant,
  } = props;

  return (
    <Paper
      icon
      padding
      variant={variant}
      className={clsx(classes.root, classes[variant], className)}
    >
      <Typography color="inherit" component="span">
        {children}
      </Typography>
    </Paper>
  );
}

FormFeedback.displayName = 'FormFeedback';

FormFeedback.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  className: PropTypes.string,
  variant: PropTypes.oneOf(['error', 'success']).isRequired,
};

export default withStyles(styles)(FormFeedback);
