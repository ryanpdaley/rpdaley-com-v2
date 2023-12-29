import Link from 'next/link';
import { convertDecimals } from '../lib/formatters';
import { RecipeInfoProps } from '../types';

const Description = ({ recipeInfo }: RecipeInfoProps) => (
  <div>
    <div className="text-2xl">Description:</div>
    <div className="recipe-description">
      <p>{recipeInfo.description}</p>
    </div>
  </div>
);

const MetaInfo = ({ recipeInfo }: RecipeInfoProps) => {
  const yieldBlock =
    recipeInfo.makes !== null ? (
      <div>
        <strong>Yields: </strong>
        {recipeInfo.makes}
      </div>
    ) : null;

  const cookTimeBlock =
    recipeInfo.cookTime && recipeInfo.cookTime !== null ? (
      <div>
        <strong>Cook Time: </strong>
        {`${convertDecimals(recipeInfo.cookTime.value)} ${
          recipeInfo.cookTime.unit
        }`}
      </div>
    ) : null;

  const prepTimeBlock =
    recipeInfo.prepTime && recipeInfo.prepTime !== null ? (
      <div>
        <strong>Prep Time: </strong>
        {`${convertDecimals(recipeInfo.prepTime.value)} ${
          recipeInfo.prepTime.unit
        }`}
      </div>
    ) : null;

  const blockCount =
    (yieldBlock ? 1 : 0) + (cookTimeBlock ? 1 : 0) + (prepTimeBlock ? 1 : 0);

  return (
    <div className="recipe-data">
      <div className={`grid grid-cols-${blockCount}`}>
        {yieldBlock}
        {cookTimeBlock}
        {prepTimeBlock}
      </div>
    </div>
  );
};

const SourceBlock = ({ recipeInfo }: RecipeInfoProps) => {
  const sourceLabel = recipeInfo.source?.label;
  const sourceURL = recipeInfo.source?.url;
  if (sourceLabel === undefined) return '';
  return (
    <div>
      <div>Source:</div>
      {sourceURL === null || sourceURL === undefined ? (
        <div>{sourceLabel}</div>
      ) : (
        <Link
          href={sourceURL}
          //   onClick={() => {
          //     eventGA({
          //       category: 'userAction',
          //       action: 'link_clicked',
          //       label: sourceURL,
          //     });
          //   }}
          target="_blank"
        >
          <div>{sourceLabel}</div>
        </Link>
      )}
    </div>
  );
};

const RecipeInfo = ({ recipeInfo }) => {
  console.log(recipeInfo);
  return (
    <div className="border-solid border-2">
      <Description recipeInfo={recipeInfo} />
      <MetaInfo recipeInfo={recipeInfo} />
      <SourceBlock recipeInfo={recipeInfo} />
    </div>
  );
};
export default RecipeInfo;
