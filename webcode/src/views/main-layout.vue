<template>
  <div class="container">
    <!-- 顶部 -->
    <div class="top-header">
      <div class="date" style="font-size:large">
        <p>{{ currentDate }}</p>
      </div>
      生命体征监测平台
      <div class="weather" style="font-size:large">
        <span>今日天气 26°C</span>
      </div>
    </div>
    <div class="main-content">
      <el-row>
        <el-col :span="8" class="leftpart">

          <div class="gdmap">
            <div ref="mapchart" style="width: 100%;height:340px"></div>
          </div>
          <div class="alertzx">
            <div style="height:30px;font-size:30px;line-height:30px;padding:10px 0px;color: white;">
              <i class="el-icon-message-solid" style="color:red"></i>
              报警中心
            </div>

            <div class="alerttable">
              <el-table :data="alertdata" :header-cell-style="{ background: 'pink', color: 'red' }">
                <el-table-column prop="id" label="序号"></el-table-column>
                <el-table-column prop="time" label="时间"></el-table-column>
                <el-table-column prop="location" label="地点"></el-table-column>
                <el-table-column prop="content" label="内容"></el-table-column>
                <el-table-column prop="level" label="等级"></el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>

        <el-col :span="16" class="rightpart">
          <div class="datashow">
            <div class="box" v-for="item in dailydata" :key="item.title">
              <div class="title">{{ item.title }}</div>
              <div class="data">{{ item.number }}</div>
            </div>
          </div>

          <div class="groups">
            <div style="margin-bottom:15px">
              <span style="color: white;font-size: large;">选择施工团队：</span>
              <el-select v-model="selectedTeam">
                <el-option v-for="team in teams" :key="team.value" :label="team.label" :value="team.value">
                </el-option>
              </el-select>
            </div>

            <div class="grouptable">
              <el-table :data="groupdata" :row-class-name="tableRowClassName" border
                :header-cell-style="{ background: 'rgb(182,199,234)', color: 'rgb(57,89,168)', fontSize: '18px' }">
                <el-table-column prop="name" label="姓名" width="90">
                </el-table-column>
                <el-table-column prop="time" label="时间" width="90">
                </el-table-column>
                <el-table-column prop="ticketNumber" label="所属作业票" width="140">
                </el-table-column>
                <el-table-column prop="coordinates" label="坐标">
                </el-table-column>
                <el-table-column prop="heartRate" label="心率">
                </el-table-column>
                <el-table-column prop="referenceValueHeartRate" label="参考值">
                </el-table-column>
                <el-table-column prop="bloodOxygen" label="血氧">
                </el-table-column>
                <el-table-column prop="referenceValueBloodOxygen" label="参考值">
                </el-table-column>
                <el-table-column prop="airPressure" label="气压">
                </el-table-column>
                <el-table-column prop="referenceValueAirPressure" label="参考值(MPa)" width="130">
                </el-table-column>
                <el-table-column prop="status" label="状态">
                </el-table-column>
              </el-table>
            </div>
          </div>

          <div class="alertchart">
            <div ref="chart1" style="width: 550px; height: 350px"></div>
            <div ref="chart2" style="width: 550px; height: 370px;"></div>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script src="../../jquery-1.10.2"></script>
<script>
import * as echarts from '../../node_modules/echarts'
import zhejiangData from '../assets/zhejiang.json';
import { updatePersonInforData } from '../request';

