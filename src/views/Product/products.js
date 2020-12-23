import axios from 'axios';
import * as env_const from '../../conf/env_const.js';

import AddProduct from '../../components/AddProduct.vue';

export default {
  name: 'Products',
  components: {
    AddProduct,
  },
  data: () => ({
    fab: false,
    editProductObj: {
      productID: null,
      productTitle: '',
      productDescription: '',
      productPrice: null,
      productImage: null,
      productPreviewImage: null,
    },
    dialog: false,
    loading: false,
    disable: false,
  }),
  mounted() {
    // fetch all products and save them on store
    // console.log(this.$store.state.login);
    const headersPayload = {
      headers: {
        Authorization: 'Bearer ' + this.$store.state.login.authToken,
      },
    };
    this.$store.dispatch('AllProducts', headersPayload).then(
      () => {
        // console.log(this.$store.state.products);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    selectProductImage(file) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (file) => {
        this.editProductObj.productImage = file.target.result;
        this.editProductObj.productPreviewImage = file.target.result;
      };
    },
    edit(editProduct) {
      // clearing existing data
      this.editProductObj.productID = null;
      this.editProductObj.productTitle = '';
      this.editProductObj.productDescription = '';
      this.editProductObj.productPrice = null;
      this.editProductObj.productPreviewImage = null;
      this.loading = false;
      this.disable = false;
      // console.log(editProduct);
      this.editProductObj.productID = editProduct.id;
      this.editProductObj.productTitle = editProduct.title;
      this.editProductObj.productDescription = editProduct.description;
      this.editProductObj.productPrice = editProduct.price;
      this.editProductObj.productPreviewImage = editProduct.image;

      // opening dialog
      this.dialog = true;
    },
    editProduct() {
      // starting the loader
      this.loading = true;
      this.disable = true;

      // validations
      let validationMsg = '';

      // #1: Required fields validation
      if (this.editProductObj.productTitle == '') {
        validationMsg += 'Title is required!\n';
      }
      if (this.editProductObj.productDescription == '') {
        validationMsg += 'Description is required\n';
      }
      if (
        this.editProductObj.productPrice == null ||
        this.editProductObj.productPrice == 0 ||
        this.editProductObj.productPrice < 0
      ) {
        validationMsg += 'Please give a valid price(Positive numbers)\n';
      }
      if (validationMsg != '') {
        // closing the loader
        this.loading = false;
        this.disable = false;
        // eslint-disable-next-line no-undef
        Swal.fire('Failed!', '<pre>' + validationMsg + '</pre>', 'warning');
      } else {
        // proceed to edit product
        let self = this;
        let url = env_const.base_url + '/edit_product';

        const headersPayload = {
          headers: {
            Authorization: 'Bearer ' + this.$store.state.login.authToken,
          },
        };

        const data = {
          id: this.editProductObj.productID,
          title: this.editProductObj.productTitle,
          description: this.editProductObj.productDescription,
          price: this.editProductObj.productPrice,
          image: this.editProductObj.productImage,
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
              self.disable = true;
              //// show a success message
              // eslint-disable-next-line no-undef
              Swal.fire('Success!', 'Product updated!', 'success');

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
              self.disable = true;
              //// show an error message
              // eslint-disable-next-line no-undef
              Swal.fire('Failed!', 'Failed to update product!', 'error');
              return;
            }
          })
          .catch(() => {
            // closing the loader
            self.loading = false;
            self.disable = false;
            //// show an error message
            // eslint-disable-next-line no-undef
            Swal.fire('Failed!', 'Failed to update product!', 'error');
          });
      }
    },
    deleteProduct(productID) {
      /* eslint-disable-next-line no-undef */
      Swal.fire({
        title: 'Are you sure you want to delete this?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.value) {
          let self = this;
          let url = env_const.base_url + '/delete_product';

          const headersPayload = {
            headers: {
              Authorization: 'Bearer ' + this.$store.state.login.authToken,
            },
          };
          const data = {
            product_id: productID,
          };
          axios
            .post(url, data, headersPayload)
            // eslint-disable-next-line no-unused-vars
            .then(() => {
              // updating product state
              self.$store.dispatch('UpdatedProducts', headersPayload).then(
                () => {},
                (error) => {
                  console.log(error);
                }
              );
              // eslint-disable-next-line no-undef
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            })
            .catch(() => {
              // eslint-disable-next-line no-undef
              Swal.fire('Failed!', 'Something is wrong!', 'warning');
            });
        }
      });
    },
  },
};
