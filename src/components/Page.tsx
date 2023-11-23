import { PropTypes } from "prop-types";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

const BodyStyle = styled.div`
  position: relative;
  margin: 130px auto 30px;
  font-family: Nunito, sans-serif;
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
