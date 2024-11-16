function solution(cards) {
  // Edit your code here
  let uniqueNumber = 0;
  for (let num of cards) {
    uniqueNumber ^= num; // 对每个数字进行异或运算
  }

  return uniqueNumber;
}

function main() {
  // Add your test cases here
  console.log(solution([1, 1, 2, 2, 3, 3, 4, 5, 5]) === 4); // true
  console.log(solution([0, 1, 0, 1, 2]) === 2); // true
}

main();

// 代码解释：
// 1. 初始化一个变量 uniqueNumber 为0。
// 2. 使用 for...of 循环遍历数组 nums 中的每个数字，使用异或运算更新 uniqueNumber。
// 最后返回 uniqueNumber，它就是唯一出现一次的数字。
// 时间复杂度：
// 该算法的时间复杂度为 O(n)，因为我们只遍历了一次数组。
// 空间复杂度：
// 该算法的空间复杂度为 O(1)，因为只使用了一个额外的变量来存储结果。
