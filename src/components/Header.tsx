import Link from 'next/link';
import Nav from './Nav';
import HeadRP from './HeadRP';

const Header = ({ darkMode }) => (
  <div className="w-full bg-black fixed left-0 top-0 z-10 h-24">
    <HeadRP />
    <div className="flex items-center">
      <div className="hidden md:block py-1 content-none grow bg-white mx-10 max-w-sm" />
      <Link href="/" style={{ textDecoration: 'none' }} className="py-6 grow">
        <div className="text-white text-4xl text-center whitespace-nowrap font-sans uppercase tracking-widest md:text-6xl font-oswald">
          <h1>
            RP DALEY<span className="text-red-500">.</span>COM
          </h1>
        </div>
      </Link>
      <div className="hidden md:block py-1 content-none grow bg-white mx-10 max-w-sm" />
    </div>
    <Nav darkMode={darkMode} />
  </div>
);

export default Header;
