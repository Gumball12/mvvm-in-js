import { isHTMLElement, isProperty } from './utils/validation.js';
import { isNotHTMLElementMsg, isNotPropertyMsg } from './utils/errorMsgs.js';

/**
 * bind property
 * 
 * @param {HTMLElement} target
 * @param {string} dataName
 */
export default function (target, propName, dataName) {
  if (!isHTMLElement(target)) {
    console.error(isNotHTMLElementMsg);
    return;
  }

  if (!isProperty(target, propName)) {
    console.error(isNotPropertyMsg);
    return;
  }

  if (!isProperty(this.$data, dataName)) {
    console.error(isNotPropertyMsg);
    return;
  }

  this.$watcher[dataName].push((oldValue, newValue) => target[propName] = newValue);
}
