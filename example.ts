/**
 * Example usage of beerxml-ts library
 */

import type { Recipe } from './src/index.js'
import { BeerXML, gravity, temperature, volume, weight } from './src/index.js'

// Example 1: Create a recipe from scratch
console.log('=== Example 1: Creating a Recipe ===\n')

const myRecipe: Recipe = {
  name: 'American Pale Ale',
  version: 1,
  type: 'All Grain',
  brewer: 'John Brewer',
  batchSize: 19, // liters
  boilSize: 23, // liters
  boilTime: 60, // minutes
  efficiency: 75,
  hops: [
    {
      name: 'Cascade',
      version: 1,
      alpha: 5.5,
      amount: 0.028, // kg
      use: 'Boil',
      time: 60,
      form: 'Pellet',
      notes: 'Bittering addition',
    },
    {
      name: 'Centennial',
      version: 1,
      alpha: 10.0,
      amount: 0.014,
      use: 'Boil',
      time: 15,
      form: 'Pellet',
      notes: 'Flavor addition',
    },
  ],
  fermentables: [
    {
      name: 'Pale Malt 2-Row',
      version: 1,
      type: 'Grain',
      amount: 4.5, // kg
      yield: 80,
      color: 3,
    },
    {
      name: 'Crystal 60L',
      version: 1,
      type: 'Grain',
      amount: 0.5,
      yield: 75,
      color: 60,
    },
  ],
  yeasts: [
    {
      name: 'American Ale (US-05)',
      version: 1,
      type: 'Ale',
      form: 'Dry',
      amount: 0.011, // kg
      laboratory: 'Fermentis',
      productId: 'US-05',
      attenuation: 81,
    },
  ],
}

console.log(`Recipe: ${myRecipe.name}`)
console.log(`Type: ${myRecipe.type}`)
console.log(
  `Batch Size: ${myRecipe.batchSize}L (${volume.litersToGallons(myRecipe.batchSize).toFixed(2)} gal)`,
)
console.log(`Hops: ${myRecipe.hops.length}`)
console.log(`Fermentables: ${myRecipe.fermentables.length}`)

// Example 2: Serialize to XML
console.log('\n=== Example 2: Serialize to XML ===\n')

const xml = BeerXML.stringify(myRecipe)
console.log(xml)

// Example 3: Parse XML
console.log('\n=== Example 3: Parse XML ===\n')

const parsedRecipe = BeerXML.parse(xml)
console.log(`Parsed recipe: ${parsedRecipe.name}`)
console.log(`Brewer: ${parsedRecipe.brewer}`)
console.log(`First hop: ${parsedRecipe.hops[0]?.name}`)

// Example 4: Validate recipe
console.log('\n=== Example 4: Validate Recipe ===\n')

const validationResult = BeerXML.validate(myRecipe)
if (validationResult.valid) {
  console.log('✓ Recipe is valid!')
} else {
  console.log('✗ Recipe validation failed:')
  validationResult.errors?.forEach((error) => {
    console.log(`  - ${error.path}: ${error.message}`)
  })
}

// Example 5: Unit conversions
console.log('\n=== Example 5: Unit Conversions ===\n')

const batchSizeGallons = volume.litersToGallons(myRecipe.batchSize)
console.log(
  `Batch size: ${myRecipe.batchSize}L = ${batchSizeGallons.toFixed(2)} gallons`,
)

const grainWeightLbs = weight.kgToLbs(myRecipe.fermentables[0]?.amount ?? 0)
console.log(
  `Grain weight: ${myRecipe.fermentables[0]?.amount}kg = ${grainWeightLbs.toFixed(2)} lbs`,
)

const mashTemp = 67 // Celsius
const mashTempF = temperature.celsiusToFahrenheit(mashTemp)
console.log(`Mash temp: ${mashTemp}°C = ${mashTempF.toFixed(1)}°F`)

// Example 6: Gravity calculations
console.log('\n=== Example 6: Brewing Calculations ===\n')

const og = 1.055
const fg = 1.012
const abv = gravity.calculateAbv(og, fg)
const attenuation = gravity.calculateAttenuation(og, fg)

console.log(`Original Gravity: ${og.toFixed(3)}`)
console.log(`Final Gravity: ${fg.toFixed(3)}`)
console.log(`ABV: ${abv.toFixed(2)}%`)
console.log(`Attenuation: ${attenuation.toFixed(1)}%`)

// Example 7: JSON conversion
console.log('\n=== Example 7: JSON Conversion ===\n')

const json = BeerXML.toJSON(myRecipe)
console.log('Recipe as JSON:')
console.log(`${JSON.stringify(json, null, 2).substring(0, 200)}...`)

const fromJson = BeerXML.fromJSON(json)
console.log(`\nRecipe from JSON: ${fromJson.name}`)

// Example 8: Error handling
console.log('\n=== Example 8: Error Handling ===\n')

try {
  const invalidXML = '<RECIPES><INVALID></RECIPES>'
  BeerXML.parse(invalidXML)
} catch (error) {
  if (error instanceof Error) {
    console.log(`Caught error: ${error.name}`)
    console.log(`Message: ${error.message}`)
  }
}

console.log('\n=== Examples Complete ===')
