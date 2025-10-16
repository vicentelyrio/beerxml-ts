/**
 * BeerXML Water schema with UPPERCASE properties
 */
export interface BeerXMLWater {
  NAME: string;
  VERSION: number;
  AMOUNT: number;
  CALCIUM: number;
  BICARBONATE: number;
  SULFATE: number;
  CHLORIDE: number;
  SODIUM: number;
  MAGNESIUM: number;
  PH?: number;
  NOTES?: string;
}

