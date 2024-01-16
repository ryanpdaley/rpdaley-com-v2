import { useState } from 'react';
import AboutComponent from '../components/About';

const About = () => {
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);

  return (
    <div className="aboutBody">
      <AboutComponent
        section="work_data"
        selectedBlock={selectedBlock}
        setSelectedBlock={setSelectedBlock}
      />
      <AboutComponent
        section="school_data"
        selectedBlock={selectedBlock}
        setSelectedBlock={setSelectedBlock}
      />
      <AboutComponent
        section="extras_data"
        selectedBlock={selectedBlock}
        setSelectedBlock={setSelectedBlock}
      />
    </div>
  );
};

export default About;
