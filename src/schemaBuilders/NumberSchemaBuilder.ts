import { number } from 'joi';

import { AnySchemaBuilder } from './AnySchemaBuilder';

/**
 *
 */
export class NumberSchemaBuilder extends AnySchemaBuilder {
  /**
   *
   */
  constructor () {
    super(number());
  }
}
