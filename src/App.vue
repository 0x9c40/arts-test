<template>
  <div id="app">
    {{ msg }}
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",

  data() {
    return {};
  },

  computed: {
    ...mapState({
      msg: (state) => state.msg,
    }),
  },
};
</script>

<style lang="scss"></style>
