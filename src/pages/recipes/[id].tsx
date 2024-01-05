import RecipeComponent from '../../components/Recipes/Recipe';

export default function Recipe(props) {
  return (
    <div className="h-full">
      <RecipeComponent data={props} />
    </div>
  );
}

export async function getStaticPaths() {
  const result = await fetch('https://rpdaley.com/configs/recipes/root.json');
  const routes = await result.json();
  const paths = routes.map((element) => ({
    params: { id: element.route.toString() },
  }));
  return { paths, fallback: false };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({ params }) {
  return {
    props: { recipeId: params.id },
  };
}
