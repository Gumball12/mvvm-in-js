/**
 * kebob-case to CamelCase
 * 
 * ## examples
 * - `kebobToCamel('my-value')`: `myValue`
 * - `kebobToCamel('My-Value')`: `MyValue`
 * - `kebobToCamel('-my-value')`: `myValue`
 * - `kebobToCamel('my-value', { prefix: 'bind' })`: `bindMyValue`
 * - `kebobToCamel('bind-my-value', { ignorePrefix: 'bind' })`: `myValue`
 * - `kebobToCamel('bind-my-value', { prefix: 'b', ignorePrefix: 'bind' })`: `bMyValue`
 * 
 * @param {string} str kebob-case string
 * @param {object?} options options
 * @param {string} prefix prefix
 * @param {string} ignorePrefix ignoring prefix
 * @return {string} camelCase string
 */
export default (str, options = { prefix: '', ignorePrefix: '' }) => {
  const { prefix, ignorePrefix } = options;

  let ignoredStr = str;

  if (ignorePrefix !== undefined && ignorePrefix !== null && ignorePrefix !== '') {
    ignoredStr = ignoredStr.replace(new RegExp(`^${ignorePrefix}-`), '');
  }

  const camelStr = ignoredStr
    .split('-')
    .filter((s) => s !== '')
    .reduce((r, s) => r = r + `${s[0].toUpperCase()}${s.slice(1)}`);

  if (prefix !== undefined && prefix !== null && prefix !== '') {
    return `${prefix}${camelStr.replace(/^([a-z])/, (m, p) => p.toUpperCase())}`;
  }

  return camelStr;
};
