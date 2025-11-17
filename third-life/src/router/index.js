import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Editor from '../views/Editor.vue'
import Tables from '../views/Tables.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/editor', name: 'Editor', component: Editor },
  { path: '/tables', name: 'Tables', component: Tables }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
