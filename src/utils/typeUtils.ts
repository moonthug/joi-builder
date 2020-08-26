/**
 *
 * @param value
 */
export const isString = (value: any): boolean => {
  return !!value && ((typeof value === 'string') || (value instanceof String));
};

/**
 *
 * @param value
 */
export const isFunction = (value: any): boolean => {
  return (!!value && value.constructor === Function);
};

/**
 *
 * @param value
 */
export const isArray = (value: any): boolean => {
  return Array.isArray(value);
};
