<template>
  <div id="app">
    <div v-for="beer in beers" :key="beer.id" class="beer-card">
      <div class="beer-card__id">{{ beer.id }}</div>
      <div class="beer-card__preview beer-preview">
        <div class="beer-preview__title">{{ beer.name }}</div>
        <img
          class="beer-preview__image"
          :src="beer.image_url"
          :alt="beer.name"
        />
      </div>
      <div class="beer-card__info beer-info">
        <div class="beer-info__description">
          <span>Description: </span>{{ beer.description }}
        </div>
        <div class="beer-info__tips">
          <span>Brewers tips: </span>{{ beer.brewers_tips }}
        </div>
      </div>
      <div class="beer-card__interface beer-interface">
        <div class="beer-interface__edit">Edit</div>
        <div class="beer-interface__delete">Delete</div>
      </div>
    </div>
    <button @click="load_next">
      <div v-if="loading">Loading...</div>
      <div v-else>Show next</div>
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",

  data() {
    return {
      beers: [],
      current_page: 1,
      loading: false,
    };
  },

  computed: {
    ...mapState({
      msg: (state) => state.msg,
    }),
  },

  async beforeMount() {
    const response = await fetch(
      `https://api.punkapi.com/v2/beers?page=${this.current_page}&limit=25`
    );
    const beers = await response.json();
    this.beers = beers;
    this.current_page++;
  },

  methods: {
    async load_next() {
      this.loading = true;
      const response = await fetch(
        `https://api.punkapi.com/v2/beers?page=${this.current_page}&limit=25`
      );
      const beers = await response.json();
      this.beers.push(...beers);
      // await new Promise((resolve) => {
      //   setTimeout(resolve, 2000);
      // });
      this.loading = false;
      this.current_page++;
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");
* {
  box-sizing: border-box;
}

#app {
  width: 800px;
  margin: 20px auto;
}

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
