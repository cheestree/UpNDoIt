import './assets/main.css'

import { createApp } from 'vue'
import router from './router'
import { plugin, defaultConfig } from '@formkit/vue'
import App from "@/App.vue";
import {createPinia} from "pinia";

const pinia = createPinia()

createApp(App).use(router).use(pinia).use(plugin, defaultConfig).mount('#app')
