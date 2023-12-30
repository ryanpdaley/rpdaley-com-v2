const RecipeDirections = ({ recipeDirections }) => (
  <div className="block">
    <div className="text-xl ml-2 font-medium underline decoration-double font-oswald">
      Directions:
    </div>
    <ul className="list-decimal list-inside pl-10">
      {recipeDirections.map((direction, index) => (
        <li key={index} className="-indent-8 px-8">
          {direction}
        </li>
      ))}
    </ul>
  </div>
);
export default RecipeDirections;
