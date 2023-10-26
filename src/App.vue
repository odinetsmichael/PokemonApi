<template>
  <div id="app">
    <Header/>
    <PokedexList/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import PokedexList from './components/PokedexList.vue'

export default {
  name: 'App',
  components: {
    PokedexList,
    Header,
  }
  
}
</script>

<style>
#app {  
  position: relative;
  font-family: sans-serif;
  text-align: center;
  color: #020202;
}
</style>
