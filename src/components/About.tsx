import Image from 'next/image';
import { useEffect, useState } from 'react';
import router from 'next/router';
import { captureClick } from '../lib/rtools';
import fetchConfig from '../lib/configs';
import IconString from '../lib/icons';
import { useMobile } from '../hooks/useMobile';

const flagMap = {
  canada: '🇨🇦',
  usa: '🇺🇸',
};

const parseDate = (dates) => {
  if (dates.length === 1) {
    return dates[0];
  }
  if (dates.length === 2) {
    const sorted = dates.sort();
    if (sorted[0] === 0) {
      return `In progress (${sorted[1]})`;
    }
    return `${sorted[0]} - ${sorted[1]}`;
  }
  return [];
};

const parseLocation = (location) => {
  const countryIcon = (
    <div className="inline-block px-1">
      {flagMap[location.country.toLowerCase()]}
    </div>
  );

  return (
    <div className="block">
      <span className="inline-block font-bold">Location: </span>
      <div className="inline-block">
        <span>
          {countryIcon}
          {location.city}, {location.provState}{' '}
        </span>
      </div>
      {location.isRemote && (
        <span className="inline-block pl-1"> (Remote)</span>
      )}
    </div>
  );
};

const parseData = (dataList) =>
  dataList.map((dataListItem, index) => {
    switch (dataListItem.type) {
      case 'list-item':
        return <div key={index}>• {dataListItem.message}</div>;
      case 'indent':
        return (
          <div key={index} className="pl-10">
            - {dataListItem.message}
          </div>
        );
      case 'technologies':
        return (
          <div key={index}>
            <span className="font-bold">Technologies: </span>
            {dataListItem.message}
          </div>
        );
      default:
        return <div key={index}>{dataListItem.message}</div>;
    }
  });

const DescriptionBlock = ({ data }) =>
  data.map((descriptionItem, index) => {
    const { title, dataList, technologies, location } = descriptionItem;
    const parsedLocation = parseLocation(location);
    const details = parseData(dataList);
    return (
      <div className="font-nunito" key={index}>
        {index !== 0 && (
          <hr className="w-3/4 my-2 mx-auto" key={`hr_${index}`} />
        )}
        <div className="text-3xl text-center break-words font-bold underline">
          {title}
        </div>
        {technologies.length > 0 && (
          <div className="text-lg text-center block">
            <span className="inline-block font-semibold">Technologies:</span>
            <div className="inline-block">
              <IconString data={technologies} />
            </div>
          </div>
        )}
        <div className="w-4/5 mx-auto">
          <div>{details}</div>
          <div className="roleLocation">{parsedLocation}</div>
        </div>
      </div>
    );
  });

const AboutBlock = ({
  aboutData,
  selectedBlock,
  setSelectedBlock,
  isMobileView,
  setSelectedInfo,
}) => {
  const { data } = aboutData;
  return data.map((block, index) => {
    const { description, name, dates, logo, link } = block;
    const clickInfo = { name, link };
    const parsedDates = parseDate(dates);
    const blockId = `about_${name.toLowerCase().replace(/\s/g, '')}`;
    const selected = selectedBlock === blockId;
    return (
      <div key={index} id={blockId}>
        {isMobileView ? (
          <div className="block">
            <div className={`items-center p-1 `}>
              <a
                className="z-5"
                href={`#${selectedBlock}_desc`}
                onClick={() => {
                  if (selected) {
                    setSelectedBlock(null);
                    setSelectedInfo(null);
                  } else {
                    setSelectedBlock(blockId);
                    setSelectedInfo({
                      blockId,
                      link,
                      clickInfo,
                      name,
                      parsedDates,
                      description,
                    });
                  }
                  captureClick(clickInfo);
                }}
              >
                <Image
                  src={logo}
                  alt={name}
                  height={150}
                  width={150}
                  className={`mx-auto border-2 rounded-lg ${
                    selected
                      ? 'bg-red-500 border-red-500'
                      : 'bg-black border-black hover:blur-sm'
                  } `}
                />
              </a>
            </div>
          </div>
        ) : (
          <div className="flex flex-row p-1 items-center border-2 rounded-lg border-zinc-600 my-1">
            <div className="basis-1/5">
              <a
                href={link}
                target="_blank"
                onClick={() => {
                  captureClick(clickInfo);
                }}
                rel="noreferrer"
                className="hover:blur-sm px-1"
              >
                <Image
                  src={logo}
                  alt={name}
                  height={150}
                  width={150}
                  className="mx-auto border-2 rounded-lg border-black bg-black hover:rotate-12 px-1"
                />
              </a>
            </div>
            <div className="basis-4/5 px-10 py-2">
              <div className="w-full inline-block border-b-2">
                <div className="float-left font-oswald text-4xl">
                  <a
                    href={link}
                    target="_blank"
                    onClick={() => {
                      captureClick(clickInfo);
                    }}
                    rel="noreferrer"
                  >
                    {name}
                  </a>
                </div>
                <div className="float-right font-oswald text-4xl">
                  {parsedDates}
                </div>
              </div>
              <DescriptionBlock data={description} />
            </div>
          </div>
        )}
      </div>
    );
  });
};

const AboutComponent = ({ section, selectedBlock, setSelectedBlock }) => {
  const [aboutData, setAboutData] = useState(null);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const isMobile = useMobile();

  useEffect(() => {
    fetchConfig(section).then((data) => {
      setAboutData(data);
    });
  }, [section]);

  useEffect(() => {
    if (!isMobile) {
      router.replace('/about', undefined, { shallow: true });
    }
  }, [isMobile]);

  return (
    <div>
      {aboutData && (
        <div className="max-w-screen-lg mx-auto">
          <h2 className="text-3xl md:text-5xl py-2  my-4 px-4 border-b-4 border-red-500 w-2/6 font-oswald">
            {aboutData.title}
          </h2>
          <div className="block">
            <div className="flex flex-row flex-wrap justify-center md:block">
              <AboutBlock
                aboutData={aboutData}
                selectedBlock={selectedBlock}
                setSelectedBlock={setSelectedBlock}
                setSelectedInfo={setSelectedInfo}
                isMobileView={isMobile}
              />
            </div>
          </div>
          <div className="block">
            {isMobile &&
            selectedInfo !== null &&
            selectedInfo.blockId === selectedBlock ? (
              <div className="-z-10">
                <div
                  className="w-full -mt-32 pt-32 pb-2"
                  id={`${selectedBlock}_desc`}
                >
                  <div className="w-full inline-block border-b-2">
                    <div className="float-left font-oswald text-4xl">
                      <a
                        href={selectedInfo.link}
                        target="_blank"
                        onClick={() => {
                          captureClick(selectedInfo.clickInfo);
                        }}
                        rel="noreferrer"
                      >
                        {selectedInfo.name}
                      </a>
                    </div>
                    <div className="float-right font-oswald text-4xl">
                      {selectedInfo.parsedDates}
                    </div>
                  </div>
                  <DescriptionBlock data={selectedInfo.description} />
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutComponent;
