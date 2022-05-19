/* eslint-disable react/no-danger */
import Head from 'next/head';
import { useRouter } from 'next/router';

const decodeUrl = (path) => {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  if (path === '/') {
    return `${siteName}`;
  }
  if (path.split('/').length === 3) {
    const newPath = path.replace(/\//g, ' - ');
    return `${siteName} ${newPath}`;
  }
  return `${siteName} - ${path
    .substring(1)
    .charAt(0)
    .toUpperCase()}${path.slice(2)}`;
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
  return (
    <Head>
      <title>{decodeUrl(asPath)}</title>
      <meta charSet="utf-8" />
      <meta
        name="description"
        content="Ryan Daley (RP Daley) is a Software Developer at Shopify. He was previously a Web Application Developer at Bell Media, where he created the Chromecast project. He was formerly an Automation Engineer at Apple Inc. within the CarPlay team and was an early employee at Kobo (Rakuten Kobo). He holds degrees from The University of British Columbia and The University of Guelph. He currently resides in Toronto, Canada."
      />
      <meta
        name="keywords"
        content="Daley, Ryan, RP, Shopify, BellMedia, Apple, Kobo, UBC, UofG, Toronto, Vancouver, Guelph, Cupertino"
      />
      <meta name="author" content="RP Daley" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no"
      />
      <meta name="theme-color" content="#000000" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: getStructuredData() }}
        key="item-jsonld"
      />
    </Head>
  );
};

export default HeadRP;
