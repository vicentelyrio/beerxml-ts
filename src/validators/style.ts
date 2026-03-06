import { z } from 'zod';

/**
 * Zod schema for Style validation
 */
export const StyleSchema = z.object({
  name: z.string().min(1, 'Style name is required'),
  version: z.number().int().positive(),
  category: z.string().min(1, 'Category is required'),
  categoryNumber: z.string().min(1, 'Category number is required'),
  styleLetter: z.string(),
  styleGuide: z.string().min(1, 'Style guide is required'),
  type: z.enum(['Lager', 'Ale', 'Mead', 'Wheat', 'Mixed', 'Cider']),
  ogMin: z.number().positive('OG min must be positive'),
  ogMax: z.number().positive('OG max must be positive'),
  fgMin: z.number().positive('FG min must be positive'),
  fgMax: z.number().positive('FG max must be positive'),
  ibuMin: z.number().min(0, 'IBU min must be non-negative'),
  ibuMax: z.number().min(0, 'IBU max must be non-negative'),
  colorMin: z.number().min(0, 'Color min must be non-negative'),
  colorMax: z.number().min(0, 'Color max must be non-negative'),
  carbMin: z.number().min(0).optional(),
  carbMax: z.number().min(0).optional(),
  abvMin: z.number().min(0).optional(),
  abvMax: z.number().min(0).optional(),
  notes: z.string().optional(),
  profile: z.string().optional(),
  ingredients: z.string().optional(),
  examples: z.string().optional(),
});

export type StyleValidation = z.infer<typeof StyleSchema>;

