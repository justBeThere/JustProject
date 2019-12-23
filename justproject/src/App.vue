<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <p>
      <router-link to="/test/foo">Go to Foo</router-link>
      <router-link to="/test/bar">Go to Bar</router-link>
    </p>
    <p>
      <router-link to="/home">Go to Home</router-link>
      <router-link to="/homeMain">Go to HomeMain</router-link>
    </p>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
