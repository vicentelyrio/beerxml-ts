/**
 * BeerXML Hop schema with UPPERCASE properties matching BeerXML 1.0 spec
 */
export interface BeerXMLHop {
  NAME: string
  VERSION: number
  ALPHA: number
  AMOUNT: number
  USE: string
  TIME: number
  NOTES?: string
  TYPE?: string
  FORM?: string
  BETA?: number
  HSI?: number
  ORIGIN?: string
  SUBSTITUTES?: string
  HUMULENE?: number
  CARYOPHYLLENE?: number
  COHUMULONE?: number
  MYRCENE?: number
}
