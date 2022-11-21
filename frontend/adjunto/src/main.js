/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

app
    .component('MyHeader', Header)
    .component('MyFooter', Footer)

registerPlugins(app)

app.mount('#app')

