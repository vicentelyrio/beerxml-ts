/**
 * Water record representing water profile for brewing
 */
export interface Water {
  /** Name of the water profile */
  name: string;
  
  /** Version of the record format */
  version: number;
  
  /** Volume of water in liters */
  amount: number;
  
  /** Calcium content in ppm */
  calcium: number;
  
  /** Bicarbonate content in ppm */
  bicarbonate: number;
  
  /** Sulfate content in ppm */
  sulfate: number;
  
  /** Chloride content in ppm */
  chloride: number;
  
  /** Sodium content in ppm */
  sodium: number;
  
  /** Magnesium content in ppm */
  magnesium: number;
  
  /** pH of the water */
  ph?: number;
  
  /** Optional notes */
  notes?: string;
}

