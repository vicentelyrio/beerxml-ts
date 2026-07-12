import type { BeerXMLYeast } from '../schemas/yeast.js'
import type { Yeast } from '../types/yeast.js'
import { parseBoolean, parseNumber, serializeBoolean } from './utils.js'

/**
 * Converts BeerXML Yeast to TypeScript Yeast
 */
export function yeastFromXML(xml: BeerXMLYeast): Yeast {
  return {
    name: xml.NAME,
    version: parseNumber(xml.VERSION, 'VERSION') ?? 1,
    type: xml.TYPE as Yeast['type'],
    form: xml.FORM as Yeast['form'],
    amount: parseNumber(xml.AMOUNT, 'AMOUNT') ?? 0,
    amountIsWeight: parseBoolean(xml.AMOUNT_IS_WEIGHT),
    laboratory: xml.LABORATORY,
    productId: xml.PRODUCT_ID,
    minTemperature: parseNumber(xml.MIN_TEMPERATURE, 'MIN_TEMPERATURE'),
    maxTemperature: parseNumber(xml.MAX_TEMPERATURE, 'MAX_TEMPERATURE'),
    flocculation: xml.FLOCCULATION as Yeast['flocculation'],
    attenuation: parseNumber(xml.ATTENUATION, 'ATTENUATION'),
    notes: xml.NOTES,
    bestFor: xml.BEST_FOR,
    timesCultured: parseNumber(xml.TIMES_CULTURED, 'TIMES_CULTURED'),
    maxReuse: parseNumber(xml.MAX_REUSE, 'MAX_REUSE'),
    addToSecondary: parseBoolean(xml.ADD_TO_SECONDARY),
  }
}

/**
 * Converts TypeScript Yeast to BeerXML Yeast
 */
export function yeastToXML(yeast: Yeast): BeerXMLYeast {
  return {
    NAME: yeast.name,
    VERSION: yeast.version,
    TYPE: yeast.type,
    FORM: yeast.form,
    AMOUNT: yeast.amount,
    AMOUNT_IS_WEIGHT: serializeBoolean(yeast.amountIsWeight),
    LABORATORY: yeast.laboratory,
    PRODUCT_ID: yeast.productId,
    MIN_TEMPERATURE: yeast.minTemperature,
    MAX_TEMPERATURE: yeast.maxTemperature,
    FLOCCULATION: yeast.flocculation,
    ATTENUATION: yeast.attenuation,
    NOTES: yeast.notes,
    BEST_FOR: yeast.bestFor,
    TIMES_CULTURED: yeast.timesCultured,
    MAX_REUSE: yeast.maxReuse,
    ADD_TO_SECONDARY: serializeBoolean(yeast.addToSecondary),
  }
}
