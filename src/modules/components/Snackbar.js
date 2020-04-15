import IconButton from '@material-ui/core/IconButton';
import MuiSnackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ErrorOutlineIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

const variantIcon = {
  success: CheckIcon,
  warning: WarningIcon,
  error: ErrorOutlineIcon,
  info: InfoIcon,
};

const styles = (theme) => ({
  contentRoot: {
    padding: '6px 16px',
    color: theme.palette.text.primary,
  },
  contentSuccess: {
    backgroundColor: theme.palette.success.background,
  },
  contentError: {
    backgroundColor: theme.palette.error.background,
  },
  contentInfo: {
    backgroundColor: theme.palette.info.background,
  },
  contentWarning: {
    backgroundColor: theme.palette.warning.background,
  },
  icon: {
    fontSize: 20,
  },
  iconSuccess: {
    color: theme.palette.success.text,
  },
  iconError: {
    color: theme.palette.error.text,
  },
  iconInfo: {
    color: theme.palette.info.text,
  },
  iconWarning: {
    color: theme.palette.warning.text,
  },
  iconLeft: {
    marginRight: theme.spacing(1),
  },
  iconClose: {
    fontSize: 16,
  },
  close: {
    padding: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function Snackbar(props) {
  const {
    classes, message, variant, onClose, ...other
  } = props;
  const Icon = variantIcon[variant];
  const iconClassName = clsx(classes.icon, classes[`icon${capitalize(variant)}`]);

  return (
    <MuiSnackbar
      ContentProps={{
        elevation: 0,
        className: clsx(classes.contentRoot, classes[`content${capitalize(variant)}`]),
        'aria-describedby': 'client-snackbar',
      }}
      message={(
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(iconClassName, classes.iconLeft)} />
          {message}
        </span>
      )}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={clsx(iconClassName, classes.iconClose)} />
        </IconButton>,
      ]}
      onClose={onClose}
      {...other}
    />
  );
}

Snackbar.displayName = 'Snackbar';

Snackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

export default withStyles(styles)(Snackbar);
