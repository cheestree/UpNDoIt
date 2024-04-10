import './assets/main.css'
//  Palette used from:
//  https://colorhunt.co/palette/fbfacddebaceba94d17f669d
import { createApp } from 'vue'
import { plugin, defaultConfig } from '@formkit/vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(plugin, defaultConfig)
app.mount('#app')
