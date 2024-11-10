import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';
import { useReactToPrint } from 'react-to-print';
import { FaShoppingBasket } from 'react-icons/fa';
import { MdMenuBook } from 'react-icons/md';
import RecipeInfo from './components/RecipeInfo';
import RecipeBody from './components/RecipeBody/RecipeBody';
import RecipePrintViews from './components/RecipePrintViews';
import { event as gaEvent } from '../../lib/gtag';
import { RecipeDataType, SetCheckedItems } from './types';

const RECIPE_ROOT_DIR = `/configs/recipes/items`;

type RecipeViewsType = {
  recipeData: RecipeDataType;
  checkedItems: string[];
  setCheckedItems: SetCheckedItems;
  componentRefRecipe: RefObject<HTMLDivElement>;
  componentRefShoppingList: RefObject<HTMLDivElement>;
};

const RecipeView = ({
  recipeData,
  checkedItems,
  setCheckedItems,
  componentRefRecipe,
  componentRefShoppingList,
}: RecipeViewsType) => {
  const shoppingListIsActive = checkedItems.length > 0;
  const shoppingListActiveElements = shoppingListIsActive
    ? 'cursor-pointer hover:text-red-500'
    : 'cursor-not-allowed text-gray-400';

  const shoppingListPrintFn = useReactToPrint({
    contentRef: componentRefShoppingList,
    documentTitle: `${recipeData.info.title.replace(/[^a-zA-Z]/g, '')}-ShoppingList`,
  });

  const RecipePrintFn = useReactToPrint({
    contentRef: componentRefRecipe,
    documentTitle: `${recipeData.info.title.replace(/[^a-zA-Z]/g, '')}`,
  });

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
        <RecipeBody
          recipeDirections={recipeData.directions}
          recipeIngredients={recipeData.ingredients}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
        />
      </div>
      <div className="block text-right">
        <div className="inline-block">
          <button
            type="button"
            disabled={!shoppingListIsActive}
            onClick={() => {
              shoppingListPrintFn();
              gaEvent({
                action: 'Shopping List Printed',
                category: 'User Action',
                label: 'Recipe',
                value: recipeData.info.title,
              });
            }}
            className={`flex items-center text-xl border-solid border-2 rounded-md content-center px-2 m-1 ${shoppingListActiveElements} `}
          >
            <div className="inline-block px-1 align-middle">
              <FaShoppingBasket />
            </div>
            <div className="inline-block align-middle font-oswald">
              Print Shopping List
            </div>
          </button>
        </div>
        <div className="inline-block">
          <button
            type="button"
            onClick={() => {
              RecipePrintFn();
              gaEvent({
                action: 'Recipe Printed',
                category: 'User Action',
                label: 'Recipe',
                value: recipeData.info.title,
              });
            }}
            className={`flex items-center text-xl border-solid border-2 rounded-md content-center px-2 m-1`}
          >
            <div className="inline-block px-1 align-middle">
              <MdMenuBook />
            </div>
            <div className="inline-block align-middle font-oswald">
              Print Recipe
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

const RecipeComponent = ({ data, darkMode }) => {
  const { recipeId } = data;
  const [recipeData, setRecipeData] = useState<RecipeDataType | null>(null);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const componentRefRecipe = useRef<null | HTMLDivElement>(null);
  const componentRefShoppingList = useRef<null | HTMLDivElement>(null);

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
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default RecipeComponent;
