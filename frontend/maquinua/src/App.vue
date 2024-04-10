<template>
  <div id="app" :class="{ 'dark-mode': darkMode }">
    <PageHeader />
    <router-view></router-view>
    <FooterPage />
  </div>
</template>

<script>
import PageHeader from './components/PageHeader.vue';
import FooterPage from './components/FooterPage.vue';

export default {
  name: 'App',
  components: {
    PageHeader,
    FooterPage
  },
  data() {
    return {
      darkMode: false
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.dark-mode {
  background-color: #333;
  color: #ffffff;
}
</style>
