<template>
  <div id="app">
    <nav id="nav">
      <router-link :to="{ name: 'home' }">Upcoming Movies</router-link>
    </nav>
    <div id="body">
      <router-view />
    </div>
  </div>
</template>
<style lang="stylus" scoped>
#app {
  font-family: 'Montserrat';

  #nav {
    margin: 0 0 30px 0;
    padding: 15px;
    height: 60px;
    background: -webkit-linear-gradient(11deg, $brand-secondary, $brand-primary);
    text-align: center;

    a {
      font-weight: 400;
      font-size: 2rem;
      color: $black;
      margin: 0;
      text-decoration: none;
    }
  }
}
</style>
