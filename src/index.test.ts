import { describe, expect, it } from 'vitest'
import { BeerXML } from './index.js'

describe('BeerXML Main API', () => {
  const sampleXML = `<?xml version="1.0" encoding="UTF-8"?>
<RECIPES>
  <RECIPE>
    <NAME>Pale Ale</NAME>
    <VERSION>1</VERSION>
    <TYPE>All Grain</TYPE>
    <BREWER>John Doe</BREWER>
    <BATCH_SIZE>19</BATCH_SIZE>
    <BOIL_SIZE>23</BOIL_SIZE>
    <BOIL_TIME>60</BOIL_TIME>
    <EFFICIENCY>75</EFFICIENCY>
    <HOPS>
      <HOP>
        <NAME>Cascade</NAME>
        <VERSION>1</VERSION>
        <ALPHA>5.5</ALPHA>
        <AMOUNT>0.028</AMOUNT>
        <USE>Boil</USE>
        <TIME>60</TIME>
      </HOP>
    </HOPS>
    <FERMENTABLES>
      <FERMENTABLE>
        <NAME>Pale Malt</NAME>
        <VERSION>1</VERSION>
        <TYPE>Grain</TYPE>
        <AMOUNT>4.5</AMOUNT>
        <YIELD>80</YIELD>
        <COLOR>3</COLOR>
      </FERMENTABLE>
    </FERMENTABLES>
    <YEASTS>
      <YEAST>
        <NAME>US-05</NAME>
        <VERSION>1</VERSION>
        <TYPE>Ale</TYPE>
        <FORM>Dry</FORM>
        <AMOUNT>0.011</AMOUNT>
      </YEAST>
    </YEASTS>
  </RECIPE>
</RECIPES>`

  describe('parse', () => {
    it('should parse valid BeerXML', () => {
      const recipe = BeerXML.parse(sampleXML)
      expect(recipe.name).toBe('Pale Ale')
      expect(recipe.type).toBe('All Grain')
      expect(recipe.brewer).toBe('John Doe')
      expect(recipe.batchSize).toBe(19)
    })

    it('should parse hops with camelCase properties', () => {
      const recipe = BeerXML.parse(sampleXML)
      expect(recipe.hops).toHaveLength(1)
      expect(recipe.hops[0]?.name).toBe('Cascade')
      expect(recipe.hops[0]?.alpha).toBe(5.5)
    })

    it('should parse fermentables with camelCase properties', () => {
      const recipe = BeerXML.parse(sampleXML)
      expect(recipe.fermentables).toHaveLength(1)
      expect(recipe.fermentables[0]?.name).toBe('Pale Malt')
      expect(recipe.fermentables[0]?.yield).toBe(80)
    })

    it('should throw error for invalid XML', () => {
      expect(() => BeerXML.parse('not xml')).toThrow()
    })
  })

  describe('stringify', () => {
    it('should serialize recipe to XML', () => {
      const recipe = BeerXML.parse(sampleXML)
      const xml = BeerXML.stringify(recipe)

      expect(xml).toContain('<RECIPES>')
      expect(xml).toContain('<RECIPE>')
      expect(xml).toContain('<NAME>Pale Ale</NAME>')
      expect(xml).toContain('</RECIPE>')
      expect(xml).toContain('</RECIPES>')
    })

    it('should maintain data integrity in round-trip', () => {
      const original = BeerXML.parse(sampleXML)
      const xml = BeerXML.stringify(original)
      const parsed = BeerXML.parse(xml)

      expect(parsed.name).toBe(original.name)
      expect(parsed.brewer).toBe(original.brewer)
      expect(parsed.batchSize).toBe(original.batchSize)
      expect(parsed.hops).toHaveLength(original.hops.length)
      expect(parsed.fermentables).toHaveLength(original.fermentables.length)
    })
  })

  describe('validate', () => {
    it('should validate valid recipe data', () => {
      const recipe = BeerXML.parse(sampleXML)
      const result = BeerXML.validate(recipe)

      expect(result.valid).toBe(true)
      expect(result.data).toBeDefined()
      expect(result.errors).toBeUndefined()
    })

    it('should return errors for invalid data', () => {
      const invalidData = {
        name: 'Test',
        // missing required fields
      }

      const result = BeerXML.validate(invalidData)
      expect(result.valid).toBe(false)
      expect(result.errors).toBeDefined()
      expect(result.errors?.length).toBeGreaterThan(0)
    })

    it('should validate all required fields', () => {
      const invalidData = {
        name: '', // empty name
        version: 1,
        type: 'All Grain',
        brewer: 'Test',
        batchSize: -1, // negative batch size
        boilSize: 20,
        boilTime: 60,
        hops: [],
        fermentables: [],
        yeasts: [],
      }

      const result = BeerXML.validate(invalidData)
      expect(result.valid).toBe(false)
    })
  })

  describe('fromJSON and toJSON', () => {
    it('should convert recipe to JSON', () => {
      const recipe = BeerXML.parse(sampleXML)
      const json = BeerXML.toJSON(recipe)

      expect(json).toHaveProperty('name')
      expect(json).toHaveProperty('brewer')
      expect(json).toHaveProperty('batchSize')
    })

    it('should create recipe from JSON', () => {
      const recipe = BeerXML.parse(sampleXML)
      const json = BeerXML.toJSON(recipe)
      const fromJson = BeerXML.fromJSON(json)

      expect(fromJson.name).toBe(recipe.name)
      expect(fromJson.brewer).toBe(recipe.brewer)
      expect(fromJson.batchSize).toBe(recipe.batchSize)
    })

    it('should handle JSON string', () => {
      const recipe = BeerXML.parse(sampleXML)
      const jsonString = JSON.stringify(recipe)
      const fromJson = BeerXML.fromJSON(jsonString)

      expect(fromJson.name).toBe(recipe.name)
    })

    it('should throw on invalid JSON data', () => {
      const invalidJson = { name: 'Test' }
      expect(() => BeerXML.fromJSON(invalidJson)).toThrow()
    })
  })

  describe('parseMultiple and stringifyMultiple', () => {
    const multipleXML = `<?xml version="1.0" encoding="UTF-8"?>
<RECIPES>
  <RECIPE>
    <NAME>Recipe 1</NAME>
    <VERSION>1</VERSION>
    <TYPE>All Grain</TYPE>
    <BREWER>Brewer 1</BREWER>
    <BATCH_SIZE>19</BATCH_SIZE>
    <BOIL_SIZE>23</BOIL_SIZE>
    <BOIL_TIME>60</BOIL_TIME>
    <HOPS></HOPS>
    <FERMENTABLES></FERMENTABLES>
    <YEASTS></YEASTS>
  </RECIPE>
  <RECIPE>
    <NAME>Recipe 2</NAME>
    <VERSION>1</VERSION>
    <TYPE>Extract</TYPE>
    <BREWER>Brewer 2</BREWER>
    <BATCH_SIZE>20</BATCH_SIZE>
    <BOIL_SIZE>24</BOIL_SIZE>
    <BOIL_TIME>60</BOIL_TIME>
    <HOPS></HOPS>
    <FERMENTABLES></FERMENTABLES>
    <YEASTS></YEASTS>
  </RECIPE>
</RECIPES>`

    it('should parse multiple recipes', () => {
      const recipes = BeerXML.parseMultiple(multipleXML)
      expect(recipes).toHaveLength(2)
      expect(recipes[0]?.name).toBe('Recipe 1')
      expect(recipes[1]?.name).toBe('Recipe 2')
    })

    it('should stringify multiple recipes', () => {
      const recipes = BeerXML.parseMultiple(multipleXML)
      const xml = BeerXML.stringifyMultiple(recipes)

      expect(xml).toContain('Recipe 1')
      expect(xml).toContain('Recipe 2')
    })
  })
})
