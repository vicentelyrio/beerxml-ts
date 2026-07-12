import { z } from 'zod'

/**
 * Zod schema for Misc validation
 */
export const MiscSchema = z.object({
  name: z.string().min(1, 'Misc name is required'),
  version: z.number().int().positive(),
  type: z.enum(['Spice', 'Fining', 'Water Agent', 'Herb', 'Flavor', 'Other']),
  use: z.enum(['Boil', 'Mash', 'Primary', 'Secondary', 'Bottling']),
  time: z.number().min(0, 'Time must be non-negative'),
  amount: z.number().positive('Amount must be positive'),
  amountIsWeight: z.boolean().optional(),
  useFor: z.string().optional(),
  notes: z.string().optional(),
})

export type MiscValidation = z.infer<typeof MiscSchema>
