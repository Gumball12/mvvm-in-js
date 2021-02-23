# MVVM in JS

- view [MvvmHTMLElement](./src/wrapper/MvvmHTMLElement.js)
- [usage](./src)

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

### DOM Attribute usages
- `model-<child-property-name>="<dataName>"`: two-way data binding (via properties)
- `bind-<dom-attribute-name>="<dataName>"`: two-way data binding (via attributes)
- `bidata-<child-data-name>="<dataName>"`: two-way data binding (via data model)
- `ref="<refName>"`: register a reference to an element
- `@<eventname>="<methodName>"`: add event listener
