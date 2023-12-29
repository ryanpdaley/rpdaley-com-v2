const RecipeDirections = ({ recipeDirections }) => {
  console.log(recipeDirections);
  return (
    <div className="block">
      <div>Directions</div>
      <ul className="list-decimal">
        {recipeDirections.map((direction, index) => (
          <li key={index}>{direction}</li>
        ))}
      </ul>
    </div>
  );
};
export default RecipeDirections;
