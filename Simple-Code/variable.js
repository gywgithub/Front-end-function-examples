/**
 * 考察知识点 typeof 运算符
 * typeof 运算符用于检测变量的数据类型
 * 它返回一个字符串，表示变量的数据类型
 * 
 * 考察变量的声明和使用
 */

var a;
console.log(typeof a); // 输出 undefined；变量 a 未被赋值，因此为 undefined


console.log(b); // 报错：b is not defined；变量 b 未被声明，因此会导致一个引用错误。当这里代码报错后，后面的代码将不会执行。

b = 10;
console.log(typeof b);