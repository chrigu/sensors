<template>
  <div>
    <MainMenu />
    <div class="sensors">
      <h1>Sensors</h1>
    </div>
    <md-layout>
      <md-list>
        <md-list-item v-for="sensor of sensors">{{sensor.name}} - {{sensor.unit}}
          <router-link :to="{ name: 'updateSensor', params: { sensorId: sensor.id }}">{{sensor.name}}</router-link>
        </md-list-item>
      </md-list>
    </md-layout>
  </div>
</template>

<script>

import MainMenu from '@/components/MainMenu'
import SENSORS_ALL from '../graphql/AllSensors.gql'

export default {
  name: 'Sensors',
  components: {MainMenu},
  data () {
    return {
      sensors: []
    }
  },
  apollo: {
    sensors: {
      query: SENSORS_ALL,
      fetchPolicy: 'cache-and-network',
      update ({
        allSensors
      }) {
        return allSensors
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
