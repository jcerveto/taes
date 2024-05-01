import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import EN from './locale/en.json'
import VA from './locale/va.json'
import ES from './locale/es.json'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap"

localStorage.setItem('language', 'VA')

const app = createApp(App)

const pinia = createPinia();

const i18n = createI18n({
    locale: localStorage.getItem('language') || 'ES',
    fallbackLocale: 'ES',
    messages: {
        EN: EN,
        VA: VA,
        ES: ES
    }
})


const language = ref('ES')  // Provide the defaultlanguage as a global variable to the app
app.provide('language', language)  

app
    .use(router)
    .use(i18n)
    .use(pinia)
    .mount('#app')