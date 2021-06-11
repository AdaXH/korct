# korct

脚手架：以 koa 为服务端、react 为前端的最佳实践

[![DeepScan grade](https://deepscan.io/api/teams/13594/projects/17523/branches/404425/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=13594&pid=17523&bid=404425)
[![Build Status](https://travis-ci.org/AdaXH/sites-server-ts.svg?branch=main)](https://travis-ci.org/AdaXH/sites-server-ts)
![NPM download](https://img.shields.io/npm/dt/korct.svg)
![截图](https://bucker-for-sae.oss-cn-hangzhou.aliyuncs.com/githubimg/20210609161240.jpg)

## 简介

Korct: 快速构建以 koa2 为服务端、以 react 为前端的脚手架，开箱即用。

server 优势：

- 无需为每个 route 执行注册
- 完整的 log 功能，基于 log4js
- 完整的单元测试，jest

web 优势：

- react 驱动
- 可配置的 webpack
- 集成 less、typescript 等 loader


## 文件目录

- controller : 路由控制器
- service : 业务逻辑层
- common : 一工具（注解，DI 等）
- config : 一些启动配置
- class : 运行时启动
- web : react 前端代码
- test : 单元测试目录

目前已完成的功能/模块：

- [x] 日志
- [x] 路由注解
- [x] 多进程
- [x] 单元测试
- [ ] 数据库支持，mysql、mongodb

## 如何使用 korct

```shell
npm i korct -g

korct create projectName
```
