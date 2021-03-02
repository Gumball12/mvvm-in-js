import { isHTMLElement, isProperty } from './utils/validation.js';
import { isNotHTMLElementMsg, isNotPropertyMsg } from './utils/errorMsgs.js';

/**
 * bind attribute
 * 
 * @param {HTMLElement} target
 * @param {string} attrName
 * @param {string} dataName
 */
export default function (target, attrName, dataName) {
  if (!isHTMLElement(target)) {
    console.error(isNotHTMLElementMsg);
    return;
  }

  if (!isProperty(this.$data, dataName)) {
    console.error(isNotPropertyMsg);
    return;
  }

  // bind
  target.setAttribute(attrName, this.$data[dataName]);
  this.$watcher[dataName].push((oldValue, newValue) =>
    target.setAttribute(attrName, newValue));
}
