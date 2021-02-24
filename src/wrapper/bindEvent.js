import { isHTMLElement, isProperty } from './utils/validation.js';
import { isNotHTMLElementMsg, isNotPropertyMsg } from './utils/errorMsgs.js';

/**
 * bind event
 * 
 * @param {HTMLElement} target event target
 * @param {string} name event name
 * @param {string} handlerName handler method name (declared in class)
 */
export default function (target, name, handlerName) {
  if (!isHTMLElement(target)) {
    console.error(isNotHTMLElementMsg);
    return;
  }

  if (!isProperty(this.$methods, handlerName)) {
    console.error(isNotPropertyMsg);
    return;
  }

  // bind
  target.addEventListener(name, (evt) => this.$methods[handlerName].call(this, evt));
}
