const html = `<p></p>`;

class MyParagraph extends HTMLElement {
  constructor() {
    super();

    this.$root = this.attachShadow({ mode: 'closed' });
    this.$root.innerHTML = html;
  }

  get p() {
    return this.$root.querySelector('p');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data-text-value') {
      if (oldValue !== newValue) {
        this.p.textContent = newValue;
      }
    }
  }

  static get observedAttributes() {
    return ['data-text-value'];
  }
}

window.customElements.define('my-p', MyParagraph);
