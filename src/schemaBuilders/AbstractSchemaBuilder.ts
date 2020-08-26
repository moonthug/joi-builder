import joi, { Schema } from 'joi';

import { ISchemaBuilder, ISchemaDescriptor } from '../parse';
import { isFunction } from '../utils';

export abstract class AbstractSchemaBuilder implements ISchemaBuilder {
  /**
   *
   */
  public readonly baseSchema: joi.Schema;

  /**
   *
   * @param type
   */
  protected constructor (type: joi.AnySchema = joi.any()) {
    this.baseSchema = type;
  }

  /**
   *
   * @param schemaDescriptor
   */
  public createSchema (schemaDescriptor: ISchemaDescriptor): joi.Schema {
    let schema: Schema = this.baseSchema;

    Object.keys(schemaDescriptor).forEach((key: string) => {
      // @ts-ignore
      if (isFunction(this.baseSchema[key])) {
        const value = schemaDescriptor[key];
        schema = this._createSchemaRule(schema, key, value);
      }
    });

    return schema;
  }

  /**
   *
   * @param schema
   * @param key
   * @param value
   * @protected
   */
  protected _createSchemaRule (schema: any, key: string, value: any): joi.Schema {
    if (value) {
      if (Array.isArray(value)) {
        schema = schema[key].apply(schema, value);
      } else {
        schema = schema[key](value);
      }
    } else {
      schema = schema[key]();
    }

    return schema;
  }
}
