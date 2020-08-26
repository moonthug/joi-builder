import { JoiBuilder } from './JoiBuilder';
import { Schema } from 'joi';

/**
 *
 * @param schemaDescriptor
 * @param value
 * @param joiOptions
 */
export const buildAndValidate = (schemaDescriptor: Record<string, string>, value: any, joiOptions: any) => {
  return new JoiBuilder()
    .build(schemaDescriptor)
    .validate(value, joiOptions);
};

/**
 *
 * @param schemaDescriptor
 */
export const buildValidationSchema = (schemaDescriptor: Record<string, string>): Schema => {
  return new JoiBuilder().build(schemaDescriptor);
};
