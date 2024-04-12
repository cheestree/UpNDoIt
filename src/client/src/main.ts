import './assets/main.css'

import { createApp } from 'vue'
import router from './router'
import { plugin, defaultConfig } from '@formkit/vue'
import App from "@/App.vue";

createApp(App).use(router).use(plugin, defaultConfig).mount('#app')
