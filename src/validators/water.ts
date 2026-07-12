import { z } from 'zod'

/**
 * Zod schema for Water validation
 */
export const WaterSchema = z.object({
  name: z.string().min(1, 'Water name is required'),
  version: z.number().int().positive(),
  amount: z.number().positive('Amount must be positive'),
  calcium: z.number().min(0, 'Calcium must be non-negative'),
  bicarbonate: z.number().min(0, 'Bicarbonate must be non-negative'),
  sulfate: z.number().min(0, 'Sulfate must be non-negative'),
  chloride: z.number().min(0, 'Chloride must be non-negative'),
  sodium: z.number().min(0, 'Sodium must be non-negative'),
  magnesium: z.number().min(0, 'Magnesium must be non-negative'),
  ph: z.number().min(0).max(14).optional(),
  notes: z.string().optional(),
})

export type WaterValidation = z.infer<typeof WaterSchema>
