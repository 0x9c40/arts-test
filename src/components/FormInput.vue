<template>
  <div class="form-group">
    <label class="form-group__label" :for="name">{{ label }}</label>
    <textarea
      v-if="textarea"
      :id="name"
      :name="name"
      :value="value"
      cols="32"
      rows="5"
      class="form-group__textarea"
      @input="$emit('input', $event.target.value)"
    />
    <input
      v-else
      :id="name"
      :name="name"
      :value="value"
      class="form-group__input"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "FormTextarea",

  props: {
    label: {
      default: "",
      type: String,
    },
    value: {
      default: "",
      type: String,
    },
    name: {
      default: "",
      type: String,
    },
    textarea: {
      default: false,
      type: Boolean,
    },
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss">
.form-group {
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;

  &__label {
    margin-bottom: 8px;
  }

  &__textarea,
  &__input {
    font-weight: 300;
    font-size: 16px;
    color: #374853;
    position: relative;
    border: 1px solid #e8e8e8;
    border-radius: 5px;
    background: #fff;
    padding: 10px;
    width: 100%;
    transition: border 0.1s ease;
  }

  &form-group__textarea:hover {
    &:hover {
      border-color: #cfcfcf;
    }

    &:focus {
      border-color: #a8a8a8;
      outline: none;
    }
  }
}
</style>