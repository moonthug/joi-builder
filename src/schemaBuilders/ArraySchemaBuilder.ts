import { array, Schema, string } from 'joi';

import { AbstractSchemaBuilder } from './AbstractSchemaBuilder';
import { parse } from '../parse';

/**
 *
 */
export class ArraySchemaBuilder extends AbstractSchemaBuilder {
  /**
   *
   */
  constructor () {
    super(array());
  }

  /**
   * @param schema
   * @param key
   * @param value
   * @protected
   */
  protected _createSchemaRule (schema: any, key: string, value: any): Schema {
    if (key === 'items') {
      const validItemsValueRegexp = /\(([^)]+)\)/gm;
      const itemsMatches = validItemsValueRegexp.exec(value);

      if (itemsMatches && itemsMatches[1]) {
        value = parse(itemsMatches[1]);
      }
    }
    return super._createSchemaRule(schema, key, value);
  }
}
