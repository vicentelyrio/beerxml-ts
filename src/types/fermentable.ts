/**
 * Fermentable record representing fermentable ingredients
 */
export interface Fermentable {
  /** Name of the fermentable */
  name: string;
  
  /** Version of the record format */
  version: number;
  
  /** Type of fermentable */
  type: 'Grain' | 'Sugar' | 'Extract' | 'Dry Extract' | 'Adjunct';
  
  /** Amount in kilograms */
  amount: number;
  
  /** Yield percentage (0-100) for grains */
  yield: number;
  
  /** Color in Lovibond */
  color: number;
  
  /** TRUE if added after the boil */
  addAfterBoil?: boolean;
  
  /** Origin of the fermentable */
  origin?: string;
  
  /** Supplier of the fermentable */
  supplier?: string;
  
  /** Optional notes */
  notes?: string;
  
  /** Percent of solids in fermentable that are coarse grain (0-100) */
  coarseFineDiff?: number;
  
  /** Moisture content (0-100) */
  moisture?: number;
  
  /** Diastatic power in Lintner */
  diastaticPower?: number;
  
  /** Protein content (0-100) */
  protein?: number;
  
  /** Maximum recommended usage (0-100) */
  maxInBatch?: number;
  
  /** TRUE if ingredient should be mashed */
  recommendMash?: boolean;
  
  /** IBU contribution from this ingredient for a gallon of water */
  ibuGalPerLb?: number;
}

