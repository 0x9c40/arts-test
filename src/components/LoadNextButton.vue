<template>
  <div v-if="!is_hidden" class="load-next-button" @click="load_next">
    <div v-if="loading">Loading...</div>
    <div v-else>Show next</div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "LoadNextButton",

  computed: {
    ...mapState({
      loading: ({ loading }) => loading,
      is_hidden: (state) => state.is_api_drained || !state.initialized,
    }),
  },

  methods: {
    ...mapActions(["load_next"]),
  },
};
</script>

<style lang="scss">
.load-next-button {
  margin-bottom: 16px;
  background-color: #b48986;
  color: white;
  min-width: 64px;
  height: 32px;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
  }
}
</style>