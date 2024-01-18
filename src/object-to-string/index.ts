// const res = obj.toString(); // '[object Object]'
// 现在重写toString方法，使其输出如下：（输出有换行符
// Object.prototype.toString = function() {
//   return _toString(this);
// }

export function _toString(obj: Object, parentKey?: string): string[] {
  let result: string[] = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const newKey = parentKey ? `${parentKey}.${key}` : `obj.${key}`;

      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          result = result.concat(_toString(value[i], `${newKey}.${i}`));
        }
      } else if (typeof value === 'object' && value !== null) {
        result = result.concat(_toString(value, newKey));
      } else {
        result.push(`${newKey}: ${value}`);
      }
    }
  }

  return result;
}
