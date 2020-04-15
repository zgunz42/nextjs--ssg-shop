import React from 'react';
import * as PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';

function MyHead(props) {
  const {
    canonical: canonicalProp,
    children,
    description = [
      'This is a collection of the best React templates, React dashboard, and React themes.',
      'Our collection was curated by Material-UI\'s creators.',
      'It includes templates and themes for dashboard, admin, landing page, e-commerce site, application, and more.',
    ].join(' '),
    image,
    imageSize,
    title: titleProps = 'React themes & templates',
  } = props;

  const title = `${titleProps} | Material-UI Store`;
  const { pathname } = useRouter();

  let imageWidth = null;
  let imageHeight = null;

  if (imageSize) {
    const sizes = imageSize.split('x').map(Number);
    imageWidth = <meta property="og:image:width" content={sizes[0]} />;
    imageHeight = <meta property="og:image:height" content={sizes[1]} />;
  }

  let canonical = canonicalProp;

  if (!canonical) {
    canonical = `https://material-ui.com${pathname}`;
  }

  let dev;

  if (process.env.GATSBY_ENV !== 'production') {
    dev = <meta name="robots" content="noindex,nofollow" />;
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@MaterialUI" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {/* Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {imageWidth}
      {imageHeight}
      <meta property="og:ttl" content="604800" />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Material-UI Store" />
      {/* SEO */}
      <link rel="canonical" href={canonical} />
      {dev}
      {children}
    </Head>
  );
}

MyHead.displayName = 'MyHead';

MyHead.propTypes = {
  canonical: PropTypes.string,
  description: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  image: PropTypes.string,
  imageSize: PropTypes.string,
  title: PropTypes.string.isRequired,
};

MyHead.defaultProps = {
  image: '/icon/512x512.png',
  imageSize: '12x12',
  description: 'website',
  canonical: '/',
};

export default MyHead;
