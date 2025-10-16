import type { Recipe } from '../types/recipe.js';
import type { BeerXMLRecipe } from '../schemas/recipe.js';
import { parseNumber, parseBoolean, serializeBoolean } from './utils.js';
import { hopFromXML, hopToXML } from './hop.js';
import { fermentableFromXML, fermentableToXML } from './fermentable.js';
import { yeastFromXML, yeastToXML } from './yeast.js';
import { miscFromXML, miscToXML } from './misc.js';
import { waterFromXML, waterToXML } from './water.js';
import { styleFromXML, styleToXML } from './style.js';
import { equipmentFromXML, equipmentToXML } from './equipment.js';
import { mashFromXML, mashToXML } from './mash.js';

/**
 * Converts BeerXML Recipe to TypeScript Recipe
 */
export function recipeFromXML(xml: BeerXMLRecipe): Recipe {
  // Handle hops array - could be array or single item
  const hops = Array.isArray(xml.HOPS?.HOP)
    ? xml.HOPS.HOP.map(hopFromXML)
    : xml.HOPS?.HOP
    ? [hopFromXML(xml.HOPS.HOP)]
    : [];

  // Handle fermentables array
  const fermentables = Array.isArray(xml.FERMENTABLES?.FERMENTABLE)
    ? xml.FERMENTABLES.FERMENTABLE.map(fermentableFromXML)
    : xml.FERMENTABLES?.FERMENTABLE
    ? [fermentableFromXML(xml.FERMENTABLES.FERMENTABLE)]
    : [];

  // Handle yeasts array
  const yeasts = Array.isArray(xml.YEASTS?.YEAST)
    ? xml.YEASTS.YEAST.map(yeastFromXML)
    : xml.YEASTS?.YEAST
    ? [yeastFromXML(xml.YEASTS.YEAST)]
    : [];

  // Handle optional miscs array
  const miscs = xml.MISCS
    ? Array.isArray(xml.MISCS.MISC)
      ? xml.MISCS.MISC.map(miscFromXML)
      : [miscFromXML(xml.MISCS.MISC)]
    : undefined;

  // Handle optional waters array
  const waters = xml.WATERS
    ? Array.isArray(xml.WATERS.WATER)
      ? xml.WATERS.WATER.map(waterFromXML)
      : [waterFromXML(xml.WATERS.WATER)]
    : undefined;

  return {
    name: xml.NAME,
    version: parseNumber(xml.VERSION, 'VERSION') ?? 1,
    type: xml.TYPE as Recipe['type'],
    style: xml.STYLE ? styleFromXML(xml.STYLE) : undefined,
    equipment: xml.EQUIPMENT ? equipmentFromXML(xml.EQUIPMENT) : undefined,
    brewer: xml.BREWER,
    asstBrewer: xml.ASST_BREWER,
    batchSize: parseNumber(xml.BATCH_SIZE, 'BATCH_SIZE') ?? 0,
    boilSize: parseNumber(xml.BOIL_SIZE, 'BOIL_SIZE') ?? 0,
    boilTime: parseNumber(xml.BOIL_TIME, 'BOIL_TIME') ?? 0,
    efficiency: parseNumber(xml.EFFICIENCY, 'EFFICIENCY'),
    hops,
    fermentables,
    miscs,
    yeasts,
    waters,
    mash: xml.MASH ? mashFromXML(xml.MASH) : undefined,
    notes: xml.NOTES,
    tastingNotes: xml.TASTE_NOTES,
    rating: parseNumber(xml.TASTE_RATING, 'TASTE_RATING'),
    og: parseNumber(xml.OG, 'OG'),
    fg: parseNumber(xml.FG, 'FG'),
    fermentationStages: parseNumber(xml.FERMENTATION_STAGES, 'FERMENTATION_STAGES'),
    primaryAge: parseNumber(xml.PRIMARY_AGE, 'PRIMARY_AGE'),
    primaryTemp: parseNumber(xml.PRIMARY_TEMP, 'PRIMARY_TEMP'),
    secondaryAge: parseNumber(xml.SECONDARY_AGE, 'SECONDARY_AGE'),
    secondaryTemp: parseNumber(xml.SECONDARY_TEMP, 'SECONDARY_TEMP'),
    tertiaryAge: parseNumber(xml.TERTIARY_AGE, 'TERTIARY_AGE'),
    tertiaryTemp: parseNumber(xml.TERTIARY_TEMP, 'TERTIARY_TEMP'),
    age: parseNumber(xml.AGE, 'AGE'),
    ageTemp: parseNumber(xml.AGE_TEMP, 'AGE_TEMP'),
    date: xml.DATE,
    carbonation: parseNumber(xml.CARBONATION, 'CARBONATION'),
    forcedCarbonation: parseBoolean(xml.FORCED_CARBONATION),
    primingSugarName: xml.PRIMING_SUGAR_NAME,
    carbonationTemp: parseNumber(xml.CARBONATION_TEMP, 'CARBONATION_TEMP'),
    primingSugarEquiv: parseNumber(xml.PRIMING_SUGAR_EQUIV, 'PRIMING_SUGAR_EQUIV'),
    kegPrimingFactor: parseNumber(xml.KEG_PRIMING_FACTOR, 'KEG_PRIMING_FACTOR'),
  };
}

