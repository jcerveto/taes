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
import UserData from '@/views/UserDataPage.vue';
import UserEditInfo from '@/views/UserEditInfoPage.vue';
import MaquinaFiltro from '@/views/MachinesFilter.vue';
import SupportPage from './views/SupportPage.vue';
import PrivatePage from './views/PrivatePage.vue';
import IncidentsForAdmin from './views/IncidentsForAdmin.vue';
import NewMachine from './views/NewMachine.vue';
import ViewMachinesPage from './views/ViewMachinesPage'
import LandingPage from '@/views/LandingPage.vue';
import { useUserStore } from './stores/user-store-setup';
import DebugTest from './views/DebugTest.vue'
const routes = [
    {
        path: '/LandingPage',
        component: LandingPage,
    },

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
    meta: {
      auth: true,
    }
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
    beforeEnter: async (to, from, next) => {
      try {
        const userStore = useUserStore();
        const admin = await userStore.isAdmin();

        if (admin) next();
        else next('/signin');
      } catch (error) {
        console.error(error);
        next('/signin'); // Redirigir a la página de inicio de sesión si hay un error
      }
    }
  },
  {
    path: '/incidentsAdmin',
    component: IncidentsForAdmin,
    meta: {
      auth: true,
    }
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
  },
  {
    path: '/private',
    component: PrivatePage,
    meta: {
      auth: false,
    }
  },
  {
    path: '/debug',
    component: DebugTest
  },
  {
    path: '/NewMachine',
    component: NewMachine,
  },
  {
    path: '/viewMachines',
    component: ViewMachinesPage
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