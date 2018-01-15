<template>
<div>
  <MainMenu />
  <div class="md-layout">
    <h1>Add Sensor</h1>
  </div>
  <SensorForm  :sensor="{}" :disabled="disabled" @submitForm="createSensor"/>
</div>
</template>

<script>
import MainMenu from '@/components/MainMenu'
import SensorForm from '@/components/SensorForm'
import SENSOR_CREATE from '../graphql/SensorCreate.gql'
import SENSORS_ALL from '../graphql/AllSensors.gql'

const createSensor = function (apollo, sensor) {
  return apollo.mutate({
    mutation: SENSOR_CREATE,
    variables: sensor,
    update: (store, {data: {createSensor}}) => {
      // Add to all projects to list
      const data = store.readQuery({
        query: SENSORS_ALL
      })

      data.allSensors.push(createSensor)
      store.writeQuery({
        query: SENSORS_ALL,
        data
      })
    },
    optimisticResponse: {
      __typename: 'Mutation',
      createSensor: {
        __typename: 'Project',
        id: null,
        name: sensor.name,
        unit: sensor.unit,
        factor: sensor.factor,
        createdAt: Date.now()
      }
    }
  })
}

export default {
  name: 'AddSensor',
  components: {
    MainMenu,
    SensorForm
  },
  data () {
    return {
      disabled: false
    }
  },
  methods: {
    createSensor (sensor) {
      console.log(sensor)
      createSensor(this.$apollo, sensor)
      .then((data) => {
        console.log(data)
        this.$router.push({name: 'sensors'})
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>
