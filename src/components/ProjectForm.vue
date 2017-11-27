<template>
  <form novalidate class="md-layout-row md-gutter" @submit.prevent="saveForm">
    <md-card md-with-hover>
      <md-card-content>
          <md-input-container :class="{'md-input-invalid': errors.has('project-name')}">
            <label for="project-name">Project name</label>
            <md-input name="project-name" v-validate="'required'" v-model="projectObj.name" :disabled="disabled" required/>
            <span class="md-error" v-show="errors.has('project-name')">The name is required</span>
          </md-input-container>
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
