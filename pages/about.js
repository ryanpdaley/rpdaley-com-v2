import styled from 'styled-components';
import Link from 'next/link';
import { PropTypes } from 'prop-types';
import AboutBlock from '../components/AboutBlock';
import Page from '../components/Page';
import siteConfigs from '../configs/config.json';

const AboutBlockStyles = styled.div`
  background: green;
`;

const AboutBlocks = ({ aboutData }) => (
  <AboutBlockStyles>
    {aboutData.map((data) => (
      <AboutBlock key={data.link} block={data} />
    ))}
  </AboutBlockStyles>
);

const About = () => (
  <Page>
    <div className="page_body">
      <div className="page_subHeading">Work</div>
      <AboutBlocks aboutData={siteConfigs.work_data} />
      <div className="page_subHeading">Education</div>
      <AboutBlocks aboutData={siteConfigs.school_data} />
    </div>
    <div className="resumeLink">
      <Link href="/link/resume">Link to Resume</Link>
    </div>
  </Page>
);

AboutBlocks.propTypes = {
  aboutData: PropTypes.array,
};

export default About;
