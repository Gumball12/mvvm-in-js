import MvvmHTMLElement from '../utils/MvvmHTMLElement.js';

const html = `
<input data-value input-bind="value">
<button ref="submit">submit</button>
`;

window.customElements.define(
  'list-input',
  class extends MvvmHTMLElement {
    constructor() {
      super({ html });

      this.$data.value = '';

      this.$ref.submit.addEventListener('click', () => {
        this.$emit('submit', this.$data.value);
        this.$data.value = '';
      });
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'data-value') {
        this.$data.value = newValue;
      }
    }

    static get observedAttributes() {
      return ['data-value'];
    }
  },
);
