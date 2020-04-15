import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

const style = (theme) => ({
  root: {
    fontSize: 14,
    fontWeight: theme.typography.fontWeightMedium,
    paddingBottom: theme.spacing(1 / 2),
    minHeight: 'auto',
    paddingTop: theme.spacing(1 / 2),
  },
});

export default withStyles(style)(MenuItem);
