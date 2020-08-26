import joi, { Schema } from 'joi';

import { AnySchemaBuilder, ArraySchemaBuilder, DateSchemaBuilder, NumberSchemaBuilder, StringSchemaBuilder } from './schemaBuilders';

/**
 *
 */
export interface ISchemaDescriptor {
  [key: string]: any;
}

/**
 *
 */
export interface ISchemaBuilder {
  createSchema: (schemaDescriptor: ISchemaDescriptor) => Schema;
}

/**
 *
 */
export interface SchemaBuilderMap {
  [key: string]: ISchemaBuilder;
}

/**
 *
 */
export const schemaBuilders: SchemaBuilderMap = {
  any: new AnySchemaBuilder(),
  array: new ArraySchemaBuilder(),
  date: new DateSchemaBuilder(),
  string: new StringSchemaBuilder(),
  number: new NumberSchemaBuilder()
};

/**
 *
 * @param {string} input
 */
export const parse = (input: string): joi.Schema => {
  if (!input) {
    return schemaBuilders['any'].createSchema({});
  }

  const builderTypeRegexp = /^([a-z]+)/g;
  const builderTypeMatches = builderTypeRegexp.exec(input);
  const builderType = builderTypeMatches[1];

  // Invalid type
  if (!schemaBuilders.hasOwnProperty(builderType)) {
    return schemaBuilders['any'].createSchema({});
  }

  const builderValueRegexp = /:([^]+)/g;
  const builderValueMatches = builderValueRegexp.exec(input);

  if (!builderValueMatches) {
    return schemaBuilders[builderType].createSchema({});
  }

  const builderValue = builderValueMatches[1];

  let schemaConfig: ISchemaDescriptor = {};

  const rulePartsRegexp = /([^,]+)/g;
  let ruleMatches = rulePartsRegexp.exec(builderValue);
  while (ruleMatches !== null) {
    const keyValueRegexp = /^([a-z]+)=?([^]+)?/g;
    const keyValueMatches = keyValueRegexp.exec(ruleMatches[1]);

    const key = keyValueMatches[1];
    let value = keyValueMatches[2] ? keyValueMatches[2].trim() : null;

    schemaConfig[key] = parseValue(key, value);

    ruleMatches = rulePartsRegexp.exec(builderValue);
  }

  return schemaBuilders[builderType].createSchema(schemaConfig);
};

/**
 *
 * @param key
 * @param value
 */
export const parseValue = (key: string, value: any): any => {
  switch (key) {
    case 'min':
    case 'max':
      return parseInt(value, 10);
  }

  return value;
};
