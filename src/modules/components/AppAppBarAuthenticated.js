import { withStyles } from '@material-ui/core/styles';
import AppAppBarCart from 'modules/components/AppAppBarCart';
import AppAppBarUser from 'modules/components/AppAppBarUser';
import Link from 'modules/components/Link';
import MenuItem from 'modules/components/MenuItem';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import * as recompose from 'recompose';

const styles = (theme) => ({
  item: {
    [theme.breakpoints.down('xs')]: {
      backgroundColor: 'transparent',
      border: 0,
      color: theme.palette.common.white,
      fontSize: 24,
      height: theme.spacing(5),
    },
    '& + $item': {
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
      },
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(2),
      },
    },
  },
});

function AppAppBarAuthenticated(props) {
  const {
    classes, essential, menuOpen, transparent, user,
  } = props;

  const menuItems = [];

  if (user.accountType === 'customer') {
    menuItems.push(
      <MenuItem key="purchase-history" component={Link} naked to="/account/downloads/">
        Download history
      </MenuItem>,
    );
    menuItems.push(
      <MenuItem key="profile" component={Link} naked to="/account/profile/">
        Profile
      </MenuItem>,
    );
  } else if (user.accountType === 'contributor') {
    menuItems.push(
      <MenuItem key="profile" component={Link} naked to="/contributor/">
        Dashboard
      </MenuItem>,
    );
  }

  menuItems.push(
    <MenuItem key="signout" component={Link} naked to="/logout/">
      Sign Out
    </MenuItem>,
  );

  return (
    <>
      <AppAppBarUser
        className={classes.item}
        transparent={transparent}
        user={user}
        variant={menuOpen ? 'text' : 'icon'}
        menuItems={menuItems}
      />
      {!essential && user.accountType === 'customer' && (
        <AppAppBarCart
          className={classes.item}
          transparent={transparent}
          variant={menuOpen ? 'text' : 'icon'}
        />
      )}
    </>
  );
}

AppAppBarAuthenticated.displayName = 'AppAppBarAuthenticatedCustomer';

AppAppBarAuthenticated.propTypes = {
  classes: PropTypes.object.isRequired,
  essential: PropTypes.bool,
  menuOpen: PropTypes.bool,
  transparent: PropTypes.bool,
};

export default recompose.compose(
  withStyles(styles, { name: 'AppAppBarAuthenticatedCustomer' }),
  connect((state) => ({ user: state.user })),
)(AppAppBarAuthenticated);
