import Image from "next/image";
import siteConfigs from "../configs/config.json";
import { captureClick } from "../lib/rtools";

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

const Footer = () => (
  <div className="footer_body">
    <div className="social_block">
      <Social socialData={siteConfigs.footer_data} />
    </div>
  </div>
);

export default Footer;
