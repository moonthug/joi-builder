import { string } from 'joi';

import { AnySchemaBuilder } from './AnySchemaBuilder';

/**
 *
 */
export class StringSchemaBuilder extends AnySchemaBuilder {
  /**
   *
   */
  constructor () {
    super(string());
  }
}
