import Link from 'next/link';
import { useEffect, useState } from 'react';

const RECIPE_ROOT_CONFIG = 'https://rpdaley.com/configs/recipes/root.json';
const RecipeListView = ({ recipeListData }) => (
  <div>
    {recipeListData.map((element, index) => {
      const link = `recipes/${element.route}`;
      return (
        <div key={index}>
          <Link href={link}>{element.title}</Link>
        </div>
      );
    })}
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
