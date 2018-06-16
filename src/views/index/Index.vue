<template>
  <div>
    <el-row :gutter="20" class="info">
      <el-col :span="6">
        <el-card>
          <svg-icon class="info-icon" icon-class="peoples"/>
          <div class="info-basic">
            <span class="info-amount"><animate-num :value="userTopicAmount.userAmount ? userTopicAmount.userAmount : 0"></animate-num></span>
            <span class="info-text">{{ $t('index.allUser') }}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <svg-icon class="info-icon" icon-class="peoples"/>
          <div class="info-basic">
            <span class="info-amount"><animate-num :value="userChange ? userChange[6] : 0"></animate-num></span>
            <span class="info-text">{{ $t('index.newUser') }}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <svg-icon class="info-icon" icon-class="topic"/>
          <div class="info-basic">
            <span class="info-amount"><animate-num :value="userTopicAmount.topicAmount ? userTopicAmount.topicAmount : 0"></animate-num></span>
            <span class="info-text">{{ $t('index.allTopic') }}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <svg-icon class="info-icon" icon-class="topic"/>
          <div class="info-basic">
            <span class="info-amount"><animate-num :value="topicChange ? topicChange[6] : 0"></animate-num></span>
            <span class="info-text">{{ $t('index.newTopic') }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="chart" ref="userChart"></div>
    <div class="chart" ref="topicChart"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getDay } from '@/utils/index'
import { mapActions, mapGetters } from 'vuex'
import AnimateNum from '@/components/AnimateNum'
export default {
  name: 'index',
  components: {
    AnimateNum
  },
  data () {
    return {
      userChart: {},
      topicChart: {},
      userTopicAmount: {}
    }
  },
  computed: {
    ...mapGetters({
      topicChange: 'sevenDaysTopicChangeArr',
      userChange: 'sevenDaysUserChangeArr',
      language: 'language'
    })
  },
  mounted () {
    this.findAmount().then(res => {
      this.userTopicAmount = res.data
    })
    this.sevenDaysTopicChange().then(res => {
      this.topicChart = echarts.init(this.$refs.topicChart)
      this.setTopicOptions()
    })
    this.sevenDaysUserChange().then(res => {
      this.userChart = echarts.init(this.$refs.userChart)
      this.setUserOptions()
    })
  },
  watch: {
    language: function (val, oldVal) {
      this.setTopicOptions()
      this.setUserOptions()
    }
  },
  methods: {
    ...mapActions({
      sevenDaysTopicChange: 'SevenDaysTopicChange',
      sevenDaysUserChange: 'SevenDaysUserChange',
      findAmount: 'FindAmount'
    }),
    setUserOptions () {
      let option = {
        title: {
          text: this.$t('chart.recentSevenDaysUserChange'),
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [ '用户数量' ]
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: [
              getDay(-6).substring(5, 10),
              getDay(-5).substring(5, 10),
              getDay(-4).substring(5, 10),
              getDay(-3).substring(5, 10),
              getDay(-2).substring(5, 10),
              getDay(-1).substring(5, 10),
              getDay(0).substring(5, 10)
            ]
          }
        ],
        yAxis: [
          {
            minInterval: 1,
            max: function (value) {
              return value.max + 5
            },
            type: 'value'
          }
        ],
        series: [
          {
            name: this.$t('chart.newUser'),
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                color: '#2ec7c9',
                areaStyle: {
                  type: 'default'
                }
              }
            },
            data: this.userChange
            // data: [5, 12, 4, 1, 2, 10, 7]
          }
        ]
      }
      this.userChart.setOption(option)
    },
    setTopicOptions () {
      let option = {
        title: {
          text: this.$t('chart.recentSevenDaysTopicChange'),
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [ '话题数量' ]
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: [
              getDay(-6).substring(5, 10),
              getDay(-5).substring(5, 10),
              getDay(-4).substring(5, 10),
              getDay(-3).substring(5, 10),
              getDay(-2).substring(5, 10),
              getDay(-1).substring(5, 10),
              getDay(0).substring(5, 10)
            ]
          }
        ],
        yAxis: [
          {
            minInterval: 1,
            max: function (value) {
              return value.max + 5
            },
            type: 'value'
          }
        ],
        series: [
          {
            name: this.$t('chart.newTopic'),
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                areaStyle: {
                  type: 'default'
                }
              }
            },
            data: this.topicChange
            // data: [2, 1, 4, 1, 2, 3, 0]
          }
        ]
      }
      this.topicChart.setOption(option)
    },
    toThousands (num) {
      var result = ''
      var counter = 0
      num = (num || 0).toString()
      for (var i = num.length - 1; i >= 0; i--) {
        counter++
        result = num.charAt(i) + result
        if (!(counter % 3) && i !== 0) {
          result = ',' + result
        }
      }
      return result
    },
    count (arr) {
      arr.reduce((result, item, index, arr) => {
        return result + item
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  width: calc(100% - 40px);
  margin: 20px auto !important;
  .info-icon {
    float: left;
    font-size: 70px;
    margin-right: 40px;
  }
  .info-basic {
    margin-top: 5px;
    .info-amount {
      color: #888;
      font-size: 2em;
    }
    .info-text {
      margin-top: 5px;
      display: block;
    }
  }
}
.chart {
  width: calc(100% - 40px);
  height: 400px;
  margin: 40px auto !important;
}
</style>
