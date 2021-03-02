/**
 * @param {HTMLElement?} el
 */
export const isHTMLElement = (el) => el instanceof HTMLElement;

/**
 * @param {object} target
 * @param {string} property
 */
export const isProperty = (target, property) =>
  target !== undefined
  && target[property] !== undefined;

/**
 * @param {string?} str
 */
export const isNotEmptyString = (str) =>
  str !== undefined
  && str !== null
  && str !== '';

export default {
  isHTMLElement,
  isProperty,
  isNotEmptyString,
};
