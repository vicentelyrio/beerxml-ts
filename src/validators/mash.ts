import { z } from 'zod';

/**
 * Zod schema for MashStep validation
 */
export const MashStepSchema = z.object({
  name: z.string().min(1, 'Mash step name is required'),
  version: z.number().int().positive(),
  type: z.enum(['Infusion', 'Temperature', 'Decoction']),
  stepTemp: z.number().min(0, 'Step temperature must be non-negative'),
  stepTime: z.number().min(0, 'Step time must be non-negative'),
  infuseAmount: z.number().min(0).optional(),
  infuseTemp: z.number().optional(),
  decoctionAmount: z.number().min(0).optional(),
  notes: z.string().optional(),
});

/**
 * Zod schema for Mash validation
 */
export const MashSchema = z.object({
  name: z.string().min(1, 'Mash name is required'),
  version: z.number().int().positive(),
  grainTemp: z.number().min(0, 'Grain temperature must be non-negative'),
  mashSteps: z.array(MashStepSchema).min(1, 'At least one mash step is required'),
  notes: z.string().optional(),
  tunTemp: z.number().optional(),
  spargeTemp: z.number().optional(),
  equipAdjust: z.boolean().optional(),
  tunWeight: z.number().min(0).optional(),
  tunSpecificHeat: z.number().min(0).optional(),
});

export type MashStepValidation = z.infer<typeof MashStepSchema>;
export type MashValidation = z.infer<typeof MashSchema>;

