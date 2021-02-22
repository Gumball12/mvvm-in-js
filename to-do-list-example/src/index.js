import MvvmHTMLElement from './utils/MvvmHTMLElement.js';
import './components/list-input.js';
import './components/list-item.js';

const html = `
<header>
  <h1>TO-DO List</h1>
</header>

<main>
  <list-input ref="input"></list-input>
  <section ref="items"></section>
</main>

<footer>
  <h3><a href="https://github.com/Gumball12/mvvm-in-js">@Gumball12</a></h3>
</footer>
`;

window.customElements.define(
  'todo-app',
  class extends MvvmHTMLElement {
    constructor() {
      super({ html });

      this.$ref.input.addEventListener('submit', ({ detail }) => {
        if (detail !== '') {
          const item = document.createElement('list-item');
          item.setAttribute('data-inner-text', detail);
          this.$ref.items.appendChild(item);
        }
      });
    }
  },
);
