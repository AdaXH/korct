# koact
脚手架：以koa为服务端、react为前端的最佳实践
![截图](https://bucker-for-sae.oss-cn-hangzhou.aliyuncs.com/githubimg/20210609152619.jpg)
## 简介
Koact: 快速构建以koa2为服务端、以react为前端的脚手架，开箱即用。

server优势：
- 无需为每个route执行注册
- 完整的log功能，基于log4js
- 完整的单元测试，jest

web优势：
- react驱动
- 可配置的webpack
- 集成less、typescript等loader

[![DeepScan grade](https://deepscan.io/api/teams/13594/projects/16596/branches/359188/badge/grade.svg?token=a1fa0980263b30233c0ddf1e9c3ed778290db2ee)](https://deepscan.io/dashboard#view=project&tid=13594&pid=16596&bid=359188)
[![Build Status](https://travis-ci.org/AdaXH/sites-server-ts.svg?branch=main)](https://travis-ci.org/AdaXH/sites-server-ts)

## 文件目录

- controller : 路由控制器
- service : 业务逻辑层
- common : 一工具（注解，DI 等）
- config : 一些启动配置
- class : 运行时启动
- web : react前端代码
- test : 单元测试目录

目前已完成的功能/模块：

- [x] 日志
- [x] 路由注解
- [x] 多进程
- [x] 单元测试
- [ ] 数据库支持，mysql、mongodb

## 如何使用koact
  ````shell
  npm i koact -g
  
  koact create projectName
  ````
