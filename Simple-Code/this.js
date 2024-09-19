/**
 * 考察知识点 this 指向
 */

const num = {
  a: 8,
  add() {
    console.log(this); // 输出 { a: 8, add: [Function: add], reduce: [Function: reduce] }
    return this.a + 2;
  },
  reduce: () => {
    console.log(this); // Node环境中输出 {}
    // 箭头函数没有自己的 this，它会捕获其所在上下文的 this
    // 由于在全局作用域中调用了 num.reduce()，因此 this 指向全局对象 window
    // 由于 window 对象中没有 a 属性，因此 this.a 为 undefined
    // 因此 this.a - 2 的结果为 NaN

    return this.a - 2;
  },
};

console.log(num.add()); // 输出 10

console.log(num.reduce()); // 输出 NaN
