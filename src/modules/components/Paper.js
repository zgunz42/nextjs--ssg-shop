import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import MuiPaper from '@material-ui/core/Paper';
import { capitalize } from '@material-ui/core/utils';
import { withStyles } from '@material-ui/core/styles';
import ErrorOutlineIcon from '@material-ui/icons/Error';
import CheckIcon from '@material-ui/icons/Check';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';

const variantIcon = {
  success: CheckIcon,
  warning: WarningIcon,
  error: ErrorOutlineIcon,
  info: InfoIcon,
};

const styles = theme => ({
  rootIcon: {
    display: 'flex',
  },
  success: {
    backgroundColor: theme.palette.success.background,
  },
  error: {
    backgroundColor: theme.palette.error.background,
  },
  info: {
    backgroundColor: theme.palette.info.background,
  },
  warning: {
    backgroundColor: theme.palette.warning.background,
  },
  outlined: {
    border: `1px solid ${theme.palette.grey[200]}`,
  },
  icon: {
    fontSize: 20,
    marginRight: theme.spacing(1),
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
  padding: {
    padding: theme.spacing(2),
  },
});

function Paper(props) {
  const { children: childrenProp, classes, className, icon, padding, variant, ...other } = props;

  let children = childrenProp;

  if (icon) {
    if (variant === 'outlined') {
      throw new Error('Not supported');
    }

    const Icon = variantIcon[variant];
    const iconClassName = clsx(classes.icon, classes[`icon${capitalize(variant)}`]);

    children = (
      <React.Fragment>
        <Icon className={iconClassName} />
        <div>{childrenProp}</div>
      </React.Fragment>
    );
  }

  return (
    <MuiPaper
      elevation={0}
      className={clsx(
        {
          [classes.rootIcon]: icon,
          [classes.padding]: padding,
        },
        classes[variant],
        className,
      )}
      {...other}
    >
      {children}
    </MuiPaper>
  );
}

Paper.displayName = 'Paper';

Paper.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  icon: PropTypes.bool,
  padding: PropTypes.bool,
  variant: PropTypes.oneOf(['success', 'error', 'warning', 'info', 'outlined']),
};

Paper.defaultProps = {
  icon: false,
  padding: false,
};

export default withStyles(styles)(Paper);
