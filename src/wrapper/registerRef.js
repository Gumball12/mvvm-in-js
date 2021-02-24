import { isHTMLElement, isNotEmptyString, isProperty } from './utils/validation.js';
import { isNotHTMLElementMsg, isNotPropertyMsg, isEmptyStringMsg, isAlreadyRegisteredRefMsg } from './utils/errorMsgs.js';

/**
 * register ref
 * 
 * @param {HTMLElement} target ref target
 * @param {string} refName ref name
 */
export default function (target, refName) {
  if (!isHTMLElement(target)) {
    console.error(isNotHTMLElementMsg);
    return;
  }

  if (!isNotEmptyString(refName)) {
    console.error(isEmptyStringMsg);
    return;
  }

  if (isProperty(this.$ref, refName)) {
    console.error(isAlreadyRegisteredRefMsg);
    return;
  }

  // register
  this.$ref[refName] = target;
}
