<template>
  <div>
    <main-menu>
      <md-button @click="test" slot="add-link" class="md-icon-button md-raised">
        <md-icon>add</md-icon>
      </md-button>
    </main-menu>
    <md-layout>
      <h1>Projects</h1>
    </md-layout>
    <md-layout>
      <md-list>
        <md-list-item v-for="project of projects">
          <router-link :to="{ name: 'detailProject', params: { projectId: project.id }}">{{project.name}}</router-link>
        </md-list-item>
      </md-list>
    </md-layout>
  </div>
</template>

<script>

import MainMenu from '@/components/MainMenu'
import PROJECTS_ALL from '../graphql/AllProjects.gql'

export default {
  name: 'Projects',
  components: {MainMenu},
  data () {
    return {
      projects: []
    }
  },
  apollo: {
    projects: {
      query: PROJECTS_ALL,
      update ({
        allProjects
      }) {
        console.log(allProjects)
        return allProjects
      }
    }
  }
}
</script>
