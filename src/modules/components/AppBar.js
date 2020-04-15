import MuiAppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import MuiToolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import React from 'react';

const styles = (theme) => ({
  root: {
    boxShadow: '0 0px 20px 0px rgba(0, 0, 0, 0.05)',
    paddingLeft: theme.spacing(4),
    transform: 'none',
    paddingRight: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  transparent: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  essential: {
    boxShadow: 'none',
  },
  toolbar: {
    padding: 0,
  },
});

function AppBar(props) {
  const {
    children, classes, essential, position, transparent,
  } = props;

  return (
    <MuiAppBar
      className={clsx(classes.root, {
        [classes.transparent]: transparent,
        [classes.essential]: essential,
        'mui-fixed': transparent,
      })}
      color="inherit"
      elevation={0}
      position={transparent ? 'absolute' : position}
    >
      <MuiToolbar className={classes.toolbar}>{children}</MuiToolbar>
    </MuiAppBar>
  );
}

AppBar.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  essential: PropTypes.bool,
  position: PropTypes.string,
  transparent: PropTypes.bool,
};

AppBar.defaultProps = {
  position: 'static',
};

export default withStyles(styles)(AppBar);
