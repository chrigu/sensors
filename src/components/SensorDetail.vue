<template>
  <div>
    <div class="md-layout">
      <h1>{{sensor.name}}</h1>
    </div>
    <div class="md-layout-row md-gutter" v-if="sensor.sensorData.length > 0">
      <md-card class="sensor md-flex-100">
        <md-card-header>
          <div class="md-title">Details</div>
        </md-card-header>

        <md-card-content>
          <p>Created: {{formatDate(sensor.createdAt)}}</p>
          <sensor-info :sensor="sensor"/>
        </md-card-content>

        <md-card-actions>
          <md-button><router-link :to="{ name: 'updateSensor', params: { sensorId: sensor.id }}">Edit</router-link></md-button>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script>

import MainMenu from '@/components/MainMenu'
import SensorInfo from '@/components/SensorInfo'
import SENSOR_DETAILS from '../graphql/SensorDetails.gql'
import {formatDate} from '../utils/time'

export default {
  name: 'SensorDetail',
  components: {MainMenu, SensorInfo},
  data () {
    return {
      sensor: {
        name: '',
        sensorData: []
      }
    }
  },
  methods: {
    formatDate (date) {
      return formatDate(date)
    }
  },
  apollo: {
    sensor () {
      return {
        query: SENSOR_DETAILS,
        variables: {
          id: this.$route.params.sensorId
        },
        update (
          {Sensor}
        ) {
          console.log(Sensor)
          this.disabled = false
          return Sensor
        }
      }
    }
  }
}
</script>
