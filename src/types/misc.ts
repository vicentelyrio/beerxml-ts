/**
 * Miscellaneous ingredient record for spices, water agents, etc.
 */
export interface Misc {
  /** Name of the misc ingredient */
  name: string

  /** Version of the record format */
  version: number

  /** Type of ingredient */
  type: 'Spice' | 'Fining' | 'Water Agent' | 'Herb' | 'Flavor' | 'Other'

  /** How the ingredient is used */
  use: 'Boil' | 'Mash' | 'Primary' | 'Secondary' | 'Bottling'

  /** Time in minutes ingredient is used (for boil) */
  time: number

  /** Amount in kg or liters */
  amount: number

  /** TRUE if amount is weight (kg), FALSE if volume (liters) */
  amountIsWeight?: boolean

  /** Short description of what the ingredient is used for */
  useFor?: string

  /** Optional notes */
  notes?: string
}
