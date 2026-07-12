import type { BeerXMLHop } from '../schemas/hop.js'
import type { Hop } from '../types/hop.js'
import { parseNumber } from './utils.js'

/**
 * Converts BeerXML Hop to TypeScript Hop
 * @param xml - BeerXML hop data with UPPERCASE properties
 * @returns Hop object with camelCase properties
 */
export function hopFromXML(xml: BeerXMLHop): Hop {
  return {
    name: xml.NAME,
    version: parseNumber(xml.VERSION, 'VERSION') ?? 1,
    alpha: parseNumber(xml.ALPHA, 'ALPHA') ?? 0,
    amount: parseNumber(xml.AMOUNT, 'AMOUNT') ?? 0,
    use: xml.USE as Hop['use'],
    time: parseNumber(xml.TIME, 'TIME') ?? 0,
    notes: xml.NOTES,
    type: xml.TYPE as Hop['type'],
    form: xml.FORM as Hop['form'],
    beta: parseNumber(xml.BETA, 'BETA'),
    hsi: parseNumber(xml.HSI, 'HSI'),
    origin: xml.ORIGIN,
    substitutes: xml.SUBSTITUTES,
    humulene: parseNumber(xml.HUMULENE, 'HUMULENE'),
    caryophyllene: parseNumber(xml.CARYOPHYLLENE, 'CARYOPHYLLENE'),
    cohumulone: parseNumber(xml.COHUMULONE, 'COHUMULONE'),
    myrcene: parseNumber(xml.MYRCENE, 'MYRCENE'),
  }
}

/**
 * Converts TypeScript Hop to BeerXML Hop
 * @param hop - Hop object with camelCase properties
 * @returns BeerXML hop data with UPPERCASE properties
 */
export function hopToXML(hop: Hop): BeerXMLHop {
  return {
    NAME: hop.name,
    VERSION: hop.version,
    ALPHA: hop.alpha,
    AMOUNT: hop.amount,
    USE: hop.use,
    TIME: hop.time,
    NOTES: hop.notes,
    TYPE: hop.type,
    FORM: hop.form,
    BETA: hop.beta,
    HSI: hop.hsi,
    ORIGIN: hop.origin,
    SUBSTITUTES: hop.substitutes,
    HUMULENE: hop.humulene,
    CARYOPHYLLENE: hop.caryophyllene,
    COHUMULONE: hop.cohumulone,
    MYRCENE: hop.myrcene,
  }
}
