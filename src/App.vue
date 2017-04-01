<template>
  <div id="app">
    <SideBar />
    <MainView />
  </div>
</template>

<script>
import './assets/css/css.css'
import SideBar from './components/SideBar'
import MainView from './components/MainView'

export default {
  name: 'app',
  components: {
    SideBar,
    MainView
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
