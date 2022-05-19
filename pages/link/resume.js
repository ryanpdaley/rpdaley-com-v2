import styled from 'styled-components';
import Page from '../../components/Page';
import resumeThumb from '../../public/images/resumeThumb.png';

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
  console.log(resumeThumb);
  return (
    <Page>
      <ResumeInfo>Link to most recent resume:</ResumeInfo>
      <ImageStyle href="/static/rpdaleyResume.pdf" alt="Link to Current Resume">
        <img src={resumeThumb.src} alt="Link to Current Resume"></img>
      </ImageStyle>
    </Page>
  );
}
