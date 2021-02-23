import MvvmHTMLElement from './wrapper/MvvmHTMLElement.js';
import './components/list-input.js';
import './components/list-item.js';

const html = `
<header>
  <h1>TO-DO List</h1>
  <h2>next item: <span model-text-content="printValue"></span></h2>
</header>

<main>
  <list-input @submit="createTodoItem" bidata-input-value="printValue"></list-input>
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
      super({
        html,
        data: {
          printValue: '',
        },
        methods: {
          createTodoItem({ detail }) {
            this.$data.inputValue = '';

            if (detail !== '') {
              const item = document.createElement('list-item');
              item.setAttribute('init-text', detail);
              this.$ref.items.appendChild(item);
            }
          },
        },
      });
    }
  },
);
