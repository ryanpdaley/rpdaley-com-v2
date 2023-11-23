import Image from "next/image";
import { captureClick } from "../lib/rtools";
import fetchConfig from "../lib/configs";
import { useEffect, useState } from "react";

const socialLink = (data) => (
  <div className="social_link" key={data.name}>
    <a
      href={data.link}
      target="_blank"
      onClick={() => {
        captureClick(data);
      }}
      rel="noreferrer"
    >
      <Image
        src={data.logo}
        alt={data.name}
        width={75}
        height={75}
        className="social_logo"
      />
    </a>
  </div>
);

const Social = ({ socialData }) => {
  const socialLinks = socialData.map(socialLink);
  return socialLinks;
};

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    fetchConfig("footer_data").then((data) => {
      setFooterData(data);
    });
  }, []);

  return (
    <div className="footer_body">
      <div className="social_block">
        {footerData && <Social socialData={footerData} />}
      </div>
    </div>
  )

};

export default Footer;
