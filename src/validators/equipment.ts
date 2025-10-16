import { z } from 'zod';

/**
 * Zod schema for Equipment validation
 */
export const EquipmentSchema = z.object({
  name: z.string().min(1, 'Equipment name is required'),
  version: z.number().int().positive(),
  batchSize: z.number().positive('Batch size must be positive'),
  boilSize: z.number().positive('Boil size must be positive'),
  tunVolume: z.number().min(0).optional(),
  tunWeight: z.number().min(0).optional(),
  tunSpecificHeat: z.number().min(0).optional(),
  topUpWater: z.number().min(0).optional(),
  trubChillerLoss: z.number().min(0).optional(),
  evapRate: z.number().min(0).optional(),
  boilTime: z.number().min(0).optional(),
  calcBoilVolume: z.boolean().optional(),
  lauterDeadspace: z.number().min(0).optional(),
  topUpKettle: z.number().min(0).optional(),
  hopUtilization: z.number().min(0).max(100).optional(),
  notes: z.string().optional(),
});

export type EquipmentValidation = z.infer<typeof EquipmentSchema>;

