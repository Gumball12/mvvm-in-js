import { isHTMLElement, isProperty } from './utils/validation.js';
import { isNotHTMLElementMsg, isNotPropertyMsg } from './utils/errorMsgs.js';

/**
 * set value into the data
 * 
 * @param {HTMLElement} target bind element
 * @param {string} dataName name of the data to be set
 * @param {string} value value to be set
 */
export default function (target, dataName, value) {
  if (!isHTMLElement(target)) {
    console.error(isNotHTMLElementMsg);
    return;
  }

  if (!isProperty(this.$data, dataName)) {
    console.error(isNotPropertyMsg, dataName);
    return;
  }

  // set
  this.$data[dataName] = value;
}
