import MuiButton from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import clsx from 'clsx';
import defer from 'modules/components/defer';
import * as PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'recompose';

const styles = (theme) => ({
  root: {
    padding: `12px ${theme.spacing(2)}px`,
    textTransform: 'inherit',
    '&$root': {
      boxShadow: 'none',
    },
  },
  textError: {
    color: theme.palette.error.main,
    '&:hover': {
      backgroundColor: fade(theme.palette.error.main, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  outlined: {
    borderColor: theme.palette.grey[400],
    transition: theme.transitions.create(['color', 'background-color', 'border-color']),
    '&:hover': {
      borderColor: theme.palette.common.white,
    },
  },
  sizeSmall: {
    padding: `9px ${theme.spacing(2)}px ${theme.spacing(1)}px`,
    fontSize: 14,
  },
  padding: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
});

function Button(props) {
  const {
    classes: { textError, padding: paddingClassName, ...classes },
    className,
    color,
    disabled,
    disableDefer,
    mounted,
    padding,
    variant,
    ...other
  } = props;

  return (
    <MuiButton
      classes={classes}
      variant={variant}
      color={color === 'error' ? 'default' : color}
      className={clsx(className, {
        [textError]: variant === 'text' && color === 'error',
        [paddingClassName]: padding,
      })}
      disabled={!disableDefer && (!mounted || disabled)}
      {...other}
    />
  );
}

Button.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'secondary', 'error', 'default']),
  disabled: PropTypes.bool,
  disableDefer: PropTypes.bool,
  mounted: PropTypes.bool,
  padding: PropTypes.bool,
  variant: PropTypes.oneOf(['text', 'contained', 'outlined']).isRequired,
};

Button.defaultProps = {
  color: 'primary',
  padding: false,
};

export default compose(defer, withStyles(styles))(Button);
