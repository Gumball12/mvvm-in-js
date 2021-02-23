import MvvmHTMLElement from '../wrapper/MvvmHTMLElement.js';

const html = `
<input model-value="inputValue">
<button @click="submit">submit</button>
`;

window.customElements.define(
  'list-input',
  class extends MvvmHTMLElement {
    constructor() {
      super({
        html,
        data: {
          inputValue: '',
        },
        methods: {
          submit() {
            this.$emit('submit', this.$data.inputValue);
            this.$data.inputValue = '';
          },
        },
      });
    }
  },
);
