<template>
<div>
  Last value:{{calcValue(sensor.sensorData[0].value, sensor.factor)}} {{sensor.unit}} {{formatDate(sensor.sensorData[0].createdAt)}}
  <chart :options="option"></chart>
</div>
</template>


<script>
import {
  formatDate
} from '../utils/time'

export default {
  name: 'SensorInfo',
  props: {
    sensor: Object
  },
  data () {
    return {
      sensorData: {},
      options: {
        lineSmooth: true,
        showPoint: false,
        axisY: {
          offset: 0
        },
        axisX: {
          offset: 0
        },
        high: 20,
        low: 0,
        divisor: 5,
        ticks: [1, 5, 10, 15, 20],
        fullWidth: true,
        chartPadding: {
          right: 40
        }
      },
      option: {}
    }
  },
  methods: {
    formatDate (date) {
      return formatDate(date)
    },
    calcValue (value, factor) {
      const calculatedValue = value * factor
      return calculatedValue.toFixed(2)
    }
  },
  created () {
    const reversedData = this.sensor.sensorData.slice().reverse()

    this.sensorData = {
      labels: reversedData.map(data => formatDate(data.createdAt)),
      series: [reversedData.map(data => data.value * this.sensor.factor)]
    }

    this.option = {
      title: {
        text: 'Temperatur',
        subtext: 'Sensor'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['最高气温']
      },
      calculable: true,
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: this.sensorData.labels
      }],
      yAxis: [{
        type: 'value',
        axisLabel: {
          formatter: '{value} °C'
        }
      }],
      series: [{
        name: 'Temperatur',
        type: 'line',
        data: this.sensorData.series[0],
        markPoint: {
          data: [{
            name: '周最低',
            value: -2,
            xAxis: 1,
            yAxis: -1.5
          }]
        },
        markLine: {
          data: [{
            type: 'average',
            name: 'average'
          }]
        }
      }],
      dataZoom: [
        {
          id: 'dataZoomX',
          type: 'slider',
          xAxisIndex: [0],
          filterMode: 'filter'
        }
      ]
    }
  }
}
</script>
