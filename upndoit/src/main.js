//  Palette used from:
//  https://colorhunt.co/palette/fbfacddebaceba94d17f669d
import { createApp } from 'vue'
import { plugin, defaultConfig } from '@formkit/vue'
//import App from './App.vue'
import TaskApp from './TaskApp.vue'
import "@formkit/themes/genesis";

import './assets/main.css'

//createApp(App).mount('#app')
createApp(TaskApp).use(plugin, defaultConfig).mount('#app')
