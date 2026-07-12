/**
 * BeerXML MashStep schema with UPPERCASE properties
 */
export interface BeerXMLMashStep {
  NAME: string
  VERSION: number
  TYPE: string
  STEP_TEMP: number
  STEP_TIME: number
  INFUSE_AMOUNT?: number
  INFUSE_TEMP?: number
  RAMP_TIME?: number
  END_TEMP?: number
  DECOCTION_AMOUNT?: number
  NOTES?: string
}

/**
 * BeerXML Mash schema with UPPERCASE properties
 */
export interface BeerXMLMash {
  NAME: string
  VERSION: number
  GRAIN_TEMP: number
  MASH_STEPS: { MASH_STEP: BeerXMLMashStep[] }
  NOTES?: string
  TUN_TEMP?: number
  SPARGE_TEMP?: number
  PH?: number
  EQUIP_ADJUST?: string
  TUN_WEIGHT?: number
  TUN_SPECIFIC_HEAT?: number
}
