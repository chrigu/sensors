<template>
  <md-list>
    <md-list-item v-for="link in links" v-bind:class="{'active' : $route.path == link.path}" key="link.name">
      <span class="md-list-item-text">
        <router-link :to="{name: link.name}">{{link.title}}</router-link>
      </span>
    </md-list-item>
  </md-list>
</template>

<script>

const LINKS = [
  {
    title: 'Projects',
    name: 'projects'
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
