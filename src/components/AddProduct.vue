<template>
  <div>
    <!-- add product floating button -->
    <v-row>
      <v-col cols="12">
        <div class="floating-product-add-button">
          <v-fab-transition>
            <v-btn
              color="pink"
              dark
              absolute
              top
              right
              fab
              @click="openAddProductModal()"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-fab-transition>
        </div>
      </v-col>
    </v-row>

    <!-- Add product modal -->
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card dark :loading="loading">
          <template slot="progress">
            <v-progress-linear
              color="purple lighten-1"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-card-title>
            <span class="headline">Add product</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <!-- product title -->
                <v-col cols="12">
                  <v-text-field
                    label="Product title*"
                    hint="Add title of your product!"
                    v-model="title"
                    prepend-icon="mdi-eyedropper"
                  ></v-text-field>
                </v-col>
                <!-- product description -->
                <v-col cols="12">
                  <v-textarea
                    label="Product description*"
                    hint="Add description of your product"
                    required
                    v-model="description"
                    clearable
                    clear-icon="mdi-close-circle"
                    counter
                    rows="1"
                    row-height="10"
                    prepend-icon="mdi-comment-text-outline"
                  >
                  </v-textarea>
                </v-col>
                <!-- price -->
                <v-col cols="12">
                  <v-text-field
                    label="Price*"
                    hint="Price of your product"
                    required
                    v-model="price"
                    type="number"
                    prefix="$"
                    prepend-icon="mdi-cash-multiple"
                  ></v-text-field>
                </v-col>
                <!-- image -->
                <v-col cols="12">
                  <v-file-input
                    show-size
                    counter
                    label="Add image"
                    accept="image/*"
                    prepend-icon="mdi-camera"
                    v-on:change="selectProductImage"
                  >
                  </v-file-input>
                </v-col>

                <!-- preview image -->
                <v-col cols="12" v-show="previewImage">
                  <v-img height="100" width="100" :src="previewImage"></v-img>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="success" @click="addProduct()" v-if="!disable">
              Add
            </v-btn>
            <v-btn
              v-else
              color="success"
              @click="addProduct()"
              depressed
              disabled
            >
              Add
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios';
import * as env_const from '../conf/env_const.js';

export default {
  name: 'AddProduct',

  data: () => ({
    dialog: false,
    loading: false,
    title: '',
    description: '',
    price: null,
    productImage: null,
    previewImage: null,
    product: [],
    disable: false,
  }),
  methods: {
    openAddProductModal() {
      //clearing previous data
      this.title = '';
      this.description = '';
      this.price = null;
      this.productImage = null;
      this.previewImage = null;
      this.loading = false;
      this.disable = false;

      // opening the dialog
      this.dialog = true;
    },
    selectProductImage(file) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (file) => {
        this.previewImage = file.target.result;
        this.productImage = file.target.result;
      };
    },
    addProduct() {
      // starting the loader
      this.loading = true;
      this.disable = true;
      // validations
      let validationMsg = '';

      // #1: Required fields validation
      if (this.title == '') {
        validationMsg += 'Title is required!\n';
      }
      if (this.description == '') {
        validationMsg += 'Description is required\n';
      }
      if (this.price == null || this.price == 0 || this.price < 0) {
        validationMsg += 'Please give a valid price(Positive numbers)\n';
      }
      if (this.productImage == null) {
        validationMsg += 'Please select a product image!\n';
      }
      if (validationMsg != '') {
        this.loading = false;
        this.disable = false;
        // eslint-disable-next-line no-undef
        Swal.fire('Failed!', '<pre>' + validationMsg + '</pre>', 'warning');
      } else {
        // proceed to add product
        let self = this;
        let url = env_const.base_url + '/add_product';
        const headersPayload = {
          headers: {
            Authorization: 'Bearer ' + this.$store.state.login.authToken,
          },
        };
        const data = {
          title: this.title,
          description: this.description,
          price: this.price,
          image: this.productImage,
        };
        axios
          .post(url, data, headersPayload)
          .then((response) => {
            // console.log(response);
            if (response.status == 200) {
              // console.log(response.data);
              // this.previewImage = response.data.image;
              self.product = response.data;
              self.dialog = false;

              // closing the loader
              self.loading = false;
              self.disable = false;

              //// show a success message
              // eslint-disable-next-line no-undef
              Swal.fire('Success!', 'Your product has been added.', 'success');

              // updating product state
              self.$store.dispatch('UpdatedProducts', headersPayload).then(
                () => {},
                (error) => {
                  console.log(error);
                }
              );
            } else {
              // closing the loader
              self.loading = false;
              self.disable = false;

              //// show an error message
              // eslint-disable-next-line no-undef
              Swal.fire('Failed!', 'Error occured!', 'error');
              return;
            }
          })
          .catch(() => {
            // closing the loader
            self.loading = false;
            self.disable = false;

            //// show an error message
            // eslint-disable-next-line no-undef
            Swal.fire('Failed!', 'Error occured!', 'error');
          });
      }
    },
  },
};
</script>

<style scoped>
.floating-product-add-button {
  position: relative;
  margin-left: 40px;
  margin-bottom: 20px;
}
</style>
