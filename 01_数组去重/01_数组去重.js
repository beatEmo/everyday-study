// 数组去重
// 回归问题本质：什么是重 -> 相同的东西 -> 什么是相同？ -> js中有多种判断相同的方式 （== === Object.is(x,x))

/**
 * 字节面试题：数组去重
 * 原始值使用严格相等比较
 * 对象值递归比较所有属性，属性数量和属性名称必须一致
 * 数组中对象均为plain object
 * @param {Array} arr
 * @return {Array}
 */

function uniqueArray(arr) {
  let result = [];
  for (const item of arr) {
    let isFind = false;
    for (const res of result) {
      if (equals(item, res)) {
        isFind = true;
        break;
      }
    }
    if (!isFind) {
      result.push(item);
    }
  }
  return result;
}

function equals(a, b) {}
