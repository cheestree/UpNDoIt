//  Palette used from:
//  https://colorhunt.co/palette/fbfacddebaceba94d17f669d
import { createApp } from 'vue'
import { plugin, defaultConfig } from '@formkit/vue'
import TaskApp from './TaskApp.vue'
import * as VueRouter from 'vue-router'

import './assets/main.css'

// 1. Define route components.
// These can be imported from other files
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = VueRouter.createRouter({

  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
})

const app = createApp({TaskApp})

app.use(router)
app.use(plugin, defaultConfig)
app.mount('#app')
