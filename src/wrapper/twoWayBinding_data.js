/**
 * two-way data binding (via data models)
 * 
 * @param {HTMLElement} target bind element
 * @param {string} attrName attribute name to sharing data model value
 * @param {string} dataName data name to update
 */
export default function twoWayBinding_data(target, attrName, dataName) {
  // validation
  if (!(target instanceof HTMLElement)) {
    console.error('bind target must be an instance of HTMLElement');
    return;
  }

  if (this.$data[dataName] === undefined) {
    console.error('data does not exists', dataName);
    return;
  }

  // central -> each data model
  new MutationObserver((list, obs) => {
    const value = target.getAttribute(`${attrName}__bind`);

    if (this.$data[dataName] !== value) {
      this.$data[dataName] = value;
    }
  }).observe(target, {
    attributes: true,
    attributeFilter: [`${attrName}__bind`],
  });

  // each data model -> central
  this.$watcher[dataName].push((oldValue, newValue) =>
    target.setAttribute(`${attrName}__bind`, newValue));
}
