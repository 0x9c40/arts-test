<template>
  <div id="app">
    <BeerCard
      v-for="beer in beers"
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
import { mapState } from "vuex";

import BeerCard from "./components/BeerCard.vue";

export default {
  name: "App",

  components: {
    BeerCard,
  },

  data() {
    return {
      beers: [],
      current_page: 1,
      loading: false,
    };
  },

  computed: {
    ...mapState({
      msg: (state) => state.msg,
    }),
  },

  async beforeMount() {
    const response = await fetch(
      `https://api.punkapi.com/v2/beers?page=${this.current_page}&limit=25`
    );
    const beers = await response.json();
    this.beers = beers;
    this.current_page++;
  },

  methods: {
    async load_next() {
      this.loading = true;
      const response = await fetch(
        `https://api.punkapi.com/v2/beers?page=${this.current_page}&limit=25`
      );
      const beers = await response.json();
      this.beers.push(...beers);
      // await new Promise((resolve) => {
      //   setTimeout(resolve, 2000);
      // });
      this.loading = false;
      this.current_page++;
    },
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
