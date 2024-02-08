import Link from 'next/link';
import RecipeComponent from '../../components/Recipes/Recipe';
import { RecipeProps, RecipeRoute, RecipeRoutesList } from '../../types';

const fs = require('node:fs');

const LOCAL_ROOT_DIR =
  '/Users/rpd/github/rpdaley-com-v2/public/configs/recipes/root.json';

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
  const { recipeId, routes, darkMode } = props;
  const validIds = routes.map((recipe) => recipe.route);
  if (validIds.indexOf(recipeId) === -1) {
    return <ErrorView recipeId={recipeId} />;
  }
  return (
    <div className="h-full">
      <RecipeComponent data={props} darkMode={darkMode} />
    </div>
  );
}

export async function getStaticPaths() {
  const routes = JSON.parse(fs.readFileSync(LOCAL_ROOT_DIR, 'utf8'));
  const paths = routes.map((element: RecipeRoute) => ({
    params: { id: element.route.toString() },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const routes: RecipeRoutesList[] = JSON.parse(
    fs.readFileSync(LOCAL_ROOT_DIR, 'utf8')
  );
  return {
    props: { recipeId: params.id, routes },
  };
}
