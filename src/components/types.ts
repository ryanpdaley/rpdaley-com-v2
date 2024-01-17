import { Dispatch, SetStateAction } from 'react';

export interface aboutLocation {
  isRemote: boolean;
  country: string;
  city: string;
  provState: string;
}

export interface DataListItem {
  type: 'list-item' | 'indent' | 'technologies';
  message: string;
}

export interface AboutDescription {
  dataList: DataListItem[];
  location: aboutLocation;
  technologies: string[];
  title: string;
}

export interface AboutItemData {
  name: string;
  dates: number[];
  logo: string;
  link: string;
  description: AboutDescription[];
}

export type AboutItems = {
  title: string;
  data: AboutItemData[];
};

export type AboutSelectedInfo = {
  blockId: string;
  clickInfo: {
    name: string;
    link: string;
  };
  description: AboutDescription[];
  link: string;
  name: string;
  parsedDates: string;
};

export type AboutDescriptionList = {
  data: AboutDescription[];
};

export type AboutComponentTypes = {
  section: string;
  selectedBlock: string;
  setSelectedBlock: Dispatch<SetStateAction<string>>;
};

export type AboutBlockTypes = {
  aboutData: string;
  selectedBlock: string;
  setSelectedBlock: Dispatch<SetStateAction<string>>;
  isMobileView: boolean;
  setSelectedInfo: Dispatch<SetStateAction<string>>;
};
