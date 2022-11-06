<template>
  <div ref="chart" class="chart" :style="{height: height ? height : '600px',zIndex:!value&&-1||0}">
    <div class="loading" :class="loadingClass" v-if="lazy!==false&&isReady===false">
      <div class="spinner" :style="{'--loading-color':loadingColor}">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
      <div class="text">{{ loadingText }}</div>
    </div>
  </div>
</template>

<script>
window.echarts = echarts
export default {
  name: 'chart',
  model: {
    event: 'change',
    prop: 'value'
  },
  props: {
    loadingColor: {
      type: String,
      default: '#67cf22'
    },
    map: {
      type: Object,
      default: null
    },
    events: {
      type: Object,
      default: () => ({})
    },
    loadingClass: {
      default: '',
      type: String
    },
    loadingText: {
      default: '努力加载中...',
      type: String
    },
    value: {
      default: true
    },
    lazy: {// 设置懒加载，当借口数据没返回时，不渲染图表
      default: false,
      type: Boolean
    },
    isReady: {// 懒加载状态生效，数据加载完成设置为true
      default: false,
      type: Boolean
    },
    dataZoom: {
      type: Array,
      default: () => ([])
    },
    chooseIndex: {
      type: Number,
      default: 0
    },
    height: {},
    series: Array,
    labelList: Array,
    autoSize: { //图表自适应
      default: false,
      type: Boolean
    },
    title: {},
    option: {
      default() {
        return {}
      }
    },
    color: {
      default() {
        return [
          '#54C5EB', '#6160DC', '#FFB74A', '#FF4A55', '#0091EA', '#00BFA5', '#64DD17', '#FFD600', '#FF6D00', '#90A4AE',
          '#9AD7CA', '#359EA1', '#55C399', '#7DE295', '#D5F5D8',
          '#58A7A6', '#BCC754', '#E0D66E', '#F9E0B1', '#23526D',
          '#82BDAE', '#B5DBCE', '#D3DAE4', '#F4BA97', '#EF9D70'
        ]
      }
    },
    tooltip: {
      default() {
        return {}
      }
    },
    type: {
      default: 'line'
    },
    xAxis: {
      default() {
        return {}
      }
    },
    yAxis: {
      default() {
        return {}
      }
    },
    visualMap: {
      default: null
    },
    legend: {
      // 用于图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
      // https://echarts.apache.org/zh/option.html#legend
      default() {
        return {}
      }
    },
    grid: {
      default() {
        return {}
      }
    },
    formatterY: {
      default() {
        return '{value}'
      }
    }
  },
  computed: {
    options() {
      const data = {
        visualMap: this.visualMap,
        dataZoom: this.dataZoom,
        title: typeof this.title === 'string' ? {
          text: this.title
        } : this.title,
        color: this.color,
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#1F2D3D99',
          borderWidth: 0,
          className: 'tooltip',
          textStyle: {
            color: '#fff'
          },
          extraCssText: 'box-shadow: 0px 2px 12px 0px rgba(0,0,0,0.15);z-index:9',
          transitionDuration: 0.2,
          position: function(point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            let x // x坐标位置
            let y // y坐标位置
            // 当前鼠标位置
            let pointX = point[0]
            let pointY = point[1]
            // 外层div大小
            // var viewWidth = size.viewSize[0];
            // var viewHeight = size.viewSize[1];
            // 提示框大小
            let boxWidth = size.contentSize[0]
            let boxHeight = size.contentSize[1]
            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = 5
            } else { // 左边放的下
              x = pointX - boxWidth
            }
            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5
            } else { // 上边放得下
              y = pointY - boxHeight
            }
            return [x, y]
          },
          formatter: this.formatter // 提示框自定义
        },
        legend: this.legend,
        xAxis: {
          splitNumber: 3,
          position: 'top',
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            interval: 0,
            show: true,
            fontSize: 12// 字体大小
          },
          data: []
        },
        grid: Object.assign({}, {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '3%',
          containLabel: true
        }, this.grid || {}),
        yAxis: {
          splitNumber: 3,
          type: 'value',
          axisLabel: {
            formatter: this.formatterY,
            fontSize: 10// 字体大小
          }
        },
        series: this.series
      }
      Object.assign(data.xAxis, this.xAxis || {})
      if (!Object.keys(this.xAxis).length) {
        delete data.xAxis
      }
      Object.assign(data.yAxis, this.yAxis || {})
      if (!Object.keys(this.yAxis).length) {
        delete data.yAxis
      }
      Object.assign(data.tooltip, this.tooltip || {})
      if (!Object.keys(this.legend).length) {
        delete data.legend
      }
      Object.assign(data, this.option)
      return data
    }
  },
  watch: {
    isReady: {
      handler(val) {
        if (this.lazy !== false && val) {
          this.initChart()
        }
      },
      immediate: true
    },
    map: {
      handler(val) {
        val && this.registerMap()
      },
      immediate: true
    },
    lazy(val) {
      if (val !== false) {
        this.initChart()
      }
    },
    autoSize: {
      // 图表默认不开启自适应
      handler(val) {
        if (val === false) {
          window.removeEventListener('resize', this.resize)
        } else {
          window.addEventListener('resize', this.resize)
        }
      },
      immediate: true
    },
    height() {
      this.$nextTick(function() {
        this.chart && this.chart.resize({ height: 'auto' })
      })
    },
    options() {
      if (JSON.stringify(this.options) === this.optionsStr) {
        return
      }
      this.chart && this.chart.clear()
      this.optionsStr = JSON.stringify(this.options)
      if (!this.value) return
      setTimeout(() => {
        this.chart && this.chart.setOption(this.options, true)
      }, 500)
    },
    value(val) {
      this.chart && val && this.chart.setOption(this.options, true)
    }
  },
  data() {
    return {
      optionsStr: '',
      chart: null,
      w: 0,
      h: 0,
      $chart: null,
      timer: null
    }
  },
  created() {
  },
  mounted() {
    if (this.lazy === false) this.initChart()
  },
  methods: {
    registerMap() {
      echarts.registerMap(this.map.name, this.map.json)
    },
    initChart() {
      if (this.chart && this.$chart) return
      if (!this.$refs.chart) {
        // 如果图表没有初始化完成，等待下一个tick，最多尝试10从，防止代码报错无法停止
        let n = 0
        this.$nextTick(() => {
          if (n > 10) return
          n++
          this.initChart()
        })
        return
      }
      this.$chart = this.$refs.chart
      this.w = this.$chart.offsetWidth
      this.h = this.$chart.offsetHeight
      this.chart = echarts.init(this.$chart)
      this.chart.setOption(this.options, true)
      this.optionsStr = JSON.stringify(this.options)
      this.chart.on('click', (params) => {
        console.log(params.componentSubType || params.componentType)
        if (['yAxis', 'pie', 'map'].includes(params.componentSubType || params.componentType)) {
          this.$emit('click', params)
        }
        if (this.chooseIndex !== params.dataIndex) {
          this.chart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: this.chooseIndex })
        }
      })
      for (const event in this.events) {
        this.chart.on(event, e => this.events[event](this.chart, e))
      }
    },
    resize() {
      if (!this.chart || !this.$chart) return
      // 图表自适应调整
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        const w = this.$chart.offsetWidth
        const h = this.$chart.offsetHeight
        if (w !== this.w || h !== this.h) {
          console.log('图表resize')
          this.chart && this.chart.resize({ height: 'auto' })
          this.timer = null
        }
        this.w = w
        this.h = h
      }, 200)
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  }
}
</script>
<style lang="scss" scoped>
.chart_component{
  position: relative;
}
.no_data {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  text-align: center;
  width: 100%;
  font-size: 14px;
  padding-top: 20px;
}
.loading {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #fff;

  .text {
    color:#000;
    line-height: 40px;
  }
}

.spinner {
  width: 70px;
  height: 60px;
  text-align: center;
  font-size: 10px;
  display: flex;
  justify-content: space-between;
}

.spinner > div {
  background-color: var(--loading-color);
  height: 100%;
  width: 6px;
  display: inline-block;
  -webkit-animation: stretchDelay 1.2s infinite ease-in-out;
  animation: stretchDelay 1.2s infinite ease-in-out;
}

.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.spinner .rect3 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

@-webkit-keyframes stretchDelay {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.4);
  }
  20% {
    -webkit-transform: scaleY(1);
  }
}

@keyframes stretchDelay {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
    -webkit-transform: scaleY(1);
  }
}
</style>
