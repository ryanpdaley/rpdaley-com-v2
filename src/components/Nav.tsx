import Link from 'next/link';
import { useRouter } from 'next/router';
import { Key, ReactElement, useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { fetchConfig } from '../lib/configs';
import { useMobile } from '../hooks/useMobile';

type NavData = {
  name: string;
  relLink: string;
  isActive: boolean;
};

const NavItems = ({ navData, isMobile, darkMode }) => {
  const router = useRouter();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const styles = {
    default: {
      default: `${darkMode ? 'hover:bg-white hover:text-black' : 'hover:bg-black'} text-white bg-red-500 text-2xl text-center h-full px-6 inline-block  font-oswald`,
      active: `${darkMode ? 'bg-black text-white hover:bg-white hover:text-black' : 'bg-white text-black hover:bg-black hover:text-white'}  text-2xl  text-center h-full px-6 inline-block font-oswald`,
    },
    mobile: {
      default: 'bg-red-500 text-2xl text-white h-full px-12 w-1/2 font-oswald',
      active: 'bg-red-500 text-2xl text-black h-full px-12 w-1/2 font-oswald',
    },
  };

  const elements = navData.map((navDataItem: NavData, index: Key) => {
    const style = isMobile ? styles.mobile : styles.default;
    // This will probably break if more nav items contain deeper paths
    const navPath =
      router.pathname.split('/')[1] === 'link'
        ? router.pathname
        : `/${router.pathname.split('/')[1]}`;
    if (navDataItem.isActive === true) {
      const isActive = navPath === navDataItem.relLink;
      return (
        <Link
          key={index}
          href={navDataItem.relLink}
          className={isActive ? style.active : style.default}
          onClick={() => setMenuOpen(false)}
        >
          {navDataItem.name}
        </Link>
      );
    }
    return '';
  });

  return (
    <div className="h-full">
      {isMobile ? (
        <div>
          <button
            className="bg-red-500 text-2xl text-white text-center h-full px-6 inline-block font-oswald"
            onClick={() => setMenuOpen(!isMenuOpen)}
            tabIndex={0}
            type="button"
          >
            <div className="inline-block">Navigation</div>
            <div
              className={`inline-block align-middle mx-2 duration-200 transition ${
                isMenuOpen ? 'rotate-180' : ''
              }`}
            >
              <FaChevronDown />
            </div>
          </button>
          {isMenuOpen ? (
            <div className="block fixed w-full text-2xl bg-red-500">
              {elements.map((element: null | ReactElement, index: Key) => (
                <div key={index}>{element}</div>
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        elements
      )}
    </div>
  );
};

const Nav = (darkMode) => {
  const [navData, setNavData] = useState<NavData | null>(null);
  const isMobile = useMobile();

  useEffect(() => {
    fetchConfig('nav_data').then((data) => {
      setNavData(data);
    });
  }, []);

  return (
    <div className="fixed bg-red-500 w-full top-24 h-9 block">
      <div
        className={
          isMobile ? 'h-full' : 'h-full flex justify-center items-center'
        }
      >
        {navData && (
          <NavItems navData={navData} isMobile={isMobile} {...darkMode} />
        )}
      </div>
    </div>
  );
};

export default Nav;
