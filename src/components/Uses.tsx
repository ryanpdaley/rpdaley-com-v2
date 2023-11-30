import { useEffect, useState } from 'react';
import fetchConfig from '../lib/configs';
import { captureClick } from '../lib/rtools';

const UsesItem = ({ item, affiliateLinks }) => {
  let { itemLink, itemVersion } = item;
  if (affiliateLinks === true && item.aLink !== null) {
    itemLink = item.aLink;
  }
  if (itemVersion !== null) {
    itemVersion = ` (v${itemVersion})`;
  } else {
    itemVersion = '';
  }
  const clickInfo = { name: item.name, link: itemLink };
  return (
    <li>
      <span>
        <a
          className="usesSectionItem"
          href={itemLink}
          target="_blank"
          rel="noreferrer"
          onClick={() => {
            captureClick(clickInfo);
          }}
        >
          {item.itemName}
        </a>
        {itemVersion}
      </span>
      <div className="usesSectionDescription">
        &#8669; {item.itemDescription}
      </div>
    </li>
  );
};

const UsesSection = ({ usesData, affiliateLinks }) => (
  <div>
    <h2 className="usesSectionName">{usesData.section}</h2>
    <ul>
      {usesData.items.map((item, j) => (
        <UsesItem item={item} key={j} affiliateLinks={affiliateLinks} />
      ))}
    </ul>
  </div>
);

const UsesBlock = ({ usesPageData }) => {
  const clickInfo = { name: 'uses.tech', link: 'https://uses.tech/' };
  const { useAffiliateLinks, usesData, lastUpdated } = usesPageData;
  return (
    <div className="usesBody">
      <div className="usesBodyIntro">
        <h1 className="usesBodyIntroHeader">Things I use:</h1>
        <div className="usesBodyIntroBody">
          <p>
            Random list of things I use... See{' '}
            <a
              href="https://uses.tech/"
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                captureClick(clickInfo);
              }}
            >
              uses.tech
            </a>{' '}
            for more info.
          </p>
        </div>
      </div>
      {usesData.map((item, i) => (
        <UsesSection
          usesData={item}
          affiliateLinks={useAffiliateLinks}
          key={i}
        />
      ))}
      <hr />
      <span className="usesLastUpdated">
        This page was last updated: {lastUpdated}
      </span>
    </div>
  );
};

const UsesComponent = () => {
  const [usesPageData, setUsesPageData] = useState(null);

  useEffect(() => {
    fetchConfig('uses_data').then((data) => {
      setUsesPageData(data);
    });
  }, []);

  return <>{usesPageData && <UsesBlock usesPageData={usesPageData} />}</>;
};

export default UsesComponent;
