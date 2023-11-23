/* eslint-disable react/no-danger */
import Head from 'next/head';
import { useRouter } from 'next/router';
import fetchConfig from '../lib/configs';
import { capitalize } from '../lib/rtools';
import { useEffect, useState } from 'react';

const decodeUrl = (path) => {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  const sub = path.split('/');
  const subCount = sub.length;
  if (subCount === 3) {
    return `${siteName} - ${capitalize(sub[1])}`;
  }
  if (subCount === 4) {
    return `${siteName} - ${capitalize(sub[1])}: ${capitalize(sub[2])}`;
  }
  return `${siteName}`;
};

const getPageDescription = (path, data) => {
  if (Object.prototype.hasOwnProperty.call(data.metaDescriptions, path)) {
    return data.metaDescriptions[path];
  }
  return data.metaDescriptions.default;
};

const getStructuredData = () => {
  const structuredData = JSON.stringify({
    '@context': 'http://schema.org',
    '@type': 'Person',
    name: 'Ryan Daley',
    url: 'https://www.rpdaley.com',
    sameAs: [
      'https://www.facebook.com/ryandaley',
      'https://www.instagram.com/rdinca/',
      'https://www.linkedin.com/in/ryandaley/',
      'https://twitter.com/TweetRye/',
      'https://x.com/TweetRye/',
      'https://t.me/rdaley',
      'https://github.com/ryanpdaley',
    ],
  });
  return structuredData;
};

const HeadRP = () => {
  const [metaData, setMetaData] = useState(null);
  const [pageDescription, setPageDescription] = useState(null);
  const { asPath } = useRouter();

  useEffect(() => {
    fetchConfig("metadata").then((data) => {
      setMetaData(data);
      setPageDescription(getPageDescription(asPath, data))
    });
  }, []);


  return (
    <>
      {metaData && (
        <Head>
          <title>{decodeUrl(asPath)}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,shrink-to-fit=no"
          />
          <meta name="theme-color" content="#000000" />

          <meta name="title" content={metaData.metaTitle} />
          <meta name="description" content={pageDescription} />
          <meta
            name="keywords"
            content="Daley, Ryan, RP, Shopify, BellMedia, Apple, Kobo, UBC, UofG, Toronto, Vancouver, Guelph, Cupertino"
          />
          <meta name="author" content="RP Daley" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={metaData.metaUrl} />
          <meta property="og:title" content={metaData.metaTitle} />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:image" content={metaData.metaImage} />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={metaData.metaUrl} />
          <meta property="twitter:title" content={metaData.metaTitle} />
          <meta property="twitter:description" content={pageDescription} />
          <meta property="twitter:image" content={metaData.metaImage} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: getStructuredData() }}
            key="item-jsonld"
          />
        </Head>
      )}
    </>

  );
};

export default HeadRP;
