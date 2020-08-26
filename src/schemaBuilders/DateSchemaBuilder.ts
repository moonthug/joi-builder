import { date } from 'joi';

import { AbstractSchemaBuilder } from './AbstractSchemaBuilder';

/**
 *
 */
export class DateSchemaBuilder extends AbstractSchemaBuilder {
  /**
   *
   */
  constructor () {
    super(date());
  }
}
