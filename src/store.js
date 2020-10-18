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
    is_api_drained: false,
    loading: false,
  },

  getters: {
    current_page_URL({ page_number }) {
      return `https://api.punkapi.com/v2/beers?page=${page_number}&limit=25`;
    },
    editable_item({ beers_list, editable_item_id }) {
      return beers_list.find((item) => item.id === editable_item_id);
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

    apply_patch({ beers_list, editable_item_id }, { prop_name, prop_value }) {
      const editable_item = beers_list.find(
        (item) => item.id === editable_item_id
      );
      editable_item[prop_name] = prop_value;
    },

    mark_api_as_drained(state) {
      state.is_api_drained = true;
    },

    toggle_loading(state) {
      state.loading = !state.loading;
    },
  },

  actions: {
    async load_next({ commit, state, getters }) {
      commit("toggle_loading");

      const response = await fetch(getters.current_page_URL);

      commit("increment_page_number");

      const new_beers = await response.json();

      if (new_beers.length === 0) commit("mark_api_as_drained");

      commit("push_new_beers", new_beers);

      commit("toggle_loading");
    },

    delete_item({ commit }, id) {
      commit("delete_item", id);
    },

    edit_item({ dispatch, commit }, id) {
      commit("set_editable_item_id", id);
      dispatch("toggle_editor");
    },

    toggle_editor({ commit }) {
      commit("toggle_editor");
    },

    modify_item_value({ commit }, patch) {
      commit("apply_patch", patch);
    },
  },
});
