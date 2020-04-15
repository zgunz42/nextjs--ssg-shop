import MuiDivider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    borderBottom: `1px dashed ${theme.palette.divider}`,
    backgroundColor: 'transparent',
  },
});

export default withStyles(styles, { name: 'Divider' })(MuiDivider);
