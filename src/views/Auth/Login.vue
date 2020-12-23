<template>
  <v-app class="container_wrapper">
    <v-main>
      <!-- login container -->
      <v-container v-show="login">
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12 auth_container">
              <v-toolbar color="indigo" dark flat>
                <v-toolbar-title class="loginToggle" @click="loginFormOpen()">
                  <v-icon>mdi-login-variant</v-icon>
                  Login</v-toolbar-title
                >
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-toolbar-title
                  class="RegisterToggle"
                  @click="registerFormOpen()"
                >
                  <v-icon>mdi-account-multiple-plus</v-icon>
                  Register
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
                <v-btn @click="loginSubmit()">
                  <v-progress-circular
                    v-if="loader"
                    :size="20"
                    color="indigo"
                    indeterminate
                  ></v-progress-circular>
                  <span v-else>
                    Login
                  </span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <!-- registration container -->
      <v-container v-show="registration">
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12 auth_container">
              <v-toolbar color="indigo" dark flat>
                <v-toolbar-title class="loginToggle" @click="loginFormOpen()">
                  <v-icon>mdi-login-variant</v-icon>
                  Login</v-toolbar-title
                >
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-toolbar-title
                  class="RegisterToggle"
                  @click="registerFormOpen()"
                >
                  <v-icon>mdi-account-multiple-plus</v-icon>
                  Register
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <!-- user id -->
                  <v-text-field
                    label="Username"
                    prepend-icon="person"
                    type="text"
                    v-model="user_id"
                    required
                  >
                  </v-text-field>

                  <!-- email -->
                  <v-text-field
                    label="Email"
                    prepend-icon="email"
                    type="email"
                    v-model="email"
                    required
                  >
                  </v-text-field>

                  <!-- password -->
                  <v-text-field
                    id="registerPassword"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                    required
                  >
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="registerSubmit()">
                  <v-progress-circular
                    v-if="loader"
                    :size="20"
                    color="indigo"
                    indeterminate
                  ></v-progress-circular>
                  <span v-else>
                    Register
                  </span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <!-- backend validation message container -->
      <v-container v-if="validationErrorsFromBackend">
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
            <div>
              <div v-for="(v, k) in validationErrorsFromBackend" :key="k">
                <v-alert
                  type="error"
                  v-for="error in v"
                  :key="error"
                  dismissible
                  elevation="2"
                  icon="mdi-emoticon-sad"
                >
                  {{ error }}
                </v-alert>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-container>

      <!-- toaster(snackbar) -->
      <v-snackbar v-model="snackbar" :color="snackbarColor">
        {{ snackbarMessage }}

        <template v-slot:action="{ attrs }">
          <v-btn
            fab
            dark
            small
            v-bind="attrs"
            @click="snackbar = false"
            :color="snackbarColor"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script src="./login.js"></script>

<style src="./login.css"></style>
