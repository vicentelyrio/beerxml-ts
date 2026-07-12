/**
 * BeerXML Misc schema with UPPERCASE properties
 */
export interface BeerXMLMisc {
  NAME: string
  VERSION: number
  TYPE: string
  USE: string
  TIME: number
  AMOUNT: number
  AMOUNT_IS_WEIGHT?: string
  USE_FOR?: string
  NOTES?: string
}
