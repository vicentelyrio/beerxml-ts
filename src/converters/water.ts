import type { Water } from '../types/water.js';
import type { BeerXMLWater } from '../schemas/water.js';
import { parseNumber } from './utils.js';

/**
 * Converts BeerXML Water to TypeScript Water
 */
export function waterFromXML(xml: BeerXMLWater): Water {
  return {
    name: xml.NAME,
    version: parseNumber(xml.VERSION, 'VERSION') ?? 1,
    amount: parseNumber(xml.AMOUNT, 'AMOUNT') ?? 0,
    calcium: parseNumber(xml.CALCIUM, 'CALCIUM') ?? 0,
    bicarbonate: parseNumber(xml.BICARBONATE, 'BICARBONATE') ?? 0,
    sulfate: parseNumber(xml.SULFATE, 'SULFATE') ?? 0,
    chloride: parseNumber(xml.CHLORIDE, 'CHLORIDE') ?? 0,
    sodium: parseNumber(xml.SODIUM, 'SODIUM') ?? 0,
    magnesium: parseNumber(xml.MAGNESIUM, 'MAGNESIUM') ?? 0,
    ph: parseNumber(xml.PH, 'PH'),
    notes: xml.NOTES,
  };
}

/**
 * Converts TypeScript Water to BeerXML Water
 */
export function waterToXML(water: Water): BeerXMLWater {
  return {
    NAME: water.name,
    VERSION: water.version,
    AMOUNT: water.amount,
    CALCIUM: water.calcium,
    BICARBONATE: water.bicarbonate,
    SULFATE: water.sulfate,
    CHLORIDE: water.chloride,
    SODIUM: water.sodium,
    MAGNESIUM: water.magnesium,
    PH: water.ph,
    NOTES: water.notes,
  };
}

