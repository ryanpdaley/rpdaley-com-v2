import styled from 'styled-components';
import Image from 'next/image';
import Page from '../../components/Page';
import resumeThumb from '../../public/images/resumeThumb.png';
import { captureClick } from '../../lib/rtools';

const ImageStyle = styled.a`
  width: 50vw;
  display: block;
  margin: 2vh auto 0;
`;

const ResumeInfo = styled.div`
  padding-top: 5vh;
  font-size: 2rem;
`;

export default function Resume() {
  const clickInfo = {
    name: 'resume_download',
    link: '/static/rpdaley_resume_2023.pdf',
  };
  return (
    <Page>
      <ResumeInfo>Link to most recent resume:</ResumeInfo>
      <ImageStyle
        href={clickInfo.link}
        alt="Link to Current Resume"
        target="_blank"
        onClick={() => {
          captureClick(clickInfo);
        }}
        rel="noreferrer"
      >
        <Image
          src={resumeThumb.src}
          width={600}
          height={776}
          alt="Link to Current Resume"
        />
      </ImageStyle>
    </Page>
  );
}
