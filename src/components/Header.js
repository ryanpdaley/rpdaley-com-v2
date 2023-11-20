import styled from 'styled-components';
import Link from 'next/link';
import Nav from './Nav';
import HeadRP from './HeadRP';

const HeaderStyles = styled.div`
  background: black;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0px;
  z-index: 10;
  height: 10vh;
  min-height: 100px;
`;

const Header = () => (
  <HeaderStyles>
    <HeadRP />
    <Link href="/" style={{ textDecoration: 'none' }}>
      <div className="logoWraper">
        <h1 className="thick-header-line uppercase logoBar white">
          RP Daley<span className="h1red">.</span>com
        </h1>
      </div>
    </Link>
    <Nav />
  </HeaderStyles>
);

export default Header;
