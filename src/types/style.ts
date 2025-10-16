/**
 * Style record representing beer style guidelines
 */
export interface Style {
  /** Name of the style */
  name: string;
  
  /** Version of the record format */
  version: number;
  
  /** Category this style belongs to */
  category: string;
  
  /** Category number */
  categoryNumber: string;
  
  /** Style letter */
  styleLetter: string;
  
  /** Style guide the information came from */
  styleGuide: string;
  
  /** Type of style */
  type: 'Lager' | 'Ale' | 'Mead' | 'Wheat' | 'Mixed' | 'Cider';
  
  /** Minimum original gravity */
  ogMin: number;
  
  /** Maximum original gravity */
  ogMax: number;
  
  /** Minimum final gravity */
  fgMin: number;
  
  /** Maximum final gravity */
  fgMax: number;
  
  /** Minimum IBU */
  ibuMin: number;
  
  /** Maximum IBU */
  ibuMax: number;
  
  /** Minimum color in SRM */
  colorMin: number;
  
  /** Maximum color in SRM */
  colorMax: number;
  
  /** Minimum carbonation in volumes of CO2 */
  carbMin?: number;
  
  /** Maximum carbonation in volumes of CO2 */
  carbMax?: number;
  
  /** Minimum ABV percentage */
  abvMin?: number;
  
  /** Maximum ABV percentage */
  abvMax?: number;
  
  /** Optional notes */
  notes?: string;
  
  /** Description of the style profile */
  profile?: string;
  
  /** Ingredient description */
  ingredients?: string;
  
  /** Example commercial beers */
  examples?: string;
}

