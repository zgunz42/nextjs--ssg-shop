/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import MuiLink from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles((theme) => ({
  active: {
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const NextComposed = React.forwardRef((props, ref) => {
  const { as, to, ...other } = props;

  if (to.indexOf('/') !== 0) {
    return <a ref={ref} style={{ textDecoration: 'none' }} {...other} />;
  }

  return (
    <NextLink href={to} as={as}>
      <a ref={ref} style={{ textDecoration: 'none' }} {...other} />
    </NextLink>
  );
});

NextComposed.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  prefetch: PropTypes.bool,
};

NextComposed.defaultProps = {
  prefetch: true,
};

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link(props) {
  const {
    to,
    activeClassName,
    className: classNameProps,
    innerRef,
    naked,
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof to === 'string' ? to : to.pathname;
  const classes = useStyles();
  const className = clsx(classNameProps, {
    [classes.active]: router.pathname === pathname && activeClassName,
  });

  if (naked || pathname.indexOf('/') === 0) {
    return <NextComposed className={className} ref={innerRef} to={to} {...other} />;
  }

  return (
    <MuiLink component={NextComposed} className={className} ref={innerRef} to={to} {...other} />
  );
}

Link.defaultProps = {
  activeClassName: 'active',
  className: '',
  naked: false,
  onClick: () => {},
  prefetch: false,
};

Link.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  className: PropTypes.string,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  naked: PropTypes.bool,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool,
};

export default React.forwardRef((props, ref) => <Link {...props} innerRef={ref} />);