export default {
  data() {
    return {
      currentDate: '',
      alertdata: [
        { id: 1, time: '8:05', location: 'addr1', content: 'a心率临界', level: '中' },
        { id: 2, time: '7:08', location: 'addr2', content: 'b电量不足', level: '低' },
        { id: 3, time: '6:55', location: 'addr3', content: 'c血氧过低', level: '高' },
        { id: 4, time: '6:52', location: 'addr3', content: 'c血氧过低', level: '高' },
        { id: 5, time: '6:55', location: 'addr3', content: 'c血氧过低', level: '高' },
        { id: 6, time: '6:35', location: 'addr3', content: 'c血氧过低', level: '高' }
      ],
      dailydata: [
        { title: '今日施工团队', number: '000209' },
        { title: '今日施工人数', number: '003209' },
        { title: '今日报警次数', number: '000059' }
      ],
      selectedTeam: 'option1',
      teams: [{
        value: 'option1',
        label: '施工团队1'
      }, {
        value: 'option2',
        label: '施工团队2'
      }],
      groupdata: [{
        name: 'X1',
        time: '8:23',
        ticketNumber: 'xxweexx',
        coordinates: 'xy',
        heartRate: '88',
        referenceValueHeartRate: '60-100',
        bloodOxygen: '97',
        referenceValueBloodOxygen: '95-100',
        airPressure: '0.85',
        referenceValueAirPressure: '0.75-1.25',
        status: '正常'
      }, {
        name: 'X2',
        time: '8:23',
        ticketNumber: 'dfswrf23',
        coordinates: 'xy',
        heartRate: '76',
        referenceValueHeartRate: '60-100',
        bloodOxygen: '98',
        referenceValueBloodOxygen: '95-100',
        airPressure: '0.86',
        referenceValueAirPressure: '0.75-1.25',
        status: '正常'
      }, {
        name: 'X3',
        time: '8:23',
        ticketNumber: 'rtent45t6g',
        coordinates: 'xy',
        heartRate: '115↑',
        referenceValueHeartRate: '60-100',
        bloodOxygen: '98',
        referenceValueBloodOxygen: '95-100',
        airPressure: '0.84',
        referenceValueAirPressure: '0.75-1.25',
        status: '异常'
      }, {
        name: 'X3',
        time: '8:23',
        ticketNumber: 'rtent45t6g',
        coordinates: 'xy',
        heartRate: '115↑',
        referenceValueHeartRate: '60-100',
        bloodOxygen: '98',
        referenceValueBloodOxygen: '95-100',
        airPressure: '0.84',
        referenceValueAirPressure: '0.75-1.25',
        status: '异常'
      }, {
        name: 'X3',
        time: '8:23',
        ticketNumber: 'rtent45t6g',
        coordinates: 'xy',
        heartRate: '115↑',
        referenceValueHeartRate: '60-100',
        bloodOxygen: '98',
        referenceValueBloodOxygen: '95-100',
        airPressure: '0.84',
        referenceValueAirPressure: '0.75-1.25',
        status: '异常'
      }, {
        name: 'X3',
        time: '8:23',
        ticketNumber: 'rtent45t6g',
        coordinates: 'xy',
        heartRate: '115↑',
        referenceValueHeartRate: '60-100',
        bloodOxygen: '98',
        referenceValueBloodOxygen: '95-100',
        airPressure: '0.84',
        referenceValueAirPressure: '0.75-1.25',
        status: '异常'
      }, {
        name: 'X3',
        time: '8:23',
        ticketNumber: 'rtent45t6g',
        coordinates: 'xy',
        heartRate: '115↑',
        referenceValueHeartRate: '60-100',
        bloodOxygen: '98',
        referenceValueBloodOxygen: '95-100',
        airPressure: '0.84',
        referenceValueAirPressure: '0.75-1.25',
        status: '异常'
      }],

    }
  },
  methods: {
    initChart() {
      echarts.registerMap('zhejiang', zhejiangData);

      const chart1 = echarts.init(this.$refs.chart1);
      const chart2 = echarts.init(this.$refs.chart2);
      const mapchart = echarts.init(this.$refs.mapchart);

      const option1 = {
        title: {
          text: '近15日报警数量统计',
          textStyle: {
            color: '#FFF',
            fontSize: 24
          }
        },
        tooltip: {},
        legend: {
          data: ['数量'],
          y: 'bottom',
          textStyle: {
            color: 'white'
          }
        },
        xAxis: {
          data: ["15", "14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"]
        },
        yAxis: {},
        series: [{
          name: '数量',
          type: 'line',
          data: [12, 20, 15, 8, 25, 9, 30, 10, 12, 15, 20, 18, 22, 24, 28],
          symbolSize: 10,
          itemStyle: {
            normal: {
              lineStyle: {
                width: 4
              }
            }
          },
        }]
      };

      const option2 = {
        title: {
          text: '近15日报警类型统计',
          textStyle: {
            color: '#FFF',
            fontSize: 24
          }
        },
        tooltip: {},
        xAxis: {
          data: ['心率', '血氧', '血压', '电量'],
          axisTick: { show: false },
          axisLine: { show: false },
        },
        yAxis: {
          splitLine: { show: false },
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: { show: false }
        },
        series: [
          {
            name: '数量',
            type: 'pictorialBar',
            data: [800, 520, 100, 334],
            barCategoryGap: '-130%',
            symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
            itemStyle: {
              color: (params) => {
                const colorList = ['rgb(255,216,216)', 'rgb(253,153,154)', 'rgb(206, 243, 171)', 'rgb(237,207,170)'];
                return colorList[params.dataIndex];
              },
              opacity: 0.6
            },
            emphasis: {
              itemStyle: {
                opacity: 1
              }
            },
            z: 10
          }
        ]
      };

      const option3 = {
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return params.name;
          }
        },
        geo: {
          name: '浙江省地图',
          type: 'map',
          map: 'zhejiang', // 使用注册的浙江省地图
          label: {
            show: true
          },
          roam: true,
          zoom: 3,
        },
        series: [
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            data: [
              { name: '1号工地', value: [120.155070, 30.274084] },
              { name: '2号工地', value: [120.230428, 29.000575] },
              { name: '3号工地', value: [121.440612, 29.955461] },
            ],
            symbol: 'pin',
            symbolSize: 30,
            label: {
              formatter: '{b}',
              position: 'right',
              show: true
            },
            itemStyle: {
              color: 'blue'
            },
          }
        ]
      }

      chart2.setOption(option2);
      chart1.setOption(option1);
      mapchart.setOption(option3);
    },

    tableRowClassName({ row }) {
      if (row.status === '异常') {
        return 'warning-row';
      } else {
        return '';
      }
    },

    formattedDate(tempdate) {
      const year = tempdate.getFullYear();
      const month = tempdate.getMonth() + 1;
      const day = tempdate.getDate();
      const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][tempdate.getDay()];
      const hours = tempdate.getHours();
      const minutes = tempdate.getMinutes();
      const seconds = tempdate.getSeconds();
      return `${year}年${month}月${day}日${' ' + week} ${hours}:${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`;
    },

    async getAlert() {
      const res = await updatePersonInforData()
      const arr = []
      for (const key in res.data) {
        const entry = res.data[key];
        const newEntry = {
            id: entry[0],
            time: entry[1], 
            location: entry[2], 
            content: entry[3], 
            level: entry[4] 
        };
        arr.push(newEntry);
      }
      this.alertdata = arr
    },
  },

  mounted() {
    this.initChart();
    this.timer = setInterval(() => {
      this.currentDate = this.formattedDate(new Date());
    }, 1000); // 更新时间为每秒一次

    this.getAlert()
  },

  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 清除定时器
    }
  }
}
</script>

