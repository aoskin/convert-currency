import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import { createPinia } from 'pinia';
import {
  createMemoryHistory,
  createWebHistory,
  createRouter,
} from 'vue-router';
import HomeView from './HomeView.vue';
import ConvertView from './ConvertView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/convert', component: ConvertView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount('#app');
