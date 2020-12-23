<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-toolbar-title>weDevs</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon title="video list">
        <v-icon @click="productLists()">mdi-cart-outline</v-icon>
      </v-btn>

      <v-btn icon v-if="this.$store.state.login.authToken" title="logout">
        <v-icon @click="logout()">mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    productLists() {
      this.$router.push('/products');
    },
    logout() {
      // clear state
      this.$store.dispatch('Logout').then(
        () => {
          this.$store.dispatch('ClearProducts');
        },
        (error) => {
          console.log(error);
        }
      );
      this.$router.push('/');
    },
  },
};
</script>
