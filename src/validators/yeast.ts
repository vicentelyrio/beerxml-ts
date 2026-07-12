import { z } from 'zod'

/**
 * Zod schema for Yeast validation
 */
export const YeastSchema = z.object({
  name: z.string().min(1, 'Yeast name is required'),
  version: z.number().int().positive(),
  type: z.enum(['Ale', 'Lager', 'Wheat', 'Wine', 'Champagne']),
  form: z.enum(['Liquid', 'Dry', 'Slant', 'Culture']),
  amount: z.number().positive('Amount must be positive'),
  amountIsWeight: z.boolean().optional(),
  laboratory: z.string().optional(),
  productId: z.string().optional(),
  minTemperature: z.number().optional(),
  maxTemperature: z.number().optional(),
  flocculation: z.enum(['Low', 'Medium', 'High', 'Very High']).optional(),
  attenuation: z.number().min(0).max(100).optional(),
  notes: z.string().optional(),
  bestFor: z.string().optional(),
  timesCultured: z.number().int().min(0).optional(),
  maxReuse: z.number().int().min(0).optional(),
  addToSecondary: z.boolean().optional(),
})

export type YeastValidation = z.infer<typeof YeastSchema>
