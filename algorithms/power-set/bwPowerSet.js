/**
 * @description 使用 BITWISE(位解法) 获取幂集
 * @param {*[]} originalSet 
 * @returns {*[[]]}
 */
export default function bwPowerSet(originalSet) {
  const subSets = [];

  // 组合数为: 2^n
  const numberOfCombinations = 2 ** originalSet.length;

  for (let combinationIndex = 0; combinationIndex < numberOfCombinations; combinationIndex += 1) {
    const subSet = [];

    for (let setElementIndex = 0; setElementIndex < originalSet.length; setElementIndex += 1) {
      if (combinationIndex & (1 << setElementIndex)) {
        subSet.push(originalSet[setElementIndex]);
      }
    }

    subSets.push(subSet);
  }

  return subSets;
}
