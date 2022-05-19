import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import captureClick from '../lib/rtools';

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
  const clickInfo = { name, link };
  return (
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
          <img src={logo} alt={name} height={150} width={150}></img>
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
  );
};

AboutBlock.propTypes = {
  block: PropTypes.object,
};

export default AboutBlock;
