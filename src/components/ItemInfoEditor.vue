<template>
  <div
    v-if="is_editor_opened"
    class="edit-modal"
    :class="{ 'edit-modal--opened': is_editor_opened }"
    @click="toggle_editor"
  >
    <form class="edit-form" @click.stop>
      <FormInput v-model="editable_item.name" label="Name" name="name" />
      <FormInput
        v-model="editable_item.description"
        label="Description"
        name="description"
        textarea
      />
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

  computed: {
    ...mapState({
      is_editor_opened: ({ is_editor_opened }) => is_editor_opened,
    }),
    ...mapGetters(["editable_item"]),
  },

  methods: {
    ...mapActions(["toggle_editor"]),
  },
};
</script>

<style lang="scss">
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

  @media (max-width: 640px) {
    width: 300px;
  }
}
</style>