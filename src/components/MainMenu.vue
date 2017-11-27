<template>
  <div class="phone-viewport">
    <md-toolbar>
      <md-button class="md-icon-button" @click="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title">Data Hub</h2>
      <slot name="add-link"></slot>
    </md-toolbar>

    <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
      <md-list>
        <md-list-item v-for="link in links" v-bind:class="{'active' : $route.path == link.path}" key="link.name">
          <router-link :to="{name: link.name}">{{link.title}}</router-link>
        </md-list-item>
      </md-list>

      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi cupiditate esse necessitatibus beatae nobis, deserunt ut est fugit, tempora deleniti, eligendi commodi doloribus. Nemo, assumenda possimus, impedit inventore perferendis iusto!</p>
    </md-sidenav>

  </div>
</template>

<script>

const LINKS = [
  {
    title: 'projects',
    name: 'projects'
  },
  {
    title: 'Add Project',
    name: 'addProject'
  },
  {
    title: 'Sensors',
    name: 'sensors'
  },
  {
    title: 'Add Sensor',
    name: 'addSensor'
  }
]

export default {
  name: 'MainMenu',
  data () {
    return {
      links: LINKS
    }
  },
  methods: {
    toggleLeftSidenav () {
      this.$refs.leftSidenav.toggle()
    },
    open (ref) {
      console.log('Opened: ' + ref)
    },
    close (ref) {
      console.log('Closed: ' + ref)
    }
  }
}
</script>

<style lang="scss">

.phone-viewport {
  background-color: #eee;
}
</style>
