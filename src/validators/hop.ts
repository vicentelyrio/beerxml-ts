import { z } from 'zod'

/**
 * Zod schema for Hop validation
 */
export const HopSchema = z.object({
  name: z.string().min(1, 'Hop name is required'),
  version: z.number().int().positive(),
  alpha: z.number().min(0).max(100, 'Alpha acid must be between 0 and 100'),
  amount: z.number().positive('Amount must be positive'),
  use: z.enum(['Boil', 'Dry Hop', 'Mash', 'First Wort', 'Aroma']),
  time: z.number().min(0, 'Time must be non-negative'),
  notes: z.string().optional(),
  type: z.enum(['Bittering', 'Aroma', 'Both']).optional(),
  form: z.enum(['Pellet', 'Plug', 'Leaf']).optional(),
  beta: z.number().min(0).max(100).optional(),
  hsi: z.number().min(0).max(100).optional(),
  origin: z.string().optional(),
  substitutes: z.string().optional(),
  humulene: z.number().min(0).max(100).optional(),
  caryophyllene: z.number().min(0).max(100).optional(),
  cohumulone: z.number().min(0).max(100).optional(),
  myrcene: z.number().min(0).max(100).optional(),
})

export type HopValidation = z.infer<typeof HopSchema>
