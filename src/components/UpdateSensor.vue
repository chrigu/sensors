<template>
<div>
  <div class="md-layout">
    <h1>Edit Sensor</h1>
  </div>
  <SensorForm v-if="!disabled" :sensor="sensor" :disabled="disabled" @submitForm="updateSensor"/>
</div>
</template>

<script>
import MainMenu from '@/components/MainMenu'
import SensorForm from '@/components/SensorForm'
import SENSOR_BY_ID from '../graphql/SensorById.gql'
import SENSOR_UPDATE from '../graphql/UpdateSensor.gql'
import SENSORS_ALL from '../graphql/AllSensors.gql'

const updateSensor = function (sensor, apollo) {
  const newSensor = Object.assign({}, sensor) // why?
  console.log(newSensor)
  return apollo.mutate({
    mutation: SENSOR_UPDATE,
    variables: {...newSensor},
    update: (store, {data: {updateSensor}}) => {
      try {
        // Add to all projects to list
        const data = store.readQuery({
          query: SENSORS_ALL
        })

        let index = data.allSensors.map(s => s.id).indexOf(sensor.id)
        data.allSensors = [
          ...data.allSensors.slice(0, index),
          sensor,
          ...data.allSensors.slice(index + 1)
        ]
        data.allSensors.push(updateSensor)
        store.writeQuery({
          query: SENSORS_ALL,
          data
        })
      } catch (e) { }
    },
    optimisticResponse: {
      __typename: 'Mutation',
      updateSensor: {
        __typename: 'Sensor',
        id: null,
        name: newSensor.name,
        unit: newSensor.unit,
        factor: newSensor.factor,
        createdAt: Date.now()
      }
    }
  })
}

export default {
  name: 'UpdateSensor',
  components: {
    MainMenu,
    SensorForm
  },
  data () {
    return {
      disabled: true,
      project: {}
    }
  },
  methods: {
    updateSensor (sensor) {
      console.log(sensor)
      updateSensor({
        id: this.$route.params.sensorId,
        name: sensor.name,
        unit: sensor.unit,
        factor: sensor.factor
      }, this.$apollo).then((data) => {
        this.disabled = false
        console.log(data)
        this.$router.push({name: 'sensors'})
      }).catch((error) => {
        console.error(error)
        this.disabled = false
      })
    }
  },
  apollo: {
    sensor () {
      return {
        query: SENSOR_BY_ID,
        variables: {
          id: this.$route.params.sensorId
        },
        update (
          {Sensor}
        ) {
          this.disabled = false
          return Sensor
        }
      }
    }
  },
  created () {
    console.log(this.$route.params)
  }
}
</script>
