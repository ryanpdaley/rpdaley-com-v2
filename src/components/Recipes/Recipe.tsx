import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';
import RecipeInfo from './components/RecipeInfo';
import RecipeBody from './components/RecipeBody/RecipeBody';

const RECIPE_ROOT_DIR = 'https://rpdaley.com/configs/recipes/items';

const RecipeView = ({ recipeData, checkedItems, setCheckedItems }) => (
  <div className="block">
    <div className="py-2">
      <Link className="text-4xl inline-block align-middle" href="/recipes">
        <IoArrowBack />
      </Link>
      <div className="text-3xl inline-block align-middle">
        {recipeData.info.title}
      </div>
    </div>

    <div className="border-solid border-2">
      <RecipeInfo recipeInfo={recipeData.info} />
      <RecipeBody
        recipeDirections={recipeData.directions}
        recipeIngredients={recipeData.ingredients}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
      />
    </div>
  </div>
);

const RecipeComponent = ({ id }) => {
  const [recipeData, setRecipeData] = useState(null);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  useEffect(() => {
    fetch(`${RECIPE_ROOT_DIR}/${id}.json`)
      .then((rootData) => rootData.json())
      .then((rootDataJson) => {
        setRecipeData(rootDataJson);
      });
  }, [id]);
  return (
    <div>
      {recipeData && (
        <RecipeView
          recipeData={recipeData}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
        />
      )}
    </div>
  );
};
export default RecipeComponent;
