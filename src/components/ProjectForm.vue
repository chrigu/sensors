<template>
  <form novalidate class="md-layout-row md-gutter" @submit.prevent="saveForm">
    <md-card class="md-flex-50 md-flex-small-100">
      <md-card-content>
        <div class="md-layout-row md-layout-wrap md-gutter">
          <div class="md-flex md-flex-small-100">
            <md-field :class="{'md-input-invalid': errors.has('project-name')}">
              <label for="sensor-name">Project name</label>
              <md-input name="project-name" v-validate="'required'" v-model="projectObj.name" :disabled="disabled" required/>
              <span class="md-error" v-show="errors.has('project-name')">The name is required</span>
            </md-field>
          </div>
        </div>
        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="disabled">{{submitMessage}}</md-button>
        </md-card-actions>
      </md-card-content>
    </md-card>
  </form>
</template>

<script>
import MainMenu from '@/components/MainMenu'

export default {
  name: 'ProjectForm',
  components: {
    MainMenu
  },
  props: {
    project: Object,
    disabled: Boolean
  },
  data () {
    return {
      projectObj: Object.assign({}, this.project || {})
      // submitMessage: 'Create Project'
    }
  },
  computed: {
    submitMessage: function () {
      return Object.keys(this.projectObj).length !== 0 ? 'Save Project' : 'Create Project'
    }
  },
  methods: {
    saveForm () {
      this.$validator.validateAll().then((result) => {
        this.$emit('submitForm', this.projectObj)
      })
    }
  },
  created () {

  }
}
</script>
