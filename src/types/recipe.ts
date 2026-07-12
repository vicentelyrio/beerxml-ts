import type { Equipment } from './equipment.js'
import type { Fermentable } from './fermentable.js'
import type { Hop } from './hop.js'
import type { Mash } from './mash.js'
import type { Misc } from './misc.js'
import type { Style } from './style.js'
import type { Water } from './water.js'
import type { Yeast } from './yeast.js'

/**
 * Recipe record representing a complete beer recipe
 */
export interface Recipe {
  /** Name of the recipe */
  name: string

  /** Version of the record format */
  version: number

  /** Type of recipe */
  type: 'Extract' | 'Partial Mash' | 'All Grain'

  /** Style information */
  style?: Style

  /** Equipment used */
  equipment?: Equipment

  /** Brewer's name */
  brewer: string

  /** Assistant brewer */
  asstBrewer?: string

  /** Target batch size in liters */
  batchSize: number

  /** Starting volume in the boil kettle in liters */
  boilSize: number

  /** Boil time in minutes */
  boilTime: number

  /** Efficiency percentage (0-100) */
  efficiency?: number

  /** Hops used in the recipe */
  hops: Hop[]

  /** Fermentables used in the recipe */
  fermentables: Fermentable[]

  /** Miscs used in the recipe */
  miscs?: Misc[]

  /** Yeasts used in the recipe */
  yeasts: Yeast[]

  /** Waters used in the recipe */
  waters?: Water[]

  /** Mash profile */
  mash?: Mash

  /** Notes associated with this recipe */
  notes?: string

  /** Tasting notes */
  tastingNotes?: string

  /** Rating of the recipe, a number between 0 and 50 */
  rating?: number

  /** Original gravity measured */
  og?: number

  /** Final gravity measured */
  fg?: number

  /** Fermentation stages */
  fermentationStages?: number

  /** Days in primary fermenter */
  primaryAge?: number

  /** Temperature in primary in Celsius */
  primaryTemp?: number

  /** Days in secondary fermenter */
  secondaryAge?: number

  /** Temperature in secondary in Celsius */
  secondaryTemp?: number

  /** Days in tertiary fermenter */
  tertiaryAge?: number

  /** Temperature in tertiary in Celsius */
  tertiaryTemp?: number

  /** Age in days for bottle conditioning */
  age?: number

  /** Temperature for aging in Celsius */
  ageTemp?: number

  /** Date recipe was created */
  date?: string

  /** Carbonation in volumes */
  carbonation?: number

  /** Forced carbonation */
  forcedCarbonation?: boolean

  /** Priming sugar name */
  primingSugarName?: string

  /** Temperature for carbonation in Celsius */
  carbonationTemp?: number

  /** Amount of priming sugar in kg */
  primingSugarEquiv?: number

  /** Factor for keg priming */
  kegPrimingFactor?: number
}
