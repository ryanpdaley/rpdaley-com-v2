import Link from 'next/link';
import styled from 'styled-components';

const NavStyle = styled.nav`
  background-color: red;
`;

const Nav = () => (
  <NavStyle>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/about">
      <a>About</a>
    </Link>
    <Link href="/contact">
      <a>Contact</a>
    </Link>
    <Link href="/ideas">
      <a>Ideas</a>
    </Link>
  </NavStyle>
);

export default Nav;
