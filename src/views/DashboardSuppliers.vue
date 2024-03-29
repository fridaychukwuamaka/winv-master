<template>
  <v-container class="d-flex flex-column full-height align-start" fluid>
    <div class="d-flex full-height flex-column width-100">
      <h1>Suppliers</h1>
      <div class="d-flex flex-column flex-1">
        <div class="d-flex mt-2">
          <v-btn raised color="primary" @click="showDialogAsAdd()">Add Supplier</v-btn>
        </div>
        <v-row class="flex-overflow width-100 flex-align-content">
          <v-col v-for="supplier in suppliers" :key="supplier.id"
            cols="12" sm="6" md="4">
            <SupplierCard :supplier-info="supplier"
              :show-dialog.sync="showDialog"
              :dialog-mode.sync="dialogMode"
              :supplier-object.sync="supplierObject"></SupplierCard>
          </v-col>
        </v-row>
      </div>
    </div>
    <SupplierDialog :dialog-mode="dialogMode" :supplier-object="supplierObject"
      :show-dialog.sync="showDialog"></SupplierDialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { db } from '@/main';
import * as firebase from 'firebase/app';
import Supplier from '@/interfaces/Supplier';
import User from '@/interfaces/User';
import SupplierDialog from '@/components/dialogs/SupplierDialog.vue';
import SupplierCard from '@/components/cards/SupplierCard.vue';

@Component({
  components: {
    SupplierDialog,
    SupplierCard,
  },
})
export default class DashboardSuppliers extends Vue {
  showDialog!: boolean;

  dialogMode: string;

  supplierObject: Supplier;

  suppliers: Supplier[];

  currentUser: User;

  constructor() {
    super();
    this.dialogMode = '';
    this.suppliers = Array<Supplier>();
    this.currentUser = {} as User;
    this.supplierObject = {} as Supplier;
    this.showDialog = false;
  }

  created() {
    const urgh = sessionStorage.getItem('currentUser');
    this.currentUser = JSON.parse(`${urgh}`);
    if (this.currentUser) {
      this.supplierObject = this.initAddNewSupplier();
      this.$bind('suppliers', db.collection('suppliers')
        .where('storeId', '==', this.currentUser.storeId));
    } else {
      this.suppliers = [];
    }
  }

  initAddNewSupplier(): Supplier {
    return {
      address: '',
      contactEmail: '',
      contactNumber: '',
      notes: '',
      name: '',
      description: '',
      modifiedAt: firebase.firestore.Timestamp.fromDate(new Date()),
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      modifiedBy: this.currentUser.id ?? '',
      enabled: true,
      storeId: this.currentUser.storeId,
    };
  }

  showDialogAsAdd(): void {
    this.supplierObject = this.initAddNewSupplier();
    this.showDialog = true;
    this.dialogMode = 'add';
  }
}
</script>

<style lang="scss" scoped>
.supplier-cards {
  margin: 0;
}
</style>
