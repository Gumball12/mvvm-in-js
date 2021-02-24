import kebobToCamel from '../utils/kebobToCamel.js';
import bindEvent from './bindEvent.js';
import twoWayBinding from './twoWayBinding.js';
import registerRef from './registerRef.js';
import bindProperty from './bindProperty.js';
import bindAttribute from './bindAttribute.js';

/**
 * # MVVM Wrapped HTMLElement
 * 
 * ## Constructor
 * - `html`: html template string
 * - `data`: data model
 * - `methods`: methods
 * - `watch`: watchers
 * - `created`: callback that invoked when element is created
 * - `mounted`: callback that invoked when element is connected into the DOM
 * 
 * ## Properties
 * - `$root`: shadow dom root
 * - `$data`: data model
 * - `$watcher`: data watcher
 * - `$methods`: methods
 * - `$emit`: dispatch custom event
 * 
 * ## DOM Attribute usages
 * - `m-data-<child-data-name>="<dataName>"`: two-way data binding (via data model)
 * - `m-attr-<child-property-name-to-update>="<dataName>"`: property binding
 * - `m-prop-<child-attribute-name-to-update>="<dataName>"`: attribute binding
 * - `m-ref="<refName>"`: register a reference to an element
 * - `@<eventname>="<methodName>"`: add event listener
 */
export default class extends HTMLElement {
  /**
   * constructor
   * 
   * @param {object} payload constructor payload
   * @param {string} payload.html html template string
   * @param {object?} payload.data data model
   * @param {object?} payload.methods methods
   * @param {object?} payload.watch watchers
   * @param {function?} payload.created callback that invoked when element is created
   * @param {function?} payload.mounted callback that invoked when element is connected into the DOM
   */
  constructor({
    html: __html,
    data: __data,
    methods: __methods,
    watch: __watch,
    created: __created,
    mounted: __mounted,
  }) {
    super();

    // connect dom
    this.$root = this.attachShadow({ mode: 'closed' });
    this.$root.innerHTML = __html;

    // declare properties
    Object.defineProperties(this, {
      $data: {
        enumerable: true,
        value: new Proxy(__data ?? { }, {
          set: (obj, prop, value) => {
            // invoke watcher
            if (this.$watcher[prop].length !== 0) {
              this.$watcher[prop].forEach((cb) => cb(obj[prop], value));
            }

            // update data
            obj[prop] = value;

            return true;
          },
        }),
      },
      $methods: {
        enumerable: true,
        value: __methods ?? { }, // { methodName: function }
      },
      $watcher: { // { dataName: [ handlers ] }
        value: new Proxy(__watch ?? { }, {
          get: (obj, prop) => {
            if (obj[prop] === undefined) {
              obj[prop] = [];
            }

            return obj[prop];
          },
        }),
      },
      $ref: {
        value: { }, // { refName: element }
      },
      $created: {
        value: __created,
      },
      $mounted: {
        value: __mounted,
      },
    });

    // created
    if (this.$created !== undefined && this.$created !== null) {
      this.$created.call(this);
    }
  }

  /**
   * emit event
   * 
   * @param {string} eventName event name
   * @param {any} detail event payload
   */
  $emit(eventName, detail) {
    this.dispatchEvent(new CustomEvent(
      eventName,
      {
        bubbles: true,
        composed: true,
        detail,
      },
    ));
  }

  /**
   * mounted
   */
  connectedCallback() {
    if (this.isConnected) {
      // dom traversing when is connected
      for (const el of this.$root.querySelectorAll('*')) {
        for (const name of el.getAttributeNames()) {
          if (name.startsWith('@')) {
            const eventName = name.slice(1);
            const handlerName = el.getAttribute(name);
            bindEvent.call(this, el, eventName, handlerName);
          } else if (name.startsWith('m-prop-')) {
            const propName = kebobToCamel(name, { ignorePrefix: 'm-prop' });
            const dataName = el.getAttribute(name);
            bindProperty.call(this, el, propName, dataName);
          } else if (name.startsWith('m-attr-')) {
            const attrName = kebobToCamel(name, { ignorePrefix: 'm-attr' });
            const dataName = el.getAttribute(name);
            bindAttribute.call(this, el, attrName, dataName, false);
          } else if (name.startsWith('m-data-') && !name.endsWith('__bind')) {
            const dataName = el.getAttribute(name);
            twoWayBinding.call(this, el, name, dataName);
          } else if (name === 'm-ref') {
            const refName = el.getAttribute(name);
            registerRef.call(this, el, refName);
          }
        }
      }

      for (const name of this.getAttributeNames()) {
        if (name.startsWith('m-data-') && !name.endsWith('__bind')) {
          const dataName = kebobToCamel(name, { ignorePrefix: 'm-data' });
          twoWayBinding.call(this, this, name, dataName);
        }
      }

      if (this.$mounted !== undefined && this.$mounted !== null) {
        setTimeout(() => this.$mounted.call(this), 0);
      }
    }
  }
}
