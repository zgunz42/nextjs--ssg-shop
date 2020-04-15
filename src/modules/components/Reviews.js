import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format, formatDistanceToNow } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import groupBy from 'lodash/groupBy';
import { FORM_ERROR } from 'final-form';
import { Form, FormSpy } from 'react-final-form';
import actionTypes from 'modules/redux/actionTypes';
import Link from 'modules/components/Link';
import Divider from 'modules/components/Divider';
import Typography from '@material-ui/core/Typography';
import Paper from 'modules/components/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import Button from 'modules/components/Button';
import FormButton from 'modules/components/FormButton';
import FormFeedback from 'modules/components/FormFeedback';
import Rating from '@material-ui/lab/Rating';
import FormField from 'modules/components/FormField';
import FormFieldRating from 'modules/components/FormFieldRating';
import api from 'modules/api';
import {timeout} from "../../utils/time";

function formatDate(dateString) {
  return format(new Date(dateString), 'MMM d, yyyy');
}

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(0, 0, 2),
    padding: theme.spacing(0.5),
  },
  paperHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  rating: {
    fontSize: 20,
    marginRight: theme.spacing(1),
  },
  login: {
    marginBottom: theme.spacing(3),
  },
  form: {
    marginBottom: theme.spacing(6),
  },
  noReviews: {
    marginBottom: theme.spacing(3),
  },
}));

const initialValues = {
  rating: null,
};

const headerRegExp = /<p>---[\r\n<br />]([\s\S]*)[\r\n<br />]---<\/p>/;
const headerKeyValueRegExp = /(.*): (.*)<br \/>/g;

export function getHeaders(text) {
  let header = text.match(headerRegExp);

  if (!header) {
    return {};
  }

  header = header[1];

  let regexMatches;
  const headers = {};

  // eslint-disable-next-line no-cond-assign
  while ((regexMatches = headerKeyValueRegExp.exec(header)) !== null) {
    headers[regexMatches[1]] = regexMatches[2];
  }

  return headers;
}

export function getContent(text) {
  return text.replace(headerRegExp, ''); // Remove header information
}

