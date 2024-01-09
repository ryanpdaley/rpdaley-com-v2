import RecipeBody from './RecipeBody/RecipeBody';
import RecipeInfo from './RecipeInfo';

const RecipePrintView = ({ recipeData, checkedItems, setCheckedItems }) => (
  <div>
    <RecipeBody
      recipeDirections={recipeData.directions}
      recipeIngredients={recipeData.ingredients}
      checkedItems={checkedItems}
      setCheckedItems={setCheckedItems}
    />
  </div>
);

const ShoppingListPrintView = ({ checkedItems }) => (
  <div className="block">
    <div className="text-2xl ml-2 mb-2 font-medium underline decoration-double font-oswald">
      Shopping List:
    </div>
    <div>
      {checkedItems.map((item, index) => (
        <div key={index} className="ml-4">
          <input
            type="checkbox"
            defaultChecked={false}
            className="align-middle"
          />
          <span className="ml-2 align-middle">{item}</span>
        </div>
      ))}
    </div>
  </div>
);

const RecipePrintViews = ({
  type,
  recipeData,
  checkedItems,
  setCheckedItems,
}) => (
  <div className="p-8">
    <div className="text-3xl inline-block align-middle font-oswald">
      {recipeData.info.title}
    </div>
    <RecipeInfo recipeInfo={recipeData.info} />
    {type === 'recipe' && (
      <RecipePrintView
        recipeData={recipeData}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
      />
    )}
    {type === 'shoppingList' && (
      <ShoppingListPrintView checkedItems={checkedItems} />
    )}
  </div>
);

export default RecipePrintViews;
