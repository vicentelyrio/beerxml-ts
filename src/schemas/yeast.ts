/**
 * BeerXML Yeast schema with UPPERCASE properties
 */
export interface BeerXMLYeast {
  NAME: string;
  VERSION: number;
  TYPE: string;
  FORM: string;
  AMOUNT: number;
  AMOUNT_IS_WEIGHT?: string;
  LABORATORY?: string;
  PRODUCT_ID?: string;
  MIN_TEMPERATURE?: number;
  MAX_TEMPERATURE?: number;
  FLOCCULATION?: string;
  ATTENUATION?: number;
  NOTES?: string;
  BEST_FOR?: string;
  TIMES_CULTURED?: number;
  MAX_REUSE?: number;
  ADD_TO_SECONDARY?: string;
}

