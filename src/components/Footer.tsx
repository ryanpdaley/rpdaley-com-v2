import Image from 'next/image';
import { useEffect, useState } from 'react';
import { RxMoon, RxSun } from 'react-icons/rx';
import { captureClick } from '../lib/rtools';
import { event as gaEvent } from '../lib/gtag';
import { fetchConfig } from '../lib/configs';

type FooterData = {
  name: string;
  link: string;
  logo: string;
};

const SocialItems = ({ socialData }) =>
  socialData.map((socialLink: FooterData) => (
    <div
      className="p-1 float-right h-10 rounded hover:bg-white align-middle"
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

const Footer = ({ darkMode, setDarkMode }) => {
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    fetchConfig('footer_data').then((data) => {
      setFooterData(data);
    });
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full h-14 bg-black block">
      <button
        type="button"
        className={`inline-block text-white text-3xl pt-3 pl-3 ${darkMode ? 'hover:text-yellow-500' : 'hover:text-blue-500'}`}
        onClick={() => {
          const newDarModeValue = !darkMode;
          setDarkMode(newDarModeValue);
          gaEvent({
            action: 'DarkMode Toggled',
            category: 'User Action',
            label: 'DarkMode',
            value: newDarModeValue ? 'light' : 'dark',
          });
        }}
      >
        {darkMode ? <RxSun /> : <RxMoon />}
      </button>
      <div className="inline-block pt-2 pr-2 float-right">
        <div className="block">
          {footerData && <SocialItems socialData={footerData} />}
        </div>
      </div>
    </div>
  );
};

export default Footer;
