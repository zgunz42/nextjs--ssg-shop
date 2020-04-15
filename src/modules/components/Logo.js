import React from 'react';
// eslint-disable-next-line import/no-unresolved
import svg from 'images/logo.svg';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: 18,
  },
  svg: {
    width: 20,
    height: 25, // Needed for Safari
    marginRight: 12,
  },
}));

function Logo(props) {
  const { component: Component = 'div', ...other } = props;
  const classes = useStyle();
  return (
    <Component className={classes.root} {...other}>
      <img className={classes.svg} src={svg} alt="logo" />
      {' '}
      Hidroni Store
    </Component>
  );
}

Logo.defaultProps = {
  component: 'div',
};

Logo.propTypes = {
  component: PropTypes.string,
};

export default Logo;
