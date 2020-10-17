/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    beers_list: [],
    page_number: 1,
  },

  getters: {
    current_page_URL({ page_number }) {
      return `https://api.punkapi.com/v2/beers?page=${page_number}&limit=25`;
    },
  },

  mutations: {
    increment_page_number(state) {
      state.page_number = state.page_number + 1;
    },

    push_new_beers({ beers_list }, new_beers) {
      beers_list.push(...new_beers);
    },

    delete_item(state, id) {
      state.beers_list = state.beers_list.filter((item) => item.id != id);
    },
  },

  actions: {
    async load_next({ commit, getters: { current_page_URL } }) {
      const response = await fetch(current_page_URL);

      commit("increment_page_number");

      const new_beers = await response.json();

      commit("push_new_beers", new_beers);
    },

    delete_item({ commit }, id) {
      commit("delete_item", id);
    },
  },
});
