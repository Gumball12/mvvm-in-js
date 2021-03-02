import { isHTMLElement, isProperty } from './utils/validation.js';
import { isNotHTMLElementMsg, isNotPropertyMsg } from './utils/errorMsgs.js';

/**
 * two-way data binding (via data models)
 * 
 * @param {HTMLElement} target bind element
 * @param {string} attrName attribute name to sharing data model value
 * @param {string} dataName data name to update
 */
export default function (target, attrName, dataName) {
  if (!isHTMLElement(target)) {
    console.error(isNotHTMLElementMsg);
    return;
  }

  if (!isProperty(this.$data, dataName)) {
    console.error(isNotPropertyMsg, dataName);
    return;
  }

  // central -> each data model
  new MutationObserver((list, obs) => {
    const value = target.getAttribute(`${attrName}__bind`);

    // sync value
    if (this.$data[dataName] !== value) {
      this.$data[dataName] = value;
    }
  }).observe(target, {
    attributes: true,
    attributeFilter: [`${attrName}__bind`],
  });

  // each data model -> central
  this.$watcher[dataName].push((oldValue, newValue) =>
    target.setAttribute(`${attrName}__bind`, newValue));
}
