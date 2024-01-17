import Link from 'next/link';
import RecipeComponent from '../../components/Recipes/Recipe';
import { RecipeProps, RecipeRoutesList } from '../../types';

const RECIPE_ROOT_DIR = 'https://www.rpdaley.com/configs/recipes/root.json';

const ErrorView = ({ recipeId }) => (
  <div>
    <div className="text-4xl p-5">
      No &apos;{recipeId}&apos; Recipe Found.{' '}
      <Link className="underline" href="/recipes">
        Back to all recipes.
      </Link>
    </div>
  </div>
);

export default function Recipe(props: RecipeProps) {
  const { recipeId, routes } = props;
  const validIds = routes.map((recipe) => recipe.route);
  if (validIds.indexOf(recipeId) === -1) {
    return <ErrorView recipeId={recipeId} />;
  }
  return (
    <div className="h-full">
      <RecipeComponent data={props} />
    </div>
  );
}

export async function getStaticPaths() {
  const result = await fetch(RECIPE_ROOT_DIR);
  const routes = await result.json();
  const paths = routes.map((element) => ({
    params: { id: element.route.toString() },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const result = await fetch(RECIPE_ROOT_DIR);
  const routes: RecipeRoutesList[] = await result.json();
  return {
    props: { recipeId: params.id, routes },
  };
}
