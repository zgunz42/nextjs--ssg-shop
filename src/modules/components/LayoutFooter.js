import React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from 'modules/components/Container';
import Link from 'modules/components/Link';
import Divider from 'modules/components/Divider';

const styles = theme => ({
  root: {
    marginTop: 'auto',
    padding: theme.spacing(6, 0, 3),
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  section: {
    display: 'flex',
    flexShrink: 1,
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'right',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      textAlign: 'center',
    },
  },
  items: {
    flexShrink: 0,
    flexGrow: 1,
    '& a': {
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'none',
      },
    },
  },
  item: {
    fontSize: 13,
    display: 'flex',
    justifyContent: 'center',
    marginTop: `${theme.spacing(0.5)}px`,
    marginBottom: `${theme.spacing(0.5)}px`,
    marginLeft: `${theme.spacing(2)}px`,
  },
  copyright: {
    display: 'flex',
    flex: '1 0 auto',
    alignItems: 'center',
    fontSize: 13,
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  social: {
    margin: theme.spacing(0.25),
    '& img': {
      display: 'block',
    },
  },
  white: {
    color: theme.palette.common.white,
  },
});

function LayoutFooter(props) {
  const { items, classes } = props;

  return (
    <Typography component="footer" className={classes.root}>
      <Container maxWidth="md">
        <Divider className={classes.divider} />
        <Grid container align="center">
          <Grid className={classes.section} item xs={12} md={3}>
            <Typography variant="caption" className={classes.copyright}>
              {`© ${new Date().getFullYear()} Material-UI Store`}
            </Typography>
          </Grid>
          <Grid className={clsx(classes.section, classes.items)} item xs={12} md>
            {items.map(item => (
              <Link key={item.to} className={classes.item} to={item.to} target={item.target}>
                {item.label}
              </Link>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}

LayoutFooter.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
};

export default withStyles(styles)(LayoutFooter);

