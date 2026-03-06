import { XMLParser } from 'fast-xml-parser';
import { BeerXMLParseError } from '../errors/index.js';
import { recipeFromXML } from '../converters/recipe.js';
import type { Recipe } from '../types/recipe.js';
import type { BeerXMLRecipe } from '../schemas/recipe.js';

/**
 * XML Parser configuration for BeerXML format
 */
const parserOptions = {
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  parseAttributeValue: true,
  parseTagValue: true,
  trimValues: true,
  ignoreDeclaration: true,
  ignorePiTags: true,
};

/**
 * Parses BeerXML string into a Recipe object
 * @param xml - Valid BeerXML 1.0 format string
 * @returns Parsed Recipe object with camelCase properties
 * @throws {BeerXMLParseError} If XML is malformed or invalid
 * @example
 * ```typescript
 * const xml = '<RECIPES><RECIPE>...</RECIPE></RECIPES>';
 * const recipe = parseRecipe(xml);
 * console.log(recipe.name, recipe.batchSize);
 * ```
 */
export function parseRecipe(xml: string): Recipe {
  try {
    const parser = new XMLParser(parserOptions);
    const parsed = parser.parse(xml) as { RECIPES?: { RECIPE?: BeerXMLRecipe | BeerXMLRecipe[] } };

    if (!parsed.RECIPES) {
      throw new BeerXMLParseError('No RECIPES element found in XML');
    }

    if (!parsed.RECIPES.RECIPE) {
      throw new BeerXMLParseError('No RECIPE element found in RECIPES');
    }

    // Handle both single recipe and array of recipes
    const recipeData = Array.isArray(parsed.RECIPES.RECIPE)
      ? parsed.RECIPES.RECIPE[0]
      : parsed.RECIPES.RECIPE;

    if (!recipeData) {
      throw new BeerXMLParseError('Recipe data is empty');
    }

    return recipeFromXML(recipeData);
  } catch (error) {
    if (error instanceof BeerXMLParseError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new BeerXMLParseError(`Failed to parse XML: ${error.message}`);
    }
    throw new BeerXMLParseError('Unknown error occurred while parsing XML');
  }
}

/**
 * Parses BeerXML string into an array of Recipe objects
 * @param xml - Valid BeerXML 1.0 format string containing one or more recipes
 * @returns Array of parsed Recipe objects
 * @throws {BeerXMLParseError} If XML is malformed or invalid
 */
export function parseRecipes(xml: string): Recipe[] {
  try {
    const parser = new XMLParser(parserOptions);
    const parsed = parser.parse(xml) as { RECIPES?: { RECIPE?: BeerXMLRecipe | BeerXMLRecipe[] } };

    if (!parsed.RECIPES) {
      throw new BeerXMLParseError('No RECIPES element found in XML');
    }

    if (!parsed.RECIPES.RECIPE) {
      throw new BeerXMLParseError('No RECIPE element found in RECIPES');
    }

    // Normalize to array
    const recipesData = Array.isArray(parsed.RECIPES.RECIPE)
      ? parsed.RECIPES.RECIPE
      : [parsed.RECIPES.RECIPE];

    return recipesData.map((recipeData) => recipeFromXML(recipeData));
  } catch (error) {
    if (error instanceof BeerXMLParseError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new BeerXMLParseError(`Failed to parse XML: ${error.message}`);
    }
    throw new BeerXMLParseError('Unknown error occurred while parsing XML');
  }
}

