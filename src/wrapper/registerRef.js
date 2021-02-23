/**
 * register ref
 * 
 * @param {HTMLElement} target ref target
 * @param {string} refName ref name
 */
export default function registerRef(target, refName) {
  // validation
  if (!(target instanceof HTMLElement)) {
    console.error('ref target must be an instance of HTMLElement: ', refName);
    return;
  }

  if (refName === null || refName === '') {
    console.error('wrong ref name', refName);
    return;
  }

  if (this.$ref[refName] !== undefined) {
    console.error('already registered ref', refName);
    return;
  }

  // register
  this.$ref[refName] = target;
}
