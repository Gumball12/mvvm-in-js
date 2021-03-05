import MvvmHTMLElement from '../wrapper/MvvmHTMLElement.js';
import './list-input.js';

const html = `
<div view>
  <span m-prop-text-content="text"></span>
  <button @click="toModify">m</button>
  <button @click="remove">x</button>
</div>
<div modify>
  <list-input m-bidata-input-value="text" @submit="toView"></list-input>
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
          toModify() {
            this.classList.add('modify');
          },
          toView({ detail }) {
            this.classList.remove('modify');
            this.$data.text = detail;
          },
          remove() {
            this.remove();
          },
        },
        mounted() {
          this.$data.text = this.getAttribute('init-text');
        },
      });
    }
  },
);
