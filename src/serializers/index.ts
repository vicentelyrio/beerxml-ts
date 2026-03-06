import { XMLBuilder } from 'fast-xml-parser';
import { BeerXMLSerializationError } from '../errors/index.js';
import { recipeToXML } from '../converters/recipe.js';
import type { Recipe } from '../types/recipe.js';

/**
 * XML Builder configuration for BeerXML format
 */
const builderOptions = {
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  format: true,
  indentBy: '  ',
  suppressEmptyNode: true,
  suppressBooleanAttributes: false,
};

/**
 * Serializes a Recipe object to BeerXML format string
 * @param recipe - Recipe object with camelCase properties
 * @returns BeerXML 1.0 format XML string
 * @throws {BeerXMLSerializationError} If serialization fails
 * @example
 * ```typescript
 * const recipe: Recipe = {
 *   name: 'My IPA',
 *   type: 'All Grain',
 *   brewer: 'John Doe',
 *   // ... other properties
 * };
 * const xml = serializeRecipe(recipe);
 * ```
 */
export function serializeRecipe(recipe: Recipe): string {
  try {
    const xmlRecipe = recipeToXML(recipe);
    
    const builder = new XMLBuilder(builderOptions);
    const xmlObj = {
      '?xml': {
        '@_version': '1.0',
        '@_encoding': 'UTF-8',
      },
      RECIPES: {
        RECIPE: xmlRecipe,
      },
    };

    const xml = builder.build(xmlObj);
    return xml as string;
  } catch (error) {
    if (error instanceof BeerXMLSerializationError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new BeerXMLSerializationError(`Failed to serialize recipe: ${error.message}`);
    }
    throw new BeerXMLSerializationError('Unknown error occurred while serializing recipe');
  }
}

/**
 * Serializes an array of Recipe objects to BeerXML format string
 * @param recipes - Array of Recipe objects
 * @returns BeerXML 1.0 format XML string
 * @throws {BeerXMLSerializationError} If serialization fails
 */
export function serializeRecipes(recipes: Recipe[]): string {
  try {
    if (recipes.length === 0) {
      throw new BeerXMLSerializationError('Cannot serialize empty recipes array');
    }

    const xmlRecipes = recipes.map(recipeToXML);
    
    const builder = new XMLBuilder(builderOptions);
    const xmlObj = {
      '?xml': {
        '@_version': '1.0',
        '@_encoding': 'UTF-8',
      },
      RECIPES: {
        RECIPE: xmlRecipes,
      },
    };

    const xml = builder.build(xmlObj);
    return xml as string;
  } catch (error) {
    if (error instanceof BeerXMLSerializationError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new BeerXMLSerializationError(`Failed to serialize recipes: ${error.message}`);
    }
    throw new BeerXMLSerializationError('Unknown error occurred while serializing recipes');
  }
}

