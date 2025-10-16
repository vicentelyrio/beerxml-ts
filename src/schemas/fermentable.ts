/**
 * BeerXML Fermentable schema with UPPERCASE properties
 */
export interface BeerXMLFermentable {
  NAME: string;
  VERSION: number;
  TYPE: string;
  AMOUNT: number;
  YIELD: number;
  COLOR: number;
  ADD_AFTER_BOIL?: string;
  ORIGIN?: string;
  SUPPLIER?: string;
  NOTES?: string;
  COARSE_FINE_DIFF?: number;
  MOISTURE?: number;
  DIASTATIC_POWER?: number;
  PROTEIN?: number;
  MAX_IN_BATCH?: number;
  RECOMMEND_MASH?: string;
  IBU_GAL_PER_LB?: number;
}

