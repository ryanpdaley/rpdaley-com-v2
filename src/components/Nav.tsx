import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import fetchConfig from "../lib/configs";
import { useEffect, useState } from "react";

const NavStyle = styled.nav`
  background-color: red;
  position: fixed;
  width: 100%;
  top: 100px;
`;

const NavBlock = ({ navData }) => {
  const router = useRouter();
  return navData.map((navDataItem, index) => {
    if (navDataItem.isActive === true) {
      const pageClassName =
        router.pathname === navDataItem.relLink ? "navItem_active" : "navItem";
      return (
        <Link key={index} href={navDataItem.relLink} className={pageClassName}>
          {navDataItem.name}
        </Link>
      );
    }
  });
};

const Nav = () => {
  const [navData, setNavData] = useState(null);

  useEffect(() => {
    fetchConfig("nav_data").then((data) => {
      setNavData(data);
    });
  }, []);

  return <NavStyle>{navData && <NavBlock navData={navData} />}</NavStyle>;
};

export default Nav;
