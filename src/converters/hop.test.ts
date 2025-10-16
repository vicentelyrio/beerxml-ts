import { describe, it, expect } from 'vitest';
import { hopFromXML, hopToXML } from './hop.js';
import type { BeerXMLHop } from '../schemas/hop.js';
import type { Hop } from '../types/hop.js';

describe('Hop Converter', () => {
  const xmlHop: BeerXMLHop = {
    NAME: 'Cascade',
    VERSION: 1,
    ALPHA: 5.5,
    AMOUNT: 0.028,
    USE: 'Boil',
    TIME: 60,
    NOTES: 'Great for American ales',
    TYPE: 'Both',
    FORM: 'Pellet',
    BETA: 5.8,
    HSI: 50,
    ORIGIN: 'US',
    SUBSTITUTES: 'Centennial',
    HUMULENE: 10,
    CARYOPHYLLENE: 5,
    COHUMULONE: 33,
    MYRCENE: 50,
  };

  const tsHop: Hop = {
    name: 'Cascade',
    version: 1,
    alpha: 5.5,
    amount: 0.028,
    use: 'Boil',
    time: 60,
    notes: 'Great for American ales',
    type: 'Both',
    form: 'Pellet',
    beta: 5.8,
    hsi: 50,
    origin: 'US',
    substitutes: 'Centennial',
    humulene: 10,
    caryophyllene: 5,
    cohumulone: 33,
    myrcene: 50,
  };

  it('should convert BeerXML hop to TypeScript hop', () => {
    const result = hopFromXML(xmlHop);
    expect(result).toEqual(tsHop);
  });

  it('should convert TypeScript hop to BeerXML hop', () => {
    const result = hopToXML(tsHop);
    expect(result).toEqual(xmlHop);
  });

  it('should handle round-trip conversion', () => {
    const converted = hopToXML(hopFromXML(xmlHop));
    expect(converted).toEqual(xmlHop);
  });

  it('should handle minimal hop data', () => {
    const minimalXml: BeerXMLHop = {
      NAME: 'Simple Hop',
      VERSION: 1,
      ALPHA: 5.0,
      AMOUNT: 0.025,
      USE: 'Boil',
      TIME: 30,
    };

    const result = hopFromXML(minimalXml);
    expect(result.name).toBe('Simple Hop');
    expect(result.alpha).toBe(5.0);
    expect(result.notes).toBeUndefined();
  });
});

