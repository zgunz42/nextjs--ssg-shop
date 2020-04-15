/* eslint-disable react/no-danger */
import React from 'react';
import { useSelector } from 'react-redux';
import Textfield from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Button from 'modules/components/Button';
// import api from 'modules/api';

async function getComments(wcId) {
  const response = await api(`/wp-json/wc/v3/products/reviews?product=${wcId}`, {
    transformation: 'json',
  });

  return response.filter((item) => item.rating === 0);
}

export default function Comments(props) {
  const { product } = props;
  const [reviews, setComments] = React.useState(product.rating_count === 0 ? [] : null);
  const { user } = useSelector((state) => ({ user: state.data.user }));

  // console.log('product', user, product, reviews);

  React.useEffect(() => {
    let active = true;

    if (reviews !== null) {
      return;
    }

    (async () => {
      const newReviews = await getComments(product.wcId);

      if (active) {
        setComments(newReviews);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

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
      {user.logged === false
        ? 'You must purchase this theme to leave a review. If you have already purchased it, login to leave a review.'
        : null}
      {reviews.length === 0 ? 'No reviews yet.' : null}
      <Button variant="contained" color="primary">
        Write a comment
      </Button>
      <Typography variant="h3">Write a comment</Typography>
      {reviews.map((review) => (
        <div key={review.id}>
          {review.date_created_gmt}
          <br />
          {review.reviewer}
          <br />
          <div
            dangerouslySetInnerHTML={{
              __html: review.review,
            }}
          />
        </div>
      ))}
      Your rating
      <form>
        <Textfield name="review" label="Describe your experience" multiline />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