<style>
body {
  background: url("../assets/bgp.png") no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
}

.container {
  position: relative;
}

.top-header {
  height: 50px;
  display: flex;
  margin: 20px 0 20px 0;
  line-height: 40px;
  font-size: 30px;
  color: white;
  justify-content: space-around;
  align-items: baseline;
}

.leftpart {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.gdmap {
  width: 80%;
  height: 380px;
  margin: 15px 0 30px 0;
}

.alertzx {
  width: 80%;
}

.alerttable {
  height: 240px;
  overflow-y: scroll;
}

/*最外层透明*/
.el-table {
  background-color: transparent;
  --el-table-row-hover-bg-color: rgba(14, 95, 255, 0.5);
}

.el-table__expanded-cell {
  background-color: transparent;
}

/* 表格内背景颜色 */
.el-table th,
.el-table tr,
.el-table td {
  background-color: transparent;
  color: white;
  border: none;
}

.datashow {
  display: flex;
  color: white;
}

.box {
  width: 320px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-left: 40px;
}

.box>.title {
  height: 36px;
  line-height: 36px;
  font-size: 20px;
  border: 2px rgb(43, 71, 165) solid;
  color: rgb(255, 192, 0);
  padding: 5px 10px;
}

.box>.data {
  font-size: 34px;
}

.groups {
  text-align: left;
  margin-top: 40px;
}

.groups>.grouptable {
  width: 90%;
  height: 250px;
  overflow-y: scroll;
}

.alerttable::-webkit-scrollbar,
.groups>.grouptable::-webkit-scrollbar {
  display: none;
}

.alertchart {
  margin-top: 40px;
  display: flex;
  padding-right: 70px;
  justify-content: space-between;
}
</style>