import { BeerXMLParseError } from '../errors/index.js'

/**
 * Converts BeerXML boolean string to boolean
 * @param value - "TRUE" or "FALSE" string
 * @returns boolean value
 */
export function parseBoolean(value: string | undefined): boolean | undefined {
  if (value === undefined) return undefined
  return value === 'TRUE'
}

/**
 * Converts boolean to BeerXML boolean string
 * @param value - boolean value
 * @returns "TRUE" or "FALSE" string
 */
export function serializeBoolean(
  value: boolean | undefined,
): string | undefined {
  if (value === undefined) return undefined
  return value ? 'TRUE' : 'FALSE'
}

/**
 * Coerces a BeerXML tag value back to string
 * @param value - value that fast-xml-parser may have auto-coerced to a number
 * @returns string representation, or undefined if input is undefined
 */
export function parseString(
  value: string | number | undefined,
): string | undefined {
  if (value === undefined) return undefined
  return String(value)
}

/**
 * Parses a number from string with validation
 * @param value - string representation of a number
 * @param fieldName - name of the field for error messages
 * @returns parsed number
 * @throws {BeerXMLParseError} if the value is not a valid number
 */
export function parseNumber(
  value: string | number | undefined,
  fieldName: string,
): number | undefined {
  if (value === undefined) return undefined

  const num = typeof value === 'number' ? value : Number(value)
  if (Number.isNaN(num)) {
    throw new BeerXMLParseError(`Invalid number for ${fieldName}: ${value}`)
  }
  return num
}
