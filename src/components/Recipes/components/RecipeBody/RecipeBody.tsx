import { Dispatch, SetStateAction } from 'react';
import { IngredientSection } from '../../types';
import RecipeDirections from './components/RecipeDirections';
import RecipeIngredients from './components/RecipeIngredients';

type RecipeBodyType = {
  recipeDirections: string[];
  recipeIngredients: IngredientSection[];
  checkedItems: string[];
  setCheckedItems: Dispatch<SetStateAction<string[]>>;
};

const RecipeBody = ({
  recipeDirections,
  recipeIngredients,
  checkedItems,
  setCheckedItems,
}: RecipeBodyType) => (
  <div className="md:flex md:flex-row md:gap-4 divide-y-2 divide-dotted md:divide-x-2 md:divide-y-0">
    <div className="md:basis-1/3 pb-2">
      <RecipeIngredients
        recipeIngredients={recipeIngredients}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
      />
    </div>
    <div className="md:basis-2/3 pb-2">
      <RecipeDirections recipeDirections={recipeDirections} />
    </div>
  </div>
);
export default RecipeBody;
