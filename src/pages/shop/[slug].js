import {
  Box,
  FormControl,
  InputLabel,
  Chip,
  MenuItem,
  Select,
  Input,
  Fade,
  Grid,
  Link as MuiLink,
  Tabs,
  Typography,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { ShoppingCart } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import AppAppBar from 'modules/components/AppAppBar';
import AppFooter from 'modules/components/AppFooter';
import Button from 'modules/components/Button';
import Container from 'modules/components/Container';
import Head from 'modules/components/Head';
import InputCount from 'modules/components/InputCount';
import Link from 'modules/components/Link';
import createMdxElement from 'modules/components/markdown';
import { withRedux } from 'modules/components/redux';
import Tab from 'modules/components/Tab';
import { useRouter } from 'next/router';

import * as PropTypes from 'prop-types';
import React from 'react';

function formatNumber(number) {
  return String(number).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  slider: {
    marginBottom: theme.spacing(3),
  },
  imageContainer: {
    position: 'relative',
    padding: '55% 0 0 0',
    '& $preview': {
      opacity: 0,
      transition: theme.transitions.create('opacity', {
        duration: theme.transitions.duration.short,
      }),
    },
    '&:hover $preview': {
      opacity: 1,
    },
  },
  preview: {
    position: 'absolute',
    backgroundColor: fade(theme.palette.primary.main, 0.6),
    display: 'flex',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    borderRadius: theme.spacing(1),
  },
  img: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    display: 'block',
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[2],
    objectFit: 'cover',
    color: theme.palette.grey[100],
    backgroundColor: theme.palette.grey[100],
  },
  pricePaper: {
    marginBottom: theme.spacing(3),
  },
  priceHeader: {
    marginBottom: theme.spacing(1.5),
  },
  pricePreview: {
    margin: theme.spacing(1, 0),
  },
  label: {
    margin: theme.spacing(0, 0, 3),
    '& .MuiFormControlLabel-label': {
      marginLeft: theme.spacing(0.5),
      width: '100%',
    },
  },
  packageType: {
    fontWeight: theme.typography.fontWeightMedium,
    marginBottom: theme.spacing(2),
  },
  variation: {
    '& ul': {
      padding: 0,
      margin: theme.spacing(0.5, 0, 0, 0.5),
      listStyleType: 'none',
    },
    '& .MuiTypography-body1': {
      lineHeight: 1,
    },
    '& li svg': {
      fontSize: 16,
      verticalAlign: '-0.125em',
      marginRight: 5,
    },
    '& li .emoji': {
      fontSize: 10,
      marginRight: 4,
    },
  },
  variantSelect: {
    marginTop: 2,
  },
  tabs: {
    margin: theme.spacing(3, 0, 4),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  store: {
    display: 'flex',
    marginTop: 4,
    alignItems: 'center',
  },
  storeAvatar: {
    marginRight: theme.spacing(2),
    borderRadius: theme.spacing(0.5),
    color: '#fff',
  },
  sales: {
    padding: theme.spacing(3, 1, 2, 1),
    display: 'flex',
    alignItems: 'center',
  },
  salesTotal: {
    margin: theme.spacing(0, 1, 0, 1.5),
    fontSize: 24,
  },
  salesLabel: {
    marginTop: 5,
  },
  ratings: {
    padding: theme.spacing(3, 1, 2, 1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    '& .MuiTypography-root': {
      marginRight: 2,
    },
  },
  valueProps: {
    margin: theme.spacing(2, 1, 3, 1),
    listStyle: 'none',
    padding: theme.spacing(0),
    '& li': {
      display: 'flex',
    },
    '& li > svg': {
      color: theme.palette.success.main,
      marginRight: theme.spacing(1),
    },
  },
  upsellDivider: {
    margin: theme.spacing(8, 0, 10),
  },
  upsell: {
    margin: theme.spacing(6, 0, 4),
  },
  upsellCta: {
    marginTop: theme.spacing(3),
  },
  upsellItem2: {
    paddingTop: theme.spacing(6),
    [theme.breakpoints.up('sm')]: {
      paddingTop: 0,
      paddingLeft: theme.spacing(6),
    },
  },
  upsellImage: {
    width: '100%',
    borderRadius: 8,
    boxShadow: theme.shadows[2],
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function ProductSingle({ product }) {
  const classes = useStyles();
  const theme = useTheme();
  const { pathname: location } = useRouter();
  const [page, setPage] = React.useState('description');
  const [productVariant, setProductVariant] = React.useState([]);

  const handleChange = (event) => {
    setProductVariant(event.target.value);
  };

  React.useEffect(() => {
    if (location.hash === '#reviews') {
      setPage('reviews');
    }
  }, [location]);

  const inCart = false;
  const handleAddToCartClick = () => {};
  const addToCart = () => {};

  return (
    <>
      <Head title={product.name} description={product.description} image={product.images[0].src}>
        <meta name="twitter:label1" content="Price" />
        <meta
          name="twitter:data1"
          content={`${product.priceStr}`}
        />
        <meta name="twitter:label2" content="Store" />
        <meta name="twitter:data2" content="Hidroni" />
      </Head>
      <AppAppBar />
      <Container className={classes.container} maxWidth="md">
        <Typography className={classes.title} variant="h2">
          {product.name}
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} md={8}>
            <div className={classes.imageContainer}>
              <img className={classes.img} alt={product.name} src={product.images[0].src} />
            </div>
            <Tabs
              onChange={(__, route) => {
                setPage(route);
              }}
              value={page}
              className={classes.tabs}
              indicatorColor="primary"
              scrollButtons="off"
            >
              <Tab value="description" label="Description" />
              <Tab value="reviews" label="Reviews" id="reviews" />
              <Tab value="comments" label="Comments" id="comments" />
            </Tabs>
            {page === 'description' ? (
              <Fade in>
                {
                  createMdxElement(product.body)
                }
              </Fade>
            ) : null}
            {page === 'reviews' ? (
              <Fade in>
                <h3>reviews</h3>
              </Fade>
            ) : null}
            {page === 'comments' ? (
              <Fade in>
                <h3>comments</h3>
              </Fade>
            ) : null}
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid className={classes.pricePaper}>
              <Box my={4} mt={0}>
                <Typography variant="body2" className={classes.packageType}>
                  {product.description}
                </Typography>
                {
                  product.notice && (<Alert severity="info">{product.notice}</Alert>)
                }
                <Box mt={4}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                  >
                    <Grid item md={12}>
                      {product.variations && (
                      <FormControl className={classes.formControl} variant="filled" style={{ display: 'block' }}>
                        <InputLabel htmlFor="product-variant-field">Jenis Barang</InputLabel>
                        <Select
                          id="product-variant-field"
                          variant="filled"
                          multiple
                          value={productVariant}
                          onChange={handleChange}
                          renderValue={(selected) => (
                            <div className={classes.chips}>
                              {selected.map((value) => (
                                <Chip key={value.id + value.name} label={`${value.parent}:${value.name}`} className={classes.chip} />
                              ))}
                            </div>
                          )}
                          MenuProps={MenuProps}
                        >
                          {product
                            .variations
                            .flatMap((v) => v.options.map((p) => ({ ...p, parent: v.name })))
                            .map((option) => (
                              <MenuItem key={option.id + option.name} value={option} style={getStyles(option, productVariant, theme)}>
                                {`${option.parent}:${option.name}`}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                      )}
                      <FormControl className={classes.formControl} variant="filled">
                        <InputLabel htmlFor="item-on-cart">Jumlah Produk</InputLabel>
                        <InputCount id="item-on-cart" />
                      </FormControl>
                    </Grid>
                    <Grid md={12} item zeroMinWidth>
                      <Box mt={4}>
                        <Typography variant="h6">
                          Total Harga
                        </Typography>
                        <Typography noWrap>
                          {product.priceStr}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              {inCart ? (
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  naked
                  component={Link}
                  to="/order-cart/"
                >
                  Lihat Keranjang
                </Button>
              ) : (
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleAddToCartClick}
                >
                  {product.price === '0' ? 'Download' : 'Buy now'}
                </Button>
              )}
              <Button
                className={classes.pricePreview}
                variant="outlined"
                fullWidth
                target="_blank"
                component={Link}
                to={`/previews/${product.slug}/`}
              >
                Live Preview
              </Button>
              <Grid container>
                <Grid item xs={6}>
                  <Typography className={classes.sales}>
                    <ShoppingCart fontSize="small" />
                    <span className={classes.salesTotal}>
                      {formatNumber(product.stats.total_sales)}
                    </span>
                    <span className={classes.salesLabel}>Sales</span>
                  </Typography>
                </Grid>
                <Grid item xs={6} className={classes.ratings}>
                  <Rating
                    value={parseFloat(product.stats.average_rating)}
                    readOnly
                    precision={0.5}
                    disabled={product.stats.rating_count === 0}
                  />
                  <Typography color="textSecondary" variant="caption">
                    {product.stats.rating_count > 0 ? `${product.stats.average_rating}/5 ` : null}
                    <MuiLink
                      href="#reviews"
                      onClick={() => {
                        setPage('reviews');
                      }}
                      color="inherit"
                    >
                      {`(${product.stats.rating_count} review${product.stats.rating_count === 1 ? '' : 's'})`}
                    </MuiLink>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <AppFooter />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'Product',
            category: product.category[0].name,
            url: `https://hidroni.adibite.xyz/shop/${location.pathname}`,
            description: product.description,
            name: product.name,
            productID: product.slug,
            image: product.images[0].src,
            ...(product.stats.rating_count > 0
              ? {
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: product.stats.average_rating,
                  ratingCount: product.stats.rating_count,
                },
              }
              : {}),
            ...(product.price !== 0
              ? {
                offers: {
                  '@type': 'Offer',
                  price: product.price || 0,
                  priceCurrency: 'IDR',
                  availability: 'http://schema.org/InStock',
                },
              }
              : {}),
          }),
        }}
      />
    </>
  );
}

ProductSingle.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export async function getStaticProps(context) {
  const { slug } = context.params;
  const { data: { products } } = await axios.get(`http://localhost:3000/api/product?slug=${slug}`);

  return {
    props: {
      product: products,
    }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const { data: { products } } = await axios.get('http://localhost:3000/api/product');

  return {
    paths: products.map((product) => ({ params: { slug: product.slug } })),
    fallback: false, // See the "fallback" section below
  };
}

export default withRedux(ProductSingle);
