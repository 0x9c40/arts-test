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
    <ItemInfoEditor />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import BeerCard from "./components/BeerCard.vue";
import ItemInfoEditor from "./components/ItemInfoEditor.vue";

export default {
  name: "App",

  components: {
    BeerCard,
    ItemInfoEditor,
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
    ...mapActions(["load_next"]),
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Lobster&family=Roboto:wght@100;300&display=swap");

* {
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

#app {
  width: 800px;
  margin: 20px auto;
}
</style>
