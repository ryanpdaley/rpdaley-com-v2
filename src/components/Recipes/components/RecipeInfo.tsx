import Link from 'next/link';
import { convertDecimals } from '../lib/formatters';
import { RecipeInfoProps } from '../types';

const Description = ({ recipeInfo }: RecipeInfoProps) => (
  <div className="pb-2">
    <div className="text-xl">Description:</div>
    <div className="px-5">
      <p>{recipeInfo.description}</p>
    </div>
  </div>
);

const MetaInfo = ({ recipeInfo }: RecipeInfoProps) => {
  const yieldBlock =
    recipeInfo.makes !== null ? (
      <div className="flex-auto text-center">
        <strong>Yields: </strong>
        {recipeInfo.makes}
      </div>
    ) : null;

  const cookTimeBlock =
    recipeInfo.cookTime && recipeInfo.cookTime !== null ? (
      <div className="flex-auto text-center">
        <strong>Cook Time: </strong>
        {`${convertDecimals(recipeInfo.cookTime.value)} ${
          recipeInfo.cookTime.unit
        }`}
      </div>
    ) : null;

  const prepTimeBlock =
    recipeInfo.prepTime && recipeInfo.prepTime !== null ? (
      <div className="flex-auto text-center">
        <strong>Prep Time: </strong>
        {`${convertDecimals(recipeInfo.prepTime.value)} ${
          recipeInfo.prepTime.unit
        }`}
      </div>
    ) : null;

  return (
    <div className="flex gap-4 divide-x divide-dotted content-center py-2">
      {yieldBlock}
      {cookTimeBlock}
      {prepTimeBlock}
    </div>
  );
};

const SourceBlock = ({ recipeInfo }: RecipeInfoProps) => {
  const sourceLabel = recipeInfo.source?.label;
  const sourceURL = recipeInfo.source?.url;
  if (sourceLabel === undefined) return '';
  return (
    <div className="w-full text-right px-5">
      <strong>Source: </strong>
      {sourceURL === null || sourceURL === undefined ? (
        <div className="inline-block">{sourceLabel}</div>
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
          <div className="inline-block">{sourceLabel}</div>
        </Link>
      )}
    </div>
  );
};

const RecipeInfo = ({ recipeInfo }) => (
  <div>
    <div className="border-solid border-2 rounded-lg m-2 p-2 divide-y divide-solid">
      <Description recipeInfo={recipeInfo} />
      <MetaInfo recipeInfo={recipeInfo} />
    </div>
    <SourceBlock recipeInfo={recipeInfo} />
  </div>
);
export default RecipeInfo;
