<template>
  <div class="beer-card">
    <div class="beer-card__id">{{ id }}</div>
    <div class="beer-card__preview beer-preview">
      <div class="beer-preview__title">{{ name }}</div>
      <img class="beer-preview__image" :src="image_url" :alt="name" />
    </div>
    <div class="beer-card__info beer-info">
      <div class="beer-info__description">
        <span>Description: </span>{{ description }}
      </div>
      <div class="beer-info__tips">
        <span>Brewers tips: </span>{{ brewers_tips }}
      </div>
    </div>
    <div class="beer-card__interface beer-interface">
      <div class="beer-interface__edit">Edit</div>
      <div class="beer-interface__delete">Delete</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BeerCard",

  props: {
    id: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: "",
    },
    image_url: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    brewers_tips: {
      type: String,
      default: "",
    },
  },
};
</script>

<style  lang="scss">
.beer-card {
  display: flex;
  width: 640px;
  margin-bottom: 32px;
  border: 1px solid #bd7424;
  padding: 16px;
  position: relative;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.5);
  border-radius: 4px;

  &__id {
    position: absolute;
    top: -16px;
    left: -16px;
    min-width: 32px;
    height: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: black;
    font-family: "Lobster", cursive;
    color: white;
    font-weight: bold;
    border-radius: 8px;
  }

  &__preview {
    flex: 2;
  }

  &__info {
    flex: 6;
  }

  &__interface {
    flex: 1;
  }
}

.beer-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 32px;

  &__title {
    font-family: "Lobster", cursive;
    margin-bottom: 12px;
    font-size: 24px;
    text-align: center;
  }

  &__image {
    max-width: 100%;
    max-height: 160px;
  }
}

.beer-info {
  margin-right: 32px;

  &__description,
  &__tips {
    margin-bottom: 32px;

    span {
      font-weight: bold;
    }
  }
}

.beer-interface {
  &__edit {
    margin-bottom: 16px;
    background-color: #b48986;
    color: white;
  }

  &__delete {
    border: 1px solid black;
  }

  &__edit,
  &__delete {
    min-width: 64px;
    height: 32px;
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
}
</style>