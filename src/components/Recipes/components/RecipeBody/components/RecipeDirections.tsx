const RecipeDirections = ({ recipeDirections }) => {
  console.log(recipeDirections);
  return (
    <div className="block">
      <div className="text-xl pl-2">Directions:</div>
      <ul className="list-decimal list-inside px-10">
        {recipeDirections.map((direction, index) => (
          <li key={index} className="-indent-8 px-8">
            {direction}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default RecipeDirections;
