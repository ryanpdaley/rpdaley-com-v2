import Image from 'next/image';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const StyledHR = styled.hr`
  width: 70%;
  margin: 20px auto;
`;

const Description = ({ data }) => {
  const descriptionBlock = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < data.length; i++) {
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

const AboutBlock = ({ block }) => {
  const { description, name, dates, logo, link } = block;
  return (
    <div className="aboutBlockItem">
      <div className="aboutBlockLogo">
        <a href={link} target="_blank" rel="noreferrer">
          <Image src={logo} layout="responsive" height={200} width={200} />
        </a>
      </div>
      <div className="aboutBlockInfo">
        <div className="aboutHeader">
          <div className="aboutName">{name}</div>
          <div className="aboutDate">{dates}</div>
        </div>
        <Description data={description} />
      </div>
    </div>
  );
};

AboutBlock.propTypes = {
  block: PropTypes.object,
};

export default AboutBlock;
