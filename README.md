# beerxml-ts

A modern TypeScript library for parsing and serializing BeerXML 1.0 format. Provides bidirectional conversion between BeerXML (XML), JSON, and TypeScript objects with full type safety.

## Features

- ✅ **Full BeerXML 1.0 Support** - Complete implementation of the BeerXML specification
- ✅ **Zero Runtime Dependencies** - Lightweight with no external dependencies in production
- ✅ **Full Type Safety** - Strict TypeScript with no `any` types
- ✅ **Bidirectional Conversion** - XML ↔ TypeScript ↔ JSON without data loss
- ✅ **Developer Friendly** - Idiomatic TypeScript with camelCase properties
- ✅ **Standards Compliant** - Strict BeerXML 1.0 compliance
- ✅ **Runtime Validation** - Zod-powered validation with helpful error messages
- ✅ **Unit Conversions** - Built-in utilities for common brewing conversions

## Installation

```bash
npm install beerxml-ts
```

## Quick Start

```typescript
import { BeerXML } from 'beerxml-ts';

// Parse BeerXML
const xmlString = '<RECIPES>...</RECIPES>';
const recipe = BeerXML.parse(xmlString);

console.log(recipe.name);        // Access with camelCase
console.log(recipe.batchSize);   // TypeScript autocomplete works!

// Serialize back to XML
const xml = BeerXML.stringify(recipe);

// Validate recipe data
const result = BeerXML.validate(recipe);
if (result.valid) {
  console.log('Recipe is valid!');
}

// Convert to/from JSON
const json = BeerXML.toJSON(recipe);
const fromJson = BeerXML.fromJSON(json);
```

## API Reference

### Main API

#### `BeerXML.parse(xml: string): Recipe`

Parses a BeerXML string into a Recipe object with camelCase properties.

```typescript
const recipe = BeerXML.parse(xmlString);
console.log(recipe.name, recipe.batchSize);
```

**Throws:**
- `BeerXMLParseError` - If XML is malformed
- `BeerXMLValidationError` - If data doesn't meet BeerXML spec

#### `BeerXML.parseMultiple(xml: string): Recipe[]`

Parses a BeerXML string containing multiple recipes.

```typescript
const recipes = BeerXML.parseMultiple(xmlString);
recipes.forEach(recipe => console.log(recipe.name));
```

#### `BeerXML.stringify(recipe: Recipe): string`

Serializes a Recipe object to BeerXML format string.

```typescript
const xml = BeerXML.stringify(recipe);
```

**Throws:**
- `BeerXMLSerializationError` - If serialization fails

#### `BeerXML.stringifyMultiple(recipes: Recipe[]): string`

Serializes multiple recipes to BeerXML format.

```typescript
const xml = BeerXML.stringifyMultiple([recipe1, recipe2]);
```

#### `BeerXML.validate(data: unknown): ValidationResult`

Validates recipe data without throwing. Returns a result object with validation status and errors.

```typescript
const result = BeerXML.validate(data);
if (result.valid) {
  console.log('Valid recipe:', result.data);
} else {
  console.error('Validation errors:', result.errors);
}
```

#### `BeerXML.fromJSON(json: unknown): Recipe`

Creates a validated Recipe from JSON data.

```typescript
const recipe = BeerXML.fromJSON(jsonData);
```

**Throws:**
- `BeerXMLValidationError` - If validation fails

#### `BeerXML.toJSON(recipe: Recipe): object`

Converts a Recipe to a plain JSON object.

```typescript
const json = BeerXML.toJSON(recipe);
```

## Type System

The library provides two sets of types:

### TypeScript Types (Developer-Friendly)

Used internally and in your application code. Properties use camelCase:

```typescript
import type { Recipe, Hop, Fermentable, Yeast } from 'beerxml-ts';

const hop: Hop = {
  name: 'Cascade',
  alpha: 5.5,
  amount: 0.028,
  use: 'Boil',
  time: 60,
  // ... TypeScript autocomplete helps you!
};
```

### BeerXML Schema Types

Match the XML specification with UPPERCASE properties:

```typescript
import type { BeerXMLRecipe, BeerXMLHop } from 'beerxml-ts';

const xmlHop: BeerXMLHop = {
  NAME: 'Cascade',
  ALPHA: 5.5,
  AMOUNT: 0.028,
  // ...
};
```

## Available Types

- `Recipe` - Complete beer recipe
- `Hop` - Hop ingredient
- `Fermentable` - Fermentable ingredient (grains, sugars, extracts)
- `Yeast` - Yeast ingredient
- `Misc` - Miscellaneous ingredients (spices, finings, etc.)
- `Water` - Water profile
- `Style` - Beer style guidelines
- `Equipment` - Brewing equipment setup
- `Mash` - Mash profile with steps
- `MashStep` - Individual mash step

## Unit Conversions

Built-in utilities for common brewing calculations:

