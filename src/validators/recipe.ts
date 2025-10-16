import { z } from 'zod';
import { StyleSchema } from './style.js';
import { EquipmentSchema } from './equipment.js';
import { HopSchema } from './hop.js';
import { FermentableSchema } from './fermentable.js';
import { YeastSchema } from './yeast.js';
import { MiscSchema } from './misc.js';
import { WaterSchema } from './water.js';
import { MashSchema } from './mash.js';

/**
 * Zod schema for Recipe validation
 */
export const RecipeSchema = z.object({
  name: z.string().min(1, 'Recipe name is required'),
  version: z.number().int().positive(),
  type: z.enum(['Extract', 'Partial Mash', 'All Grain']),
  style: StyleSchema.optional(),
  equipment: EquipmentSchema.optional(),
  brewer: z.string().min(1, 'Brewer name is required'),
  asstBrewer: z.string().optional(),
  batchSize: z.number().positive('Batch size must be positive'),
  boilSize: z.number().positive('Boil size must be positive'),
  boilTime: z.number().min(0, 'Boil time must be non-negative'),
  efficiency: z.number().min(0).max(100).optional(),
  hops: z.array(HopSchema).min(0),
  fermentables: z.array(FermentableSchema).min(0),
  miscs: z.array(MiscSchema).optional(),
  yeasts: z.array(YeastSchema).min(0),
  waters: z.array(WaterSchema).optional(),
  mash: MashSchema.optional(),
  notes: z.string().optional(),
  tastingNotes: z.string().optional(),
  rating: z.number().min(0).max(50).optional(),
  og: z.number().positive().optional(),
  fg: z.number().positive().optional(),
  fermentationStages: z.number().int().min(0).optional(),
  primaryAge: z.number().min(0).optional(),
  primaryTemp: z.number().optional(),
  secondaryAge: z.number().min(0).optional(),
  secondaryTemp: z.number().optional(),
  tertiaryAge: z.number().min(0).optional(),
  tertiaryTemp: z.number().optional(),
  age: z.number().min(0).optional(),
  ageTemp: z.number().optional(),
  date: z.string().optional(),
  carbonation: z.number().min(0).optional(),
  forcedCarbonation: z.boolean().optional(),
  primingSugarName: z.string().optional(),
  carbonationTemp: z.number().optional(),
  primingSugarEquiv: z.number().min(0).optional(),
  kegPrimingFactor: z.number().min(0).optional(),
});

export type RecipeValidation = z.infer<typeof RecipeSchema>;

