import Link from 'next/link';
import Nav from './Nav';
import HeadRP from './HeadRP';

const Header = () => (
  <div className='w-full bg-black fixed left-0 top-0 z-10 h-24'>
    <HeadRP />
    <div className="flex items-center">
      <div className="hidden md:block py-1 content-none grow bg-white mx-10 max-w-sm"></div>
      <Link href="/" style={{ textDecoration: 'none' }} className='py-6 grow'>
        <div className='text-white text-4xl text-center whitespace-nowrap font-sans font-thin uppercase tracking-widest md:text-5xl'>
          <h1>RP DALEY<span className='text-red-500'>.</span>COM</h1></div>
      </Link>
      <div className="hidden md:block py-1 content-none grow bg-white mx-10 max-w-sm"></div>
    </div>
    <Nav />
  </div >
);

export default Header;
