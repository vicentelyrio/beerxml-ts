import type { BeerXMLMash, BeerXMLMashStep } from '../schemas/mash.js'
import type { Mash, MashStep } from '../types/mash.js'
import { parseBoolean, parseNumber, serializeBoolean } from './utils.js'

/**
 * Converts BeerXML MashStep to TypeScript MashStep
 */
export function mashStepFromXML(xml: BeerXMLMashStep): MashStep {
  return {
    name: xml.NAME,
    version: parseNumber(xml.VERSION, 'VERSION') ?? 1,
    type: xml.TYPE as MashStep['type'],
    stepTemp: parseNumber(xml.STEP_TEMP, 'STEP_TEMP') ?? 0,
    stepTime: parseNumber(xml.STEP_TIME, 'STEP_TIME') ?? 0,
    infuseAmount: parseNumber(xml.INFUSE_AMOUNT, 'INFUSE_AMOUNT'),
    infuseTemp: parseNumber(xml.INFUSE_TEMP, 'INFUSE_TEMP'),
    rampTime: parseNumber(xml.RAMP_TIME, 'RAMP_TIME'),
    endTemp: parseNumber(xml.END_TEMP, 'END_TEMP'),
    decoctionAmount: parseNumber(xml.DECOCTION_AMOUNT, 'DECOCTION_AMOUNT'),
    notes: xml.NOTES,
  }
}

/**
 * Converts TypeScript MashStep to BeerXML MashStep
 */
export function mashStepToXML(mashStep: MashStep): BeerXMLMashStep {
  return {
    NAME: mashStep.name,
    VERSION: mashStep.version,
    TYPE: mashStep.type,
    STEP_TEMP: mashStep.stepTemp,
    STEP_TIME: mashStep.stepTime,
    INFUSE_AMOUNT: mashStep.infuseAmount,
    INFUSE_TEMP: mashStep.infuseTemp,
    RAMP_TIME: mashStep.rampTime,
    END_TEMP: mashStep.endTemp,
    DECOCTION_AMOUNT: mashStep.decoctionAmount,
    NOTES: mashStep.notes,
  }
}

/**
 * Converts BeerXML Mash to TypeScript Mash
 */
export function mashFromXML(xml: BeerXMLMash): Mash {
  const mashSteps = Array.isArray(xml.MASH_STEPS?.MASH_STEP)
    ? xml.MASH_STEPS.MASH_STEP.map(mashStepFromXML)
    : xml.MASH_STEPS?.MASH_STEP
      ? [mashStepFromXML(xml.MASH_STEPS.MASH_STEP)]
      : []

  return {
    name: xml.NAME,
    version: parseNumber(xml.VERSION, 'VERSION') ?? 1,
    grainTemp: parseNumber(xml.GRAIN_TEMP, 'GRAIN_TEMP') ?? 0,
    mashSteps,
    notes: xml.NOTES,
    tunTemp: parseNumber(xml.TUN_TEMP, 'TUN_TEMP'),
    spargeTemp: parseNumber(xml.SPARGE_TEMP, 'SPARGE_TEMP'),
    ph: parseNumber(xml.PH, 'PH'),
    equipAdjust: parseBoolean(xml.EQUIP_ADJUST),
    tunWeight: parseNumber(xml.TUN_WEIGHT, 'TUN_WEIGHT'),
    tunSpecificHeat: parseNumber(xml.TUN_SPECIFIC_HEAT, 'TUN_SPECIFIC_HEAT'),
  }
}

/**
 * Converts TypeScript Mash to BeerXML Mash
 */
export function mashToXML(mash: Mash): BeerXMLMash {
  return {
    NAME: mash.name,
    VERSION: mash.version,
    GRAIN_TEMP: mash.grainTemp,
    MASH_STEPS: {
      MASH_STEP: mash.mashSteps.map(mashStepToXML),
    },
    NOTES: mash.notes,
    TUN_TEMP: mash.tunTemp,
    SPARGE_TEMP: mash.spargeTemp,
    PH: mash.ph,
    EQUIP_ADJUST: serializeBoolean(mash.equipAdjust),
    TUN_WEIGHT: mash.tunWeight,
    TUN_SPECIFIC_HEAT: mash.tunSpecificHeat,
  }
}
