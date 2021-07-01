<template>
  <div id="pokemon">
    <div class="card">
      <div class="card-image">
        <figure>
          <img :src="currentImg" alt="Placeholder image" />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ number }} - {{ nameCapitalize() }}</p>
            <p class="subtitle is-6">{{ pokemon.type }}</p>
          </div>
        </div>

        <div class="content">
          <button class="button is-medium is-fullwidth" @click="mudarSprite">Mudar Sprite</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    name: String,
    url: String,
    number: Number,
  },
  data() {
    return {
      isFront: true,
      currentImg: "",
      pokemon: {
        type: "",
        front: "",
        back: "",
      },
    };
  },
  methods: {
    nameCapitalize() {
      return `${this.name[0].toUpperCase()}${this.name.slice(1)}`;
    },
    mudarSprite() {
      this.isFront = !this.isFront;

      this.currentImg = this.isFront ? this.pokemon.back : this.pokemon.front;
    },
  },
  created() {
    axios.get(`${this.url}`).then((response) => {
      this.pokemon.type = response.data.types[0].type.name;
      this.pokemon.front = response.data.sprites.front_default;
      this.pokemon.back = response.data.sprites.back_default;
      this.currentImg = this.pokemon.front;
    });
  },
};
</script>

<style>
#pokemon {
  margin-top: 30px;
}
</style>