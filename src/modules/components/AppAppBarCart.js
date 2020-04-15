import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';
import clsx from 'clsx';
import Link from 'modules/components/Link';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import * as recompose from 'recompose';

const styles = (theme) => ({
  root: {
    padding: 8,
    '&&&': {
      marginLeft: 0,
    },
  },
  icon: {
    fontSize: 24,
  },
  badge: {
    right: 2,
    top: -8,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  transparentBadge: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
  },
});

// eslint-disable-next-line react/display-name
const LinkToCart = React.forwardRef((linkProps, ref) => (
  <Link {...linkProps} to="/order-cart/" ref={ref} />
));

function AppAppBarCart(props) {
  const {
    classes, className, variant, cart, transparent,
  } = props;
  const count = cart.count || 0;

  return variant === 'text' ? (
    <Typography component={LinkToCart} className={className}>
      {'Cart'}
      {' '}
      {count > 0 && `(${count})`}
    </Typography>
  ) : (
    <IconButton
      color={transparent ? 'inherit' : undefined}
      component={LinkToCart}
      className={clsx(classes.root, className)}
    >
      <ShoppingCartIcon className={classes.icon} />
      {count > 0 && (
        <Badge
          color="primary"
          classes={{ badge: clsx(classes.badge, { [classes.transparentBadge]: transparent }) }}
          badgeContent={count > 9 ? '+9' : count}
        />
      )}
    </IconButton>
  );
}

AppAppBarCart.displayName = 'AppAppBarCart';

AppAppBarCart.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['text', 'icon']),
  transparent: PropTypes.bool,
};

AppAppBarCart.defaultProps = {
  variant: 'icon',
};

export default recompose.compose(
  withStyles(styles, { name: 'AppAppBarCart' }),
  connect((state) => ({ cart: state.cart })),
)(AppAppBarCart);
