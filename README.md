## TimeWait
[![Build Status](https://travis-ci.org/onaug6th/timeWait-frontEnd.svg?branch=master)](https://travis-ci.org/onaug6th/timeWait-frontEnd)

<img src="https://timewait-1253668581.cos.ap-chengdu.myqcloud.com/homePage.jpg" alt="homePage">

学习angular2的过程的个人项目，整合了angular全家桶功能在内，项目内容包含（小型论坛，博客，注册登陆系统，管理员系统，还有一些自己添加的小玩意... ）。

后端项目代码 : https://github.com/onaug6th/timeWait-backEnd

## 概况

一开始有想过选择primeng或者element angular这样的库。但是考虑到primeng的组件库不太合适自己，element angular还没有普及。所以最后还是选择了bootstrap作为样式库，组件自己造。

bootstrap作为老牌样式框架。稳定和以及自己工作一直在用这个，所以是目前最好的选择。

一开始是用vue来开发的。但是后来和其他团队共同开发大型项目选择了angular2，angular2的学习陡度比vue要难多了。不过还好有着vue的经验，上手angular2也特别快。因为公司技术更换，所以这个项目也从vue换成了angular2。

在这个项目开始启动的时候，是和一个后端的同学合伙的。但是后来不了了之了。于是找了另外一个同事来参加，也被嫌弃想法太天真而被放弃了。所以最后选择学习javascript的亲戚node.js来实现自己的后端，同时也入门了no sql mongoDB，不得不说这几个家伙在一起开发是真的快。

### 为什么要建这个网站呢？

因为看过很多优秀的开发者都有自己的个人博客，上面一堆自己的干货和分享和总结心得。和其他开发者的讨论也很有意思。

而我的同学也常常和我提起学生时代那些回忆，（虽然才刚毕业！）那我建一个网站来保存我们这些回忆以后可以看不是很好吗？所以就有了这个项目。

但是这个回忆（印象功能）还没开放，因为图片存储还需要再思考如何优化。

花了两个月时间将这个项目写完，通过自己的域名在外网上看到了自己的网站，也算是有一点小成就了。

下方有部分项目内容截图。

后端使用express，数据库MongoDB，数据库中间件Mongoose。

如果觉得对你有帮助的话，可以给我个star哦。谢谢啦 😄

### 用法

```
git clone https://github.com/onaug6th/timeWait-frontEnd

cd timeWait-frontEnd

npm install 

ng serve
```
默认会开启4200端口，访问localhost:4200即可打开项目。

### 构建

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## 部分截图

<img src="https://timewait-1253668581.cos.ap-chengdu.myqcloud.com/square.jpg" alt="square" />
<img src="https://timewait-1253668581.cos.ap-chengdu.myqcloud.com/forum.jpg" alt="forum" />
<img src="https://timewait-1253668581.cos.ap-chengdu.myqcloud.com/about.jpg" alt="about" />
<img src="https://timewait-1253668581.cos.ap-chengdu.myqcloud.com/blog.jpg" alt="blog" />
<img src="https://timewait-1253668581.cos.ap-chengdu.myqcloud.com/blogDetail.jpg" alt="blogDeatil" />
<img src="https://timewait-1253668581.cos.ap-chengdu.myqcloud.com/user.jpg" alt="userSpace" />
<img src="https://timewait-1253668581.cos.ap-chengdu.myqcloud.com/profile.jpg" alt="profile" />
<img src="https://timewait-1253668581.cos.ap-chengdu.myqcloud.com/system.jpg" alt="system" />

## 开源许可证

MIT
