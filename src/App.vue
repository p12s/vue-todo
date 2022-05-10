<template>
  <v-app id="inspire">
    <v-navigation-drawer 
      v-model="drawer"
      :mobile-breakpoint="768"
      app
    >
      <v-img
        class="pa-4 pt-7"
        height="170"
        src="blood.jpg"
      >
        <v-avatar>
          <img
            size="70"
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
            class="mb-1"
          />
        </v-avatar>
        <div class="white--text text-subtitle-1 font-weight-bold">John Dow</div>
        <div class="white--text text-subtitle-2">@johnny_dow</div>
      </v-img>
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
      height="170"
      src="blood.jpg"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
        ></v-img>
      </template>
      <v-container class="header-container pa-0">
          <v-row class="py-3">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <tools-search 
              v-if="$route.path === '/'"
            />
          </v-row>
          <v-row class="px-3 text-h4">
            <v-app-bar-title>
              {{ $store.state.appTitle }}
            </v-app-bar-title>
          </v-row>
          <v-row class="px-3">
            <live-date-time />
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
      'live-date-time': require('@/components/Tools/LiveDateTime.vue').default,
    },
    mounted() {
      this.$store.dispatch('getTasks')
    }
  }
</script>

<style lang="sass">
  .header-container
    max-width: none !important
</style>