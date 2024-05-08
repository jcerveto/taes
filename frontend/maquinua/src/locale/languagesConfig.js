import { createI18n } from 'vue-i18n';

import EN from './en.json'
import VA from './va.json'
import ES from './es.json'


// Al añdir/eliminar idiomas hay que cambiar las dos variables.
// @supportedLanguages afecta a la barra de idiomas MOSTRADOS
// @i18n trabaja con la API para traducir los textos

export const i18n = createI18n({
    locale: localStorage.getItem('language') || 'ES',
    fallbackLocale: 'ES',
    messages: {
        EN: EN,
        VA: VA,
        ES: ES
    }
})

export const supportedLanguages = [
    { code: 'EN', name: 'English', country: 'U.S.', subregion: null },
    { code: 'VA', name: 'Català', country: 'País Valencià', subregion: null },
    { code: 'ES', name: 'Español', country: 'España', subregion: null },
    { code: 'FR', name: 'Erançaise', country: 'France', subregion: null },
    { code: 'DE', name: 'Deutsch', country: 'Deutschland', subregion: null },
    { code: 'IT', name: 'Italiano', country: 'Italia', subregion: null },
    { code: 'PT', name: 'Português', country: 'Portugal', subregion: null } 
].sort((a, b) => a.name.localeCompare(b.name));