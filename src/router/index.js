import Vue from 'vue'
import Router from 'vue-router'
import Projects from '@/components/Projects'
import AddProject from '@/components/AddProject'
import Sensors from '@/components/Sensors'
import AddSensor from '@/components/AddSensor'
import UpdateSensor from '@/components/UpdateSensor'
import UpdateProject from '@/components/UpdateProject'
import ProjectDetail from '@/components/ProjectDetail'
import SensorDetail from '@/components/SensorDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'projects',
      component: Projects
    },
    {
      path: '/projects/add',
      name: 'addProject',
      component: AddProject
    },
    {
      path: '/projects/:projectId',
      name: 'detailProject',
      component: ProjectDetail
    },
    {
      path: '/projects/:projectId/edit',
      name: 'updateProject',
      component: UpdateProject
    },
    {
      path: '/sensors',
      name: 'sensors',
      component: Sensors
    },
    {
      path: '/sensors/add',
      name: 'addSensor',
      component: AddSensor
    },
    {
      path: '/sensor/:sensorId',
      name: 'updateSensor',
      component: UpdateSensor
    },
    {
      path: '/sensor/:sensorId/detail',
      name: 'sensorDetails',
      component: SensorDetail
    }
  ]
})
