---
post: true
title: 如何解决Vue无法显示网络图片的问题
date: 2024-12-05
cover: https://img.tukuppt.com/png_preview/00/25/11/mbKCegbn9L.jpg!/fw/780
coveross: https://img.tukuppt.com/png_preview/00/25/11/mbKCegbn9L.jpg!/fw/780
# 分类
categories:
 - BUG
tags:
 - 如何解决Vue无法显示网络图片的问题
description: 如何解决Vue无法显示网络图片的问题
---


## 缘由

#### 因为项目需求，项目中引用了图片的网络链接，但是发现了很奇怪的问题，图片链接如果在浏览器的地址栏中可以直接打开，如果在前端项目 Vue 中 的Img标签中却无法被渲染，但是在普通的 HTML 中可以正常显示。

## 解决方案
#### 在vue项目中的头部添加meta标签
```html
<!-- 在index.html中添加： -->
<meta name="referrer" content="no-referrer">
<!-- 或者在img标签中添加： -->
<img referrerpolicy="no-referrer" src="xx"/>
```


# Referrer是什么？
* Referer是http请求header的一部分，当浏览器向Web服务器发送请求的时候，请求头信息一般包含referer。该属性的作用就是告诉服务器这个链接是从哪个页面链接过来的，服务器就可以基于此信息进行处理。

# Referre作用
* 防盗链：顾名思义就是防止别人复制链接盗取资源，原理就是，服务器再接受访问静态资源的请求时，会判断Referer值是否是自己的网站地址。
* 防止恶意请求：比如静态请求是.html结尾的，动态请求是.shtml，那么所有的*.shtml请求，必须 Referer为我自己的网站才可以访问，这就是Referer的作用。

# 防盗链的两种方式
* 允许空Referrer：允许Referer为空，意味着你允许比如浏览器直接访问，就是空。
* 不允许空Referer：意味着，发送请求必须携带referrer属性。

