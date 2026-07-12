import { XMLParser } from 'fast-xml-parser'
import { recipeFromXML } from '../converters/recipe.js'
import { BeerXMLParseError } from '../errors/index.js'
import type { BeerXMLRecipe } from '../schemas/recipe.js'
import type { Recipe } from '../types/recipe.js'

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
}

/**
 * Parses raw BeerXML into a normalized array of BeerXMLRecipe records
 * @throws {BeerXMLParseError} If the RECIPES/RECIPE structure is missing
 */
function extractRecipesData(xml: string): BeerXMLRecipe[] {
  const parser = new XMLParser(parserOptions)
  const parsed = parser.parse(xml) as {
    RECIPES?: { RECIPE?: BeerXMLRecipe | BeerXMLRecipe[] }
  }

  if (!parsed.RECIPES) {
    throw new BeerXMLParseError('No RECIPES element found in XML')
  }

  if (!parsed.RECIPES.RECIPE) {
    throw new BeerXMLParseError('No RECIPE element found in RECIPES')
  }

  return Array.isArray(parsed.RECIPES.RECIPE)
    ? parsed.RECIPES.RECIPE
    : [parsed.RECIPES.RECIPE]
}

/**
 * Runs a parse step, normalizing any thrown error into a BeerXMLParseError
 * @throws {BeerXMLParseError}
 */
function withParseErrorHandling<T>(run: () => T): T {
  try {
    return run()
  } catch (error) {
    if (error instanceof BeerXMLParseError) {
      throw error
    }
    if (error instanceof Error) {
      throw new BeerXMLParseError(`Failed to parse XML: ${error.message}`)
    }
    throw new BeerXMLParseError('Unknown error occurred while parsing XML')
  }
}

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
  return withParseErrorHandling(() => {
    const [recipeData] = extractRecipesData(xml)

    if (!recipeData) {
      throw new BeerXMLParseError('Recipe data is empty')
    }

    return recipeFromXML(recipeData)
  })
}

/**
 * Parses BeerXML string into an array of Recipe objects
 * @param xml - Valid BeerXML 1.0 format string containing one or more recipes
 * @returns Array of parsed Recipe objects
 * @throws {BeerXMLParseError} If XML is malformed or invalid
 */
export function parseRecipes(xml: string): Recipe[] {
  return withParseErrorHandling(() =>
    extractRecipesData(xml).map(recipeFromXML),
  )
}
