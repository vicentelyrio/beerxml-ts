/**
 * BeerXML Equipment schema with UPPERCASE properties
 */
export interface BeerXMLEquipment {
  NAME: string
  VERSION: number
  BATCH_SIZE: number
  BOIL_SIZE: number
  TUN_VOLUME?: number
  TUN_WEIGHT?: number
  TUN_SPECIFIC_HEAT?: number
  TOP_UP_WATER?: number
  TRUB_CHILLER_LOSS?: number
  EVAP_RATE?: number
  BOIL_TIME?: number
  CALC_BOIL_VOLUME?: string
  LAUTER_DEADSPACE?: number
  TOP_UP_KETTLE?: number
  HOP_UTILIZATION?: number
  NOTES?: string
}
