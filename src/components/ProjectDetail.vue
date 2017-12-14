<template>
  <div>
    <main-menu>
      <md-button slot="add-link" class="md-icon-button md-raised">
        <md-icon>edit</md-icon>
      </md-button>
    </main-menu>
    <md-layout>
      <h1>{{project.name}}</h1>
    </md-layout>
  </div>
</template>

<script>

import MainMenu from '@/components/MainMenu'
import PROJECT_DETAILS from '../graphql/ProjectDetails.gql'

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
        query: PROJECT_DETAILS,
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
