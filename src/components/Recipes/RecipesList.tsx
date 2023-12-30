import Link from 'next/link';
import { useEffect, useState } from 'react';

const RECIPE_ROOT_CONFIG = 'https://rpdaley.com/configs/recipes/root.json';

const RecipeListView = ({ recipeListData }) => (
  <div>
    <div className="text-3xl inline-block align-middle font-oswald">
      Recipes:
    </div>
    <ul className="list-disc list-inside pl-10">
      {recipeListData.map((element, index) => {
        const link = `recipes/${element.route}`;
        return (
          <li key={index} className="-indent-8 px-8">
            <Link href={link} className="hover:text-red-500">
              {element.title}
            </Link>
          </li>
        );
      })}
    </ul>
  </div>
);

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
    <div>
      {recipeListData && <RecipeListView recipeListData={recipeListData} />}
    </div>
  );
};
export default RecipesList;
