import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from 'modules/components/Button';
import Link from 'modules/components/Link';
import React from 'react';

const useStyles = makeStyles((theme) => ({
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
    right: theme.spacing(2),
    bottom: theme.spacing(2),
  },
  img: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    display: 'block',
    borderRadius: theme.spacing(0.75),
    boxShadow: theme.shadows[2],
    objectFit: 'cover',
    color: theme.palette.grey[100],
    backgroundColor: theme.palette.grey[100],
  },
  block: {
    marginTop: theme.spacing(1.5),
    padding: theme.spacing(0, 1),
  },
}));

export default function ThemeGrid(props) {
  const { product, listPosition, listName } = props;
  const classes = useStyles();

  const themeLink = `/shop/${product.slug}`;
  // let previewLink = `/previews/${product.slug}/`;
  const linkProps = {};

  const handleClick = () => {

  };

  return (
    <>
      <div className={classes.imageContainer}>
        <Link naked to={themeLink} {...linkProps} onClick={handleClick}>
          <img className={classes.img} alt={product.name} src={product.images[0].src} />
        </Link>
        <Button
          component={Link}
          to="/"
          target="_blank"
          underline="none"
          variant="contained"
          className={classes.preview}
          size="small"
          onClick={handleClick}
          {...linkProps}
        >
          Ambil Ini
        </Button>
      </div>
      <div className={classes.block}>
        <Grid container spacing={1}>
          <Grid item xs zeroMinWidth>
            <Typography component="h3" variant="subtitle1" noWrap>
              {product.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>{product.priceStr}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs>
            <Typography
              variant="subtitle2"
              gutterBottom
              dangerouslySetInnerHTML={{
                __html: product.category[0].name,
              }}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
