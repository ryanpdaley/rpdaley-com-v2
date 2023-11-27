import Image from "next/image";
import { captureClick } from "../lib/rtools";
import fetchConfig from "../lib/configs";
import { useEffect, useState } from "react";
import IconString from "../lib/icons"
import { FaHome } from "react-icons/fa";
import { ImOffice } from "react-icons/im";

// const StyledHR = styled.hr`
//   width: 70%;
//   margin: 20px auto;
// `;

const flagMap = {
  canada: '🇨🇦',
  usa: '🇺🇸'
}

const parseDate = (dates) => {
  if (dates.length === 1) {
    return dates[0];
  } else if (dates.length === 2) {
    let sorted = dates.sort();
    return `${sorted[0]} - ${sorted[1]}`;
  } else {
    return []
  }
}

const parseLocation = (location) => {
  let Icon = ImOffice;
  if (location.isRemote) {
    Icon = FaHome;
  }

  return (
    <div className="block">
      <div className='inline-block'>
        <Icon />
      </div>
      <div className='inline-block'>
        <span className='location'>{location.isRemote ? 'Remote: ' : ''}{location.city}, {location.provState} - {flagMap[location.country.toLowerCase()]}</span>
      </div>
    </div>
  )
}

const Description = ({ data }) => {
  const descriptionBlock = [];
  for (let i = 0; i < data.length; i += 1) {
    const parsedLocation = parseLocation(data[i].location);
    descriptionBlock.push(
      <div className="aboutBlockWrapper" key={i}>
        <div className="roleTitle">{data[i].title}</div>
        <div className="roleDescription">
          {data[i].info.map((roleParagraphs, j) => (
            <div key={j}>{roleParagraphs}</div>
          ))}
        </div>
        <div className="roleLocation">- Location: {parsedLocation}</div>
        <IconString data={data[i].technologies} />
      </div>
    );
    if (data.length > 1 && i !== data.length - 1) {
      descriptionBlock.push(<hr className='w-3/4 my-2 mx-auto' key={`hr_${i}`} />);
    }
  }
  return descriptionBlock;
};

const AboutBlock = ({ aboutData }) => {
  const { data } = aboutData;
  return (
    data.map((block, index) => {
      const { description, name, dates, logo, link } = block;
      const clickInfo = { name, link };
      const parsedDates = parseDate(dates);
      return (
        <div key={index}>
          <div className="aboutBlockItem">
            <div className="aboutBlockLogo">
              <a
                href={link}
                target="_blank"
                onClick={() => {
                  captureClick(clickInfo);
                }}
                rel="noreferrer"
              >
                <Image src={logo} alt={name} height={150} width={150} />
              </a>
            </div>
            <div className="aboutBlockInfo">
              <div className="aboutHeader">
                <div className="aboutName">
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
                <div className="aboutDate">{parsedDates}</div>
              </div>
              <Description data={description} />
            </div>
          </div>
        </div>
      );
    })
  )
};

const AboutComponent = ({ section }) => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetchConfig(section).then((data) => {
      setAboutData(data);
    });
  }, [section]);

  return (
    <>
      {aboutData && (
        <>
          <h2 className='text-3xl py-0 px-2 border-b-4 border-zinc-600 w-2/6'>{aboutData.title}</h2>
          <AboutBlock aboutData={aboutData} />
        </>
      )}
    </>
  )
}

export default AboutComponent;
