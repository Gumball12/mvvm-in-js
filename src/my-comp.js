import MvvmHTMLElement from './MvvmHTMLElement.js';

import './my-paragraph.js';

const html = `
<my-p data-text-value></my-p>
<input>
`;

class MyComp extends MvvmHTMLElement {
  constructor() {
    super(html);

    this.data.textValue = '';

    this.$root.querySelector('input')
      .addEventListener('input', ({ target: { value } }) => {
        this.data.textValue = value;
      });
  }
}

window.customElements.define('my-comp', MyComp);
