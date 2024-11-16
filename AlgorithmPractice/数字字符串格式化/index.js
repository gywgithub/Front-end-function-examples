function formatNumberString(input) {
  // 去掉前面的无用0
  input = input.replace(/^0+/, "");

  // 分割整数部分和小数部分
  const [integerPart, decimalPart] = input.split(".");

  return decimalPart
    ? `${formatIntegerWithCommas(integerPart)}.${decimalPart}`
    : formatIntegerWithCommas(integerPart);
}

function formatIntegerWithCommas(integerPart) {
  let formattedInteger = "";
  let count = 0;

  // 从后向前遍历整数部分
  for (let i = integerPart.length - 1; i >= 0; i--) {
    formattedInteger = integerPart[i] + formattedInteger; // 将当前数字添加到结果前面
    count++;

    // 每三位添加一个逗号
    if (count % 3 === 0 && i !== 0) {
      formattedInteger = "," + formattedInteger;
    }
  }

  return formattedInteger;
}

function main() {
  console.log(formatNumberString("00012345678.98")); // 12,345,678.98
  console.log(formatNumberString("12345678.98")); // 12,345,678.98
  console.log(formatNumberString("123")); // 123
}

main();

// 正则表达式 /^0+/ 用于匹配字符串开头的一个或多个零。下面是对这个正则表达式的详细分析：
// 组成部分
// 1. /：正则表达式的开始和结束定界符。在 JavaScript 和许多其他语言中，正则表达式通常用斜杠包围。
// 2. ^：这个符号表示字符串的开头。它是一个锚点，确保匹配发生在字符串的最开始位置。
// 3. 0：这是要匹配的字符。在这个正则表达式中，它表示数字0。
// 4. +：这个符号表示前面的元素（在这里是0）可以出现一次或多次。也就是说，它会匹配一个或多个连续的零。
