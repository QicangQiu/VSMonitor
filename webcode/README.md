# 新冠肺炎疫情数据大屏

> 使用 Vue + DataV + ECharts + Element UI 打造的新冠肺炎疫情数据大屏。

## 使用技术栈

 - [Vue.js](https://cn.vuejs.org/)
 - [Apache ECharts](https://echarts.apache.org/zh/index.html)
 - [DataV](http://datav.jiaminghi.com/)
 - [axios](https://axios-http.com/)
 - [Element UI](https://element.eleme.io/#/zh-CN)
 - [Flask](https://baidu.com)


## 开发
代码中各种图表均已封装成组vue件，查看相关的代码请看组件代码。
## 项目代码解释
1. 三个json文件是整个可视化的所有数据来源
2. src/api中的调用mock的index，index调用covid19.js，它又调用data里面的三个json文件
3. 最后统一书写！！！！
## 项目结构
```shell
├─build
├─data                                   # 本地模拟数据目录
├─mock                                   # mock 配置
├─public
└─src
    ├─api                                # 接口封装目录
    ├─assets
    ├─components                         # 组件目录
    │  ├─About                           # 关于
    │  ├─BasicDataItemLabel              # 基本数据显示标签
    │  ├─BasicProportionChart            # 占比图表
    │  ├─BasicTrendChart                 # 趋势图表
    │  ├─ChartCard                       # 图表面板
    │  ├─CuredAndDeadRateChart           # 治愈率和死亡率图表
    │  ├─CurrentConfirmedCompareBarChart # 最近一周累计治愈图表
    │  ├─DataMap                         # 数据地图
    │  └─ProvinceRankingBarChart         # 累计排名图表
    ├─libs                               # 一些常用的配置
    ├─router                             # 路由配置
    ├─utils                              # 工具类
    └─views                              # 视图
```
## 项目构建步骤
```shell
# 安装依赖
npm install

# 运行
npm run dev

# 打包
npm run build
```
## 项目展示
![img_3.png](img_3.png)
![img.png](img.png)
![img_1.png](img_1.png)
![img_2.png](img_2.png)
![img_4.png](img_4.png)
![img_5.png](img_5.png)
![img_6.png](img_6.png)
![img_7.png](img_7.png)
![img_8.png](img_8.png)

## 最后

这个项目是个人学习作品，能力有限，目前还在不断完善中。难免会有 BUG 和错误，敬请谅解。如有更好的建议或想法，请指出，谢谢。
