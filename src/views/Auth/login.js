import * as env_const from '../../conf/env_const.js';
import axios from 'axios';
export default {
  data() {
    return {
      user_id: '',
      password: '',
      email: '',
      registration: false,
      login: true,
      loginUserID: '',
      loginPassword: '',
      validationErrorsFromBackend: [],
      snackbar: false,
      snackbarMessage: '',
      snackbarColor: '',
      loader: false,
    };
  },

  methods: {
    loginSubmit() {
      // starting the loader
      this.loader = true;
      // clearing previous validation errors
      this.validationErrorsFromBackend = [];
      // clearing toast
      this.snackbarMessage = '';
      this.snackbar = false;

      // js based validation
      var validation_msg = '';
      if (this.loginUserID == '') {
        validation_msg += 'Please give user id \n';
      }

      if (this.loginPassword == '') {
        validation_msg += 'Please give password ';
      }

      if (validation_msg != '') {
        // closing the loader
        this.loader = false;
        // alert(validation_msg);
        this.snackbarMessage = validation_msg;
        this.snackbar = true;
      } else {
        const loginPayload = {
          username: this.loginUserID,
          password: this.loginPassword,
        };
        // login api
        this.$store.dispatch('Login', loginPayload).then(
          () => {
            //closing the loader
            this.loader = false;
            // redirect to products page
            this.$router.push('/products');
          },
          (error) => {
            //closing the loader
            this.loader = false;
            if (error) {
              if (error.status == 422) {
                this.validationErrorsFromBackend = error.data.errors;
              } else {
                // toast a message
                this.snackbarColor = 'error';
                this.snackbarMessage = 'Invalid credential! Please try again.';
                this.snackbar = true;
              }
            } else {
              alert('Error occured!');
            }
          }
        );
      }
    },
    loginFormOpen() {
      this.registration = false;
      this.login = true;
    },
    registerFormOpen() {
      this.registration = true;
      this.login = false;
    },
    registerSubmit() {
      //starting the loader
      this.loader = true;
      // clearing previous validation errors
      this.validationErrorsFromBackend = [];

      // js based validation
      let validationError = '';

      if (this.user_id == '') {
        validationError += 'Please add username. \n';
      }

      if (this.email == '') {
        validationError += 'Please add email. \n';
      }
      if (!this.validEmail(this.email)) {
        validationError +=
          'Email format is not correct!\n(ex. faisal@gmail.com)';
      }

      if (this.password == '') {
        validationError += 'Please add password. \n';
      }

      if (validationError != '') {
        //closing the loader
        this.loader = false;
        // eslint-disable-next-line no-undef
        Swal.fire('Failed!', '<pre>' + validationError + '</pre>', 'warning');
        return;
      } else {
        // proceed to register
        let formData = new FormData();
        formData.append('username', this.user_id);
        formData.append('email', this.email);
        formData.append('password', this.password);

        // backend insert with api
        let self = this;
        let auth_url = env_const.auth_url + '/register';

        axios
          .post(auth_url, formData)
          .then((response) => {
            // console.log(response);
            if (response.status == 200) {
              // clear registration form data
              self.user_id = '';
              self.email = '';
              self.password = '';

              // toast a message
              self.snackbarColor = 'success';
              self.snackbarMessage =
                'Registration successfull! Please login now.';
              self.snackbar = true;

              // load login data
              self.registration = false;
              self.login = true;

              self.loginUserID = self.user_id;
              self.loginPassword = self.password;

              //closing the loader
              self.loader = false;
            } else {
              //closing the loader
              this.loader = false;
            }
          })
          .catch(function(e) {
            //closing the loader
            self.loader = false;
            // catching new validation errors
            self.validationErrorsFromBackend = e.response.data.errors;
            // console.log(self.validationErrorsFromBackend);
          });
      }
    },

    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
};
