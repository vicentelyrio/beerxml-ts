/**
 * BeerXML Style schema with UPPERCASE properties
 */
export interface BeerXMLStyle {
  NAME: string
  VERSION: number
  CATEGORY: string
  CATEGORY_NUMBER: string | number
  STYLE_LETTER: string | number
  STYLE_GUIDE: string
  TYPE: string
  OG_MIN: number
  OG_MAX: number
  FG_MIN: number
  FG_MAX: number
  IBU_MIN: number
  IBU_MAX: number
  COLOR_MIN: number
  COLOR_MAX: number
  CARB_MIN?: number
  CARB_MAX?: number
  ABV_MIN?: number
  ABV_MAX?: number
  NOTES?: string
  PROFILE?: string
  INGREDIENTS?: string
  EXAMPLES?: string
}
