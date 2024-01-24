import { Dispatch, SetStateAction } from 'react';

interface Ingredient {
  name: string;
  measurement?: null | number[] | number;
  measurementUnit?: null | string;
  qualifierString?: null | string;
  isConvertibleUnit?: boolean;
  isOptional?: boolean;
}

export type RecipeInfo = {
  title: string;
  makes?: null | string;
  prepTime?: null | { value: number; unit: 'hours' | 'minutes' | 'seconds' };
  cookTime?: null | { value: number; unit: 'hours' | 'minutes' | 'seconds' };
  description?: null | string;
  source?: null | {
    isModified?: boolean;
    label: string;
    url: null | string;
  };
};

export type IngredientSection = {
  subHeading?: null | string;
  items: Ingredient[];
};

export interface fractionMap {
  [key: number]: number;
}

export type IngredientItem = Ingredient;

export type RecipeInfoProps = { recipeInfo: RecipeInfo };

export type RecipeIngredientsProps = {
  recipeIngredients: IngredientSection[];
  checkedItems: string[];
  setCheckedItems: SetCheckedItems;
};

export type IngredientSectionProps = {
  ingredientSection: IngredientSection;
  checkedItems: string[];
  setCheckedItems: SetCheckedItems;
};

export type StructuredDataType = {
  '@context': string;
  '@type': string;
  name: string;
  author: { '@type': 'Person'; name: string };
  description: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  recipeIngredient: string[];
  recipeInstructions: {
    '@type': 'HowToStep';
    text: string;
  }[];
};

export type RecipeDataType = {
  info: RecipeInfo;
  ingredients: IngredientSection[];
  directions: string[];
  structuredData: StructuredDataType;
};

export type SetCheckedItems = Dispatch<SetStateAction<string[]>>;

type RecipeDirections = string[];

export type RecipeBodyType = {
  recipeDirections: RecipeDirections;
  recipeIngredients: IngredientSection[];
  checkedItems: string[];
  setCheckedItems: SetCheckedItems;
};
