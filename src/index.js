import MvvmHTMLElement from './wrapper/MvvmHTMLElement.js';
import './components/list-input.js';
import './components/list-item.js';

const html = `
<header>
  <h1>TO-DO List</h1>
  <h2 m-prop-text-content="printValue" input-target></h2>
</header>

<main>
  <list-input @submit="createTodoItem" m-data-input-value="printValue"></list-input>
  <section m-ref="items"></section>
</main>

<footer>
  <h3><a target="_blank" href="https://github.com/Gumball12/mvvm-in-js">@Gumball12</a></h3>
</footer>

<style scoped>
@import url('./src/styles/typography.css');

:host {
  display: block;
}

h2[input-target] {
  min-height: 32px;
}

list-input {
  margin-bottom: 1em;
}

footer {
  position: fixed;
  right: 1em;
  bottom: 1em;
}
</style>
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
