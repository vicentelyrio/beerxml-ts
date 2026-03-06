/**
 * Base error class for all BeerXML-related errors
 */
export class BeerXMLError extends Error {
  constructor(
    message: string,
    public code: string
  ) {
    super(message);
    this.name = 'BeerXMLError';
    Object.setPrototypeOf(this, BeerXMLError.prototype);
  }
}

/**
 * Error thrown when XML parsing fails
 */
export class BeerXMLParseError extends BeerXMLError {
  constructor(
    message: string,
    public line?: number,
    public column?: number
  ) {
    super(message, 'PARSE_ERROR');
    this.name = 'BeerXMLParseError';
    Object.setPrototypeOf(this, BeerXMLParseError.prototype);
  }
}

/**
 * Error thrown when data validation fails
 */
export class BeerXMLValidationError extends BeerXMLError {
  constructor(
    message: string,
    public errors: Array<{ path: string; message: string }>
  ) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'BeerXMLValidationError';
    Object.setPrototypeOf(this, BeerXMLValidationError.prototype);
  }
}

/**
 * Error thrown when serialization to XML fails
 */
export class BeerXMLSerializationError extends BeerXMLError {
  constructor(message: string) {
    super(message, 'SERIALIZATION_ERROR');
    this.name = 'BeerXMLSerializationError';
    Object.setPrototypeOf(this, BeerXMLSerializationError.prototype);
  }
}

