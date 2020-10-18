<template>
  <button class="load-next" @click="load_next" v-if="!drained">
    <div v-if="loading">Loading...</div>
    <div v-else>Show next</div>
  </button>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "LoadNextButton",

  computed: {
    ...mapState({
      loading: ({ loading }) => loading,
      drained: ({ is_api_drained }) => is_api_drained,
    }),
  },

  methods: {
    ...mapActions(["load_next"]),
  },
};
</script>

<style>
</style>