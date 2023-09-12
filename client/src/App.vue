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

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 1em;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

ul {
  list-style: none;
  padding: 0;
}

.container {
  margin: 0 2.5em;
}

.button {
    display: flex;
    align-content: center;
    border: 2px solid var(--filters-and-search);
    border-radius: .3em;
    padding: .4em .7em;
    margin: .2em .5em .5em 0;
    font-weight: 600;
    color: var(--filters-and-search);
    text-transform: capitalize;
    cursor: pointer;
}
.button:hover, filter:active {
    background-color: var(--filters-bg);
}
.button.active {
    background-color: var(--filters-bg);
}
.button.active i {
    display: flex;
    pointer-events: none;
}
.button i {
    display: none;
    margin-right: .3em;
}
</style>
