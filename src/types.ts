import { StaticImageData } from 'next/image';

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

export type RecipeRoute = {
  title: string;
  src: string;
  route: string;
};

export type ResumeInfoType = {
  title: string;
  name: string;
  link: string;
  img: StaticImageData;
};

export type RecipeProps = {
  recipeId: string;
  routes: RecipeRoute[];
  darkMode: boolean;
};

export type RecipeRoutesList = {
  routes: RecipeRoute[];
};

export type NavBlockType = {
  navData: navData;
};

export type AboutBlockType = {
  block: aboutData;
};
