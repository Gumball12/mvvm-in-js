import { isHTMLElement, isProperty } from './utils/validation.js';
import { isNotHTMLElementMsg, isNotPropertyMsg } from './utils/errorMsgs.js';

/**
 * two-way data binding (via properties, attributes)
 * 
 * @param {HTMLElement} target bind element
 * @param {string} propName property name to referenced
 * @param {string} dataName data name to update
 * @param {boolean} isModel is model binding
 */
export default function (target, propName, dataName, isModel) {
  if (!isHTMLElement(target)) {
    console.error(isNotHTMLElementMsg);
    return;
  }

  if (!isProperty(this.$data, dataName)) {
    console.error(isNotPropertyMsg);
    return;
  }

  // dom -> data
  if (isModel) {
    // properties
    if (target instanceof HTMLInputElement) {
      const cb = ({ target: { value }}) => this.$data[dataName] = value;
      target.addEventListener('input', cb);
      target.addEventListener('change', cb);
    }
  } else {
    // attributes
    new MutationObserver((list, obs) => {
      const value = target.getAttribute(propName);

      // sync
      if (this.$data[dataName] !== value) {
        this.$data[dataName] = value;
      }
    }).observe(target, {
      attributes: true,
      attributeFilter: [propName],
    });
  }

  // data -> dom
  if (this.$watcher[dataName] === undefined) {
    this.$watcher[dataName] = [];
  }

  if (isModel) {
    // properties
    this.$watcher[dataName].push((oldValue, newValue) => target[propName] = newValue);
  } else {
    // attributes
    this.$watcher[dataName].push((oldValue, newValue) =>
      target.setAttribute(propName, newValue));
  }
}