/**
 * Converts TypeScript Recipe to BeerXML Recipe
 */
export function recipeToXML(recipe: Recipe): BeerXMLRecipe {
  return {
    NAME: recipe.name,
    VERSION: recipe.version,
    TYPE: recipe.type,
    STYLE: recipe.style ? styleToXML(recipe.style) : undefined,
    EQUIPMENT: recipe.equipment ? equipmentToXML(recipe.equipment) : undefined,
    BREWER: recipe.brewer,
    ASST_BREWER: recipe.asstBrewer,
    BATCH_SIZE: recipe.batchSize,
    BOIL_SIZE: recipe.boilSize,
    BOIL_TIME: recipe.boilTime,
    EFFICIENCY: recipe.efficiency,
    HOPS: {
      HOP: recipe.hops.map(hopToXML),
    },
    FERMENTABLES: {
      FERMENTABLE: recipe.fermentables.map(fermentableToXML),
    },
    MISCS: recipe.miscs ? { MISC: recipe.miscs.map(miscToXML) } : undefined,
    YEASTS: {
      YEAST: recipe.yeasts.map(yeastToXML),
    },
    WATERS: recipe.waters ? { WATER: recipe.waters.map(waterToXML) } : undefined,
    MASH: recipe.mash ? mashToXML(recipe.mash) : undefined,
    NOTES: recipe.notes,
    TASTE_NOTES: recipe.tastingNotes,
    TASTE_RATING: recipe.rating,
    OG: recipe.og,
    FG: recipe.fg,
    FERMENTATION_STAGES: recipe.fermentationStages,
    PRIMARY_AGE: recipe.primaryAge,
    PRIMARY_TEMP: recipe.primaryTemp,
    SECONDARY_AGE: recipe.secondaryAge,
    SECONDARY_TEMP: recipe.secondaryTemp,
    TERTIARY_AGE: recipe.tertiaryAge,
    TERTIARY_TEMP: recipe.tertiaryTemp,
    AGE: recipe.age,
    AGE_TEMP: recipe.ageTemp,
    DATE: recipe.date,
    CARBONATION: recipe.carbonation,
    FORCED_CARBONATION: serializeBoolean(recipe.forcedCarbonation),
    PRIMING_SUGAR_NAME: recipe.primingSugarName,
    CARBONATION_TEMP: recipe.carbonationTemp,
    PRIMING_SUGAR_EQUIV: recipe.primingSugarEquiv,
    KEG_PRIMING_FACTOR: recipe.kegPrimingFactor,
  };
}

