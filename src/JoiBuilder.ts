import joi from 'joi';

import { parse } from './parse';

/**
 *
 */
export class JoiBuilder {

  /**
   *
   * @param config
   */
  build (config: Record<string, string>): joi.Schema {
    let schema: joi.SchemaMap = {};

    for (let key in config) {
      let value = config[key];
      schema[key] = parse(value);
    }

    return this._buildJoiObject(schema);
  }

  /**
   *
   * @param schema
   * @private
   */
  private _buildJoiObject (schema: joi.SchemaMap): joi.Schema {
    return joi.object(schema);
  }
}
