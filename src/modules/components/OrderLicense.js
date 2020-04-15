import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import * as recompose from 'recompose';
import Link from 'modules/components/Link';
import Typography from '@material-ui/core/Typography';
// import ImageThumbBox from 'modules/components/ImageThumbBox';

const styles = theme => ({
  description: {
    marginLeft: theme.spacing(3),
    '& ul': {
      padding: '0 0 0 20px',
      margin: theme.spacing(1, 0),
    },
  },
  thumb: {
    height: 'auto',
    display: 'block',
    border: 0,
    '& img': {
      maxHeight: 96,
      boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.08)',
    },
  },
});

const THEME_LICENSE_TYPES = {
  STANDARD: 'STANDARD',
  EXTENDED: 'EXTENDED',
  DESIGN: 'DESIGN',
  OSS: 'OSS',
};

const licenseTypeText = {
  [THEME_LICENSE_TYPES.STANDARD]: 'Standard license',
  [THEME_LICENSE_TYPES.EXTENDED]: 'Extended license',
  [THEME_LICENSE_TYPES.DESIGN]: 'Design license',
  [THEME_LICENSE_TYPES.OSS]: 'MIT',
};

const licenseTypeUrl = {
  [THEME_LICENSE_TYPES.STANDARD]: '/license/#i-standard-license',
  [THEME_LICENSE_TYPES.EXTENDED]: '/license/#ii-extended-license',
  [THEME_LICENSE_TYPES.DESIGN]: '/license/#iii-design-license',
  [THEME_LICENSE_TYPES.OSS]: ' https://opensource.org/licenses/MIT',
};

function OrderLicense(props) {
  const { action, side, classes, entry } = props;

  return (
    <Grid container>
      <ButtonBase component={Link} to={`/items/${entry.slug}/`}>
        {/*<ImageThumbBox*/}
        {/*  src={entry.image.src}*/}
        {/*  alt={entry.name}*/}
        {/*  size="medium"*/}
        {/*  className={classes.thumb}*/}
        {/*/>*/}
      </ButtonBase>
      <Grid item xs container className={classes.description} spacing={1}>
        <Grid item xs container direction="column">
          <Grid item xs>
            <Link color="textPrimary" variant="subtitle1" to={`/items/${entry.slug}/`}>
              {entry.name}
            </Link>
            <Typography variant="body2" color="textSecondary">
              {`Item by ${entry.contributor}`}
            </Typography>
            <ul>
              <li>
                {'License: '}
                <Link color="textPrimary" to={licenseTypeUrl[entry.licenseType]}>
                  {licenseTypeText[entry.licenseType]}
                </Link>
              </li>
              <li>
                {entry.updates === 12 ? 'Updates: 1 year' : null}
                {entry.updates > 0 && entry.updates !== 12
                  ? `Updates: ${entry.updates} months`
                  : null}
                {entry.updates === -1 ? `Updates: unlimited` : null}
              </li>
              {entry.support ? <li>{`Support: ${entry.support} months`}</li> : null}
            </ul>
          </Grid>
          <Grid item>{action}</Grid>
        </Grid>
        <Grid item>{side}</Grid>
      </Grid>
    </Grid>
  );
}

OrderLicense.displayName = 'OrderLicense';

OrderLicense.propTypes = {
  action: PropTypes.node,
  classes: PropTypes.object.isRequired,
  entry: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    licenseType: PropTypes.string.isRequired,
  }).isRequired,
  side: PropTypes.node,
};

export default recompose.compose(withStyles(styles))(OrderLicense);
