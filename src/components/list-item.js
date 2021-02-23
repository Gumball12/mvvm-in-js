import MvvmHTMLElement from '../wrapper/MvvmHTMLElement.js';
import './list-input.js';

const html = `
<div view>
  <span model-text-content="text"></span>
  <button @click="modify">m</button>
  <button @click="remove">x</button>
</div>
<div modify>
  <list-input model-input-value="text"></list-input>
</div>

<style scoped>
:host div[modify] {
  display: none;
}

:host(.modify) div[view] {
  display: none;
}
:host(.modify) div[modify] {
  display: block;
}
</style>
`;

window.customElements.define(
  'list-item',
  class extends MvvmHTMLElement {
    constructor() {
      super({
        html,
        data: {
          text: '',
        },
        methods: {
          modify() {
            this.classList.add('modify');
          },
          remove() {
            this.remove();
          },
        },
        mounted() {
          this.$data.text = this.getAttribute('init-text');
        },
      });

      /*
      this.$ref.remove.addEventListener('click', this.remove.bind(this));

      this.$ref.modify.addEventListener('click', () => {
        this.classList.add('modify');
        this.$ref.input.setAttribute('data-value', this.$data.innerText);
      });

      this.$ref.input.addEventListener('submit', ({ detail }) => {
        this.$data.innerText = detail;
        this.classList.remove('modify');
      });

      this.$watch('innerText', (oldValue, newValue) => {
        if (oldValue !== newValue) {
          this.$ref.p.textContent = newValue;
        }
      });
      */
    }
  },
);
