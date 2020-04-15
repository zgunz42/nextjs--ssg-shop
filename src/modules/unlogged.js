import React from 'react';
import AppAppBar from 'modules/components/AppAppBar';
import Head from 'modules/components/Head';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';

function unlogged(Component) {
  const Unlogged = (props) => {
    const { user, ...other } = props;

    React.useEffect(() => {
      if (user.logged === true) {
        // Wait in case the component is not quickly unmounted
        const timeout = setTimeout(() => {
          navigate('/');
        });
        return () => {
          clearTimeout(timeout);
        };
      }
      return undefined;
    }, [user.logged]);

    if (user.logged === true) {
      return null;
    }

    if (user.logged == null) {
      return (
        <>
          <Head />
          <AppAppBar />
        </>
      );
    }

    return <Component {...other} />;
  };

  return connect((state) => ({ user: state.data.user }))(Unlogged);
}

export default unlogged;
