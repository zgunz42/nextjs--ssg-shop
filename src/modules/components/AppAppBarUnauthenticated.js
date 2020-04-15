import React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as recompose from 'recompose';
import Button from 'modules/components/Button';
import AppAppBarCart from 'modules/components/AppAppBarCart';
import Link from 'modules/components/Link';

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
        marginLeft: theme.spacing(2),
      },
      [theme.breakpoints.down('xs')]: {
        fontWeight: theme.typography.fontWeightRegular,
        marginTop: theme.spacing(2),
      },
    },
  },
  signUp: {
    [theme.breakpoints.down('xs')]: {
      '&:hover': {
        backgroundColor: 'transparent',
        color: theme.palette.text.primary,
      },
    },
  },
});

const MyLink = ({ transparent, ...props }) => (
  <Link color={transparent ? 'inherit' : undefined} {...props} />
);

function AppAppBarUnauthenticated(props) {
  const {
    classes, essential, menuOpen, transparent,
  } = props;

  return essential ? null : (
    <>
      <Typography
        className={classes.item}
        transparent={transparent}
        component={MyLink}
        to="/sign-in/"
      >
        Sign In
      </Typography>
      <Button
        className={clsx(classes.item, classes.signUp)}
        variant={transparent ? 'outlined' : 'contained'}
        color={transparent ? 'default' : 'secondary'}
        size="small"
        component={Link}
        to="/sign-up/"
        naked
      >
        Sign Up
      </Button>
      <AppAppBarCart
        className={classes.item}
        transparent={transparent}
        variant={menuOpen ? 'text' : 'icon'}
      />
    </>
  );
}

AppAppBarUnauthenticated.displayName = 'AppAppBarUnauthenticated';

AppAppBarUnauthenticated.propTypes = {
  classes: PropTypes.object.isRequired,
  menuOpen: PropTypes.bool,
  transparent: PropTypes.bool,
};

export default recompose.compose(withStyles(styles))(AppAppBarUnauthenticated);
