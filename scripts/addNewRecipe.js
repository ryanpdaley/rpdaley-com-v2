const argv = require('minimist-lite')(process.argv.slice(2));
const fs = require('node:fs');
const xml2js = require('xml2js');

const RECIPE_METADATA_DIR = '../public/configs/metadata/items/recipes';
const RECIPE_ROOT = `../public/configs/recipes/root.json`;
const SITEMAP = '../public/sitemap.xml';
const RECIPE_WEB_ROOT = 'https://www.rpdaley.com/recipes';

// ****************************************************************
// This is a 'copy' from formatters.ts and constants.ts - I'll figure out the import
// later:

const FRACTION_DICTIONARY = {
  0.25: 188,
  0.5: 189,
  0.75: 190,
  0.33: 8531,
  0.66: 8532,
  0.2: 8533,
  0.4: 8534,
  0.6: 8535,
  0.8: 8536,
  0.16: 8537,
  0.83: 8538,
  0.125: 8539,
  0.375: 8540,
  0.625: 8541,
  0.875: 8542,
};

const convertDecimals = (measurement) => {
  const decimal = measurement % 1;
  const wholeNumber = Math.trunc(measurement);
  if (decimal === 0 || !(decimal in FRACTION_DICTIONARY))
    return measurement.toString();

  return (
    (wholeNumber > 0 ? wholeNumber : '') +
    String.fromCharCode(FRACTION_DICTIONARY[decimal])
  );
};

const getMeasurementString = (measurement) => {
  if (measurement == null || measurement === undefined) {
    return '';
  }
  if (Array.isArray(measurement) && measurement.length === 2) {
    return `${convertDecimals(measurement[0])}-${convertDecimals(
      measurement[1],
    )}`;
  }
  if (typeof measurement === 'number') {
    return `${convertDecimals(measurement)}`;
  }

  return '';
};

const parseItem = (item) => {
  const parsedItem = { rowItem: '', label: '' };
  const optionalString = item.isOptional ? '[optional] ' : '';
  const measurementString =
    item && item.measurement && item.measurement !== null
      ? `${getMeasurementString(item.measurement)} `
      : '';

  const measurementUnit =
    item.measurementUnit !== null ? `${item.measurementUnit} ` : '';

  const qualifierString =
    item.qualifierString !== null ? ` (${item.qualifierString})` : '';

  parsedItem.rowItem = `${measurementString}${measurementUnit}${item.name}`;
  parsedItem.label = `${optionalString}${parsedItem.rowItem}${qualifierString}`;
  return parsedItem;
};
// ****************************************************************

const appendDescription = (recipe, structuredRecipe) => {
  if (
    recipe.info.description !== undefined &&
    recipe.info.description !== null
  ) {
    const { description } = recipe.info;
    return { ...structuredRecipe, description };
  }
  return structuredRecipe;
};

const convertRecipeTimeToSeconds = (recipeTime) => {
  let returnValue = 0;
  const { value } = recipeTime;
  const { unit } = recipeTime;
  const decimalValue = value % 1;
  if (unit === 'hours') {
    returnValue = (value + decimalValue) * 3600;
  } else if (unit === 'minutes') {
    returnValue = (value + decimalValue) * 60;
  }
  return returnValue;
};

const secondsToISO8601 = (recipeSeconds) => {
  let out = 'PT';
  let seconds = parseInt(recipeSeconds);
  if (seconds >= 3600) {
    const wholeHours = Math.floor(seconds / 3600);
    out += `${wholeHours}H`;
    seconds -= wholeHours * 3600;
  }
  if (seconds >= 60) {
    const wholeMinutes = Math.floor(seconds / 60);
    out += `${wholeMinutes}M`;
    seconds -= wholeMinutes * 60;
  }
  if (seconds >= 1) {
    out += `${seconds}S`;
  }
  return out;
};

const appendCookTimes = (recipe, structuredRecipe) => {
  const times = {};
  let prepTime = 0;
  let cookTime = 0;
  if (recipe.info.prepTime !== null) {
    prepTime = convertRecipeTimeToSeconds(recipe.info.prepTime);
    times.prepTime = secondsToISO8601(prepTime);
  }
  if (recipe.info.cookTime !== null) {
    cookTime = convertRecipeTimeToSeconds(recipe.info.cookTime);
    times.cookTime = secondsToISO8601(cookTime);
  }
  if (prepTime > 0 || cookTime > 0) {
    times.totalTime = secondsToISO8601(prepTime + cookTime);
  }
  return { ...structuredRecipe, ...times };
};

const appendRecipeIngredients = (recipe, structuredRecipe) => {
  const recipeIngredient = [];
  recipe.ingredients.forEach((ingredientsGroup) => {
    ingredientsGroup.items.forEach((ingredient) => {
      recipeIngredient.push(parseItem(ingredient).label);
    });
  });
  return { ...structuredRecipe, recipeIngredient };
};

const appendRecipeInstructions = (recipe, structuredRecipe) => {
  const recipeInstructions = [];
  recipe.directions.forEach((direction) => {
    recipeInstructions.push({
      '@type': 'HowToStep',
      text: direction,
    });
  });
  return { ...structuredRecipe, recipeInstructions };
};

