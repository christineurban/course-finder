export const isAlpha = (str) => {
  return /^[a-z]+$/i.test(str);
};

export const isNumeric = (str) => {
  return /^\d+$/.test(str);
};

/**
 * splits string into array of groups of numbers or letters
 * ex: 'abc123def456' -> ['abc', '123', 'def', '456']
 */
export const splitAlphaNumeric = (str) => {
  return str.match(/[a-z]+|[^a-z]+/gi);
}