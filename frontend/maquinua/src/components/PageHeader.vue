<template>
  <nav
    :class="{ 'navbar': true, 'navbar-expand-lg': true, 'navbar-light': !darkMode, 'navbar-dark': darkMode, 'bg-light': !darkMode, 'bg-dark': darkMode }">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">maquinua</router-link>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav">
              <li class="nav-item">
                  <router-link class="nav-link" to="/" @click="toggleFiltros">{{ $t("button-filter") }}</router-link>
              </li>
              <li class="nav-item">
                  <router-link class="nav-link" to="/products">{{ $t("button-products") }}</router-link>
              </li>
              <li class="nav-item">
                  <router-link class="nav-link" to="/incidents">{{ $t("button-reports") }}</router-link>
              </li>
              <li class="nav-item">
                  <router-link class="nav-link" to="/support">{{  $t("button-support") }}</router-link>
              </li>
              <li class="nav-item">
                  <router-link class="nav-link" to="/about">{{ $t("button-about") }}</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/viewMachines">View Machines</router-link>
              </li>
              <li class="nav-item">
                  <router-link class="nav-link" to="/user">{{ $t("button-logout") }}</router-link>
              </li>
              <li class="nav-item" v-if="isAdmin">
                  <router-link class="nav-link" to="/incidentsAdmin">{{ $t("button-incidentsAdmin") }}</router-link>
              </li>
              <li class="nav-item">
                  <router-link class="nav-link" to="/user">{{  $t("button-user") }}</router-link>
              </li>

          </ul>
      </div>



      <div class="d-flex">
        <button class="navbar-toggler ms-2" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
            data-bs-toggle="dropdown" aria-expanded="false">
            <img :src="require(`@/assets/languages.svg`)" alt="Languages" />
          </button>

          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li v-for="(lang, index) in supportedLanguages" :key="index" @click="changeLanguage(lang)">
              <a class="dropdown-item">{{ lang.code }}</a>
            </li>
          </ul>
        </div>

        <div class="dark-mode-button" @click="toggleDarkMode" :style="{ color: darkMode ? '#fff' : '#000' }">
          <i id="toggleDarkMode" :class="darkMode ? 'bi-sun' : 'bi-moon'"></i>
        </div>

      </div>
    </div>
  </nav>

  <div class="filtros-overlay" v-if="filtros">
    <FiltrosMapa />
  </div>
</template>

<script>
import FiltrosMapa from './FiltrosMapa.vue';
import { supportedLanguages } from './../locale/languagesConfig';
import { useUserStore } from "@/stores/user-store-setup";

export default {
  name: 'PageHeader',
  components: {
    FiltrosMapa
  },
  data() {
    return {
      darkMode: false,
      filtros: false,
      supportedLanguages,
      isAdmin: false,
    };
  },
  created() {
    this.checkAdminStatus();
  },
  methods: {
    async checkAdminStatus() {
      this.isAdmin = await useUserStore().isAdmin();
    },

    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      if (this.darkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    },

    toggleFiltros() {
      this.filtros = !this.filtros;
    },

    changeLanguage(lang) {
      console.log('Changing language from ', localStorage.getItem('language'), 'to', lang.code);
      localStorage.setItem('language', lang.code);
      this.$i18n.locale = lang.code;
    }
  },
  watch: {
    language(newValue, oldValue) {
      console.log('Language changed from', oldValue, 'to', newValue);
      this.changeLanguage(newValue);
    },
    '$route'() {
      this.checkAdminStatus();
    }
  },
};
</script>

<style scoped>
/* Estilos compartidos */
nav a {
  text-decoration: none;
  padding: 10px;
}

nav a:hover {
  background-color: #ddd;
}

.dark-mode-button {
  font-size: 1.5rem;
  cursor: pointer;
  /* center vertically */
  display: flex;
  align-items: center;
}

.filtros-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
}
</style>
