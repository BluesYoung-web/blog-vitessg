---
title: Vue 相关
description: Vue 相关
date: 2020-12-23 14:22:18
---

[[toc]]

## `template` 内部使用渲染函数

**将渲染函数模拟为组件传递给内置的 component 组件**

```html
<component :is="{ render: () => h() }" />
```

## HTML 部分的占位符

`&#32;` ==> 普通的英文半角空格

`&#160;` ==> `&nbsp;` ==> `&#xA0;` ==> `no-break space` （普通的英文半角空格但不换行）

`&#12288;` ==> 中文全角空格 （一个中文宽度）

`&#8194;` ==> `&ensp;` ==> en空格 （半个中文宽度）

`&#8195;` ==> `&emsp;` ==> em空格 （一个中文宽度）

`&#8197;` ==> 四分之一em空格 （四分之一中文宽度）

## 原生页面使用 Vue 组件(Vue2)

### 全局定义并注册

引入后**可直接使用**

```js
;(function(Vue) {
	Vue.component('young', {
		props: {
			msg: String
		},
		template: `
			<div>
				<div class="taiji" @click="test">{{msg}}</div>
			</div>
		`,
		methods: {
			test() {
				alert(this.msg)
			}
		}
	})
})(window.Vue);
```

### 仅全局定义

引入后**挂载到 window 对象上，需要手动注册**

```js
;(function(Vue) {
	window.Young = Vue.extend({
		name: 'Young',
		props: {
			msg: String
		},
		template: `
			<div>
				<div class="taiji" @click="test">{{msg}}</div>
			</div>
		`,
		methods: {
			test() {
				alert(this.msg)
			}
		}
	})
})(window.Vue);
```