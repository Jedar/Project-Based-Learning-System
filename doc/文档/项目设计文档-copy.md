# PBL项目设计文档

小组：第二组  
组长：俞继涛  
组员：王永立、姜向阳、赵骞云  

## 目录  
[toc]

## 项目概述

## 前端设计

### 前端技术栈

| **技术类型**   | **技术名称**        |
| -------------- | ------------------- |
| 前端框架       | Angular        |
| 前端组件库   | NG-ZORRO |
| 甘特图   | jsGantt |
| 统计图    | Echarts            |

### 前端框架

```shell script
.
├── app-routing.module.ts
├── app-share.module.ts
├── app.component.css
├── app.component.html
├── app.component.ts
├── app.module.ts
├── components
│   ├── footer-content
│   │   ├── footer-content.component.css
│   │   ├── footer-content.component.html
│   │   └── footer-content.component.ts
│   ├── header-logo
│   │   ├── header-logo.component.css
│   │   ├── header-logo.component.html
│   │   └── header-logo.component.ts
│   ├── page-error
│   │   ├── page-error.component.css
│   │   ├── page-error.component.html
│   │   └── page-error.component.ts
│   └── page-unauthorized
│       ├── page-unauthorized.component.css
│       ├── page-unauthorized.component.html
│       └── page-unauthorized.component.ts
├── ng-zorro-antd.module.ts
├── pages
│   ├── auth
│   │   ├── auth-main
│   │   ├── auth-routing.module.ts
│   │   ├── auth.module.ts
│   │   ├── example
│   │   ├── manager-login
│   │   ├── student-login
│   │   ├── student-signup
│   │   └── teacher-login
│   ├── manager
│   │   ├── manager-class
│   │   ├── manager-class-chart
│   │   ├── manager-class-create
│   │   ├── manager-main
│   │   ├── manager-project
│   │   ├── manager-project-chart
│   │   ├── manager-project-create
│   │   ├── manager-routing.module.ts
│   │   ├── manager-student
│   │   ├── manager-student-create
│   │   ├── manager-system
│   │   ├── manager-teacher
│   │   ├── manager-teacher-create
│   │   └── manager.module.ts
│   ├── project
│   │   ├── pj-all-task
│   │   ├── pj-discuss
│   │   ├── pj-edit-task
│   │   ├── pj-file
│   │   ├── pj-info
│   │   ├── pj-manage-info
│   │   ├── pj-manage-task
│   │   ├── pj-mark-mate
│   │   ├── pj-mark-score
│   │   ├── pj-modify-task
│   │   ├── pj-my-score
│   │   ├── pj-my-task
│   │   ├── pj-student-main
│   │   ├── pj-teacher-main
│   │   ├── project-routing.module.ts
│   │   └── project.module.ts
│   ├── student
│   │   ├── course-card
│   │   ├── course-info
│   │   ├── course-join
│   │   ├── course-list
│   │   ├── course-main
│   │   ├── info
│   │   ├── memo-list
│   │   ├── modify-info
│   │   ├── project-join
│   │   ├── project-list
│   │   ├── student-main
│   │   ├── student-routing.module.ts
│   │   └── student.module.ts
│   ├── teacher
│   │   ├── course-add
│   │   ├── course-info
│   │   ├── course-list
│   │   ├── course-main
│   │   ├── info
│   │   ├── modify-info
│   │   ├── project-add
│   │   ├── project-list
│   │   ├── teacher-main
│   │   ├── teacher-routing.module.ts
│   │   └── teacher.module.ts
│   └── welcome
│       ├── welcome
│       ├── welcome-routing.module.ts
│       └── welcome.module.ts
├── services
│   ├── auth.service.ts
│   ├── common.service.ts
│   ├── course.service.ts
│   ├── discussion.service.ts
│   ├── file.service.ts
│   ├── manager.service.ts
│   ├── memo.service.ts
│   ├── project.service.ts
│   ├── score.service.ts
│   ├── student.service.ts
│   ├── task.service.ts
│   ├── teacher.service.ts
│   └── upload-file.service.ts
└── share
    ├── CommonValidator.ts
    ├── MyInterceptor.ts
    ├── Token.ts
    ├── common.model.ts
    ├── course.model.ts
    ├── dicussion.model.ts
    ├── file.model.ts
    ├── memo.model.ts
    ├── project.model.ts
    ├── score.model.ts
    ├── student.model.ts
    ├── task.model.ts
    └── teacher.model.ts
```

下面是前端架构的简单介绍：

```shell script
web-pbl/src/app

├─ components   公共组件
├─ pages        主体页面，下分多个模块
├─ services     自定义服务
└─ share        封装前后端交互的实体对象

web-pbl/src/assets

├─ data         前端开发时使用的虚拟数据
├─ image        项目中使用的图片
└─ js           js文件，主要在echarts中使用
```

