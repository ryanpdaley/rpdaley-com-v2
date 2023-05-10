import Link from "next/link";
import { PropTypes } from "prop-types";
import styled from "styled-components";
import { useRouter } from "next/router";
import siteConfigs from "../configs/config.json";

const NavStyle = styled.nav`
  background-color: red;
  position: fixed;
  width: 100%;
  top: 100px;
`;

const NavBlock = ({ navData }) => {
  const router = useRouter();
  if (navData.isActive === true) {
    const pageClassName =
      router.pathname === navData.relLink ? "navItem_active" : "navItem";
    return (
      <Link href={navData.relLink} className={pageClassName}>
        {navData.name}
      </Link>
    );
  }
};

const Nav = () => (
  <NavStyle>
    {siteConfigs.nav_data.map((navItem) => (
      <NavBlock key={navItem.name} navData={navItem} />
    ))}
  </NavStyle>
);

NavBlock.propTypes = {
  navData: PropTypes.object,
};

export default Nav;