export default function Reviews(props) {
  const { product } = props;
  const classes = useStyles();
  const [reviews, setReviews] = React.useState(product.rating_count === 0 ? [] : null);
  const [newReview, setNewReview] = React.useState(false);
  const [comments, setComments] = React.useState(null);
  const user = useSelector(state => state.data.user);
  const dispatch = useDispatch();

  // console.log('product', comments);

  const commentsGroup = groupBy(comments, 'parent');

  React.useEffect(() => {
    let active = true;

    if (reviews !== null) {
      return undefined;
    }

    (async () => {
      await timeout(200);

      const request = await api(product.id, 'reviews', 'product');
      const response = await request.json()

      if (active) {
        setReviews(response.filter(item => item.rating > 0 && item.verified === true));
      }
    })();

    return () => {
      active = false;
    };
  }, [product, reviews]);

  React.useEffect(() => {
    let active = true;

    if (reviews === null || reviews.length === 0) {
      return undefined;
    }

    (async () => {
      const response = await api(
        `/wp-json/wp/v2/comments?post=${product.wcId}&parent=${reviews
          .map(review => review.id)
          .join(',')}`,
        {
          transformation: 'json',
        },
      );

      if (active) {
        setComments(response);
      }
    })();

    return () => {
      active = false;
    };
  }, [product, reviews]);

  const handleSubmit = async values => {
    try {
      const res1 = await api(`/items/${product.slug}/`, {
        method: 'GET',
        transformation: 'text',
      });

      const verificationFail = res1.match(
        /<p class="woocommerce-verification-required">(.+?)<\/p>/,
      ) || [null, null];

      if (verificationFail[1]) {
        return {
          [FORM_ERROR]: verificationFail[1],
        };
      }

      const res2 = await api('/wp-comments-post.php', {
        method: 'POST',
        transformation: 'text',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
          rating: values.rating,
          comment: `---
dimension: ${values.dimension}
---

${values.comment || ''}`,
          comment_post_ID: product.wcId,
        },
      });

      const failPage = res2.match(/<body id="error-page">\s*<p><p>(.+?)<\/p><\/p>/) || [null, null];

      if (failPage[1]) {
        return {
          [FORM_ERROR]: failPage[1],
        };
      }

      setNewReview(false);
      setReviews(null);

      const approval = res2.match(
        /<em class="woocommerce-review__awaiting-approval">(.+?)<\/em>/s,
      ) || [null, null];

      dispatch({
        type: actionTypes.SNACKBAR_OPEN,
        payload: {
          variant: 'success',
          message: `${approval[1] ? `${approval[1].trim()}. ` : ''}Thank you for the contribution.`,
        },
      });
    } catch (err) {
      console.log('err', err);
    }

    return {
      [FORM_ERROR]: 'An error has occured, please try again later',
    };
  };

  if (reviews === null) {
    return (
      <div>
        <Skeleton width="70%" />
        <Skeleton width="50%" />
        <Skeleton width="60%" />
      </div>
    );
  }

  return (
    <div>
      {user.logged === false ? (
        <Typography className={classes.login}>
          {'You must purchase this theme to leave a review. If you have already purchased it, '}
          <Link
            to={`/sign-in/?return-to=${encodeURIComponent(`/items/${product.slug}/#reviews`)}`}
            color="inherit"
            underline="always"
          >
            sign in
          </Link>
          {' to leave a review.'}
        </Typography>
      ) : null}
      {reviews.length === 0 ? (
        <Typography className={classes.noReviews}>No reviews yet.</Typography>
      ) : null}
      {!newReview && user.logged === true ? (
        <Button
          variant="contained"
          color="secondary"
          className={classes.form}
          onClick={() => {
            setNewReview(true);
          }}
        >
          Write a review
        </Button>
      ) : null}
      {newReview ? (
        <React.Fragment>
          <Form
            initialValues={initialValues}
            onSubmit={handleSubmit}
            subscription={{ submitting: true }}
          >
            {({ handleSubmit: handleSubmit2, submitting }) => (
              <form onSubmit={handleSubmit2} noValidate className={classes.form}>
                <Typography variant="h3" gutterBottom>
                  Write a review
                </Typography>
                <FormFieldRating label="Rating" required name="rating" />
                <FormField
                  required
                  name="dimension"
                  label="Ranking category"
                  SelectProps={{ native: true }}
                  select
                >
                  <option value="" />
                  <option value="flexibility">Flexibility</option>
                  <option value="customizability">Customizability</option>
                  <option value="bugs">Bugs</option>
                  <option value="feature-availability">Feature Availability</option>
                  <option value="design-quality">Design Quality</option>
                  <option value="code-quality">Code Quality</option>
                  <option value="documentation-quality">Documentation Quality</option>
                  <option value="customer-support">Customer Support</option>
                  <option value="other">Other</option>
                </FormField>
                <FormField name="comment" label="Describe your experience (optional)" multiline />
                <FormSpy subscription={{ submitError: true }}>
                  {({ submitError }) =>
                    submitError ? <FormFeedback variant="error">{submitError}</FormFeedback> : null
                  }
                </FormSpy>
                <FormButton disabled={submitting} color="primary">
                  Submit
                </FormButton>
              </form>
            )}
          </Form>
        </React.Fragment>
      ) : null}
      {reviews.map(review => {
        const children = commentsGroup[review.id];
        const headers = getHeaders(review.review);
        const content = getContent(review.review);

        return (
          <Paper variant="outlined" key={review.id} className={classes.paper}>
            <div className={classes.paperHeader}>
              <Rating readOnly value={review.rating} precision={0.5} className={classes.rating} />
              <span>
                <Typography component="span" color="textSecondary" variant="body2">
                  {'for '}
                </Typography>
                {headers.dimension}
              </span>
            </div>
            <Typography color="textSecondary" variant="body2">
              <strong>{review.reviewer}</strong>
              {' commented '}
              <span title={formatDate(review.date_created)}>
                {formatDistanceToNow(new Date(review.date_created), {
                  addSuffix: true,
                })}
              </span>
            </Typography>
            <div
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
            {children
              ? children.map(child => {
                return (
                  <div key={child.id}>
                    <Divider />
                    {child.author}
                    {child.date}
                    {child.author_name}
                    {child.content.rendered}
                  </div>
                );
              })
              : null}
          </Paper>
        );
      })}
    </div>
  );
}
