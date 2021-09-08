import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import VueMasonry from 'vue-masonry-css';
import firebase from 'firebase/app';
import VCurrencyField from 'v-currency-field';
import { firestorePlugin } from 'vuefire';
import User from '@/interfaces/User';
import Settings from '@/interfaces/Settings';
import App from './App.vue';
import router from './router';
import store from './store';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


export const db = firebase
  .initializeApp({
    projectId: 'inventory-81879',
    apiKey: 'AIzaSyCAOKyrfKO4O782mRk42r8YHoUb1p22H1o',
  })
  .firestore();

Vue.config.productionTip = false;

Vue.use(VCurrencyField, {
  min: 0,
});
Vue.use(firestorePlugin);
Vue.use(VueMasonry);

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - SimpleWonder Inventory`;
  } else {
    document.title = 'SimpleWonder Inventory';
  }

  next();
});

new Vue({
  vuetify,
  router,
  store,
  data: () => ({
    suppliers: [],
    productTypes: [],
    products: [],
  }),
  render: (h) => h(App),
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection('users').doc(user.uid).get().then((snapshot) => {
          const userData = snapshot.data() as User;
          sessionStorage.setItem('currentUser', JSON.stringify(userData));
          db.collection('settings')
            .where('storeId', '==', userData.storeId).get().then((settingsSnap) => {
              settingsSnap.forEach((doc) => {
                const myId = 'id';
                const settings = doc.data() as Settings;
                settings[myId] = doc.id;
                this.$store.dispatch('saveSettings', settings);
              });
            });
        });
        if (router.currentRoute.name === 'Home' || router.currentRoute.name === 'AccountCreation') {
          router.push({ name: 'DashboardHome' });
        }
      } else if (user === null && router.currentRoute.name !== 'Home'
        && router.currentRoute.name !== 'AccountCreation'
        && router.currentRoute.name !== 'Auth') {
        router.push({ name: 'Home' });
      }
    });
  },
}).$mount('#app');
