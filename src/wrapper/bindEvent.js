/**
 * bind event
 * 
 * @param {HTMLElement} target event target
 * @param {string} name event name
 * @param {string} handlerName handler method name (declared in class)
 */
export default function bindEvent(target, name, handlerName) {
  // validation
  if (!(target instanceof HTMLElement)) {
    console.error('event target must be an instance of HTMLElement:', name);
    return;
  }

  if (this.$methods[handlerName] === undefined) {
    console.error('methods does not exists', handlerName);
    return;
  }

  // bind
  target.addEventListener(name, (evt) => this.$methods[handlerName].call(this, evt));
}
