<template>
  <div id="app">
    <div class="column is-half is-offset-one-quarter">
      <h4 class="is-size-4">Pokedex</h4>
      <input
        class="input is-rounded"
        type="text"
        placeholder="Buscar pokemon pelo nome"
        v-model="busca"
      />
      <button class="button is-medium is-fullwidth is-success" @click="buscar">
        Buscar
      </button>
      <!-- <div v-for="(pokemon, index) in resultadoBusca" :key="pokemon.url">
        <Pokemon :name="pokemon.name" :url="pokemon.url" :number="++index" />
      </div> -->
      <div v-for="(pokemon, index) in filteredPokemons" :key="pokemon.url">
        <Pokemon :name="pokemon.name" :url="pokemon.url" :number="++index" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Pokemon from "./components/Pokemon.vue";
export default {
  name: "App",
  components: {
    Pokemon,
  },
  data() {
    return {
      pokemons: [],
      filteredPokemons: [],
      busca: "",
    };
  },
  methods: {
    getPokedex() {
      axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=152&offset=0")
        .then((response) => {
          this.pokemons = response.data.results;
          this.filteredPokemons = this.pokemons;
        });
    },
    buscar() {
      this.filteredPokemons = this.pokemons;
      if (this.busca == "" || this.busca == " ")
        this.filteredPokemons = this.pokemons;
      else
        this.filteredPokemons = this.pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(this.busca.toLowerCase())
        );
    },
  },
  //   computed: {
  //     resultadoBusca() {
  //       if (this.busca == "" || this.busca == " ") return this.pokemons;
  //       //   else return this.pokemons.filter((pokemon) => pokemon.name.toLowerCase() == this.busca.toLowerCase());
  //       else
  //         return this.pokemons.filter((pokemon) =>
  //           pokemon.name.toLowerCase().includes(this.busca.toLowerCase())
  //         );
  //     },
  //   },
  mounted() {
    this.getPokedex();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
input {
  margin: 10px 0 !important;
}
</style>
