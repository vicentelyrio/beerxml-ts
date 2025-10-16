import { z } from 'zod';

/**
 * Zod schema for Fermentable validation
 */
export const FermentableSchema = z.object({
  name: z.string().min(1, 'Fermentable name is required'),
  version: z.number().int().positive(),
  type: z.enum(['Grain', 'Sugar', 'Extract', 'Dry Extract', 'Adjunct']),
  amount: z.number().positive('Amount must be positive'),
  yield: z.number().min(0).max(100, 'Yield must be between 0 and 100'),
  color: z.number().min(0, 'Color must be non-negative'),
  addAfterBoil: z.boolean().optional(),
  origin: z.string().optional(),
  supplier: z.string().optional(),
  notes: z.string().optional(),
  coarseFineDiff: z.number().min(0).max(100).optional(),
  moisture: z.number().min(0).max(100).optional(),
  diastaticPower: z.number().min(0).optional(),
  protein: z.number().min(0).max(100).optional(),
  maxInBatch: z.number().min(0).max(100).optional(),
  recommendMash: z.boolean().optional(),
  ibuGalPerLb: z.number().min(0).optional(),
});

export type FermentableValidation = z.infer<typeof FermentableSchema>;

