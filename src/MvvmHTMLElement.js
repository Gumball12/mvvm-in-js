/**
 * camelCase to kebob-case
 * 
 * @param {string} str target string
 */
const camelToKebob = (str) => {
  return str.replace(/([A-Z])/g, (m, p) => `-${p.toLowerCase()}`);
}

export default class extends HTMLElement {
  constructor(html) {
    super();

    this.$root = this.attachShadow({ mode: 'closed' });

    // connect dom
    this.$root.innerHTML = html;

    // set data
    this.data = new Proxy({ }, {
      set: (obj, prop, value) => {
        const bindedElementName = `__el$${prop}`;

        if (obj[bindedElementName] === undefined) {
          obj[bindedElementName]
            = this.$root.querySelector(`[data-${camelToKebob(prop)}]`);
        }

        obj[bindedElementName].dataset[prop] = value;
        obj[prop] = value;

        return true;
      },
    });
  }
}
