### 项目介绍
是的，这个就是目前很火热的Air小空调微信小程序。扫码体验:
<br/>
<img style="width: 30%; height: 30%;" src="https://7072-prod-6g5ecxpzb9d6af28-1326799019.tcb.qcloud.la/images/air/aic.jpg.jpg?sign=cd84fb939a4eb4f7d540073b2487984c&t=1721746409" />
<br/>
可以扫下码反馈体验：
<br/>
<img style="width: 30%; height: 30%;" src="https://7072-prod-6g5ecxpzb9d6af28-1326799019.tcb.qcloud.la/images/air/vote.jpg?sign=1d950e01588612b552924657bb5744a5&t=1718201341" />
<br/>
感兴趣的话可以按下面步骤拉取代码构建部署使用。


### 分支

选择master分支

### 修改配置

在项目根目录下的`project.config.json`文件中，修改appid为你自己的appid，如下所示：
```javascript
{
  "miniprogramRoot": "dist/",
  "projectname": "airC",
  "description": "空调、空调遥控器、空调接水小游戏",
  "appid": "your appid",
  // ...
}
```

### 安装依赖

npm install -g @tarojs/cli

npm i  或者 yarn 

### 本地开发构建项目
npm run dev:weapp

### 生产环境构建项目
npm run build:weapp

### 微信开发者工具预览和部署

直接在微信开发者工具中打开项目，点击预览和上传即可。
