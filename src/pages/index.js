import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import AppAppBar from 'modules/components/AppAppBar';
import AppFooter from 'modules/components/AppFooter';
import Divider from 'modules/components/Divider';
import Head from 'modules/components/Head';
import HomeHero from 'modules/components/HomeHero';
import Link from 'modules/components/Link';
import ProTip from 'modules/components/ProTip';
import { withRedux } from 'modules/components/redux';
import Subscribe from 'modules/components/Subscribe';
import ThemeGrid from 'modules/components/ThemeGrid';
import * as PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MuiLink color="inherit" href="https://material-ui.com/">
        Your Website
      </MuiLink>
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Index({ products }) {
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>Beranda | Hidroni</title>
      </Head>
      <AppAppBar />
      <HomeHero />
      <Container maxWidth="md" id="populars">
        <Box mt={2} mb={8}>
          <Typography variant="h5" gutterBottom>
            Popular
          </Typography>
          <Divider className={classes.divider} />
          <Grid container spacing={4}>
            {products.map((product, index) => (
              <Grid key={product.slug} item xs={12} sm={6}>
                <ThemeGrid product={product} listPosition={index + 1} listName="home" />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js example
          </Typography>
          <Link to="/about" color="secondary">
            Go to the about page
          </Link>
          <ProTip />
          <Copyright />
        </Box>
      </Container>
      <Container maxWidth="md">
        <Box mt={10} mb={4} id="subscribe">
          <Box fontWeight="fontWeightMedium" clone>
            <Typography variant="body1">Get new items in your inbox!</Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="body2">
              Be notified when we launch new themes or big discounts. Never spam.
            </Typography>
          </Box>
          <Subscribe />
        </Box>
      </Container>
      <AppFooter />
    </>
  );
}

Index.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  products: PropTypes.array.isRequired,
};

export const getStaticProps = async () => {
  const { data: { products } } = await axios.get('http://localhost:3000/api/product');

  return {
    props: { products },
  };
};

export default withRedux(Index);
