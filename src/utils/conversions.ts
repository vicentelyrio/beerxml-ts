/**
 * Unit conversion utilities for brewing calculations
 * BeerXML uses: kg, liters, Celsius, specific gravity
 */

/**
 * Volume conversions
 */
export const volume = {
  /**
   * Converts liters to US gallons
   */
  litersToGallons(liters: number): number {
    return liters * 0.264172;
  },

  /**
   * Converts US gallons to liters
   */
  gallonsToLiters(gallons: number): number {
    return gallons * 3.78541;
  },

  /**
   * Converts liters to UK gallons
   */
  litersToUkGallons(liters: number): number {
    return liters * 0.219969;
  },

  /**
   * Converts UK gallons to liters
   */
  ukGallonsToLiters(ukGallons: number): number {
    return ukGallons * 4.54609;
  },
};

/**
 * Weight conversions
 */
export const weight = {
  /**
   * Converts kilograms to pounds
   */
  kgToLbs(kg: number): number {
    return kg * 2.20462;
  },

  /**
   * Converts pounds to kilograms
   */
  lbsToKg(lbs: number): number {
    return lbs * 0.453592;
  },

  /**
   * Converts kilograms to ounces
   */
  kgToOz(kg: number): number {
    return kg * 35.274;
  },

  /**
   * Converts ounces to kilograms
   */
  ozToKg(oz: number): number {
    return oz * 0.0283495;
  },

  /**
   * Converts kilograms to grams
   */
  kgToGrams(kg: number): number {
    return kg * 1000;
  },

  /**
   * Converts grams to kilograms
   */
  gramsToKg(grams: number): number {
    return grams / 1000;
  },
};

/**
 * Temperature conversions
 */
export const temperature = {
  /**
   * Converts Celsius to Fahrenheit
   */
  celsiusToFahrenheit(celsius: number): number {
    return (celsius * 9) / 5 + 32;
  },

  /**
   * Converts Fahrenheit to Celsius
   */
  fahrenheitToCelsius(fahrenheit: number): number {
    return ((fahrenheit - 32) * 5) / 9;
  },

  /**
   * Converts Celsius to Kelvin
   */
  celsiusToKelvin(celsius: number): number {
    return celsius + 273.15;
  },

  /**
   * Converts Kelvin to Celsius
   */
  kelvinToCelsius(kelvin: number): number {
    return kelvin - 273.15;
  },
};

/**
 * Gravity conversions and calculations
 */
export const gravity = {
  /**
   * Converts specific gravity to Plato
   * Plato = (-463.37) + (668.72 * SG) - (205.35 * SG^2)
   */
  sgToPlato(sg: number): number {
    return -463.37 + 668.72 * sg - 205.35 * sg * sg;
  },

  /**
   * Converts Plato to specific gravity
   * SG = 1 + (Plato / (258.6 - ((Plato / 258.2) * 227.1)))
   */
  platoToSg(plato: number): number {
    return 1 + plato / (258.6 - (plato / 258.2) * 227.1);
  },

  /**
   * Converts specific gravity to gravity points
   * Points = (SG - 1) * 1000
   */
  sgToPoints(sg: number): number {
    return (sg - 1) * 1000;
  },

  /**
   * Converts gravity points to specific gravity
   * SG = 1 + (Points / 1000)
   */
  pointsToSg(points: number): number {
    return 1 + points / 1000;
  },

  /**
   * Calculates ABV from original and final gravity
   * ABV = (OG - FG) * 131.25
   */
  calculateAbv(og: number, fg: number): number {
    return (og - fg) * 131.25;
  },

  /**
   * Calculates attenuation percentage
   * Attenuation = ((OG - FG) / (OG - 1)) * 100
   */
  calculateAttenuation(og: number, fg: number): number {
    return ((og - fg) / (og - 1)) * 100;
  },
};

/**
 * Color conversions (SRM/Lovibond/EBC)
 */
export const color = {
  /**
   * Converts SRM to Lovibond
   * Lovibond = (SRM + 0.76) / 1.3546
   */
  srmToLovibond(srm: number): number {
    return (srm + 0.76) / 1.3546;
  },

  /**
   * Converts Lovibond to SRM
   * SRM = 1.3546 * Lovibond - 0.76
   */
  lovibondToSrm(lovibond: number): number {
    return 1.3546 * lovibond - 0.76;
  },

  /**
   * Converts SRM to EBC
   * EBC = SRM * 1.97
   */
  srmToEbc(srm: number): number {
    return srm * 1.97;
  },

  /**
   * Converts EBC to SRM
   * SRM = EBC / 1.97
   */
  ebcToSrm(ebc: number): number {
    return ebc / 1.97;
  },

  /**
   * Calculates beer color using Morey equation
   * MCU = (grain_color * grain_weight_lbs) / volume_gallons
   * SRM = 1.4922 * (MCU ^ 0.6859)
   */
  calculateSrm(mcuTotal: number): number {
    return 1.4922 * Math.pow(mcuTotal, 0.6859);
  },
};

/**
 * Bitterness calculations
 */
export const bitterness = {
  /**
   * Calculates hop utilization using Tinseth formula
   * Utilization = f(gravity) * f(time)
   * f(gravity) = 1.65 * 0.000125^(gravity - 1)
   * f(time) = (1 - e^(-0.04 * time)) / 4.15
   */
  tinsethUtilization(boilTime: number, gravity: number): number {
    const fGravity = 1.65 * Math.pow(0.000125, gravity - 1);
    const fTime = (1 - Math.exp(-0.04 * boilTime)) / 4.15;
    return fGravity * fTime;
  },

  /**
   * Calculates IBU contribution from a hop addition
   * IBU = (AA% * weight_oz * utilization * 7489) / (volume_gal * (1 + correction))
   * Simplified: IBU = (AA% * weight_grams * utilization) / (volume_liters * 10)
   */
  calculateIbu(
    alphaAcid: number,
    weightKg: number,
    utilization: number,
    volumeLiters: number
  ): number {
    return (alphaAcid * weightKg * 1000 * utilization) / (volumeLiters * 10);
  },
};

