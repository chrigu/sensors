<template>
  <div>
    <div class="md-layout">
      <h1>{{project.name}}</h1>
    </div>
    <div class="sensors-list md-layout-row md-gutter" v-if="project.sensors.length > 0">
      <md-card v-for="sensor of project.sensors" :key="sensor.id" class="sensor sensors-list__item md-flex-50 md-flex-small-100">
        <md-card-header>
          <div class="md-title">{{sensor.name}}</div>
        </md-card-header>

        <md-card-content>
          <sensor-info :sensor="sensor"/>
        </md-card-content>

        <md-card-actions>
          <md-button><router-link :to="{ name: 'sensorDetails', params: { sensorId: sensor.id }}">Details</router-link></md-button>
          <md-button><router-link :to="{ name: 'updateSensor', params: { sensorId: sensor.id }}">Edit</router-link></md-button>
        </md-card-actions>
      </md-card>
    </div>
    <div class="no-sensors" v-show="project.sensors.length == 0">
      <md-card>
        <md-card-header>
          <div class="md-title">No sensor in this project</div>
        </md-card-header>

        <md-card-actions>
          <md-button>Add Sensor</md-button>
          <md-button>Create Sensor</md-button>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script>

import MainMenu from '@/components/MainMenu'
import SensorInfo from '@/components/SensorInfo'
import PROJECT_DETAILS from '../graphql/ProjectDetails.gql'

export default {
  name: 'ProjectDetail',
  components: {MainMenu, SensorInfo},
  data () {
    return {
      project: {
        name: '',
        sensors: []
      }
    }
  },
  apollo: {
    project () {
      return {
        query: PROJECT_DETAILS,
        variables: {
          id: this.$route.params.projectId
        },
        update (
          {Project}
        ) {
          console.log(Project)
          this.disabled = false
          return Project
        }
      }
    }
  }
}
</script>
<style>
  [class*=md-layout].md-layout-row {
    flex-direction: row;
  }

  [class*=md-layout] {
      display: flex;
      flex: 1;
  }
</style>
