import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchMetaConfig } from '../lib/configs';

type MetaDataType = {
  metaTags: {
    type:
      | 'pageTitle'
      | 'charSet'
      | 'viewport'
      | 'theme-color'
      | 'description'
      | 'keywords'
      | 'author'
      | 'property';
    propertyValue?: string;
    content: string;
  }[];
  structuredData: object[];
  canonicalUrl: string;
};

const MetaData = (metadata: MetaDataType) => {
  const { metaTags, structuredData, canonicalUrl } = metadata;
  const metaElements = metaTags.map((metaTag, index) => {
    if (metaTag.type === 'pageTitle') {
      return <title key={index}>{metaTag.content}</title>;
    }
    if (metaTag.type === 'property') {
      return (
        <meta
          key={index}
          property={metaTag.propertyValue}
          content={metaTag.content}
        />
      );
    }
    return <meta key={index} name={metaTag.type} content={metaTag.content} />;
  });
  const buildStructuredData = (data: object[]) => (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      key="item-jsonld"
    />
  );
  const structuredElement = buildStructuredData(structuredData);
  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
      {metaElements}
      {structuredElement}
    </Head>
  );
};

const HeadRP = () => {
  const [metadata, setMetaData] = useState(null);
  const { asPath } = useRouter();
  const metaPathStr = asPath.split('/').slice(1, -1).join('/');
  const metaPath = metaPathStr === '' ? 'default' : metaPathStr;

  useEffect(() => {
    fetchMetaConfig(metaPath).then((data) => {
      setMetaData(data);
    });
  }, [metaPath]);

  return <div>{metadata && <MetaData {...metadata} />}</div>;
};

export default HeadRP;
