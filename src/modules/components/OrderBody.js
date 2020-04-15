import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  side: {
    top: theme.spacing(3),
    position: 'sticky',
  },
});

function OrderBody(props) {
  const { cart, children, classes, className, side } = props;

  if (cart.entries == null) {
    return null;
  }

  return (
    <div className={clsx(classes.root, className)}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={7}>
          {children}
        </Grid>
        <Grid item xs={12} md={5}>
          <div className={classes.side}>{side}</div>
        </Grid>
      </Grid>
    </div>
  );
}

OrderBody.displayName = 'OrderBody';

OrderBody.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  side: PropTypes.node,
};

export default withStyles(styles)(OrderBody);
