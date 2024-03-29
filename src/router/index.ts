import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'home',
        name: 'DashboardHome',
        component: () => import('../views/DashboardHome.vue'),
        meta: {
          title: 'Dashboard Home',
        },
      },
      {
        path: 'products',
        name: 'DashboardProducts',
        component: () => import('../views/DashboardProducts.vue'),
        meta: {
          title: 'Products',
        },
      },
      {
        path: 'producttypes',
        name: 'DashboardProductTypes',
        component: () => import('../views/DashboardProductTypes.vue'),
        meta: {
          title: 'Product Types',
        },
      },
      {
        path: 'sales',
        name: 'DashboardSales',
        component: () => import('../views/DashboardSales.vue'),
        meta: {
          title: 'Sales',
        },
      },
      {
        path: 'suppliers',
        name: 'DashboardSuppliers',
        component: () => import('../views/DashboardSuppliers.vue'),
        meta: {
          title: 'Suppliers',
        },
      },
      {
        path: 'users',
        name: 'DashboardUsers',
        component: () => import('../views/DashboardUsers.vue'),
        meta: {
          title: 'Users',
        },
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('../views/SettingsComponent.vue'),
        meta: {
          title: 'Settings',
        },
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../views/Profile.vue'),
        meta: {
          title: 'My Profile',
        },
      },
    ],
  },
  {
    path: '/minipos',
    name: 'minipos',
    component: () => import('../views/MiniPos.vue'),
    meta: {
      title: 'Mini POS',
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      title: 'About SimpleWonder',
    },
  },
  {
    path: '/accountcreation/:inviteCode?',
    name: 'AccountCreation',
    component: () => import('../views/AccountCreation.vue'),
    meta: {
      title: 'Account Creation',
    },
  },
  {
    path: '/auth/action',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta: {
      title: 'Authentication',
    },
  },
  {
    path: '/forgotpassword',
    name: 'ForgotPassword',
    component: () => import('../views/ForgotPassword.vue'),
    meta: {
      title: 'Forgot Password',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
});

export default router;
