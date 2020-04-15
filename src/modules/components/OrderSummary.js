import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import * as recompose from 'recompose';
import Divider from 'modules/components/Divider';
import Paper from 'modules/components/Paper';

const styles = theme => ({
  sideDivider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  sideBackdropClose: {
    display: 'none',
  },
  sideBackdropOpen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    background: theme.palette.common.white,
    right: 0,
    opacity: 0.66,
  },
  taxValue: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  total: {
    fontWeight: theme.typography.fontWeightMedium,
  },
});

function sum(acc, entry) {
  return acc + entry.amount * entry.quantity;
}

const CART_ENTRY_TYPES = {
  PRODUCT: 'product',
  TAX: 'tax',
};

function OrderSummary(props) {
  const { cart, classes, customerAddress, loading, footer } = props;
  const cartEntries = cart.entries || [];
  const entryProducts = cartEntries.filter(entry => entry.type === CART_ENTRY_TYPES.PRODUCT);
  const total = entryProducts.reduce(sum, 0);
  const mode = cart.amount ? 'order' : 'cart';
  const taxEntry = cartEntries.find(entry => entry.type === CART_ENTRY_TYPES.TAX);
  const vat = customerAddress && taxEntry ? taxEntry.amount / total : false;

  return (
    <React.Fragment>
      <Typography component="h2" variant="h4" gutterBottom>
        {mode === 'order' ? 'Order Summary' : 'Cart Summary'}
      </Typography>
      <Paper padding variant="outlined">
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Typography>Subtotal</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1" align="right">
              {`$${entryProducts.reduce(sum, 0)}`}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.sideDivider} />
        {mode === 'order' ? (
          <React.Fragment>
            {vat !== false ? (
              <React.Fragment>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography>Subtotal</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" align="right">
                      {total}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.taxValue}>
                  <Typography variant="subtitle1" align="right">
                    {`VAT ${taxEntry.amount}`}
                  </Typography>
                </Grid>
                <Divider className={classes.sideDivider} />
              </React.Fragment>
            ) : null}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle1">TOTAL TO PAY</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" align="right" className={classes.total}>
                  {cart.amount}
                </Typography>
              </Grid>
            </Grid>
          </React.Fragment>
        ) : (
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="subtitle1">TOTAL</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" align="right" className={classes.total}>
                {`$${total}`}
              </Typography>
            </Grid>
          </Grid>
        )}
        {footer}
        <div className={loading ? classes.sideBackdropOpen : classes.sideBackdropClose} />
      </Paper>
    </React.Fragment>
  );
}

OrderSummary.displayName = 'OrderSummary';

OrderSummary.propTypes = {
  cart: PropTypes.shape({
    amount: PropTypes.number,
    entries: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
      }).isRequired,
    ),
  }).isRequired,
  classes: PropTypes.object.isRequired,
  customerAddress: PropTypes.shape({
    country: PropTypes.string.isRequired,
    vatNumber: PropTypes.string,
  }),
  footer: PropTypes.node,
  loading: PropTypes.bool,
};

OrderSummary.defaultProps = {
  loading: false,
};

export default recompose.compose(withStyles(styles, { name: 'OrderSummary' }))(OrderSummary);
