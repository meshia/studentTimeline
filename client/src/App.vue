<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">V1</router-link>
      <router-link to="/VersionTwo">V2</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 15px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0 0.5em;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
