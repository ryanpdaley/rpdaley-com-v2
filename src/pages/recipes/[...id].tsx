import { useRouter } from 'next/router';
import RecipesComponent from '../../components/Recipes/Recipes';

const Recipe = () => {
  const router = useRouter();
  const recipeId = router.query.id;
  return (
    <div className="h-full">
      <RecipesComponent id={recipeId} />
    </div>
  );
};

export default Recipe;
