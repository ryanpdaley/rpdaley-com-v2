import AboutComponent from "../components/About";
import Page from "../components/Page";

const About = () => (
  <Page>
    <div className="aboutBody">
      <AboutComponent section="work_data" />
      <AboutComponent section="school_data" />
      <AboutComponent section="extras_data" />
    </div>
  </Page>
);

export default About;
