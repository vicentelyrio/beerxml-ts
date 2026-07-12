/**
 * Hop record representing hop additions in a beer recipe
 */
export interface Hop {
  /** Name of the hop */
  name: string

  /** Version of the record format (always 1 for BeerXML 1.0) */
  version: number

  /** Percent alpha acid of the hop (0-100) */
  alpha: number

  /** Amount in kilograms */
  amount: number

  /** How the hop is used */
  use: 'Boil' | 'Dry Hop' | 'Mash' | 'First Wort' | 'Aroma'

  /** Time in minutes the hop is boiled, steeped, or used */
  time: number

  /** Optional notes */
  notes?: string

  /** Type of hop */
  type?: 'Bittering' | 'Aroma' | 'Both'

  /** Form of the hop */
  form?: 'Pellet' | 'Plug' | 'Leaf'

  /** Percent beta acid (0-100) */
  beta?: number

  /** Hop Stability Index - percent alpha acid lost per 6 months of storage */
  hsi?: number

  /** Origin of the hop */
  origin?: string

  /** Substitutes that can be used for this hop */
  substitutes?: string

  /** Humulene percentage (0-100) */
  humulene?: number

  /** Caryophyllene percentage (0-100) */
  caryophyllene?: number

  /** Cohumulone percentage (0-100) */
  cohumulone?: number

  /** Myrcene percentage (0-100) */
  myrcene?: number
}
