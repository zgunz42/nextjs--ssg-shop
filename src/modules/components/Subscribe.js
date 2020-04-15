import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from 'modules/components/Button';
import TextField from 'modules/components/TextField';
import React from 'react';

export default function Subscribe() {
  return (
    <form
      noValidate
      action="https://material-ui.us20.list-manage.com/subscribe/post?u=0fce56b3f457fda91b7b785fd&amp;id=acefbbe1ba"
      method="post"
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm md={6}>
          <TextField
            autoComplete="email"
            fullWidth
            type="email"
            id="newsletter-input"
            label="Email address"
            name="EMAIL"
            required
          />
          <div aria-hidden style={{ position: 'absolute', left: -5000 }}>
            <input type="text" name="b_0fce56b3f457fda91b7b785fd_acefbbe1ba" tabIndex={-1} />
          </div>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Box mt={1}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Subscribe
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}
