/**
 * Yeast record representing yeast ingredients
 */
export interface Yeast {
  /** Name of the yeast */
  name: string

  /** Version of the record format */
  version: number

  /** Type of yeast */
  type: 'Ale' | 'Lager' | 'Wheat' | 'Wine' | 'Champagne'

  /** Form of the yeast */
  form: 'Liquid' | 'Dry' | 'Slant' | 'Culture'

  /** Amount in liters for liquid, kg for dry */
  amount: number

  /** TRUE if this yeast is used for a starter */
  amountIsWeight?: boolean

  /** Laboratory that produced the yeast */
  laboratory?: string

  /** Product ID from manufacturer */
  productId?: string

  /** Minimum recommended temperature in Celsius */
  minTemperature?: number

  /** Maximum recommended temperature in Celsius */
  maxTemperature?: number

  /** Flocculation tendency */
  flocculation?: 'Low' | 'Medium' | 'High' | 'Very High'

  /** Average attenuation percentage (0-100) */
  attenuation?: number

  /** Optional notes */
  notes?: string

  /** Styles this yeast is best suited for */
  bestFor?: string

  /** Number of times this yeast has been reused */
  timesCultured?: number

  /** Maximum times this yeast can be reused */
  maxReuse?: number

  /** TRUE if a starter is recommended */
  addToSecondary?: boolean
}
