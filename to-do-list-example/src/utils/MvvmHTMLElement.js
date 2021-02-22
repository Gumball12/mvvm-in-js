/**
 * camelCase to kebob-case
 * 
 * @param {string} str camelCase string
 * @return {string} kebob-case string
 */
const camelToKebob = (str) =>
  str.replace(/([A-Z])/g, (m, p) => `-${p.toLowerCase()}`);

export default class extends HTMLElement {
  /**
   * constructor
   * 
   * @param {object} payload constructor payload
   * @param {string} payload.html html string
   */
  constructor({
    html
  }) {
    super();

    // connect dom
    this.$root = this.attachShadow({ mode: 'closed' });
    this.$root.innerHTML = html;

    // set data
    this.$data = new Proxy({ }, {
      set: (obj, prop, value) => {
        const bindedElementName = `__el$${prop}`;
        const watchName = `__watch$${prop}`;

        // try find binded element
        if (obj[bindedElementName] === undefined) {
          obj[bindedElementName]
            = this.$root.querySelector(`[data-${camelToKebob(prop)}]`);
        }

        // try invoke listener
        if (
          this.__$watch[watchName] !== undefined
          && typeof (this.__$watch[watchName]) === 'function'
        ) {
          this.__$watch[watchName](obj[prop], value);
        }

        // try update to element's dataset
        if (obj[bindedElementName] !== null) {
          obj[bindedElementName].dataset[prop] = value;
        }

        // update data
        obj[prop] = value;

        return true;
      },
    });

    // set watcher
    this.__$watch = { };

    // connect ref
    this.$ref = { };
    this.$root.querySelectorAll('[ref]')
      .forEach((el) => {
        const refName = el.getAttribute('ref');

        if (refName === null || refName === '') {
          console.error('wrong reference name');
          return;
        }

        if (this.$ref[refName] !== undefined) {
          console.error(`already referenced element: ${refName}`);
          return;
        }

        this.$ref[refName] = el;
      });

    // connect bi-directional bind
    this.$root.querySelectorAll('[input-bind]')
      .forEach((el) => {
        const dataName = el.getAttribute('input-bind');

        if (dataName === null || dataName === '') {
          console.error('wrong data name');
          return;
        }

        el.addEventListener('input', ({ target: { value }}) =>
          this.$data[dataName] = value);

        this.$watch(dataName, (oldValue, newValue) => el.value = newValue);
      });
  }

  /**
   * emit event
   * 
   * @param {string} eventName event name
   * @param {any} detail event payload
   */
  $emit(eventName, detail) {
    this.dispatchEvent(new CustomEvent(
      eventName,
      {
        bubbles: true,
        composed: true,
        detail,
      },
    ));
  }

  /**
   * set watch data
   * 
   * @param {string} dataName data name
   * @param {function(any, any)} cb callback (oldValue, newValue)
   */
  $watch(dataName, cb) {
    this.__$watch[`__watch$${dataName}`] = cb;
  }
}
