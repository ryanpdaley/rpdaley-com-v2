import { FRACTION_DICTIONARY } from '../constants';
import { IngredientItem } from '../types';

export const convertDecimals = (measurement: number): string => {
  const decimal = measurement % 1;
  const wholeNumber = Math.trunc(measurement);
  if (decimal === 0 || !(decimal in FRACTION_DICTIONARY))
    return measurement.toString();

  return (
    (wholeNumber > 0 ? wholeNumber : '') +
    String.fromCharCode(FRACTION_DICTIONARY[decimal])
  );
};

export const getMeasurementString = (
  measurement: null | number | number[],
): string => {
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

export const parseItem = (item: IngredientItem) => {
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
