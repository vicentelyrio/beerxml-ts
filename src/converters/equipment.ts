import type { BeerXMLEquipment } from '../schemas/equipment.js'
import type { Equipment } from '../types/equipment.js'
import { parseBoolean, parseNumber, serializeBoolean } from './utils.js'

/**
 * Converts BeerXML Equipment to TypeScript Equipment
 */
export function equipmentFromXML(xml: BeerXMLEquipment): Equipment {
  return {
    name: xml.NAME,
    version: parseNumber(xml.VERSION, 'VERSION') ?? 1,
    batchSize: parseNumber(xml.BATCH_SIZE, 'BATCH_SIZE') ?? 0,
    boilSize: parseNumber(xml.BOIL_SIZE, 'BOIL_SIZE') ?? 0,
    tunVolume: parseNumber(xml.TUN_VOLUME, 'TUN_VOLUME'),
    tunWeight: parseNumber(xml.TUN_WEIGHT, 'TUN_WEIGHT'),
    tunSpecificHeat: parseNumber(xml.TUN_SPECIFIC_HEAT, 'TUN_SPECIFIC_HEAT'),
    topUpWater: parseNumber(xml.TOP_UP_WATER, 'TOP_UP_WATER'),
    trubChillerLoss: parseNumber(xml.TRUB_CHILLER_LOSS, 'TRUB_CHILLER_LOSS'),
    evapRate: parseNumber(xml.EVAP_RATE, 'EVAP_RATE'),
    boilTime: parseNumber(xml.BOIL_TIME, 'BOIL_TIME'),
    calcBoilVolume: parseBoolean(xml.CALC_BOIL_VOLUME),
    lauterDeadspace: parseNumber(xml.LAUTER_DEADSPACE, 'LAUTER_DEADSPACE'),
    topUpKettle: parseNumber(xml.TOP_UP_KETTLE, 'TOP_UP_KETTLE'),
    hopUtilization: parseNumber(xml.HOP_UTILIZATION, 'HOP_UTILIZATION'),
    notes: xml.NOTES,
  }
}

/**
 * Converts TypeScript Equipment to BeerXML Equipment
 */
export function equipmentToXML(equipment: Equipment): BeerXMLEquipment {
  return {
    NAME: equipment.name,
    VERSION: equipment.version,
    BATCH_SIZE: equipment.batchSize,
    BOIL_SIZE: equipment.boilSize,
    TUN_VOLUME: equipment.tunVolume,
    TUN_WEIGHT: equipment.tunWeight,
    TUN_SPECIFIC_HEAT: equipment.tunSpecificHeat,
    TOP_UP_WATER: equipment.topUpWater,
    TRUB_CHILLER_LOSS: equipment.trubChillerLoss,
    EVAP_RATE: equipment.evapRate,
    BOIL_TIME: equipment.boilTime,
    CALC_BOIL_VOLUME: serializeBoolean(equipment.calcBoilVolume),
    LAUTER_DEADSPACE: equipment.lauterDeadspace,
    TOP_UP_KETTLE: equipment.topUpKettle,
    HOP_UTILIZATION: equipment.hopUtilization,
    NOTES: equipment.notes,
  }
}
