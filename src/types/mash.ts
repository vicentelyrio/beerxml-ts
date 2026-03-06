/**
 * Mash step in a mash profile
 */
export interface MashStep {
  /** Name of the mash step */
  name: string;
  
  /** Version of the record format */
  version: number;
  
  /** Type of step */
  type: 'Infusion' | 'Temperature' | 'Decoction';
  
  /** Target temperature for this step in Celsius */
  stepTemp: number;
  
  /** Time to achieve target temperature in minutes */
  stepTime: number;
  
  /** Amount of water in liters to add for infusion */
  infuseAmount?: number;
  
  /** Temperature of water for infusion in Celsius */
  infuseTemp?: number;
  
  /** Volume to decoct in liters */
  decoctionAmount?: number;
  
  /** Optional notes */
  notes?: string;
}

/**
 * Mash profile containing multiple mash steps
 */
export interface Mash {
  /** Name of the mash profile */
  name: string;
  
  /** Version of the record format */
  version: number;
  
  /** Grain temperature in Celsius */
  grainTemp: number;
  
  /** Array of mash steps */
  mashSteps: MashStep[];
  
  /** Optional notes */
  notes?: string;
  
  /** Target pH for the mash */
  tunTemp?: number;
  
  /** Temperature of the sparge water in Celsius */
  spargeTemp?: number;
  
  /** Equipment set used */
  equipAdjust?: boolean;
  
  /** Tun-specific heat in Cal/(g*C) */
  tunWeight?: number;
  
  /** Weight of the tun in kg */
  tunSpecificHeat?: number;
}

