/* eslint-disable react/no-danger */

import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function nofollow(text) {
  return text.replace(/(<a[^>]+?)>/g, (a, b) => {
    if (b.indexOf('rel="') !== -1) {
      return a.replace('rel="', 'rel="nofollow ');
    }
    return `${b} rel="nofollow">`;
  });
}

const useStyles = makeStyles(theme => ({
  root: {
    '& a': {
      color: theme.palette.primary.main,
    },
    '& img': {
      maxWidth: '100%',
    },
    '& h1': {
      backgroundColor: 'red',
    },
    '& h2': {
      ...theme.typography.h3,
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(2),
    },
    '& h3': {
      ...theme.typography.h4,
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
    '& .get-it-here': {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(8),
    },
    '& .get-it-here a': {
      padding: '9px 16px 8px',
      fontSize: 14,
      color: '#fff',
      backgroundColor: theme.palette.primary.main,
      transition:
        'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      fontWeight: 500,
      lineHeight: 1.2,
      borderRadius: 4,
      letterSpacing: '0.02857em',
      textDecoration: 'none',
      border: 0,
      margin: 0,
      verticalAlign: 'middle',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },
}));

export default function Html(props) {
  const classes = useStyles();
  const { html } = props;

  return (
    <Typography
      variant="body1"
      component="div"
      className={classes.root}
      dangerouslySetInnerHTML={{
        __html: nofollow(html),
      }}
    />
  );
}
