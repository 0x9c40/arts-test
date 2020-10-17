<template>
  <div
    v-if="is_editor_opened"
    class="edit-modal"
    :class="{ 'edit-modal--opened': is_editor_opened }"
    @click="toggle_editor"
  >
    <form class="edit-form" @click.stop>
      <FormInput
        label="Name"
        name="name"
        :value="editable_item.name"
        @input="set_new_name"
      />
      <FormInput
        label="Description"
        name="description"
        :value="editable_item.description"
        textarea
        @input="set_new_description"
      />
      <div
        class="edit-form__save"
        @click="save_changes({ new_name, new_description })"
      >
        Save
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

import FormInput from "./FormInput.vue";

export default {
  name: "ItemInfoEditor",

  components: {
    FormInput,
  },

  data() {
    return {
      new_name: "",
      new_description: "",
    };
  },

  computed: {
    ...mapState({
      is_editor_opened: ({ is_editor_opened }) => is_editor_opened,
      editable_item_id: ({ editable_item_id }) => editable_item_id,
    }),
    ...mapGetters(["editable_item"]),
  },

  updated() {
    if (!this.editable_item_id) return;
    this.new_name = this.editable_item.name;
    this.new_description = this.editable_item.description;
  },

  methods: {
    ...mapActions(["toggle_editor", "save_changes"]),

    set_new_name(val) {
      this.new_name = val;
    },

    set_new_description(val) {
      this.new_description = val;
    },
  },
};
</script>

<style lang="scss">
.edit-form {
  background-color: #fff;
  border-radius: 4px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;

  &__save {
    border: 1px solid #999999;
    width: 100px;
    height: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 4px;

    &:hover {
      cursor: pointer;
    }
  }
}
.edit-modal {
  display: none;

  &--opened {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>