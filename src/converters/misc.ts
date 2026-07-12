import type { BeerXMLMisc } from '../schemas/misc.js'
import type { Misc } from '../types/misc.js'
import { parseBoolean, parseNumber, serializeBoolean } from './utils.js'

/**
 * Converts BeerXML Misc to TypeScript Misc
 */
export function miscFromXML(xml: BeerXMLMisc): Misc {
  return {
    name: xml.NAME,
    version: parseNumber(xml.VERSION, 'VERSION') ?? 1,
    type: xml.TYPE as Misc['type'],
    use: xml.USE as Misc['use'],
    time: parseNumber(xml.TIME, 'TIME') ?? 0,
    amount: parseNumber(xml.AMOUNT, 'AMOUNT') ?? 0,
    amountIsWeight: parseBoolean(xml.AMOUNT_IS_WEIGHT),
    useFor: xml.USE_FOR,
    notes: xml.NOTES,
  }
}

/**
 * Converts TypeScript Misc to BeerXML Misc
 */
export function miscToXML(misc: Misc): BeerXMLMisc {
  return {
    NAME: misc.name,
    VERSION: misc.version,
    TYPE: misc.type,
    USE: misc.use,
    TIME: misc.time,
    AMOUNT: misc.amount,
    AMOUNT_IS_WEIGHT: serializeBoolean(misc.amountIsWeight),
    USE_FOR: misc.useFor,
    NOTES: misc.notes,
  }
}
