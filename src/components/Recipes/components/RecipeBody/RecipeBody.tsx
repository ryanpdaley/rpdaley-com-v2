import RecipeDirections from './components/RecipeDirections';
import RecipeIngredients from './components/RecipeIngredients';

const RecipeBody = ({
  recipeDirections,
  recipeIngredients,
  checkedItems,
  setCheckedItems,
}) => (
  <div className="md:flex md:flex-row md:gap-4">
    <div className="md:basis-1/3">
      <RecipeIngredients
        recipeIngredients={recipeIngredients}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
      />
    </div>
    <div className="md:basis-2/3">
      <RecipeDirections recipeDirections={recipeDirections} />
    </div>
  </div>
);
export default RecipeBody;
