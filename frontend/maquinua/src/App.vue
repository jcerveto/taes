<script>
import PageHeader from './components/PageHeader.vue';
import FooterPage from './components/FooterPage.vue';

export default {
  name: 'App',
  components: {
    PageHeader,
    FooterPage,
  }
}
</script>

<template>
  <PageHeader />

  <router-view></router-view>
  
  <FooterPage />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
