<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" clipped>
      <v-container>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title grey--text text--darken-2">
              Navigation lists
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-container>
    </v-navigation-drawer>
    <v-app-bar color="primary" dark app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="title">Vuetify</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text to="/">Home</v-btn>
        <v-btn text to="/about">About</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
    <v-footer color="primary" dark app>
      Vuetify
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    // Home,
    // GlobalNab
    // About
  },

  data() {
    return {
      drawer: null
    };
  }
};
</script>
