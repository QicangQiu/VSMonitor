<template>
  <div class="main-map-chart" ref="dataMap" style="width: 100%; height: 100%" />
</template>
<script>
import '../../assets/china'
let chart = null
export default {
  props: {
    title: String,
    list: Array
  },
  data() {
    return {
      config: {}
    }
  },
  methods: {
    initChart() {
      if (null != chart && undefined != chart) {
        chart.dispose()
      }
      chart = this.$echarts.init(this.$refs.dataMap)
      this.setOptions()
    },
    setOptions() {
      let option = {
        tooltip: {
          triggerOn: 'click',
          formatter: function (e, t, n) {
            return 0.5 == e.value ? e.name + '：有疑似病例' : e.seriesName + '<br />' + e.name + '：' + e.value;
          },
        },
        title: {
          text: this.title,
          top: 50,
          left: 'center',
          textStyle: {
            fontWeight: 'bolder',
            fontSize: 24,
            color: '#BCBCBF'
          }
        },
        visualMap: {
          min: 0,
          max: 1000,
          left: 26,
          bottom: 40,
          showLabel: !0,
          textStyle: {
            color: 'black'
          },
          // 图例
          pieces: [
            {
              gt: 15,
              label: '> 15 人',
              color: '#5D0773',
            },
            {
              gte: 5,
              lte: 15,
              label: '5 - 15 人',
              color: '#26254F',
            },
            {
              gte: 2,
              lt: 5,
              label: '2 - 5 人',
              color: '#2D2D83',
            },
            {
              gt: 1,
              lt: 2,
              label: '1 - 2 人',
              color: '#2B4AD0',
            },
            {
              gt: 0,
              lt: 1,
              label: '< 1 人',
              color: '#394064'
            },
          ],
          show: !0,
        },
        geo: {
          map: 'china',
          roam: true, // 开启缩放和平移
          scaleLimit: {
            min: 1, // 最小缩放
            max: 3, // 最大缩放
          },
          zoom: 1.23, // 当前视角的缩放比例
          top: 120,
          label: {
            normal: {
              show: !0,
              fontSize: '15',
              color: 'black',
            },
          },
          itemStyle: {
            normal: {
              // color: '#FFF',
              areaColor: '#fff',
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)',// 外发光
              borderColor: 'rgba(0, 0, 0, 0.2)',
            },
            emphasis: {
              // color: '#FFF',
              areaColor: 'lightblue', // 悬浮区背景，就是鼠标移到区域上变的颜色
              // areaColor: '#2a333d',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0,
            },
          }
        },
        series: [
          {
            name: '确诊病例',
            type: 'map',
            geoIndex: 0,
            data: this.list
          }
        ],
      }
      chart.setOption(option)
    }
  },
  watch: {
    list: {
      handler(newValue, oldValue) {
        if (oldValue != newValue) {
          this.setOptions()
        }
      },
      deep: true
    }
  }
}
</script>