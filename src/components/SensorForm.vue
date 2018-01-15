<template>
  <form novalidate class="md-layout-row md-gutter" @submit.prevent="addSensor">
    <md-card md-with-hover>
      <md-card-content>
        <div class="md-layout-row md-layout-wrap md-gutter">
          <div class="md-flex md-flex-small-100">
            <md-field :class="{'md-input-invalid': errors.has('sensor-name')}">
              <label for="sensor-name">Sensor name</label>
              <md-input name="sensor-name" v-validate="'required'" v-model="sensorObj.name" :disabled="disabled" required/>
              <span class="md-error" v-show="errors.has('sensor-name')">The name is required</span>
            </md-field>
          </div>

          <div class="md-flex md-flex-small-100">
            <md-field :class="{'md-input-invalid': errors.has('sensor-unit')}">
              <label for="sensor-unit">Sensor unit</label>
              <md-input name="sensor-unit" v-validate="'required'" v-model="sensorObj.unit" :disabled="disabled" required/>
              <span class="md-error" v-show="errors.has('sensor-unit')">The unit is required</span>
            </md-field>
          </div>

          <div class="md-flex md-flex-small-100">
            <md-field :class="{'md-input-invalid': errors.has('sensor-factor')}">
              <label for="sensor-factor">Multiplication factor</label>
              <md-input name="sensor-factor" v-validate="'required|numeric'" v-model="sensorObj.factor" :disabled="disabled" required/>
              <span class="md-error" v-show="errors.has('sensor-factor:required')">The factor is required</span>
              <span class="md-error" v-show="errors.has('sensor-factor:numeric')">Factor must be numeric</span>
            </md-field>
          </div>
        </div>
      </md-card-content>
      <md-card-actions>
        <md-button type="submit" class="md-primary" :disabled="disabled">{{submitMessage}}</md-button>
      </md-card-actions>
    </md-card>
  </form>
</template>

<script>

import MainMenu from '@/components/MainMenu'

export default {
  name: 'SensorForm',
  components: {
    MainMenu
  },
  props: {
    sensor: Object,
    disabled: Boolean
  },
  data () {
    return {
      sensorObj: Object.assign({}, this.sensor || {factor: 1}),
      sending: false
    }
  },
  computed: {
    submitMessage: function () {
      return Object.keys(this.sensorObj).length !== 0 ? 'Save Sensor' : 'Create Sensor'
    }
  },
  methods: {
    addSensor () {
      // const form = this.form
      this.$validator.validateAll().then((result) => {
        this.$emit('submitForm', {
          name: this.sensorObj.name,
          unit: this.sensorObj.unit,
          factor: +this.sensorObj.factor
        })
      })
    }
  }
}
</script>
