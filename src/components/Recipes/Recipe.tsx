import { useState } from 'react';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';
import RecipeInfo from './components/RecipeInfo';
import RecipeBody from './components/RecipeBody/RecipeBody';

const RecipeView = ({ recipeData, checkedItems, setCheckedItems }) => {
  const recipe = recipeData.data;
  return (
    <div className="block pb-2">
      <div className="py-2">
        <Link className="text-4xl inline-block align-middle" href="/recipes">
          <div className="border-solid border-2 rounded-md mx-2">
            <IoArrowBack />
          </div>
        </Link>
        <div className="text-3xl inline-block align-middle font-oswald">
          {recipe.info.title}
        </div>
      </div>

      <div className="md:border-solid md:border-2">
        <RecipeInfo recipeInfo={recipe.info} />
        <RecipeBody
          recipeDirections={recipe.directions}
          recipeIngredients={recipe.ingredients}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
        />
      </div>
    </div>
  );
};

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

const RecipeComponent = ({ data }) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  return (
    <div className="max-w-screen-xl mx-auto">
      {data && (
        <RecipeView
          recipeData={data}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
        />
      )}
    </div>
  );
};
export default RecipeComponent;
