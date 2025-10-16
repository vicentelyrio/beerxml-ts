/**
 * beerxml-ts - Modern TypeScript library for parsing and serializing BeerXML 1.0 format
 * @packageDocumentation
 */

import { parseRecipe, parseRecipes } from './parser/index.js';
import { serializeRecipe, serializeRecipes } from './serializers/index.js';
import { RecipeSchema } from './validators/recipe.js';
import { BeerXMLValidationError } from './errors/index.js';
import type { Recipe } from './types/recipe.js';

/**
 * Result of a validation operation
 */
export interface ValidationResult {
  /** Whether validation passed */
  valid: boolean;
  /** Validation errors if any */
  errors?: Array<{ path: string; message: string }>;
  /** Validated data if successful */
  data?: Recipe;
}

/**
 * Main BeerXML class providing static methods for parsing, serializing, and validating BeerXML
 * @example
 * ```typescript
 * // Parse XML
 * const recipe = BeerXML.parse(xmlString);
 * 
 * // Serialize to XML
 * const xml = BeerXML.stringify(recipe);
 * 
 * // Validate data
 * const result = BeerXML.validate(data);
 * if (result.valid) {
 *   console.log('Valid recipe:', result.data);
 * }
 * ```
 */
export class BeerXML {
  /**
   * Parses a BeerXML string into a Recipe object
   * @param xml - Valid BeerXML 1.0 format string
   * @returns Parsed Recipe object with camelCase properties
   * @throws {BeerXMLParseError} If XML is malformed
   * @throws {BeerXMLValidationError} If data doesn't meet BeerXML spec
   * @example
   * ```typescript
   * const recipe = BeerXML.parse(xmlString);
   * console.log(recipe.name, recipe.batchSize);
   * ```
   */
  static parse(xml: string): Recipe {
    return parseRecipe(xml);
  }

  /**
   * Parses a BeerXML string into an array of Recipe objects
   * @param xml - Valid BeerXML 1.0 format string containing one or more recipes
   * @returns Array of parsed Recipe objects
   * @throws {BeerXMLParseError} If XML is malformed
   */
  static parseMultiple(xml: string): Recipe[] {
    return parseRecipes(xml);
  }

  /**
   * Serializes a Recipe object to BeerXML format string
   * @param recipe - Recipe object with camelCase properties
   * @returns BeerXML 1.0 format XML string
   * @throws {BeerXMLSerializationError} If serialization fails
   * @example
   * ```typescript
   * const xml = BeerXML.stringify(recipe);
   * ```
   */
  static stringify(recipe: Recipe): string {
    return serializeRecipe(recipe);
  }

  /**
   * Serializes an array of Recipe objects to BeerXML format string
   * @param recipes - Array of Recipe objects
   * @returns BeerXML 1.0 format XML string
   * @throws {BeerXMLSerializationError} If serialization fails
   */
  static stringifyMultiple(recipes: Recipe[]): string {
    return serializeRecipes(recipes);
  }

  /**
   * Converts a Recipe to plain JSON object
   * @param recipe - Recipe object
   * @returns Plain JSON object
   */
  static toJSON(recipe: Recipe): Record<string, unknown> {
    return JSON.parse(JSON.stringify(recipe)) as Record<string, unknown>;
  }

  /**
   * Parses JSON into a validated Recipe object
   * @param json - JSON data (string or object)
   * @returns Validated Recipe object
   * @throws {BeerXMLValidationError} If validation fails
   */
  static fromJSON(json: unknown): Recipe {
    const data = typeof json === 'string' ? JSON.parse(json) : json;
    const result = RecipeSchema.safeParse(data);
    
    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));
      throw new BeerXMLValidationError('Recipe validation failed', errors);
    }
    
    return result.data;
  }

  /**
   * Validates recipe data without throwing
   * @param data - Data to validate
   * @returns ValidationResult with success status and errors if any
   * @example
   * ```typescript
   * const result = BeerXML.validate(data);
   * if (result.valid) {
   *   console.log('Valid recipe');
   * } else {
   *   console.error('Validation errors:', result.errors);
   * }
   * ```
   */
  static validate(data: unknown): ValidationResult {
    const result = RecipeSchema.safeParse(data);
    
    if (result.success) {
      return {
        valid: true,
        data: result.data,
      };
    }
    
    const errors = result.error.errors.map((err) => ({
      path: err.path.join('.'),
      message: err.message,
    }));
    
    return {
      valid: false,
      errors,
    };
  }
}

// Export types
export type * from './types/index.js';

// Export schemas
export type * from './schemas/index.js';

// Export errors
export * from './errors/index.js';

// Export utilities
export * from './utils/index.js';

// Export validators
export * from './validators/index.js';

// Export converters
export * from './converters/index.js';

// Export parsers and serializers
export { parseRecipe, parseRecipes } from './parser/index.js';
export { serializeRecipe, serializeRecipes } from './serializers/index.js';

// Default export
export default BeerXML;

