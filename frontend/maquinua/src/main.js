import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';
import { i18n } from './locale/languagesConfig';

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap"

localStorage.setItem('language', 'VA')

const app = createApp(App)

const pinia = createPinia();


const language = ref('ES')  // Provide the defaultlanguage as a global variable to the app
app.provide('language', language)  

app
    .use(router)
    .use(i18n)
    .use(pinia)
    .mount('#app')