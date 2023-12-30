interface Ingredient {
  name: string;
  measurement?: null | number[] | number;
  measurementUnit?: null | string;
  qualifierString?: null | string;
  isConvertibleUnit?: boolean;
  isOptional?: boolean;
}

interface RecipeInfo {
  title: string;
  makes?: null | string;
  prepTime?: null | { value: number; unit: 'hours' | 'minutes' | 'seconds' };
  cookTime?: null | { value: number; unit: 'hours' | 'minutes' | 'seconds' };
  description?: null | string;
  source?: null | { label: string; url: null | string };
}

interface IngredientSection {
  subHeading?: null | string;
  items: Ingredient[];
}

export interface fractionMap {
  [key: number]: number;
}

export type IngredientItem = Ingredient;

export type RecipeInfoProps = { recipeInfo: RecipeInfo };

export type RecipeIngredientsProps = {
  recipeIngredients: IngredientSection[];
  checkedItems: string[];
  setCheckedItems: (val: string[]) => void;
};

export type IngredientSectionProps = {
  ingredientSection: IngredientSection;
  checkedItems: string[];
  setCheckedItems: (val: string[]) => void;
};
