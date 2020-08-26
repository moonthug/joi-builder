import chai from 'chai';
import sinon from 'sinon';

import joi from 'joi';

import * as parseLib from './parse';

import { JoiBuilder } from './JoiBuilder';

const { expect } = chai;

describe('JoiBuilder', () => {

  /////////////////////////////////////
  //
  // constructor

  /////////////////////////////////////
  //
  // build

  describe('build', () => {
    it('should call `parse` for every key in config', () => {
      const unit = new JoiBuilder();

      const stub = sinon.stub(parseLib, 'parse').returns(joi.string());

      // Call
      const result = unit.build({
        key1: 'string',
        key2: 'string',
        key3: 'string'
      });

      // Test
      expect(stub.callCount).to.equal(3);

      // Restore Stub
      stub.restore();
    });

    it('should call `_buildJoiObject` with the correct arguments', () => {
      const unit = new JoiBuilder();

      const stub = sinon.stub(unit as any, '_buildJoiObject');

      const expected = {
        key1: joi.string(),
        key2: joi.number(),
        key3: joi.string().min(2)
      };

      // Call
      const result = unit.build({
        key1: 'string',
        key2: 'number',
        key3: 'string:min=2'
      });

      // Test
      expect(stub.calledWith(expected)).to.equal(true);

      // Restore Stub
      stub.restore();
    });

    // @TODO Fix
    it.skip('should return wrap the schema as a `joi.object()`', () => {
      const unit = new JoiBuilder();

      const expected = joi.object({
        key1: joi.string()
      });

      // Call
      const result = unit.build({
        key1: 'string'
      });

      // Test
      expect(result).to.eql(expected);
    });
  });
});
