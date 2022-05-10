<template>
  <v-app id="inspire">
    <v-navigation-drawer 
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Vuetify Todo
          </v-list-item-title>
          <v-list-item-subtitle>
            Worsest todo ever
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      dark
      prominent
      src="blood.jpg"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
        ></v-img>
      </template>
      <v-container class="pa-0">
          <v-row class="py-3">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <tools-search />
          </v-row>
          <v-row class="px-3">
            <v-app-bar-title>Why me?</v-app-bar-title>
          </v-row>
        </v-container>
    </v-app-bar>
    <v-main>
      <v-container 
        fluid 
        class="pa-0"
      >
        <router-view></router-view>
        <snackbar/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
      drawer: null,
      items: [
        { title: 'Todo', icon: 'mdi-checkbox-marked-circle-plus-outline', to: '/' },
        { title: 'About', icon: 'mdi-cards-heart-outline', to: '/about' },
      ]
    }),
    components: {
      'snackbar': require('@/components/Shared/Snackbar.vue').default,
      'tools-search': require('@/components/Tools/Search.vue').default,
    }
  }
</script>