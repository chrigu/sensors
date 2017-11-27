<template>
  <div>
    <main-menu>
      <md-button @click="test" slot="add-link" class="md-icon-button md-raised">
        <md-icon>add</md-icon>
      </md-button>
    </main-menu>
    <md-layout>
      <h1>{{project.name}}</h1>
    </md-layout>
  </div>
</template>

<script>

import MainMenu from '@/components/MainMenu'
import PROJECT_BY_ID from '../graphql/ProjectById.gql'

export default {
  name: 'ProjectDetail',
  components: {MainMenu},
  data () {
    return {
      projects: []
    }
  },
  apollo: {
    project () {
      return {
        query: PROJECT_BY_ID,
        variables: {
          id: this.$route.params.projectId
        },
        update (
          {Project}
        ) {
          this.disabled = false
          return Project
        }
      }
    }
  }
}
</script>
