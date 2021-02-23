/**
 * camelCase to kebob-case
 * 
 * ## examples
 * - `camelToKebob('myValue')`: `my-value`
 * - `camelToKebob('MyValue')`: `my-value`
 * - `camelToKebob('my-Value')`: `my-value`
 * - `camelToKebob('myValue', { prefix: 'bind' })`: `bind-my-value`
 * - `camelToKebob('bindMyValue', { ignorePrefix: 'bind' })`: `my-value`
 * - `camelToKebob('bindMyValue', { prefix: 'b', ignorePrefix: 'bind' })`: `b-my-value`
 * 
 * @param {string} str camelCase string
 * @param {object?} options options
 * @param {string} prefix prefix
 * @param {string} ignorePrefix ignoring prefix
 * @return {string} kebob-case string
 */
export default (str, options = { prefix: '', ignorePrefix: '' }) => {
  const { prefix, ignorePrefix } = options;

  let ignoredStr = str;

  if (ignorePrefix !== undefined && ignorePrefix !== null && ignorePrefix !== '') {
    ignoredStr = ignoredStr.replace(new RegExp(`^${ignorePrefix}`), '');
  }

  const kebobStr = ignoredStr
    .replace(/[-?]*([A-Z])/g, (m, p) => `-${p.toLowerCase()}`)
    .replace(/^-/, '');

  if (prefix !== undefined && prefix !== null && prefix !== '') {
    return `${prefix}-${kebobStr}`;
  }

  return kebobStr;
};
