/* eslint-disable react/no-danger */
import Head from 'next/head';
import { useRouter } from 'next/router';
import siteConfigs from '../configs/config.json';
import { capitalize } from '../lib/rtools';

const decodeUrl = (path) => {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  const sub = path.split('/');
  const subCount = sub.length;
  if (subCount === 3) {
    return `${siteName} - ${capitalize(sub[1])}`;
  } else if (subCount === 4) {
    return `${siteName} - ${capitalize(sub[1])}: ${capitalize(sub[2])}`;
  } else {
    return `${siteName}`;
  }
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
      'https://t.me/rdaley',
    ],
  });
  return structuredData;
};

const HeadRP = () => {
  const { asPath } = useRouter();
  const metaConfigs = siteConfigs['meta_data'];
  return (
    <Head>
      <title>{decodeUrl(asPath)}</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no"
      />
      <meta name="theme-color" content="#000000" />

      <meta name="title" content={metaConfigs.metaTitle} />
      <meta name="description" content={metaConfigs.metaDescription} />
      <meta
        name="keywords"
        content="Daley, Ryan, RP, Shopify, BellMedia, Apple, Kobo, UBC, UofG, Toronto, Vancouver, Guelph, Cupertino"
      />
      <meta name="author" content="RP Daley" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={metaConfigs.metaUrl} />
      <meta property="og:title" content={metaConfigs.metaTitle} />
      <meta property="og:description" content={metaConfigs.metaDescription} />
      <meta property="og:image" content={metaConfigs.metaImage} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={metaConfigs.metaUrl} />
      <meta property="twitter:title" content={metaConfigs.metaTitle} />
      <meta
        property="twitter:description"
        content={metaConfigs.metaDescription}
      />
      <meta property="twitter:image" content={metaConfigs.metaImage} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: getStructuredData() }}
        key="item-jsonld"
      />
    </Head>
  );
};

export default HeadRP;
