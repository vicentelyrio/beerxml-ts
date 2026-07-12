import type { BeerXMLEquipment } from './equipment.js'
import type { BeerXMLFermentable } from './fermentable.js'
import type { BeerXMLHop } from './hop.js'
import type { BeerXMLMash } from './mash.js'
import type { BeerXMLMisc } from './misc.js'
import type { BeerXMLStyle } from './style.js'
import type { BeerXMLWater } from './water.js'
import type { BeerXMLYeast } from './yeast.js'

/**
 * BeerXML Recipe schema with UPPERCASE properties
 */
export interface BeerXMLRecipe {
  NAME: string
  VERSION: number
  TYPE: string
  STYLE?: BeerXMLStyle
  EQUIPMENT?: BeerXMLEquipment
  BREWER: string
  ASST_BREWER?: string
  BATCH_SIZE: number
  BOIL_SIZE: number
  BOIL_TIME: number
  EFFICIENCY?: number
  HOPS: { HOP: BeerXMLHop[] }
  FERMENTABLES: { FERMENTABLE: BeerXMLFermentable[] }
  MISCS?: { MISC: BeerXMLMisc[] }
  YEASTS: { YEAST: BeerXMLYeast[] }
  WATERS?: { WATER: BeerXMLWater[] }
  MASH?: BeerXMLMash
  NOTES?: string
  TASTE_NOTES?: string
  TASTE_RATING?: number
  OG?: number
  FG?: number
  FERMENTATION_STAGES?: number
  PRIMARY_AGE?: number
  PRIMARY_TEMP?: number
  SECONDARY_AGE?: number
  SECONDARY_TEMP?: number
  TERTIARY_AGE?: number
  TERTIARY_TEMP?: number
  AGE?: number
  AGE_TEMP?: number
  DATE?: string
  CARBONATION?: number
  FORCED_CARBONATION?: string
  PRIMING_SUGAR_NAME?: string
  CARBONATION_TEMP?: number
  PRIMING_SUGAR_EQUIV?: number
  KEG_PRIMING_FACTOR?: number
}
