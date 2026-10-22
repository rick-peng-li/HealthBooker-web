# HealthBooker

Git 地址：https://github.com/rick-peng-li/HealthBooker-web

## 项目简介

HealthBooker 是一个前后端分离的医生预约平台（MERN 全栈应用）。用户可以注册登录、浏览医生、在线预约、查看通知并管理个人资料；医生可以申请入驻、处理预约；管理员可以在后台管理用户、医生、预约和医生申请。

## 技术栈与架构

**前端（client/）**
- React 19 + Vite 8（ESM 构建，路径别名 `@/` 指向 `src`）
- Ant Design 6（统一 UI 组件库，主题色 #00abe4）
- React Router v7（`createBrowserRouter`，路由独立放在 `src/router`，页面组件懒加载）
- Redux Toolkit（用户状态管理）
- Axios（统一请求封装、Token 拦截、错误统一处理）

**后端（server/）**
- Node.js + Express 5（ES Module，`node --watch` 热更新）
- MongoDB + Mongoose 9
- JWT 认证（bcryptjs 密码加密）
- 生产模式下直接托管前端构建产物（client/dist），单端口部署

**目录结构**

```
HealthBooker-web/
├── client/                  # 前端
│   ├── public/              # 静态资源（favicon、manifest）
│   └── src/
│       ├── api/             # 接口请求封装（request.js + index.js）
│       ├── assets/images/   # 图片资源
│       ├── components/      # 可复用组件
│       │   ├── common/      # 通用组件（加载等）
│       │   ├── layout/      # 布局（主布局、后台布局、页脚）
│       │   ├── home/        # 首页区块（Hero、关于、统计、联系）
│       │   └── doctors/     # 医生卡片、预约弹窗
│       ├── pages/           # 页面（home/auth/doctors/appointments/notifications/apply-doctor/profile/dashboard/error）
│       ├── router/          # 路由配置与守卫
│       ├── store/           # Redux store 与 slices
│       ├── styles/          # 全局样式
│       └── utils/           # 工具方法（auth、upload、date）
├── server/                  # 后端
│   ├── config/              # 数据库连接
│   ├── controllers/         # 业务逻辑
│   ├── middleware/          # JWT 认证中间件
│   ├── models/              # Mongoose 模型
│   ├── routes/              # 路由
│   └── scripts/seed.js      # 初始化数据脚本
└── package.json             # 根脚本（一键安装/启动）
```

## 模块与页面功能

| 模块 | 页面 | 功能 |
| --- | --- | --- |
| 首页 | `/` | Hero 引导、关于我们、平台数据统计、联系我们表单 |
| 认证 | `/login` `/register` | 登录 / 注册（支持上传头像） |
| 医生 | `/doctors` | 医生列表卡片展示、登录后弹窗选择日期时间预约 |
| 预约 | `/appointments` | 当前用户相关预约列表，医生可标记完成 |
| 通知 | `/notifications` | 当前用户通知列表 |
| 申请医生 | `/applyfordoctor` | 提交医生入驻申请（专科、经验、诊费） |
| 个人资料 | `/profile` | 查看并修改资料，密码可选修改 |
| 管理后台 | `/dashboard` | 用户管理、医生管理、预约管理、医生申请审批（仅管理员） |

## 接口设计

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| POST | `/api/user/login` | 登录，返回 `{ message, token }` |
| POST | `/api/user/register` | 注册 |
| GET | `/api/user/getuser/:id` | 获取单个用户 |
| GET | `/api/user/getallusers` | 全部用户（管理员） |
| PUT | `/api/user/updateprofile` | 更新资料 |
| DELETE | `/api/user/deleteuser` | 删除用户 |
| GET | `/api/doctor/getalldoctors` | 已通过审核的医生 |
| GET | `/api/doctor/getnotdoctors` | 待审核医生申请（管理员） |
| POST | `/api/doctor/applyfordoctor` | 申请成为医生 |
| PUT | `/api/doctor/acceptdoctor` | 通过申请（管理员） |
| PUT | `/api/doctor/rejectdoctor` | 驳回申请（管理员） |
| PUT | `/api/doctor/deletedoctor` | 移除医生（管理员） |
| GET | `/api/appointment/getallappointments?search=` | 预约列表（按用户过滤） |
| POST | `/api/appointment/bookappointment` | 预约医生 |
| PUT | `/api/appointment/completed` | 标记预约完成 |
| GET | `/api/notification/getallnotifs` | 当前用户通知 |

除登录/注册外，接口均通过 `Authorization: Bearer <token>` 鉴权；错误统一返回 `{ message }`。

## 环境变量

**server/.env**

```
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/healthbooker
JWT_SECRET=your_jwt_secret
```

**client/.env**（可选）

```
VITE_API_BASE_URL=/api
VITE_CLOUDINARY_CLOUD_NAME=        # 配置后注册头像上传走 Cloudinary
VITE_CLOUDINARY_PRESET=
VITE_FORMSPREE_ENDPOINT=           # 配置后首页联系表单提交到 Formspree
```

## 本地运行

1. 启动 MongoDB（本地或 Docker）：

   ```
   docker run -d --name hb-mongo -p 27017:27017 mongo:7
   ```

2. 安装依赖并初始化数据：

   ```
   npm run install:all
   npm run seed
   ```

3. 一键启动前后端（后端 :5001，前端 Vite :5173，/api 自动代理）：

   ```
   npm run dev
   ```

4. 生产模式（构建前端后由后端单端口 :5001 托管）：

   ```
   npm run build
   npm start
   ```

seed 脚本内置测试账号：

| 角色 | 邮箱 | 密码 |
| --- | --- | --- |
| 管理员 | admin@healthbooker.com | admin123 |
| 医生 | doctor@healthbooker.com | doctor123 |
| 用户 | user@healthbooker.com | user12345 |

## License

MIT
