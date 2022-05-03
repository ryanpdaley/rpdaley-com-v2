import styled from 'styled-components';
import Nav from './Nav';
import HeadRP from './HeadRP';

const HeaderStyles = styled.div`
  background: purple;
  height: 10vh;
  min-height: 100px;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0px;
  z-index: 10;
`;

const LogoBar = styled.div`
  background: red;
  height: 7vh;
  min-height: 70px;
`;

const Header = () => (
  <HeaderStyles>
    <HeadRP />
    <LogoBar>RP Daley</LogoBar>
    <Nav />
  </HeaderStyles>
);

export default Header;
