/**
 * Equipment record representing brewing equipment setup
 */
export interface Equipment {
  /** Name of the equipment setup */
  name: string

  /** Version of the record format */
  version: number

  /** Batch size in liters */
  batchSize: number

  /** Boil size in liters (pre-boil volume) */
  boilSize: number

  /** Volume in liters of the mash tun */
  tunVolume?: number

  /** Weight of the tun in kg */
  tunWeight?: number

  /** Specific heat of the tun material in Cal/(g*C) */
  tunSpecificHeat?: number

  /** Volume of top up water added to the fermenter in liters */
  topUpWater?: number

  /** Trub and chiller loss volume in liters */
  trubChillerLoss?: number

  /** Evaporation rate as percentage per hour */
  evapRate?: number

  /** Normal boil time in minutes */
  boilTime?: number

  /** TRUE if the volume is calculated at boil temp */
  calcBoilVolume?: boolean

  /** Volume lost due to the deadspace of the lauter tun in liters */
  lauterDeadspace?: number

  /** Volume of water added to the boil kettle in liters */
  topUpKettle?: number

  /** Hop utilization percentage (typical 100%) */
  hopUtilization?: number

  /** Optional notes */
  notes?: string
}
