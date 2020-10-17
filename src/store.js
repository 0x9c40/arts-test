/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    beers_list: [],
    page_number: 1,
    is_editor_opened: false,
    editable_item_id: undefined,
  },

  getters: {
    current_page_URL({ page_number }) {
      return `https://api.punkapi.com/v2/beers?page=${page_number}&limit=25`;
    },
    editable_item({ beers_list, editable_item_id }) {
      if (editable_item_id === undefined) return;
      const item = beers_list.find((item) => item.id === editable_item_id);
      const { name, description } = item;
      return { name, description };
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

    toggle_editor(state) {
      state.is_editor_opened = !state.is_editor_opened;
    },

    set_editable_item_id(state, id) {
      state.editable_item_id = id;
    },

    unset_editable_item_id(state) {
      state.editable_item_id = undefined;
    },

    apply_patch(state, { new_name, new_description }) {
      const item = state.beers_list.find(
        (item) => item.id === state.editable_item_id
      );
      item.name = new_name;
      item.description = new_description;
    },
  },

  actions: {
    async load_next({ commit, getters }) {
      const response = await fetch(getters.current_page_URL);

      commit("increment_page_number");

      const new_beers = await response.json();

      commit("push_new_beers", new_beers);
    },

    delete_item({ commit }, id) {
      commit("delete_item", id);
    },

    edit_item({ dispatch, commit, getters }, id) {
      commit("set_editable_item_id", id);
      dispatch("toggle_editor");
    },

    toggle_editor({ commit }) {
      commit("toggle_editor");
    },

    save_changes({ dispatch, commit }, patch) {
      commit("apply_patch", patch);
      commit("unset_editable_item_id");
      dispatch("toggle_editor");
    },
  },
});
