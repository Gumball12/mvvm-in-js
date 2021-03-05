# MVVM in JS

- [todo-app demo](https://gumball12.github.io/mvvm-in-js/)
- view [MvvmHTMLElement](./src/wrapper/MvvmHTMLElement.js)
- [usage](./src/index.js)

## MVVM Wrapped `HTMLElement`

### Constructor
- `html`: html template string
- `data`: data model
- `methods`: methods
- `watch`: watchers
- `created`: callback that invoked when element is created
- `mounted`: callback that invoked when element is connected into the DOM

### Properties
- `$root`: shadow dom root
- `$data`: data model
- `$watcher`: data watcher
- `$methods`: methods
- `$emit`: dispatch custom event
- `$ref`: referenced elements

### DOM Attribute usages
- `m-bidata-<child-data-name>="<dataName>"`: two-way data binding (via data model)
- `m-data-<child-data-name>="<string type value>"`: set data
- `m-prop-<child-property-name-to-update>="<dataName>"`: property binding
- `m-attr-<child-attribute-name-to-update>="<dataName>"`: attribute binding
- `m-ref="<refName>"`: register a reference to an element
- `@<eventname>="<methodName>"`: add event listener
