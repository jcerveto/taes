// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomePage.vue';
import About from '@/views/AboutPage.vue';
import Incidents from '@/views/IncidentsPage.vue';
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
import SupportPage from './views/SupportPage.vue';
import { useUserStore } from './stores/user-store-setup';
const routes = [
  {
    path: '/',
    component: MachinesDistributionPage,
    meta: {
      auth: false,
    }
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
    component: Home,
  },
  {
    path: '/filter',
    component: FilterPage,
  },

  {
    path: '/support',
    component: SupportPage,
  },
  /*{
    path: '/',
    redirect: '/signin' // Redirigir a la página de inicio de sesión por defecto
  },*/
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    meta: {
      auth: false,
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: {
      auth: true,
    }
  },
  {
    path: '/user/favourites',
    component: UserFavourites
  },
  {
    path: '/user/userstatistics',
    component: UserStatistics
  },
  {
    path: '/user/myreviews',
    component: UserReviews
  },
  {
    path: '/user/myconsults',
    component: UserConsults
  },
  {
    path: '/user/mylocations',
    component: UserLocations
  },
  {
    path: '/user/mydata',
    component: UserData,
    meta: {
      auth: true,
    }
  },
  {
    path: '/user/mydata/myinfo',
    component: UserEditInfo,
    meta: {
      auth: true,
    }
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
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authRequired = to.meta?.auth;
  const userStore = useUserStore();

  if (authRequired) {
    await userStore.refreshToken();
    if (userStore.token) {
      return next();
    } else {
      return next("/signin");
    }
  }
  
  next();
});

export default router;