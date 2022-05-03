import Link from 'next/link';

const Nav = () => (
  <nav>
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
  </nav>
);

export default Nav;
