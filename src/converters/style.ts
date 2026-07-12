import type { BeerXMLStyle } from '../schemas/style.js'
import type { Style } from '../types/style.js'
import { parseNumber, parseString } from './utils.js'

/**
 * Converts BeerXML Style to TypeScript Style
 */
export function styleFromXML(xml: BeerXMLStyle): Style {
  return {
    name: xml.NAME,
    version: parseNumber(xml.VERSION, 'VERSION') ?? 1,
    category: xml.CATEGORY,
    categoryNumber: parseString(xml.CATEGORY_NUMBER) ?? '',
    styleLetter: parseString(xml.STYLE_LETTER) ?? '',
    styleGuide: xml.STYLE_GUIDE,
    type: xml.TYPE as Style['type'],
    ogMin: parseNumber(xml.OG_MIN, 'OG_MIN') ?? 0,
    ogMax: parseNumber(xml.OG_MAX, 'OG_MAX') ?? 0,
    fgMin: parseNumber(xml.FG_MIN, 'FG_MIN') ?? 0,
    fgMax: parseNumber(xml.FG_MAX, 'FG_MAX') ?? 0,
    ibuMin: parseNumber(xml.IBU_MIN, 'IBU_MIN') ?? 0,
    ibuMax: parseNumber(xml.IBU_MAX, 'IBU_MAX') ?? 0,
    colorMin: parseNumber(xml.COLOR_MIN, 'COLOR_MIN') ?? 0,
    colorMax: parseNumber(xml.COLOR_MAX, 'COLOR_MAX') ?? 0,
    carbMin: parseNumber(xml.CARB_MIN, 'CARB_MIN'),
    carbMax: parseNumber(xml.CARB_MAX, 'CARB_MAX'),
    abvMin: parseNumber(xml.ABV_MIN, 'ABV_MIN'),
    abvMax: parseNumber(xml.ABV_MAX, 'ABV_MAX'),
    notes: xml.NOTES,
    profile: xml.PROFILE,
    ingredients: xml.INGREDIENTS,
    examples: xml.EXAMPLES,
  }
}

/**
 * Converts TypeScript Style to BeerXML Style
 */
export function styleToXML(style: Style): BeerXMLStyle {
  return {
    NAME: style.name,
    VERSION: style.version,
    CATEGORY: style.category,
    CATEGORY_NUMBER: style.categoryNumber,
    STYLE_LETTER: style.styleLetter,
    STYLE_GUIDE: style.styleGuide,
    TYPE: style.type,
    OG_MIN: style.ogMin,
    OG_MAX: style.ogMax,
    FG_MIN: style.fgMin,
    FG_MAX: style.fgMax,
    IBU_MIN: style.ibuMin,
    IBU_MAX: style.ibuMax,
    COLOR_MIN: style.colorMin,
    COLOR_MAX: style.colorMax,
    CARB_MIN: style.carbMin,
    CARB_MAX: style.carbMax,
    ABV_MIN: style.abvMin,
    ABV_MAX: style.abvMax,
    NOTES: style.notes,
    PROFILE: style.profile,
    INGREDIENTS: style.ingredients,
    EXAMPLES: style.examples,
  }
}
