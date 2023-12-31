import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import fetchConfig from '../lib/configs';
import { useMobile } from '../hooks/useMobile';

const NavItems = ({ navData, isMobile }) => {
  const router = useRouter();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const styles = {
    default: {
      default:
        'bg-red-500 text-2xl text-white text-center h-full px-6 inline-block hover:bg-black font-oswald',
      active:
        'bg-white text-2xl text-black text-center h-full px-6 inline-block hover:bg-black hover:text-white font-oswald',
    },
    mobile: {
      default: 'bg-red-500 text-2xl text-white h-full px-12 w-1/2 font-oswald',
      active: 'bg-red-500 text-2xl text-black h-full px-12 w-1/2 font-oswald',
    },
  };

  const elements = navData.map((navDataItem, index) => {
    const style = isMobile ? styles.mobile : styles.default;
    if (navDataItem.isActive === true) {
      const isActive = router.pathname === navDataItem.relLink;
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
            <div className="inline-block align-middle mx-2">
              {isMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
          </button>
          {isMenuOpen ? (
            <div className="block fixed w-full text-2xl bg-red-500">
              {elements.map((element, index) => (
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

const Nav = () => {
  const [navData, setNavData] = useState(null);
  const isMobile = useMobile();

  useEffect(() => {
    fetchConfig('nav_data').then((data) => {
      setNavData(data);
    });
  }, []);

  return (
    <div className="fixed bg-red-500 w-full top-24 h-9 block">
      {navData && <NavItems navData={navData} isMobile={isMobile} />}
    </div>
  );
};

export default Nav;