const buildStructuredRecipe = (recipe, recipeUrl) => {
  let structuredRecipe = {
    '@context': 'https://schema.org/',
    '@type': 'Recipe',
    name: recipe.info.title,
    author: {
      '@type': 'Person',
      name: 'Ryan Daley',
    },
    url: recipeUrl,
    image: 'https://v2.rpdaley.com/images/metaImage.jpeg',
  };
  structuredRecipe = appendDescription(recipe, structuredRecipe);
  structuredRecipe = appendCookTimes(recipe, structuredRecipe);

  if (recipe.info.makes != null) {
    structuredRecipe.recipeYield = recipe.info.makes;
  }

  structuredRecipe = appendRecipeIngredients(recipe, structuredRecipe);
  structuredRecipe = appendRecipeInstructions(recipe, structuredRecipe);
  return structuredRecipe;
};

const buildMetaTags = (recipe, recipeUrl) => {
  const recipeTitle = `RP Daley.com | Recipes | ${recipe.info.title}`;
  const recipeDescription = recipe.info.description;
  const recipeKeywords = `${recipe.info.title.replaceAll(' ', ', ')}, Recipe, RP Daley`;
  const metaTags = [
    {
      type: 'pageTitle',
      content: recipeTitle,
    },
    { type: 'charSet', content: 'utf-8' },
    {
      type: 'viewport',
      content: 'width=device-width,initial-scale=1,shrink-to-fit=no',
    },
    { type: 'theme-color', content: '#000000' },
    {
      type: 'title',
      content: recipeTitle,
    },
    {
      type: 'description',
      content: recipeDescription,
    },
    {
      type: 'keywords',
      content: recipeKeywords,
    },
    { type: 'author', content: 'RP Daley' },
    { type: 'property', propertyValue: 'og:type', content: 'website' },
    {
      type: 'property',
      propertyValue: 'og:url',
      content: recipeUrl,
    },
    {
      type: 'property',
      propertyValue: 'og:title',
      content: recipeTitle,
    },
    {
      type: 'property',
      propertyValue: 'og:description',
      content: recipeDescription,
    },
    {
      type: 'property',
      propertyValue: 'og:image',
      content: 'https://v2.rpdaley.com/images/metaImage.jpeg',
    },
    {
      type: 'property',
      propertyValue: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      type: 'property',
      propertyValue: 'twitter:title',
      content: recipeTitle,
    },
    {
      type: 'property',
      propertyValue: 'twitter:description',
      content: recipeDescription,
    },
    {
      type: 'property',
      propertyValue: 'twitter:image',
      content: 'https://v2.rpdaley.com/images/metaImage.jpeg',
    },
  ];
  return metaTags;
};

const buildMetadata = (recipe) => {
  const metadata = {};
  const recipeId = recipe.info.title.replaceAll(/\W/g, '').toLowerCase();
  const recipeUrl = `${RECIPE_WEB_ROOT}/${recipeId}/`;
  const metadataPath = `${RECIPE_METADATA_DIR}/${recipeId}.json`;
  metadata.metaTags = buildMetaTags(recipe, recipeUrl);
  metadata.structuredData = buildStructuredRecipe(recipe, recipeUrl);
  metadata.canonicalUrl = recipeUrl;
  fs.writeFileSync(metadataPath, JSON.stringify(metadata));
  return recipeId;
};

const addRecipeToRecipeList = (recipe, recipeId) => {
  const currentData = fs.readFileSync(RECIPE_ROOT);
  const jsonData = JSON.parse(currentData);
  const newRecipe = {
    title: recipe.info.title,
    src: `${recipeId}.json`,
    route: recipeId,
  };
  jsonData.push(newRecipe);
  fs.writeFileSync(RECIPE_ROOT, JSON.stringify(jsonData));
  console.log('... created entry in configs/recipes/root.json');
};

const addRecipeToSitemap = (recipeId) => {
  const newRecipeUrl = `${RECIPE_WEB_ROOT}/${recipeId}`;
  const currentSitemap = fs.readFileSync(SITEMAP);
  xml2js.parseString(currentSitemap, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      result.urlset.url.push({ loc: newRecipeUrl });
      const builder = new xml2js.Builder();
      const updatedSitemap = builder.buildObject(result);
      fs.writeFileSync(SITEMAP, updatedSitemap);
      console.log('... created entry in sitemap.xml');
    }
  });
};

const addRecipe = (parsedArgs) => {
  if (parsedArgs.length === 1) {
    const recipeFilePath = parsedArgs[0];
    const recipeFileExists = fs.existsSync(recipeFilePath);
    if (!recipeFileExists) {
      console.log(`Recipe file does not exist: ${recipeFilePath}.`);
    } else {
      console.log(`Recipe file found: ${recipeFilePath}.`);
      const recipeData = JSON.parse(fs.readFileSync(recipeFilePath, 'utf8'));
      const recipeId = buildMetadata(recipeData);
      console.log(
        `... build structured data (and create configs/metadata/items/recipes/${recipeId}.json`,
      );
      addRecipeToRecipeList(recipeData, recipeId);
      addRecipeToSitemap(recipeId);
    }
  } else {
    console.log('Unknown command - should be just the path to the recipe file');
  }
};

addRecipe(argv._);
