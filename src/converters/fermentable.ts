import type { Fermentable } from '../types/fermentable.js';
import type { BeerXMLFermentable } from '../schemas/fermentable.js';
import { parseNumber, parseBoolean, serializeBoolean } from './utils.js';

/**
 * Converts BeerXML Fermentable to TypeScript Fermentable
 */
export function fermentableFromXML(xml: BeerXMLFermentable): Fermentable {
  return {
    name: xml.NAME,
    version: parseNumber(xml.VERSION, 'VERSION') ?? 1,
    type: xml.TYPE as Fermentable['type'],
    amount: parseNumber(xml.AMOUNT, 'AMOUNT') ?? 0,
    yield: parseNumber(xml.YIELD, 'YIELD') ?? 0,
    color: parseNumber(xml.COLOR, 'COLOR') ?? 0,
    addAfterBoil: parseBoolean(xml.ADD_AFTER_BOIL),
    origin: xml.ORIGIN,
    supplier: xml.SUPPLIER,
    notes: xml.NOTES,
    coarseFineDiff: parseNumber(xml.COARSE_FINE_DIFF, 'COARSE_FINE_DIFF'),
    moisture: parseNumber(xml.MOISTURE, 'MOISTURE'),
    diastaticPower: parseNumber(xml.DIASTATIC_POWER, 'DIASTATIC_POWER'),
    protein: parseNumber(xml.PROTEIN, 'PROTEIN'),
    maxInBatch: parseNumber(xml.MAX_IN_BATCH, 'MAX_IN_BATCH'),
    recommendMash: parseBoolean(xml.RECOMMEND_MASH),
    ibuGalPerLb: parseNumber(xml.IBU_GAL_PER_LB, 'IBU_GAL_PER_LB'),
  };
}

/**
 * Converts TypeScript Fermentable to BeerXML Fermentable
 */
export function fermentableToXML(fermentable: Fermentable): BeerXMLFermentable {
  return {
    NAME: fermentable.name,
    VERSION: fermentable.version,
    TYPE: fermentable.type,
    AMOUNT: fermentable.amount,
    YIELD: fermentable.yield,
    COLOR: fermentable.color,
    ADD_AFTER_BOIL: serializeBoolean(fermentable.addAfterBoil),
    ORIGIN: fermentable.origin,
    SUPPLIER: fermentable.supplier,
    NOTES: fermentable.notes,
    COARSE_FINE_DIFF: fermentable.coarseFineDiff,
    MOISTURE: fermentable.moisture,
    DIASTATIC_POWER: fermentable.diastaticPower,
    PROTEIN: fermentable.protein,
    MAX_IN_BATCH: fermentable.maxInBatch,
    RECOMMEND_MASH: serializeBoolean(fermentable.recommendMash),
    IBU_GAL_PER_LB: fermentable.ibuGalPerLb,
  };
}

