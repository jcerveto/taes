// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomePage.vue';
import About from '@/views/AboutPage.vue';
import Error404 from '@/views/Error404Page.vue';
import ProductPricePage from '@/views/ProductPricesPage.vue';
import MachinesDistributionPage from '@/views/MachinesDistributionPage.vue';
import FilterPage from '@/views/FilterPage.vue';
import SignIn from '@/views/SignInPage.vue';
import Register from '@/views/RegisterPage.vue';
import User from '@/views/UserPage.vue';
import UserFavourites from '@/views/FavouritesPage.vue';
import UserStatistics from '@/views/UserStatisticsPage.vue';
import UserReviews from '@/views/UserReviewsPage.vue';
import UserConsults from '@/views/UserConsultsPage.vue';
import UserLocations from '@/views/UserLocationsPage.vue';
import UserData from '@/views/UserDataPage.vue';
import UserEditInfo from '@/views/UserEditInfoPage.vue';
import MaquinaFiltro from '@/views/MachinesFilter.vue';

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
  /*{
    path: '/',
    redirect: '/signin' // Redirigir a la página de inicio de sesión por defecto
  },*/
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/favourites',
    component: UserFavourites
  },
  {
    path: '/userstatistics',
    component: UserStatistics
  },
  {
    path: '/myreviews',
    component: UserReviews
  },
  {
    path: '/myconsults',
    component: UserConsults
  },
  {
    path: '/mylocations',
    component: UserLocations
  },
  {
    path: '/mydata/',
    component: UserData
  },
  {
    path: '/editinfo',
    component: UserEditInfo
  },
  {
    path: '/machines-filter',
    name: 'machines-filter',
    component: MaquinaFiltro
  },
  {
    path: '/:catchAll(.*)',
    component: Error404,
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
