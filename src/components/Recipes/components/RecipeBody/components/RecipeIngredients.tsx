import { parseItem } from '../../../lib/formatters';
import { IngredientSectionProps, RecipeIngredientsProps } from '../../../types';

const IngredientsSection = ({
  ingredientSection,
  checkedItems,
  setCheckedItems,
}: IngredientSectionProps) => {
  const handleChange = (event: { target: { value: any; checked: any } }) => {
    const { value } = event.target;
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckedItems([...checkedItems, value]);
    } else {
      const filteredList = checkedItems.filter((item) => item !== value);
      setCheckedItems(filteredList);
    }
    // eventGA({
    //   category: "userAction",
    //   action: "ingredient_Checked",
    //   label: JSON.stringify(checkedItems),
    // });
  };

  return (
    <div>
      {ingredientSection.subHeading && (
        <div>{ingredientSection.subHeading}</div>
      )}
      <table>
        <tbody>
          {ingredientSection.items.map((ingredient) => {
            const { label, rowItem } = parseItem(ingredient);
            const isChecked = checkedItems.includes(rowItem);
            return (
              <tr key={label}>
                <td>
                  {/* <Tooltip content="Select to add to Shopping List"> */}
                  <input
                    type="checkbox"
                    defaultChecked={isChecked}
                    value={rowItem}
                    onChange={handleChange}
                    name={label}
                  />
                  {/* </Tooltip> */}
                </td>

                <td>
                  <p>{label}</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const RecipeIngredients = ({
  recipeIngredients,
  checkedItems,
  setCheckedItems,
}: RecipeIngredientsProps) => {
  console.log(recipeIngredients);
  return (
    <div className="block">
      <div>Ingredients</div>
      {recipeIngredients.map((ingredientSection, index) => (
        <IngredientsSection
          ingredientSection={ingredientSection}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
          key={index}
        />
      ))}
    </div>
  );
};
export default RecipeIngredients;
