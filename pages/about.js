import styled from 'styled-components';
import Link from 'next/link';
import { PropTypes } from 'prop-types';
import AboutBlock from '../components/AboutBlock';
import Page from '../components/Page';
import siteConfigs from '../configs/config.json';

const AboutBlockStyles = styled.div`
  /* background: green; */
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
    <div className="aboutBody">
      <h2 className="page_subHeading">Work</h2>
      <AboutBlocks aboutData={siteConfigs.work_data} />
      <h2 className="page_subHeading">Education</h2>
      <AboutBlocks aboutData={siteConfigs.school_data} />
      <h2 className="page_subHeading">Courses</h2>
      <AboutBlocks aboutData={siteConfigs.extras_data} />
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
