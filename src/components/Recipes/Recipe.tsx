import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';
import RecipeInfo from './components/RecipeInfo';
import RecipeBody from './components/RecipeBody/RecipeBody';

const RECIPE_ROOT_DIR = 'https://rpdaley.com/configs/recipes/items';
const RECIPE_ROOT_CONFIG = 'https://rpdaley.com/configs/recipes/root.json';

const RecipeView = ({ recipeData, checkedItems, setCheckedItems }) => (
  <div className="block pb-2">
    <div className="py-2">
      <Link className="text-4xl inline-block align-middle" href="/recipes">
        <div className="border-solid border-2 rounded-md mx-2">
          <IoArrowBack />
        </div>
      </Link>
      <div className="text-3xl inline-block align-middle font-oswald">
        {recipeData.info.title}
      </div>
    </div>

    <div className="md:border-solid md:border-2">
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

const ErrorView = ({ id }) => (
  <div>
    <div className="text-4xl p-5">
      No &apos;{id}&apos; Recipe Found.{' '}
      <Link className="underline" href="/recipes">
        Back to all recipes.
      </Link>
    </div>
  </div>
);

const RecipeComponent = ({ id }) => {
  const [recipeData, setRecipeData] = useState(null);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  useEffect(() => {
    fetch(RECIPE_ROOT_CONFIG)
      .then((rootData) => rootData.json())
      .then((rootDataJson) => {
        rootDataJson.forEach((element) => {
          if (element.route === id[0]) {
            fetch(`${RECIPE_ROOT_DIR}/${element.route}.json`)
              .then((recipeFetchData) => recipeFetchData.json())
              .then((recipeFetchJson) => {
                setRecipeData(recipeFetchJson);
              });
          }
        });
      });
  }, [id]);

  return (
    <div className="max-w-screen-xl mx-auto">
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
