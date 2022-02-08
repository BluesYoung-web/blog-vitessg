---
title: 开发过程中的报错(异常)及其处理
description: 开发过程中的报错(异常)及其处理
date: 2020-12-23 16:30:33
---

[[toc]]

## Element-Plus(Element UI)

### 打包后提示字体文件丢失

实际上并没有丢失，只是莫名其妙多了一层 `_assets`

**罪魁祸首->配置文件中设置的`base: './'`**，将其改为绝对路径之后就好了

*目前 Element-Plus 的正式版已经使用 svg 图标替代字体图标*

### Dialog 组件显示异常

多层 Dialog 组件嵌套的情况下可能会出现层级混乱

**解决方法，内部 Dialog 增加以下属性：**
  - `:append-to-body="true"` 弹出层插入 body
  - `:modal-append-to-body="false"` 遮罩层插入父级

### 表格组件错位

页面处于 `keep-alive` 缓存组件之中

不同标签页切换的时候，表格组件可能会出现样式错位的 bug

此时按照常理来说应该要重新渲染，但是普通的生命周期钩子不会触发

`activated` —— 进入页面时触发(`keep-alive`)

**表格组件暴露的 `doLayout` 方法可以重新渲染**

```js
activited() {
  this.$nextTick(() => {
    this.$refs.table.doLayout()
  })
}
```

## 页面滚动无法禁用

尝试监听 `document.on('scroll')`，虽然可以监听到对应的事件，但是无法禁用

**滚动属于 `UI `事件，无法通过 `e.preventDefault()` 来禁用**

**解决方法**
  - 换个角度，禁用所有可以造成页面滚动的事件
  - `window.on`：
    - `'wheel'`
    - `'keyup'/'keydown'`
      - '↑ 38'
      - '↓ 40'
      - 'home 36'
      - 'end 35'
      - 'page up 33'
      - 'page down 34'

## 移动端

### 使用 vh 布局，软键盘弹出导致的样式错乱

当软件盘弹出时，会导致 `window.innerHeight` 发生改变

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <script>
    window.onerror = function() {
      window.alert('您的浏览器版本过低，请尝试使用其他浏览器或将浏览器升级至最新版本后重试！');
    }
    </script>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta id="viewportMeta" name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0">
		<meta name="format-detection" content="telephone=no,email=no,date=no,address=no">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <script src="<%= BASE_URL %>thinkingdata.umd.min.js"></script>
    <title>分享</title>
  </head>
  <body>
    <noscript>
      <strong>请启用 JavaScript 以获得最佳体验</strong>
    </noscript>
    <script>
      // 设定视口高度，防止软键盘影响布局
      const metaElement = document.querySelector('#viewportMeta');
      metaElement.setAttribute('content', `maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0,height=${window.innerHeight}`);  
    </script>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

## SQL

### 自增ID无法从 0 开始

曲线救国

现将要插入的第一条数据的自增id设为 -1(`INSERT`)

然后再将第一条数据的自增ID**修改**为0(`UPDATE`)

```sql
-- ...
-- 强制从零开始
INSERT INTO `node` VALUES ('-1', '0', '根节点', '', '', '0', '0', null);
UPDATE `node` SET autoid = 0 WHERE autoid = -1;
-- 
INSERT INTO `node` VALUES ('1', '1', 'xxx', 'xxx', '', '-1', '1', '0');
-- ...
```


### 具有主从关系的表无法直接插入

先注释掉 `SQL` 文件中与主从表关联关系有关的语句

先将数据全部插入成功之后再去修改表结构

```sql
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `aid` int(11) NOT NULL AUTO_INCREMENT,
  `admin_name` varchar(255) NOT NULL,
  `phone_number` varchar(11) NOT NULL DEFAULT '',
  `passwd` varchar(255) NOT NULL,
  `metadataAutoid` int(11) DEFAULT NULL,
  PRIMARY KEY (`aid`),
  UNIQUE KEY `IDX_81a16d17d501cba9be802fd26b` (`admin_name`),
  UNIQUE KEY `REL_52f0a7932dddb6fdf30889c846` (`metadataAutoid`)
  -- ,
  -- 仅为阻止 sql 执行报错，实际存在
  -- CONSTRAINT `FK_52f0a7932dddb6fdf30889c846d` FOREIGN KEY (`metadataAutoid`) REFERENCES `user_meta_data` (`autoid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
```

## Linux

### DNS 错误

```bash
sudo vim /etc/resolv.conf
# 对其内容做出以下修改
# 注释掉现有的 nameserver
nameserver 内网的 dns 服务器地址
nameserver 8.8.8.8
nameserver 8.8.4.4

# 修改完毕，保存即可生效
```

### 使用 Node 启动项目提示文件超限的错误

```bash
# 报错代码
# Error: ENOSPC: System limit for number of file watchers reached, watch '******'
#	at FSWatcher.start

# 解决方案
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
sudo sysctl --system
```

## Nginx

### MIME 报错

<n-alert type="error">**Resource interpreted as Stylesheet but transferred with MIME type text/plain**</n-alert>

**情形一：**
- 在引入模块化开发的`js`文件时，必须声明类型为 `module`
- 这样，浏览器就会将这个文件认为是`ECMAScript`模块
- 一般情况下业界或者官方会将这种模块文件使用 `mjs `命名
- `Nginx `会根据`mime type`定义的对应关系来告诉浏览器如何处理服务器传给浏览器的这个文件，一般默认`default_type application/octet-stream;`会对未定义的文件设置为该类型

```html
<script type="module" src="/src/main.ts"></script>
```

```nginx
server {
  http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    types {
      application/x-javascript              mjs;
    }
  }
}
```

**情形二：**
- `vue3` 使用 `h5` 路由
- **打包时使用了相对路径`./`，将 `base` 的值修改为绝对路径就行了**

### `net::ERR_HTTP2_PROTOCOL_ERROR 200`

场景：后端接口使用 `nginx` 反向代理，一个数据导出接口，请求 `10W+` 的数据

**可能的原因：**
  - nginx 截断响应
  - 后端框架自行截断响应

**解决方案：**
  - 在 `nginx` 配置文件中加入 `proxy_max_temp_file_size 0;`，然后重载 `nginx`（原因一）
  - **分页并发请求，前端合成，更优**

## TypeScript

### `.vue` 文件引入报错

新建类型说明文件 `shims-vue.d.ts`，内容如下：

```ts
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

### `.ts` 文件引入报错

**使用相对路径引入**

```ts
// 关闭报错
// @ts-nocheck       忽略当前文件
// @ts-ignore        忽略下一行
```

## vite

### 打包内存耗尽

**限制 `node` 可使用的内存**
  - `cross-env NODE_OPTIONS=--max_old_space_size=1024 vite build`

**调整配置文件**

```ts
export default {
  // ...
  build: {
    // 不生成源码映射文件
    sourcemap: false,
    // 不生成压缩报告
    brotliSize: false
  }
}
```

### momentjs 本地化无效

**表现：**
- `moment.duration(100, 's').humanize()`结果一直显示为英文，无论是否增加 `.locale('zh-cn')`
- 导入对应的语言包也没有任何效果(`import 'moment/locale/zh-cn'`)
- **node 环境下无需任何操作**

**原因：`vite` 不支持直接导入 `umd` 模块的源文件**[(issues)](https://github.com/vitejs/vite/issues/945)

```ts
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
moment.duration(120, 's').humanize(); // 两分钟
```