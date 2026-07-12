import { describe, expect, it } from 'vitest'
import type { BeerXMLMash, BeerXMLMashStep } from '../schemas/mash.js'
import type { Mash, MashStep } from '../types/mash.js'
import {
  mashFromXML,
  mashStepFromXML,
  mashStepToXML,
  mashToXML,
} from './mash.js'

describe('Mash Converter', () => {
  const xmlMashStep: BeerXMLMashStep = {
    NAME: 'Saccharification',
    VERSION: 1,
    TYPE: 'Infusion',
    STEP_TEMP: 68,
    STEP_TIME: 60,
    INFUSE_AMOUNT: 10,
    INFUSE_TEMP: 74,
    RAMP_TIME: 5,
    END_TEMP: 68,
    NOTES: 'Main conversion step',
  }

  const tsMashStep: MashStep = {
    name: 'Saccharification',
    version: 1,
    type: 'Infusion',
    stepTemp: 68,
    stepTime: 60,
    infuseAmount: 10,
    infuseTemp: 74,
    rampTime: 5,
    endTemp: 68,
    notes: 'Main conversion step',
  }

  const xmlMash: BeerXMLMash = {
    NAME: 'Single Infusion',
    VERSION: 1,
    GRAIN_TEMP: 22,
    MASH_STEPS: { MASH_STEP: [xmlMashStep] },
    TUN_TEMP: 22,
    SPARGE_TEMP: 76,
    PH: 5.4,
    TUN_WEIGHT: 5,
    TUN_SPECIFIC_HEAT: 0.3,
  }

  const tsMash: Mash = {
    name: 'Single Infusion',
    version: 1,
    grainTemp: 22,
    mashSteps: [tsMashStep],
    tunTemp: 22,
    spargeTemp: 76,
    ph: 5.4,
    tunWeight: 5,
    tunSpecificHeat: 0.3,
  }

  it('should convert BeerXML mash step to TypeScript mash step', () => {
    expect(mashStepFromXML(xmlMashStep)).toEqual(tsMashStep)
  })

  it('should convert TypeScript mash step to BeerXML mash step', () => {
    expect(mashStepToXML(tsMashStep)).toEqual(xmlMashStep)
  })

  it('should convert BeerXML mash to TypeScript mash, including pH', () => {
    const result = mashFromXML(xmlMash)
    expect(result).toEqual(tsMash)
    expect(result.ph).toBe(5.4)
  })

  it('should convert TypeScript mash to BeerXML mash, including pH', () => {
    expect(mashToXML(tsMash)).toEqual(xmlMash)
  })

  it('should handle round-trip conversion', () => {
    const converted = mashToXML(mashFromXML(xmlMash))
    expect(converted).toEqual(xmlMash)
  })
})
