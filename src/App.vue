<template>
  <div id="app">
    <BeerCard
      v-for="beer in beers_list"
      :id="beer.id"
      :key="beer.id"
      :name="beer.name"
      :image_url="beer.image_url"
      :description="beer.description"
      :brewers_tips="beer.brewers_tips"
    />
    <button @click="load_next">
      <div v-if="loading">Loading...</div>
      <div v-else>Show next</div>
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import BeerCard from "./components/BeerCard.vue";

export default {
  name: "App",

  components: {
    BeerCard,
  },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState({
      beers_list: (state) => state.beers_list,
    }),
  },

  async beforeMount() {
    this.load_next();
  },

  methods: {
    ...mapActions(["load_next", "delete_item"]),
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");
* {
  box-sizing: border-box;
}

#app {
  width: 800px;
  margin: 20px auto;
}
</style>
