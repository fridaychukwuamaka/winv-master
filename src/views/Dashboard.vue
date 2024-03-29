<template>
  <v-app class="full-height" id="inspire">
    <v-navigation-drawer v-model="drawer" fixed app clipped width="350">
      <v-list>
        <v-list-item link to="/dashboard/home">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/dashboard/products">
          <v-list-item-action>
            <v-icon>mdi-package-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Products</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/dashboard/sales">
          <v-list-item-action>
            <v-icon>mdi-sale</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sales</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/dashboard/suppliers">
          <v-list-item-action>
            <v-icon>mdi-truck</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Suppliers</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/dashboard/producttypes">
          <v-list-item-action>
            <v-icon>mdi-format-list-bulleted-type</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Product Categories</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link to="/dashboard/profile">
          <v-list-item-action>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/dashboard/settings">
          <v-list-item-action>
            <v-icon>mdi-account-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="signoutUser()">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon class="d-md-none" @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ storeName }}</v-toolbar-title>
    </v-app-bar>

    <v-content class="full-height full-display">
      <v-container class="full-height" fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { db } from '@/main';
import * as firebase from 'firebase/app';
import User from '@/interfaces/User';
import Store from '@/interfaces/Store';

@Component
export default class Dashboard extends Vue {
  drawer: boolean;

  currentUser: User;

  userStore: Store;

  storeName: string;

  constructor() {
    super();
    this.drawer = true;
    this.currentUser = {} as User;
    this.userStore = {} as Store;
    this.storeName = 'SimpleWonder Inventory';
  }

  created() {
    const urgh = sessionStorage.getItem('currentUser');
    this.currentUser = JSON.parse(`${urgh}`);
    if (this.currentUser) {
      db.collection('stores').doc(this.currentUser.storeId).get().then((snapshot) => {
        this.userStore = snapshot.data() as Store;
      });
    }
  }

  get currentUserStore() {
    const urgh = sessionStorage.getItem('currentUser');
    this.currentUser = JSON.parse(`${urgh}`);
    return this.currentUser;
  }

  @Watch('currentUserStore')
  onCurrentUserStoreChanged(value: User) {
    this.storeName = value.name;
  }

  get getStoreName() {
    if (this.userStore && this.userStore.storeName) {
      return this.userStore.storeName;
    }
    return 'SimpleWonder Inventory';
  }

  signoutUser() {
    firebase.auth().signOut().then(() => {
      sessionStorage.removeItem('currentUser');
      this.$router.push({ name: 'Home' });
    });
  }
}
</script>

<style lang="scss" scoped>
.drawer-height {
  height: calc(100% - 64px);
}

.settings-item {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.divider-item {
  position: absolute;
  bottom: 48px;
  left: 0;
  right: 0;
}

.toolbar-title {
  flex: 1;
}

.full-display{
  overflow: scroll;
}

.menu {
  display: none;
}

.content {
  display: flex;
}

@media (max-width: 600px) {
  .menu {
    display: inline-block;
  }
}
</style>
