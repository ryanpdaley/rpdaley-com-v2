import { useRouter } from 'next/router';
import RecipeComponent from '../../components/Recipes/Recipe';

const Recipe = () => {
  const router = useRouter();
  const recipeId = router.query.id;
  return (
    <div className="h-full">
      <RecipeComponent id={recipeId} />
    </div>
  );
};

export default Recipe;
