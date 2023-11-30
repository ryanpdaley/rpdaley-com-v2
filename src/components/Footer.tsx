import Image from 'next/image';
import { useEffect, useState } from 'react';
import { captureClick } from '../lib/rtools';
import fetchConfig from '../lib/configs';

const SocialItems = ({ socialData }) =>
  socialData.map((socialLink) => (
    <div
      className="p-1 float-right h-full rounded hover:bg-white"
      key={socialLink.name}
    >
      <a
        href={socialLink.link}
        target="_blank"
        onClick={() => {
          captureClick(socialLink);
        }}
        rel="noreferrer"
      >
        <Image
          src={socialLink.logo}
          alt={socialLink.name}
          width={75}
          height={75}
          className="h-10 w-auto pb-2 hover:invert"
        />
      </a>
    </div>
  ));

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    fetchConfig('footer_data').then((data) => {
      setFooterData(data);
    });
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full h-12 bg-black">
      <div className="pt-2 pr-2 float-right block">
        {footerData && <SocialItems socialData={footerData} />}
      </div>
    </div>
  );
};

export default Footer;
