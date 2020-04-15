import NoSsr from '@material-ui/core/NoSsr';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconClose from '@material-ui/icons/Close';
import IconMenu from '@material-ui/icons/Menu';
import clsx from 'clsx';
import AppAppBarAuthenticated from 'modules/components/AppAppBarAuthenticated';
import AppAppBarUnauthenticated from 'modules/components/AppAppBarUnauthenticated';
import AppBar from 'modules/components/AppBar';
import Link from 'modules/components/Link';
import Logo from 'modules/components/Logo';
// import SearchBar from 'modules/components/SearchBar';
import actionTypes from 'modules/redux/actionTypes';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
// import getUser from 'modules/getUser';
// import getCart from 'modules/getCart';

const styles = (theme) => ({
  grow: {
    display: 'block',
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  wrap: {
    display: 'flex',
    flex: '1 1 auto',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'baseline',
      padding: `${theme.spacing(2) - 1}px 0`,
      flexWrap: 'wrap',
    },
  },
  wrapOpened: {
    [theme.breakpoints.down('xs')]: {
      color: theme.palette.common.white,
      alignItems: 'flex-start',
      backgroundColor: theme.palette.primary.main,
      bottom: 0,
      left: 0,
      padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
      position: 'fixed',
      right: 0,
      top: 0,
    },
  },
  menu: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      position: 'absolute',
      right: 0,
      top: theme.spacing(2),
    },
  },
  menuIcon: {
    fontSize: 32,
    marginTop: -theme.spacing(1 / 2),
  },
  closeIcon: {
    marginRight: theme.spacing(2),
  },
  burgerIcon: {
    color: theme.palette.text.secondary,
  },
  white: {
    color: theme.palette.common.white,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    flex: '1 1 auto',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  contentOpened: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
    },
  },
  // searchBar: {
  //   [theme.breakpoints.down('xs')]: {
  //     flex: '1 0 100%',
  //     marginTop: theme.spacing(2),
  //   },
  // },
  item: {
    [theme.breakpoints.down('xs')]: {
      backgroundColor: 'transparent',
      border: 0,
      color: theme.palette.common.white,
      fontSize: 24,
      height: theme.spacing(5),
      margin: theme.spacing(1),
    },
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2),
    },
  },
});

class AppAppBar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      menuOpen: false,
    };
  }

  async componentDidMount() {
    // const cart = await getCart();
    // eslint-disable-next-line react/prop-types
    const { dispatch } = this.props;
    dispatch({
      type: actionTypes.CART_UPDATE,
      payload: { count: 1 },
    });

    // if (user.logged != null) {

    // }

    // const user = await getUser();
    // this.props.dispatch({
    //   type: actionTypes.USER_UPDATE,
    //   payload: user,
    // });
  }

  handleToggleMenu = (event, forceClose) => {
    const { menuOpen } = this.state;
    if (event) {
      event.preventDefault();
    }

    this.setState({ menuOpen: forceClose ? false : !menuOpen });
  };

  render() {
    const {
      classes, children, essential, position, user,
    } = this.props;
    const { menuOpen } = this.state;

    return (
      <AppBar essential={essential} position={position}>
        <div className={clsx(classes.wrap, { [classes.wrapOpened]: menuOpen })}>
          <Link to="/" aria-label="Back to homepage" color="inherit">
            <Logo color={menuOpen ? 'inherit' : 'textPrimary'} />
          </Link>
          {/* essential || menuOpen ? null : (
            <SearchBar
              id="app-bar-search"
              className={classes.searchBar}
            />
          ) */}
          <div
            className={clsx(classes.content, {
              [classes.contentOpened]: menuOpen,
              'mui-fixed': menuOpen,
            })}
          >
            {children || <div className={classes.grow} />}
            {essential ? null : (
              <Typography
                className={classes.item}
                component={Link}
                to="https://material-ui.zendesk.com/hc/en-us"
                target="_blank"
              >
                Help
              </Typography>
            )}
            <NoSsr>
              {user.logged === true ? (
                <AppAppBarAuthenticated essential={essential} menuOpen={menuOpen} />
              ) : null}
              {user.logged === false ? (
                <AppAppBarUnauthenticated essential={essential} menuOpen={menuOpen} />
              ) : null}
            </NoSsr>
          </div>
          {essential ? null : (
            <div className={clsx(classes.menu, 'mui-fixed')}>
              <button type="button" onClick={this.handleToggleMenu}>
                {menuOpen ? (
                  <IconClose
                    className={clsx(classes.menuIcon, classes.closeIcon, classes.white, {
                      [classes.hide]: menuOpen,
                    })}
                  />
                ) : (
                  <IconMenu
                    className={clsx(classes.menuIcon, classes.burgerIcon, {
                      [classes.hide]: menuOpen,
                    })}
                  />
                )}
              </button>
            </div>
          )}
        </div>
      </AppBar>
    );
  }
}

AppAppBar.defaultProps = {
  user: {
    logged: false,
  },
};

AppAppBar.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  essential: PropTypes.bool,
  position: PropTypes.string,
  user: PropTypes.shape({
    logged: PropTypes.bool,
  }),
};

export default compose(
  withStyles(styles, { name: 'AppAppBar' }),
  connect((state) => ({ user: state.user })),
)(AppAppBar);
