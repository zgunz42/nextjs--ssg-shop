import { withStyles } from '@material-ui/core/styles';
import MuiTab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import React from 'react';

const styles = (theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 'auto',
    fontSize: theme.typography.pxToRem(14),
    opacity: 1,
    color: theme.palette.text.secondary,
    '&$selected': {
      color: theme.palette.text.primary,
      opacity: 1,
    },
  },
  selected: {},
});

function Tab(props) {
  return <MuiTab {...props} />;
}

Tab.displayName = 'Tab';

Tab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tab);
