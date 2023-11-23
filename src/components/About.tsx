import Image from "next/image";
import styled from "styled-components";
import { captureClick } from "../lib/rtools";
import { AboutBlockType } from "../types";
import fetchConfig from "../lib/configs";
import { useEffect, useState } from "react";

const StyledHR = styled.hr`
  width: 70%;
  margin: 20px auto;
`;

const Description = ({ data }) => {
  const descriptionBlock = [];
  for (let i = 0; i < data.length; i += 1) {
    descriptionBlock.push(
      <div className="aboutBlockWrapper" key={i}>
        <div className="roleTitle">{data[i].title}</div>
        <div className="roleDescription">
          {data[i].info.map((roleParagraphs, j) => (
            <div key={j}>{roleParagraphs}</div>
          ))}
        </div>
        <div className="roleLocation">- Location: {data[i].location}</div>
      </div>
    );
    if (data.length > 1 && i !== data.length - 1) {
      descriptionBlock.push(<StyledHR key={`hr_${i}`} />);
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
      return (
        <>
          <div className="aboutBlockItem" key={index}>
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
                <div className="aboutDate">{dates}</div>
              </div>
              <Description data={description} />
            </div>
          </div>
        </>
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
          <h2 className="page_subHeading">{aboutData.title}</h2>
          <AboutBlock aboutData={aboutData} />
        </>
      )}
    </>
  )
}

export default AboutComponent;
