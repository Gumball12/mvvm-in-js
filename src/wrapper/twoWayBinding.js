/**
 * two-way data binding (via properties, attributes)
 * 
 * @param {HTMLElement} target bind element
 * @param {string} propName property name to referenced
 * @param {string} dataName data name to update
 * @param {boolean} isModel is model binding
 */
export default function twoWayBinding(target, propName, dataName, isModel) {
  // validation
  if (!(target instanceof HTMLElement)) {
    console.error('bind target must be an instance of HTMLElement: ', refName);
    return;
  }

  if (this.$data[dataName] === undefined) {
    console.error('data does not exists', dataName);
    return;
  }

  // dom -> data
  if (isModel) {
    // properties
    if (target instanceof HTMLInputElement) {
      const cb = ({ target: { value }}) => this.$data[dataName] = value;
      target.addEventListener('input', cb);
      target.addEventListener('change', cb);
    }
  } else {
    // attributes
    new MutationObserver((list, obs) => {
      const value = target.getAttribute(propName);

      if (this.$data[dataName] !== value) {
        this.$data[dataName] = value;
      }
    }).observe(target, {
      attributes: true,
      attributeFilter: [propName],
    });
  }

  // data -> dom
  if (this.$watcher[dataName] === undefined) {
    this.$watcher[dataName] = [];
  }

  if (isModel) {
    // properties
    this.$watcher[dataName].push((oldValue, newValue) => target[propName] = newValue);
  } else {
    // attributes
    this.$watcher[dataName].push((oldValue, newValue) =>
      target.setAttribute(propName, newValue));
  }
}
