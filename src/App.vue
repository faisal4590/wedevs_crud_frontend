<template>
  <v-app class="container_wrapper">
    <Nav />
    <router-view />
  </v-app>
</template>

<script>
import Nav from './views/Layouts/Nav';
// import AddProduct from './components/AddProduct';

export default {
  name: 'App',

  components: {
    Nav,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
.container_wrapper {
  background: url(http://cdn.magdeleine.co/wp-content/uploads/2014/05/3jPYgeVCTWCMqjtb7Dqi_IMG_8251-1400x933.jpg)
    no-repeat center center fixed !important;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  overflow: hidden;
}
</style>
