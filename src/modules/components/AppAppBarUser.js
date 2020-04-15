import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconUser from '@material-ui/icons/PermIdentityOutlined';
import clsx from 'clsx';
import Divider from 'modules/components/Divider';
import * as PropTypes from 'prop-types';
import React from 'react';

const styles = (theme) => ({
  user: {
    padding: 6,
    '&&&': {
      marginLeft: theme.spacing(1),
    },
  },
  icon: {
    fontSize: 28,
  },
  white: {
    color: theme.palette.grey[300],
    '&:active, &:hover': {
      color: theme.palette.common.white,
    },
  },
  userLabel: {
    outline: 'none',
    color: theme.palette.primary.main,
    padding: `${theme.spacing(1 / 2)}px ${theme.spacing(2)}px`,
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  dropDownMenu: {
    marginTop: theme.spacing(2),
  },
});

class AppAppBarUser extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      anchorEl: null,
    };
  }

  handleClickUser = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const {
      user, classes, className, menuItems, variant, transparent,
    } = this.props;
    const { anchorEl } = this.state;

    function userLabel() {
      return `Hi ${user.username}`;
    }

    return (
      <>
        {variant === 'text' ? (
          <Typography
            onClick={this.handleClickUser}
            className={clsx(classes.user, className)}
            aria-owns="app-bar-menu"
            aria-haspopup="true"
          >
            Profile
          </Typography>
        ) : (
          <IconButton
            onClick={this.handleClickUser}
            color={transparent ? 'inherit' : undefined}
            className={clsx(classes.user, className)}
            aria-owns="app-bar-menu"
            aria-haspopup="true"
          >
            <IconUser className={classes.icon} />
          </IconButton>
        )}
        <Menu
          elevation={3}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          className={classes.dropDownMenu}
          anchorEl={anchorEl}
          id="app-bar-menu"
          onClose={this.handleRequestClose}
          open={Boolean(anchorEl)}
          transitionDuration={0}
          getContentAnchorEl={null}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Typography variant="body2" component="div" className={classes.userLabel} key={user.id}>
            {userLabel()}
          </Typography>
          <Divider className={classes.divider} />
          {menuItems}
        </Menu>
      </>
    );
  }
}

AppAppBarUser.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  menuItems: PropTypes.node.isRequired,
  transparent: PropTypes.bool,
  user: PropTypes.object.isRequired,
  variant: PropTypes.oneOf(['text', 'icon']),
};

AppAppBarUser.defaultProps = {
  variant: 'icon',
};

export default withStyles(styles)(AppAppBarUser);
