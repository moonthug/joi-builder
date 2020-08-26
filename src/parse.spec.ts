import chai from 'chai';
import sinon from 'sinon';

import joi from 'joi';

import { parse, parseValue } from './parse';

const { expect } = chai;

describe('parse', () => {

  /////////////////////////////////////
  //
  // parse

  describe('parse', () => {
    it('should create an `Any` Schema for an empty string', () => {
      // Call
      const result = parse('');

      // Test
      expect(result).to.equal(joi.any());
    });

    it('should create an `Any` Schema for an undefined', () => {
      // Call
      const result = parse(undefined);

      // Test
      expect(result).to.equal(joi.any());
    });

    it('should create an `Any` Schema for an invalid Joi Type', () => {
      // Call
      const result = parse('notajoitype');

      // Test
      expect(result).to.equal(joi.any());
    });

    it('should create a `String` Schema when no values are supplied', () => {
      // Call
      const result = parse('string');

      // Test
      expect(result).to.equal(joi.string());
    });

    it('should create a `String` Schema when values are supplied', () => {
      const expected = joi.string().min(2).max(5);

      // Call
      const result = parse('string:min=2,max=5');

      // Test
      expect(result).to.eql(expected);
    });
  });

  /////////////////////////////////////
  //
  // parseValue

  describe('parseValue', () => {
    it('should return a number when `min` is the key', () => {
      const expected = 10;

      // Call
      const result = parseValue('min', '10');

      // Test
      expect(result).to.eql(expected);
    });

    it('should return a number when `max` is the key', () => {
      const expected = 255;

      // Call
      const result = parseValue('max', '255');

      // Test
      expect(result).to.eql(expected);
    });

    it('should return a string when `email` is the key', () => {
      const expected = 'test@test.com';

      // Call
      const result = parseValue('email', 'test@test.com');

      // Test
      expect(result).to.eql(expected);
    });
  });
});
