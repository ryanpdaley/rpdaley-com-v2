import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import fetchConfig from '../lib/configs';

const NavBlock = ({ navData }) => {
  const router = useRouter();
  return navData.map((navDataItem, index) => {
    if (navDataItem.isActive === true) {
      const isActive = router.pathname === navDataItem.relLink;
      return (
        <Link
          key={index}
          href={navDataItem.relLink}
          className={
            isActive
              ? 'bg-white text-2xl text-black text-center h-full px-6 inline-block hover:bg-black hover:text-white'
              : 'bg-red-500 text-2xl text-white text-center h-full px-6 inline-block hover:bg-black'
          }
        >
          {navDataItem.name}
        </Link>
      );
    }
    return <></>;
  });
};

const Nav = () => {
  const [navData, setNavData] = useState(null);

  useEffect(() => {
    fetchConfig('nav_data').then((data) => {
      setNavData(data);
    });
  }, []);

  return (
    <div className="fixed bg-red-500 w-full top-24 h-9 block">
      {navData && <NavBlock navData={navData} />}
    </div>
  );
};

export default Nav;
