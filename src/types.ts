interface navData {
  isActive: boolean;
  relLink: string;
  name: string;
}

interface aboutData {
  description: string;
  name: string;
  dates: string;
  logo: string;
  link: string;
}

export type NavBlockType = {
  navData: navData;
};

export type AboutBlockType = {
  block: aboutData;
};
