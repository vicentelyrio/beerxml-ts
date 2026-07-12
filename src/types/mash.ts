/**
 * Mash step in a mash profile
 */
export interface MashStep {
  /** Name of the mash step */
  name: string

  /** Version of the record format */
  version: number

  /** Type of step */
  type: 'Infusion' | 'Temperature' | 'Decoction'

  /** Target temperature for this step in Celsius */
  stepTemp: number

  /** Number of minutes to spend at this step */
  stepTime: number

  /** Amount of water in liters to add for infusion */
  infuseAmount?: number

  /** Temperature of water for infusion in Celsius */
  infuseTemp?: number

  /** Time in minutes to achieve step temperature */
  rampTime?: number

  /** Expected temperature of the mash after this step in Celsius */
  endTemp?: number

  /** Volume to decoct in liters */
  decoctionAmount?: number

  /** Optional notes */
  notes?: string
}

/**
 * Mash profile containing multiple mash steps
 */
export interface Mash {
  /** Name of the mash profile */
  name: string

  /** Version of the record format */
  version: number

  /** Grain temperature in Celsius */
  grainTemp: number

  /** Array of mash steps */
  mashSteps: MashStep[]

  /** Optional notes */
  notes?: string

  /** Grain tun temperature in Celsius */
  tunTemp?: number

  /** Temperature of the sparge water in Celsius */
  spargeTemp?: number

  /** pH of the sparge */
  ph?: number

  /** TRUE if the program should account for equipment thermal effects */
  equipAdjust?: boolean

  /** Weight of the tun in kg */
  tunWeight?: number

  /** Specific heat of the tun material in Cal/(g*C) */
  tunSpecificHeat?: number
}
