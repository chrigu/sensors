<template>
  <div>
    <div class="md-layout">
      <h1>Projects</h1>
    </div>
    <div class="md-layout">
      <router-link :to="{name: 'addProject' }">
        <md-button class="md-raised md-primary">
          Add Project
        </md-button>
      </router-link>
    </div>
    <div class="md-layout">
      <md-list>
        <md-list-item v-for="project of projects" :key="project.id">
          <router-link :to="{ name: 'detailProject', params: { projectId: project.id }}">{{project.name}}</router-link>
        </md-list-item>
      </md-list>
    </div>
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
