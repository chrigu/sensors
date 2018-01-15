<template>
<div>
  <div class="md-layout">
    <h1>Add Project</h1>
  </div>
  <ProjectForm :project="{}" :disabled="disabled" @submitForm="addProject"/>
</div>
</template>

<script>
import MainMenu from '@/components/MainMenu'
import ProjectForm from '@/components/ProjectForm'

import PROJECT_CREATE from '../graphql/ProjectCreate.gql'
import PROJECTS_ALL from '../graphql/AllProjects.gql'

const createProject = function (project, apollo) {
  return apollo.mutate({
    mutation: PROJECT_CREATE,
    variables: {
      name: project.name
    },
    update: (store, {data: {createProject}}) => {
      // Add to all projects to list
      const data = store.readQuery({
        query: PROJECTS_ALL
      })
      data.allProjects.push(createProject)
      store.writeQuery({
        query: PROJECTS_ALL,
        data
      })
    },
    optimisticResponse: {
      __typename: 'Mutation',
      createProject: {
        __typename: 'Project',
        id: null,
        name: project.name,
        createdAt: Date.now()
      }
    }
  })
}

export default {
  name: 'AddProject',
  components: {
    MainMenu,
    ProjectForm
  },
  data () {
    return {
      disabled: false
    }
  },
  methods: {
    addProject (project) {
      console.log(project)
      createProject(project, this.$apollo).then((data) => {
        this.disabled = false
        console.log(data)
        this.$router.push({name: 'projects'})
      }).catch((error) => {
        console.error(error)
        this.disabled = false
      })
    }
  }
}
</script>
