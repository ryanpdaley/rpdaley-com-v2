import { useEffect, useState } from 'react';
import AboutComponent from '../components/About';

const About = () => {
  const mobileBreak = 768;
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [selectedBlock, setSelectedBlock] = useState(null);

  function handleWindowSizeChange() {
    const windowWidth = window.innerWidth;
    if (windowWidth < mobileBreak) {
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
    }
  }
  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return (
    <div className="aboutBody">
      <AboutComponent
        section="work_data"
        selectedBlock={selectedBlock}
        setSelectedBlock={setSelectedBlock}
        isMobileView={isMobileView}
      />
      <AboutComponent
        section="school_data"
        selectedBlock={selectedBlock}
        setSelectedBlock={setSelectedBlock}
        isMobileView={isMobileView}
      />
      <AboutComponent
        section="extras_data"
        selectedBlock={selectedBlock}
        setSelectedBlock={setSelectedBlock}
        isMobileView={isMobileView}
      />
    </div>
  );
};

export default About;
