import siteConfigs from '../configs/config.json';
import { event } from '../lib/gtag';

const captureClick = (info) => {
  event('click', 'Link Out', info.name, info.link);
};

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
      <img src={data.logo} alt={data.name} className="social_logo" />
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
