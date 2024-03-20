// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomePage.vue';
import About from '@/views/AboutPage.vue';
import Incidents from '@/views/IncidentsPage.vue';
import Error404 from '@/views/Error404Page.vue';
import ProductPricePage from '@/views/ProductPricesPage.vue';
import MachinesDistributionPage from '@/views/MachinesDistributionPage.vue';
import FilterPage from '@/views/FilterPage.vue';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: About,
    },
  {
        path: '/incidents',
        component: Incidents,
  },
  {
    path: '/products',
    component: ProductPricePage,
  },
  {
    path: '/machines',
    component: MachinesDistributionPage,
  },
  {
    path: '/filter',
    component: FilterPage,
  },
  {
    path: '/:catchAll(.*)',
    component: Error404,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