### 前端页面展示
这里仅展示部分页面，更多页面请访问项目网站：http://49.4.94.169:8080/

登录页面
![](./assets/登录页面.jpg)

注册页面
![](./assets/注册页面.jpg)

课程列表页面
![](./assets/课程列表页面.jpg)

课程主页页面
![](./assets/课程主页页面.jpg)

项目主页页面
![](./assets/项目主页页面.jpg)

任务页面
![](./assets/任务页面.jpg)

讨论页面
![](./assets/讨论页面.jpg)

打分页面(以互评为例)
![](./assets/打分页面.jpg)

管理员页面(这里仅展示学生列表页面)
![](./assets/管理员页面.jpg)
## 后端设计

### 后端技术栈

| **技术类型**   | **技术名称**        |
| -------------- | ------------------- |
| 后端框架       | Spring  Boot        |
| 数据库访问层   | Mybatis，通用Mapper |
| JSON数据封装   | Fastjson            |
| JWT身份验证    | Java-jwt            |
| 前后端接口文档 | Swagger             |
| 接口测试       | Postman             |
| 代码框架生成器 | freemaker           |

### 后端框架概述

我们的后端是基于 Spring Boot 框架进行搭建的，数据库方面使用了 Mybatis 框架。

我们使用了很方便的代码生成器来生成数据库中每一个实体对应的实体类以及数据访问层、业务层和控制层文件等，然后我们根据需要修改和新增需要的实体类，以及相应的Mapper、Service和Controller文件中添加相应的功能即可。使用代码生成器既省去了创建各种类文件的过程，又有一定的编码规范。

另外，我们在后端开发的过程中对功能的实现进行测试。对于每一个Mapper都创建了一个测试类，并对每一个Mapper的所有方法都进行了测试。然后对于Controller的测试，我们使用Postman软件，自定义HTTP请求，从而判断Controller的功能实现是否正确。

为了更好地对接前后端，避免出现各种问题，我们使用了Swagger将接口信息规范化，并生成很详细的接口文档。（Swagger部分后面会详细介绍）

下面是后端目录的简单介绍

```shell script
.
├─ annotation   用户权限验证的注解
├─ configurer   配置文件
├─ controller   控制层
├─ core         通用Mapper、后端返回数据等相关的类、
├─ dao          数据访问层
├─ interceptor  拦截器
├─ pojo         实体类集合
├─ request      
├─ service      业务层接口
│  └─ impl      业务层实现
└─ utils        工具类集合
```

### 数据访问层

数据访问层主要是对接数据库，进行数据库的访问以及进行数据的操作。每个Mapper类都对应着一个Mapper XML文件，Mapper类中定义数据库操作的接口，而真正的SQL语句是写在Mapper XML文件中的。

```shell script
.
├── CourseMapper.java
├── DiscussionMapper.java
├── FileMapper.java
├── MemoMapper.java
├── ProjectMapper.java
├── ScoreMapper.java
├── StudentMapper.java
├── TaskMapper.java
├── TeacherMapper.java
└── UserMapper.java
```
### 业务层

业务层主要负责所有的后端功能的实现，供控制层调用。业务层主要是通过调用Mapper来进行数据库操作。

```shell script
.
├── CourseService.java
├── DiscussionService.java
├── FileService.java
├── IUploadService.java
├── MemoService.java
├── ProjectService.java
├── ScoreService.java
├── StudentService.java
├── TaskService.java
├── TeacherService.java
├── UserService.java
└── impl
```

### 控制层

控制层主要是负责与前端进行交互，接收并处理从前端传递过来的请求信息，然后调用相应的Service（业务层）类进行各种的操作和处理。

这里的`VerifyController.java`是负责后端生成验证码以及验证码的验证，其他的都是各种实体如user、project对应的相关操作。

```shell script
.
├── CourseController.java
├── DiscussionController.java
├── FileController.java
├── HelloController.java
├── MemoController.java
├── ProjectController.java
├── ScoreController.java
├── StudentController.java
├── TaskController.java
├── TeacherController.java
├── UploadController.java
├── UserController.java
└── VerifyController.java
```



## 关键功能的实现

### 评分功能

#### 数据库设计
score表：记录了项目ID(project_id)、用户ID(user_id)、分数类型(score_type:1：学生自评 2：学生互评 3：教师评价)、
评分人ID(scorer_id)、分数(value)、打分时间(time)和评论(comment); {project_id,user_id,score_type,scorer_id}
为主键。
score_distribute表:记录了一个项目的评分分布，包括project_id,type,distribute(分数占比)三个字段。
#### 功能设计
##### 评分细分：
    学生自评，学生互评，教师评价。
##### 评分时间限定：
    项目设置了评分时间，学生可以在评分时间内进行互评和自评，在规定时间之外不开启评分的入口；
    查看任务完成情况和讨论板留言情况：在评分面板可以查看评分学生的参与的任务和任务完成的情况，可以查看发布的
    讨论的数目和回复的讨论数。
