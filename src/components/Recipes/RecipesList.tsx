import Link from 'next/link';
import { useEffect, useState } from 'react';

const RECIPE_ROOT_CONFIG = 'https://rpdaley.com/configs/recipes/root.json';
const RecipeListView = ({ recipeData }) => (
  <div>
    {recipeData.map((element, index) => {
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
  const [recipeData, setRecipeData] = useState(null);
  useEffect(() => {
    fetch(RECIPE_ROOT_CONFIG)
      .then((rootData) => rootData.json())
      .then((rootDataJson) => {
        setRecipeData(rootDataJson);
      });
  }, []);
  return <div>{recipeData && <RecipeListView recipeData={recipeData} />}</div>;
};
export default RecipesList;
