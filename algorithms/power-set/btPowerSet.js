/**
 * @param {*[]} originalSet - 正在形成幂集的原始元素集
 * @param {*[][]} allSubsets - 到目前为止已经形成的所有子集
 * @param {*[]} currentSubSet - 目前正在形成的当前子集
 * @param {number} startAt - 开始形成当前子集的原始集合中的位置
 * @return {*[][]} - 原始集合的所有子集
 */
function btPowerSetRecursive(originalSet, allSubsets = [[]], currentSubSet = [], startAt = 0) {
  // 让我们遍历可以添加到子集中的 originalSet 元素
  // 没有重复 startAt 的值可防止添加重复项
  for (let position = startAt; position < originalSet.length; position += 1) {
    // 让我们将当前元素推送到子集
    currentSubSet.push(originalSet[position]);

    // 当前子集已经有效，所以让我们记住它
    // 我们在这里做数组销毁来保存 currentSubSet 的克隆
    // 我们需要保存一个克隆，因为原始的 currentSubSet 将是
    // 在进一步的递归调用中发生变异
    allSubsets.push([...currentSubSet]);

    // 让我们尝试为当前子集生成所有其他子集
    // 我们将位置增加一以避免子集中的重复
    btPowerSetRecursive(originalSet, allSubsets, currentSubSet, position + 1);

    // 回溯。从子集中排除最后一个元素并尝试下一个有效元
    currentSubSet.pop();
  }

  return allSubsets;
}

/**
 * @description 回溯法
 * @param {*[]} originalSet
 * @return {*[][]}
 */
export default function btPowerSet(originalSet) {
  return btPowerSetRecursive(originalSet);
}