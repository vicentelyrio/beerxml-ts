import { describe, expect, it } from 'vitest'
import {
  bitterness,
  color,
  gravity,
  temperature,
  volume,
  weight,
} from './conversions.js'

describe('Volume Conversions', () => {
  it('should convert liters to gallons', () => {
    expect(volume.litersToGallons(3.78541)).toBeCloseTo(1, 2)
  })

  it('should convert gallons to liters', () => {
    expect(volume.gallonsToLiters(1)).toBeCloseTo(3.78541, 2)
  })

  it('should handle round-trip conversion', () => {
    const liters = 20
    const result = volume.gallonsToLiters(volume.litersToGallons(liters))
    expect(result).toBeCloseTo(liters, 2)
  })
})

describe('Weight Conversions', () => {
  it('should convert kg to lbs', () => {
    expect(weight.kgToLbs(1)).toBeCloseTo(2.20462, 2)
  })

  it('should convert lbs to kg', () => {
    expect(weight.lbsToKg(2.20462)).toBeCloseTo(1, 2)
  })

  it('should convert kg to grams', () => {
    expect(weight.kgToGrams(1)).toBe(1000)
  })

  it('should convert grams to kg', () => {
    expect(weight.gramsToKg(1000)).toBe(1)
  })
})

describe('Temperature Conversions', () => {
  it('should convert Celsius to Fahrenheit', () => {
    expect(temperature.celsiusToFahrenheit(0)).toBe(32)
    expect(temperature.celsiusToFahrenheit(100)).toBe(212)
  })

  it('should convert Fahrenheit to Celsius', () => {
    expect(temperature.fahrenheitToCelsius(32)).toBe(0)
    expect(temperature.fahrenheitToCelsius(212)).toBe(100)
  })

  it('should convert Celsius to Kelvin', () => {
    expect(temperature.celsiusToKelvin(0)).toBe(273.15)
  })

  it('should convert Kelvin to Celsius', () => {
    expect(temperature.kelvinToCelsius(273.15)).toBe(0)
  })
})

describe('Gravity Calculations', () => {
  it('should convert SG to Plato', () => {
    const plato = gravity.sgToPlato(1.048)
    expect(plato).toBeCloseTo(12, 0)
  })

  it('should convert SG to points', () => {
    expect(gravity.sgToPoints(1.05)).toBeCloseTo(50, 5)
  })

  it('should convert points to SG', () => {
    expect(gravity.pointsToSg(50)).toBe(1.05)
  })

  it('should calculate ABV', () => {
    const abv = gravity.calculateAbv(1.055, 1.01)
    expect(abv).toBeCloseTo(5.91, 1)
  })

  it('should calculate attenuation', () => {
    const attenuation = gravity.calculateAttenuation(1.05, 1.01)
    expect(attenuation).toBeCloseTo(80, 0)
  })
})

describe('Color Conversions', () => {
  it('should convert SRM to Lovibond', () => {
    const lovibond = color.srmToLovibond(10)
    expect(lovibond).toBeGreaterThan(7)
  })

  it('should convert Lovibond to SRM', () => {
    const srm = color.lovibondToSrm(8)
    expect(srm).toBeGreaterThan(9)
  })

  it('should convert SRM to EBC', () => {
    expect(color.srmToEbc(10)).toBeCloseTo(19.7, 1)
  })

  it('should convert EBC to SRM', () => {
    expect(color.ebcToSrm(19.7)).toBeCloseTo(10, 1)
  })

  it('should calculate SRM from MCU', () => {
    const srm = color.calculateSrm(10)
    expect(srm).toBeGreaterThan(0)
    expect(srm).toBeLessThan(20)
  })
})

describe('Bitterness Calculations', () => {
  it('should calculate Tinseth utilization', () => {
    const util = bitterness.tinsethUtilization(60, 1.05)
    expect(util).toBeGreaterThan(0)
    expect(util).toBeLessThan(1)
  })

  it('should calculate IBU contribution', () => {
    const ibu = bitterness.calculateIbu(5.5, 0.028, 0.25, 19)
    expect(ibu).toBeGreaterThan(0)
    expect(ibu).toBeLessThan(50)
  })

  it('should match real-world IBU for 1oz 5.5% AA hops, 60 min boil, 5 gal batch', () => {
    const util = bitterness.tinsethUtilization(60, 1.05)
    const ibu = bitterness.calculateIbu(5.5, 0.0283495, util, 18.9271)
    expect(ibu).toBeCloseTo(19, 0)
  })

  it('should show utilization increases with time', () => {
    const util30 = bitterness.tinsethUtilization(30, 1.05)
    const util60 = bitterness.tinsethUtilization(60, 1.05)
    expect(util60).toBeGreaterThan(util30)
  })
})