#### 互评计算：
    当前登录学生在评分时间内可以对其他学生都进行互评，互评的分数取所有学生对该学生的评分后求平均值，
#### 评分次数：
    自评、互评和教师评价都只有一次机会，提交了分数之后不可再次提交或修改。
#### 功能展示
![](./assets/项目设置页面.jpg)


### 甘特图

#### 甘特图框架安装
我们组使用的Gantt图组件是[jsgantt-improved](https://github.com/jsGanttImproved/ng-gantt)，这个组件各方面封装得很好，使用方便。
```
# 安装
npm install --save jsgantt-improved ng-gantt

# 在app.module中引入框架
import { NgGanttEditorModule } from 'ng-gantt' 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ....,
    NgGanttEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

# 在style.css中引入甘特图的样式增强效果
@import "~jsgantt-improved/dist/jsgantt.css";
```






### 文件上传





### JWT访问身份验证


### Swagger接口[前后端接口文档](http://49.4.94.169:8080/swagger-ui.html#/)

在项目中我们使用了Swagger UI和Springfox Swagger来生成前后端接口文档。对每个Restful接口，接口的参数，接口的返回数据
进行了描述。在SpringBoot项目中整合Springfox Swagger,可以直接通过扫描代码生成接口文档，不需要再去维护描述文件，
接口文档是重要的一部分，swagger 工具是为了维护接口文档应运而生的。在实验过程，工具的使用方法是次要的，
更为关键的是加深了对前后端分离架构的了解，了解了接口文档在前后端工作的重要性，使用相应的工具如何去维护一个良好的接口文档。 

#### Swagger页面展示
![](./assets/swagger页面.jpg)
![](./assets/swagger接口详细页面.jpg)
## 项目部署





## 遇到的问题

### 1. 后端Result使用错误问题
    后端Result使用错误问题导致Swagger接口不够详细
###解决方案:
    重新设计响应结果生成的类ResultTypeGenerator

### 2. 数据库时区问题
### 解决方案：

    [数据库时区问题](https://blog.csdn.net/qq_30553235/article/details/79612824)  
    mysql> set global time_zone = '+08:00';
    Query OK, 0 rows affected (0.00 sec)
    
    mysql> set time_zone = '+08:00';
    Query OK, 0 rows affected (0.00 sec)

### 3. 评分时，双向数据绑定的问题
### 原因：使用一个固定的变量去绑定所有互评和师评时输入的数据
### 解决方案：
    新增数据接口ScoreStudent,添加了value(评分),comment(评论)两个属性，对应学生的评分绑定到对应的值上。

### 4. angular表格中的输入框无法使用双向数据绑定的问题
### 解决方案：
    加上[ngModelOptions]="{standalone: true}"

### 5. 前端给后端发送请求时，请求头中token无法解析的问题
### 原因：
    一开始仿照网上的一些做法，将token设为常量，导致其在初始化时就设好了值，而那时候还没有登录，token是没有值的。
### 解决方案：
    将token设为变量，每次发送请求前从session中读取最新的值。

### 6. 学生注册时实时判断用户名是否存在问题
### 原因：
    因为HTTP请求是异步的，在还没有收到返回信息的时候前端就已经进行判断了，所以导致用户名判断不准确
### 解决方案：
    最后将用户名是否存在的判断放到了点击提交按钮后触发，这样正常情况下已经收到了返回信息了。

### 7. Mybatis SQL语句 natural join 会出现重复行
### 解决方案：
    使用inner join xxx on xxx

## 项目参考

### 前端技术栈资料参考

|技术|描述|
|---|---|
|Angular| [参考链接](https://angular.io/) |
|NG-ZORRO（Ant Design）| [参考链接](https://ng.ant.design/components/button/zh) |

### 后端技术栈资料参考

|技术分类|技术名称|常用链接|
|---|---|---|
|ORM框架|Mybatis|[官网](https://mybatis.org/mybatis-3/zh/index.html),[W3C](https://www.w3cschool.cn/mybatis/),以及课程视频|
|通用Mapper框架|tk.mybatis|[通用Mapper介绍](https://mapperhelper.github.io/docs/)|
|JSON解析|FastJson|[阿里的JSON工具库](https://github.com/Alibaba/fastjson/wiki/%E9%A6%96%E9%A1%B5)|

### 其它资料参考
+ [项目表单实现参考](https://ng.ant.design/components/form/zh)
+ [Swagger介绍与使用](https://www.jianshu.com/p/349e130e40d5)
+ [子路由的例子](https://jonny-huang.github.io/angular/training/09_angular_router2/)
+ [甘特图的框架](https://github.com/neuronetio/angular-gantt-schedule-timeline-calendar)