```typescript
import { volume, weight, temperature, gravity, color, bitterness } from 'beerxml-ts';

// Volume conversions
const gallons = volume.litersToGallons(19); // 5.02 gallons
const liters = volume.gallonsToLiters(5);   // 18.93 liters

// Weight conversions
const lbs = weight.kgToLbs(4.5);  // 9.92 lbs
const kg = weight.lbsToKg(10);    // 4.54 kg

// Temperature conversions
const f = temperature.celsiusToFahrenheit(20);  // 68°F
const c = temperature.fahrenheitToCelsius(68);  // 20°C

// Gravity calculations
const abv = gravity.calculateAbv(1.055, 1.010);           // 5.91%
const attenuation = gravity.calculateAttenuation(1.050, 1.010);  // 80%
const points = gravity.sgToPoints(1.050);  // 50 points

// Color conversions
const ebc = color.srmToEbc(10);        // 19.7 EBC
const lovibond = color.srmToLovibond(10);  // 7.95°L

// Bitterness calculations
const util = bitterness.tinsethUtilization(60, 1.050);
const ibu = bitterness.calculateIbu(5.5, 0.028, util, 19);
```

## Error Handling

The library provides specific error types for different failure scenarios:

```typescript
import {
  BeerXMLError,
  BeerXMLParseError,
  BeerXMLValidationError,
  BeerXMLSerializationError,
} from 'beerxml-ts';

try {
  const recipe = BeerXML.parse(xmlString);
} catch (error) {
  if (error instanceof BeerXMLParseError) {
    console.error('Parse error:', error.message, error.line, error.column);
  } else if (error instanceof BeerXMLValidationError) {
    console.error('Validation errors:', error.errors);
  }
}
```

## Examples

### Parsing a Recipe

```typescript
import { BeerXML } from 'beerxml-ts';

const xml = `
<?xml version="1.0"?>
<RECIPES>
  <RECIPE>
    <NAME>American IPA</NAME>
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
        <NAME>Pale Malt 2-Row</NAME>
        <VERSION>1</VERSION>
        <TYPE>Grain</TYPE>
        <AMOUNT>4.5</AMOUNT>
        <YIELD>80</YIELD>
        <COLOR>3</COLOR>
      </FERMENTABLE>
    </FERMENTABLES>
    <YEASTS>
      <YEAST>
        <NAME>American Ale</NAME>
        <VERSION>1</VERSION>
        <TYPE>Ale</TYPE>
        <FORM>Dry</FORM>
        <AMOUNT>0.011</AMOUNT>
      </YEAST>
    </YEASTS>
  </RECIPE>
</RECIPES>
`;

const recipe = BeerXML.parse(xml);
console.log(`Recipe: ${recipe.name}`);
console.log(`Batch Size: ${recipe.batchSize}L`);
console.log(`Hops: ${recipe.hops.length}`);
console.log(`Fermentables: ${recipe.fermentables.length}`);
```

### Creating and Serializing a Recipe

```typescript
import { BeerXML } from 'beerxml-ts';
import type { Recipe } from 'beerxml-ts';

const recipe: Recipe = {
  name: 'My Pale Ale',
  version: 1,
  type: 'All Grain',
  brewer: 'Your Name',
  batchSize: 19,
  boilSize: 23,
  boilTime: 60,
  efficiency: 75,
  hops: [
    {
      name: 'Cascade',
      version: 1,
      alpha: 5.5,
      amount: 0.028,
      use: 'Boil',
      time: 60,
    },
  ],
  fermentables: [
    {
      name: 'Pale Malt',
      version: 1,
      type: 'Grain',
      amount: 4.5,
      yield: 80,
      color: 3,
    },
  ],
  yeasts: [
    {
      name: 'US-05',
      version: 1,
      type: 'Ale',
      form: 'Dry',
      amount: 0.011,
    },
  ],
};

const xml = BeerXML.stringify(recipe);
console.log(xml);
```

### Validating Recipe Data

```typescript
import { BeerXML } from 'beerxml-ts';

const data = {
  name: 'Test Recipe',
  version: 1,
  type: 'All Grain',
  brewer: 'Brewer',
  batchSize: 20,
  boilSize: 25,
  boilTime: 60,
  hops: [],
  fermentables: [],
  yeasts: [],
};

const result = BeerXML.validate(data);

if (result.valid) {
  console.log('Recipe is valid!');
  console.log('Recipe:', result.data);
} else {
  console.error('Validation failed:');
  result.errors?.forEach(error => {
    console.error(`  ${error.path}: ${error.message}`);
  });
}
```

### Round-Trip Conversion

```typescript
import { BeerXML } from 'beerxml-ts';

// Parse XML
const originalXML = '...';
const recipe = BeerXML.parse(originalXML);

// Modify recipe
recipe.batchSize = 20;
recipe.hops.push({
  name: 'Centennial',
  version: 1,
  alpha: 10,
  amount: 0.014,
  use: 'Boil',
  time: 15,
});

// Serialize back to XML
const newXML = BeerXML.stringify(recipe);

// Parse again to verify
const verifiedRecipe = BeerXML.parse(newXML);
console.log(verifiedRecipe.hops.length); // 2
```

## Standards

This library implements the [BeerXML 1.0 Standard](http://www.beerxml.com/beerxml.htm).

### Units

BeerXML uses the following standard units:

- **Weight**: Kilograms (kg)
- **Volume**: Liters (L)
- **Temperature**: Celsius (°C)
- **Time**: Minutes
- **Gravity**: Specific gravity (e.g., 1.050)
- **Color**: Lovibond (SRM for liquid extracts)

Use the built-in conversion utilities to work with other unit systems.

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Check TypeScript
npm run lint

# Build
npm run build
```

## Contributing

Contributions are welcome! Please ensure:

1. All tests pass
2. No TypeScript errors
3. Follow the existing code style
4. Add tests for new features
5. Update documentation

## License

MIT

## Credits

Built with TypeScript, Vitest, Zod, and fast-xml-parser.

