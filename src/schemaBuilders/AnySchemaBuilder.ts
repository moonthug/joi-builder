import joi, { any, Schema, ObjectSchema } from 'joi';

import { AbstractSchemaBuilder } from './AbstractSchemaBuilder';

/**
 *
 */
export class AnySchemaBuilder extends AbstractSchemaBuilder {
  /**
   *
   * @param type
   */
  constructor (type: Schema = null) {
    super(type ? type : any());
  }

  /**
   *
   * @param schema
   * @param key
   * @param value
   * @protected
   */
  protected _createSchemaRule (schema: any, key: string, value: any): Schema {
    if (key === 'valid') {
      const validValueRegexp = /\[([^)]+)\]/g;
      const valuePartsMatches = validValueRegexp.exec(value);

      if (valuePartsMatches && valuePartsMatches[1]) {
        value = valuePartsMatches[1]
          .split(';')
          .map(option => option.trim());
      }
    }
    return super._createSchemaRule(schema, key, value);
  }
}
