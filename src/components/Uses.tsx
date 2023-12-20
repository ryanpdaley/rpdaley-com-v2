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
          className="font-oswald text-lg px-5 hover:text-red-500"
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
      <div className="font-nunito px-10">&#8669; {item.itemDescription}</div>
    </li>
  );
};

const UsesSection = ({ usesData, affiliateLinks }) => (
  <div>
    <h2 className="text-2xl py-2  my-4 px-4 border-b-4 border-red-500 w-1/6 font-oswald">
      {usesData.section}
    </h2>
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
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-5xl py-2  my-4 px-4 border-b-4 border-red-500 w-2/6 font-oswald">
        Things I use:
      </h1>
      <div className="px-10 font-nunito text-xl">
        <p>
          Random list of things I use... See{' '}
          <a
            href="https://uses.tech/"
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              captureClick(clickInfo);
            }}
            className="hover:text-red-500"
          >
            uses.tech
          </a>{' '}
          for more info.
        </p>
      </div>
      {usesData.map((item, i) => (
        <UsesSection
          usesData={item}
          affiliateLinks={useAffiliateLinks}
          key={i}
        />
      ))}
      <hr />
      <div className="p-5 block font-lato font-bold">
        <span className="inline-block">This page was last updated:</span>
        <span className="inline-block text-red-500">{lastUpdated}</span>
      </div>
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

  return <div>{usesPageData && <UsesBlock usesPageData={usesPageData} />}</div>;
};

export default UsesComponent;
