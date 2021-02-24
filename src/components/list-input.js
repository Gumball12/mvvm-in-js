import MvvmHTMLElement from '../wrapper/MvvmHTMLElement.js';

const html = `
<input @input="updateInputValue" m-prop-value="inputValue">
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
            const value = this.$data.inputValue;
            this.$data.inputValue = '';
            this.$emit('submit', value);
          },
          updateInputValue({ target: { value }}) {
            this.$data.inputValue = value;
          },
        },
      });
    }
  },
);
