import RecipeDirections from './components/RecipeDirections';
import RecipeIngredients from './components/RecipeIngredients';

const RecipeBody = ({
  recipeDirections,
  recipeIngredients,
  checkedItems,
  setCheckedItems,
}) => {
  console.log('RecipeBody');
  return (
    <div>
      <RecipeIngredients
        recipeIngredients={recipeIngredients}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
      />
      <RecipeDirections recipeDirections={recipeDirections} />
    </div>
  );
};
export default RecipeBody;
