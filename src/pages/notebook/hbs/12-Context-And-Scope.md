---
title: 12-执行上下文与作用域
image: /img/hbs.png
date: 2020-12-28 17:24:46
description: JavaScript 执行上下文与作用域
---

[[toc]]

## 执行上下文

变量和函数的上下文决定了它们可以访问哪些数据，以及它们的行为

每个上下文都有一个关联的变量对象，而这个上下文中定义的所有变量和函数都存在于这个对象上

全局上下文是最外层的上下文。根据 `ECMAScript` 实现的宿主环境，表示全局上下文的对象可能不一样

在浏览器中，全局上下文就是我们常说的 `window` 对象，因此所有通过 `var` 定义的全局变量和函数都会成为 `window` 对象的属性和方法

使用 `let` 和 `const` 的顶级声明不会定义在全局上下文中，但在作用域链解析上效果是一样的

每个**函数调用**都有自己的上下文。当代码执行流进入函数时，函数的上下文被推到一个**上下文栈**上。 在函数执行完之后，上下文栈会弹出该函数上下文，将控制权返还给之前的执行上下文

`ECMAScript` 程序的执行流就是通过这个上下文栈进行控制的

## 作用域链

上下文中的代码在执行的时候，会创建变量对象的一个作用域链（`scope chain`）

这个作用域链决定了各级上下文中的代码在访问变量和函数时的顺序

代码**正在执行的上下文的变量对象**始终位于作用域链的最前端

如果上下文是**函数**，则其活动对象（`activation object`）用作**变量对象**

活动对象最初只有一个定义变量：`arguments`（**全局上下文中没有这个变量**）

作用域链中的**下一个变量对象**来自**包含上下文(此上下文的父级上下文)**，再下一个对象来自再下一个包含上下文，以此类推直至全局上下文

**全局上下文的变量对象始终是作用域链的最后一个变量对象**

代码执行时的标识符解析是通过沿作用域链逐级搜索标识符名称完成的，搜索过程始终从作用域链的最前端开始，然后逐级往后，直到找到标识符（**如果没有找到标识符，那么通常会报错**）

**内部上下文可以通过作用域链访问外部上下文中的一切，但外部上下文无法访问内部上下文中的任何东西**

```js
var color = "blue";
function changeColor() {
 let anotherColor = "red";
 function swapColors() {
 let tempColor = anotherColor;
 anotherColor = color;
 color = tempColor;
 // 这里可以访问 color、anotherColor 和 tempColor
 }
 // 这里可以访问 color 和 anotherColor，但访问不到 tempColor
 swapColors();
}
// 这里只能访问 color
changeColor(); 
```

### 作用域链增强

虽然执行上下文主要有全局上下文和函数上下文两种（`eval()`调用内部存在第三种上下文），但有其他方式来增强作用域链

某些语句会导致在作用域链前端临时添加一个上下文，这个上下文在代码执行后会被删除：

`try/catch` 语句的 `catch` 块，会创建一个新的变量对象，这个变量对象会包含要抛出的错误对象的声明

`with` 语句，会向作用域链前端添加指定的对象

`IE` 的实现在 `IE8` 之前是有偏差的，即**它们会将 `catch` 语句中捕获的错误添加到执行上下文的变量对象上，而不是 `catch` 语句的变量对象上，导致在 `catch` 块外部都可以访问到错误**。`IE9` 纠正了这个问题

## 变量声明

`ES5.1` 及其之前，`var` 都是**声明变量的唯一关键字**

`ES6` 不仅增加了 `let` 和 `const` 两个关键字，而且还让这两个关键字压倒性地超越 `var` 成为首选

### `var`

在使用 `var` 声明变量时，变量会被自动添加到最接近的上下文

如果变量**未经声明就被初始化了**， 那么它就会自动被添加到**全局上下文**

**在严格模式下，未经声明就初始化变量会报错**

`var` 声明会被拿到函数或全局作用域的顶部，位于作用域中所有代码之前(**变量提升**)

### `let`

大体同`var`

具有**块级作用域，不存在变量提升**

**同一块级作用域内不能重复声明，会抛出`SyntaxError`**

暂时性死区

全局声明**不会**成为`window`的属性

`for` 循环中的变量**不会**泄露到循环体外部

*严格来讲，`let` 在 `JavaScript` 运行时中也会被提升，但由于“暂时性死区”（`temporal dead zone`）的缘故，实际上**不能在声明之前使用** `let` 变量。因此，从写 `JavaScript` 代码的角度说，`let` 的提升跟 `var` 是不一样的*

### `const`

基本同`let`

**声明的同时必须初始化**

**不允许修改**指向变量的**引用**（属性修改不受影响）