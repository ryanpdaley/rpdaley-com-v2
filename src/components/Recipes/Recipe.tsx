import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';
import ReactToPrint from 'react-to-print';
import { FaShoppingBasket } from 'react-icons/fa';
import { MdMenuBook } from 'react-icons/md';
import RecipeInfo from './components/RecipeInfo';
import RecipeBody from './components/RecipeBody/RecipeBody';
import RecipePrintViews from './components/RecipePrintViews';
import { event as gaEvent } from '../../lib/gtag';

const RECIPE_ROOT_DIR = 'https://rpdaley.com/configs/recipes/items';

const RecipeView = ({
  recipeData,
  checkedItems,
  setCheckedItems,
  componentRefRecipe,
  componentRefShoppingList,
}) => {
  const reactToPrintContentRecipe = useCallback(() => {
    gaEvent({
      action: 'Recipe Printed',
      category: 'User Action',
      label: 'Recipe',
      value: recipeData.info.title,
    });
    return componentRefRecipe.current;
  }, [componentRefRecipe, recipeData.info.title]);

  const reactToPrintContentShoppingList = useCallback(() => {
    gaEvent({
      action: 'Shopping List Printed',
      category: 'User Action',
      label: 'Recipe',
      value: recipeData.info.title,
    });
    return componentRefShoppingList.current;
  }, [componentRefShoppingList, recipeData.info.title]);

  const reactToPrintTriggerRecipe = useCallback(
    () => (
      <div className="block text-xl border-solid border-2 rounded-md px-2 m-1 cursor-pointer hover:text-red-500">
        <div className="inline-block px-1 align-middle">
          <MdMenuBook />
        </div>
        <div className="inline-block align-middle font-oswald">
          Print Recipe
        </div>
      </div>
    ),
    [],
  );

  const reactToPrintTriggerShoppingList = useCallback(
    () => (
      <div className="block text-xl border-solid border-2 rounded-md px-2 m-1 cursor-pointer hover:text-red-500">
        <div className="inline-block px-1 align-middle">
          <FaShoppingBasket />
        </div>
        <div className="inline-block align-middle font-oswald">
          Print Shopping List
        </div>
      </div>
    ),
    [],
  );

  return (
    <div className="block pb-2">
      <div className="py-2">
        <Link className="text-4xl inline-block align-middle" href="/recipes">
          <div className="border-solid border-2 rounded-md mx-2">
            <IoArrowBack />
          </div>
        </Link>
        <div className="text-3xl inline-block align-middle font-oswald">
          {recipeData.info.title}
        </div>
      </div>

      <div className="md:border-solid md:border-2">
        <RecipeInfo recipeInfo={recipeData.info} />
        <div className="block text-right">
          <div className="inline-block">
            <ReactToPrint
              content={reactToPrintContentRecipe}
              documentTitle={recipeData.info.title.replace(/\s/g, '')}
              trigger={reactToPrintTriggerRecipe}
            />
          </div>
          <div className="inline-block">
            <ReactToPrint
              content={reactToPrintContentShoppingList}
              documentTitle={`${recipeData.info.title.replace(
                /\s/g,
                '',
              )}-ShoppingList`}
              trigger={reactToPrintTriggerShoppingList}
            />
          </div>
        </div>

        <RecipeBody
          recipeDirections={recipeData.directions}
          recipeIngredients={recipeData.ingredients}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
        />
      </div>
    </div>
  );
};

const RecipeComponent = ({ data }) => {
  const { recipeId } = data;
  const [recipeData, setRecipeData] = useState(null);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const componentRefRecipe = useRef<HTMLDivElement>(null);
  const componentRefShoppingList = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${RECIPE_ROOT_DIR}/${recipeId}.json`)
      .then((recipeFetchData) => recipeFetchData.json())
      .then((recipeFetchJson) => {
        setRecipeData(recipeFetchJson);
      });
  }, [recipeId]);

  return (
    <div className="max-w-screen-xl mx-auto">
      {recipeData && (
        <div>
          <RecipeView
            recipeData={recipeData}
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
            componentRefRecipe={componentRefRecipe}
            componentRefShoppingList={componentRefShoppingList}
          />
          <div className="hidden">
            <div ref={componentRefRecipe}>
              <RecipePrintViews
                type="recipe"
                recipeData={recipeData}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
                ref={componentRefRecipe}
              />
            </div>
          </div>
          <div className="hidden">
            <div ref={componentRefShoppingList}>
              <RecipePrintViews
                type="shoppingList"
                recipeData={recipeData}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
                ref={componentRefShoppingList}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default RecipeComponent;
