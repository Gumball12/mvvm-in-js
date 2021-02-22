import MvvmHTMLElement from '../utils/MvvmHTMLElement.js';

const html = `
<div view>
  <span ref="p"></span>
  <button ref="modify">m</button>
  <button ref="remove">x</button>
</div>
<div modify>
  <list-input ref="input"></list-input>
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
      super({ html });

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
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'data-inner-text') {
        this.$data.innerText = newValue;
      }
    }
  
    static get observedAttributes() {
      return ['data-inner-text'];
    }
  },
);
