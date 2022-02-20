/**
 * @description 费希尔耶茨 - 洗牌算法
 * @param {*[]} originalArray
 * @returns {*[]}
 */
export default function fisherYates(originalArray) {
  // 1. 将数据拷贝一份
  const array = originalArray.slice(0);

  // 2. 实现随机顺序打乱(倒序)
  for (let i = array.length - 1; i > 0; i -= 1) {
    // 2.1 获取到一个随机下标, 并且非当前下标索引
    const randomIndex = Math.floor(Math.random() * (i + 1));
    // 2.2 当前下标与随机下标的值进行位置交换
    ;[array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }

  return array;
}
