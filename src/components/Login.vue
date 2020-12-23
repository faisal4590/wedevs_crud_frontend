<template>
  <!-- login container -->
  <v-container v-show="login">
    <v-layout justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar color="indigo" dark flat>
            <v-toolbar-title class="loginToggle" @click="loginFormOpen()"
              >Login</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-toolbar-title class="RegisterToggle" @click="registerFormOpen()"
              >Register
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Login"
                name="login"
                prepend-icon="person"
                type="text"
                v-model="loginUserID"
                required
              ></v-text-field>

              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="lock"
                type="password"
                v-model="loginPassword"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="loginSubmit()">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      login: true,
      registration: false,
      loginUserID: '',
      loginPassword: '',
    };
  },

  methods: {
    loginSubmit() {
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
            // redirect to products page
            this.$router.push('/products');
          },
          (error) => {
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
  },
};
</script>
