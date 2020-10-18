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
    <LoadNextButton />
    <ItemInfoEditor />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import BeerCard from "./components/BeerCard.vue";
import ItemInfoEditor from "./components/ItemInfoEditor.vue";
import LoadNextButton from "./components/LoadNextButton.vue";

export default {
  name: "App",

  components: {
    BeerCard,
    ItemInfoEditor,
    LoadNextButton,
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
}
</style>
