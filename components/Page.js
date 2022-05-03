import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';

const BodyStyle = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 10vh auto;
`;

const Page = ({ children }) => (
  <div>
    <Header />
    <BodyStyle>{children}</BodyStyle>
    <Footer />
  </div>
);

Page.propTypes = {
  children: PropTypes.any,
};

export default Page;
