import Link from 'next/link';
import { useEffect, useState } from 'react';

const RECIPE_ROOT_CONFIG = `/configs/recipes/root.json`;
type RecipeListType = {
  title: string;
  src: string;
  route: string;
}[];

const RecipeListView = (recipeListData: RecipeListType) => {
  const recipeList = Object.values(recipeListData);
  const sortedRecipeList = recipeList.sort((a, b) =>
    a.title > b.title ? 1 : -1,
  );
  return (
    <div>
      <div className="text-3xl inline-block align-middle font-oswald">
        Recipes:
      </div>
      <ul className="list-disc list-inside pl-10">
        {sortedRecipeList.map((element, index) => {
          const link = `recipes/${element.route}`;
          return (
            <li key={index} className="-indent-8 px-8">
              <Link
                href={link}
                className="underline hover:text-red-500 hover:no-underline"
              >
                {element.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const RecipesList = () => {
  const [recipeListData, setRecipeListData] = useState(null);
  useEffect(() => {
    fetch(RECIPE_ROOT_CONFIG)
      .then((rootData) => rootData.json())
      .then((rootDataJson) => {
        setRecipeListData(rootDataJson);
      });
  }, []);
  return (
    <div className="flex justify-center items-center md:justify-start">
      {recipeListData && <RecipeListView {...recipeListData} />}
    </div>
  );
};
export default RecipesList;
