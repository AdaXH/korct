# korct

快速生成以 koa2 为服务端、 以 react 为前端的项目，开箱即用

[![DeepScan grade](https://deepscan.io/api/teams/13594/projects/17523/branches/404425/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=13594&pid=17523&bid=404425)
![Build Status](https://travis-ci.org/AdaXH/sites-server-ts.svg?branch=main)
[![NPM download](https://img.shields.io/npm/dt/korct.svg)]
![截图](https://bucker-for-sae.oss-cn-hangzhou.aliyuncs.com/githubimg/20210609161240.jpg)

#### server 特点：

- 无需为每个 route 执行注册, springBoot 式体验：

```js

  @ApiPrefix('/api')
  class UserController {
    /**
     * 依赖注入，注入userService
     */
    @Autowired()
    private userService: UserService;

    /**
     * get
     * restful 获取userId
     * @param userId string ==> ctx.param
     * @queryObj 获取query参数 ==> ctx.query
     * @queryItem 获取query参数中的某一个 ==> ctx.query[key]
     */
    @GetMapping('/user/:userId')
    async queryUser(@param('userId') userId: string): Promise<User> {
      return this.userService.queryUserById(userId);
    }
    /**
     * post
     * @request() 获取request ==> ctx.request.body
     */
    @PostMapping('/add-user')
    async insertUser(@request() user: User): Promise<User> {
      return this.userService.insertUser(user);
    }
  }
```

- 完整的 log 功能，基于 log4js

```js
 log/xx.log
 [INFO] 6424f40c-1958-4284-b4d7-5580ed9744ff GET /user/1623415519723 3ms req: {"userId":"1623415519723"} res: {"errorMessage":null,"errorCode":null,"errorStack":null,"data":{"name":"hello","userId":"1623415519723"},"success":true,"traceId":"6424f40c-1958-4284-b4d7-5580ed9744ff","pid":9580}

```

- 完整的单元测试，jest

```js
const request = require("supertest");

describe("Demo controller", () => {
  test("GET /user/1234", done => {
    request("http://localhost:3000/user")
      .get("/1234")
      .set("Accept", "application/json")
      .send()
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        expect(response.body.success).toEqual(true);
        expect(response.body.data.userId).toBe("1234");
        done();
      })
      .catch(err => done(err));
  });
});
```

#### web 特点：

- react 驱动

```js
import React from "react";
import ReactDom from "react-dom";
import Logo from "./component/logo";
import Demo from "./component/demo";
import styles from "./styles.less";
import "./global.less";

const App: React.FC<any> = () => {
  return (
    <div className={styles.box}>
      <Logo />
      <Demo />
    </div>
  );
};

ReactDom.render(<App />, document.querySelector("#root"));
```

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
- dist : 最终输出目录，打包后的server和web文件

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

cd projectName && npm run init

run dev:
npm run dev

run test:
npm run test

run build:
npm run build
```

<a href="https://github.com/AdaXH/korct">github</a>
