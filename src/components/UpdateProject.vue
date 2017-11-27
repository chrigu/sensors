<template>
<div>
  <MainMenu />
  <md-layout>
    <h1>Edit Project</h1>
  </md-layout>
  <ProjectForm v-if="!disabled" :project="project" :disabled="disabled" @submitForm="updateProject"/>
</div>
</template>

<script>
import MainMenu from '@/components/MainMenu'
import ProjectForm from '@/components/ProjectForm'
import PROJECT_BY_ID from '../graphql/ProjectById.gql'
import PROJECT_UPDATE from '../graphql/UpdateProject.gql'
import PROJECTS_ALL from '../graphql/AllProjects.gql'

const updateProject = function (project, apollo) {
  const newProject = Object.assign({}, project) // why?

  return apollo.mutate({
    mutation: PROJECT_UPDATE,
    variables: {...newProject},
    update: (store, {data: {updateProject}}) => {
      try {
        // Add to all projects to list
        const data = store.readQuery({
          query: PROJECTS_ALL
        })

        let index = data.allProjects.map(p => p.id).indexOf(project.id)
        data.allProjects = [
          ...data.allProjects.slice(0, index),
          project,
          ...data.allProjects.slice(index + 1)
        ]
        // data.allProjects.push(updateProject)
        store.writeQuery({
          query: PROJECTS_ALL,
          data
        })
      } catch (e) {}
    },
    optimisticResponse: {
      __typename: 'Mutation',
      updateProject: {
        __typename: 'Project',
        id: newProject.id,
        name: newProject.name,
        createdAt: Date.now()
      }
    }
  })
}

export default {
  name: 'EditProject',
  components: {
    MainMenu,
    ProjectForm
  },
  data () {
    return {
      disabled: true,
      project: {}
    }
  },
  methods: {
    updateProject (project) {
      console.log(project)
      updateProject({
        id: this.$route.params.projectId,
        name: project.name
      }, this.$apollo).then((data) => {
        this.disabled = false
        console.log(data)
        this.$router.push({name: 'projects'})
      }).catch((error) => {
        console.error(error)
        this.disabled = false
      })
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
  },
  created () {
    console.log(this.$route.params)
  }
}
</script>
