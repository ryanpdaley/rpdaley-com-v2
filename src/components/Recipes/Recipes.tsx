import { useEffect, useState } from 'react';

const RECIPE_ROOT_DIR = 'https://rpdaley.com/configs/recipes/items';

const RecipeView = ({ recipeData }) => {
  console.log(recipeData);
  return <div>{`Recipe - ${recipeData.info.title}`}</div>;
};

const RecipesComponent = ({ id }) => {
  const [recipeData, setRecipeData] = useState(null);
  useEffect(() => {
    fetch(`${RECIPE_ROOT_DIR}/${id}.json`)
      .then((rootData) => rootData.json())
      .then((rootDataJson) => {
        setRecipeData(rootDataJson);
      });
  }, [id]);
  return <div>{recipeData && <RecipeView recipeData={recipeData} />}</div>;
};
export default RecipesComponent;
