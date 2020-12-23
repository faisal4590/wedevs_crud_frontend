<template>
  <v-container class="product-container">
    <v-row>
      <!-- product lists -->
      <v-col
        cols="3"
        v-for="singleProduct in $store.state.products.products"
        v-bind:key="singleProduct.id"
      >
        <v-card class="dark product-card" elevation="12">
          <v-img height="250" :src="singleProduct.image"></v-img>

          <v-card-title>{{ singleProduct.title }}</v-card-title>

          <v-card-text>
            <div class="my-4 subtitle-1">$ {{ singleProduct.price }}</div>

            <div>
              {{ singleProduct.description }}
            </div>
          </v-card-text>

          <v-card-text style="position: relative">
            <v-speed-dial
              absolute
              open-on-hover
              top
              right
              transition="slide-y-reverse-transition"
              :id="singleProduct.id"
            >
              <template v-slot:activator>
                <v-btn color="blue darken-2" dark fab :id="singleProduct.id">
                  <v-icon v-if="fab">
                    mdi-close
                  </v-icon>
                  <v-icon v-else>
                    mdi-stack-overflow
                  </v-icon>
                </v-btn>
              </template>
              <!-- edit option-->
              <v-btn fab dark small color="green" @click="edit(singleProduct)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>

              <!-- delete option -->
              <v-btn
                fab
                dark
                small
                color="red"
                @click="deleteProduct(singleProduct.id)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-speed-dial>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- edit modal -->
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card dark :loading="loading">
          <template slot="progress">
            <v-progress-linear
              color="purple lighten-1"
              height="10"
              indeterminate
            >
            </v-progress-linear>
          </template>
          <v-card-title>
            <span class="headline"
              >Product ID: #{{ editProductObj.productID }}</span
            >
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <!-- product title -->
                <v-col cols="12">
                  <v-text-field
                    label="Product title*"
                    hint="Add title of your product!"
                    v-model="editProductObj.productTitle"
                    prepend-icon="mdi-eyedropper"
                  ></v-text-field>
                </v-col>
                <!-- product description -->
                <v-col cols="12">
                  <v-textarea
                    label="Product description*"
                    hint="Add description of your product"
                    required
                    v-model="editProductObj.productDescription"
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
                    v-model="editProductObj.productPrice"
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
                <v-col cols="12" v-show="editProductObj.productPreviewImage">
                  <v-img
                    height="100"
                    width="100"
                    :src="editProductObj.productPreviewImage"
                  ></v-img>
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
            <v-btn color="success" @click="editProduct()" v-if="!disable">
              Save
            </v-btn>
            <v-btn
              color="success"
              @click="editProduct()"
              v-else
              depressed
              disabled
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <AddProduct />
  </v-container>
</template>

<script src="./products.js"></script>

<style src="./products.css"></style>
