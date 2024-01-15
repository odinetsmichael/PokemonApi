<template>
  <div class="pokedex">
    <div class="container">

      <div class="d-flex justify-content-between">

        <div class="pokemons row col-7 col-xs-8">
          <Card 
            v-for="pokemonItem in pokemonList" 
            :key="pokemonItem.id"
            :pokemon="pokemonItem"
          >
          </Card>
          
          <button class="btn btn-primary"
                  @click="loadMore"
                  :disabled="disabled()"
          >
            Load More
          </button>

        </div>

        <div class="pokemon-info__wrapper col-5 col-xs-4 ">
          <PokemonInfo/>  
        </div>
      </div>
      

    </div>

  </div>
</template>

<script>
import PokemonInfo from './PokemonInfo.vue'
import Card from './Card';
import { pokemonService } from '../clients/pokemonService';


export default {
  name: 'PokedexList',
  components: { Card, PokemonInfo },
  data() {
    return {
      pokemonList: [],
      offset: 0,
    };
  },
  methods: {
    async loadMore(){
      if (this.offset !== null){
        const responseData = await pokemonService.getPokemonList(this.offset);
        this.offset = responseData.nextOffset;
        this.pokemonList.push(...responseData.pokemonList);
      }
    },
    disabled(){
      if (this.offset === null){
        return true;
      }
    }
  },
  
  async mounted() {
    const responseData = await pokemonService.getPokemonList(this.offset);
    this.offset = responseData.nextOffset;
    this.pokemonList = responseData.pokemonList;
  }
}

</script>

<style scoped lang="scss">
.pokedex{
  display: block;

  .pokemon-info__wrapper{
    position: relative;
  }
  .pokemons{
    overflow: scroll;
    scrollbar-width: thin;
    height: 100vh;
    height: calc(80vh - 20px); /* Подставьте подходящее значение отступа вместо 20px */
    padding-bottom: 20px;
  }
  /* ===== Scrollbar CSS ===== */
  /* Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: #423d4c #ffffff;
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 16px;
  }

  *::-webkit-scrollbar-track {
    background: #ffffff;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #423d4c;
    border-radius: 10px;
    border: 3px solid #ffffff;
  }

  .title__wrapper{
    display: flex;
    justify-content: center;
    font-weight: bold;
    width: 400px;
    padding: 10px;
    border: 2px solid black;
  }
  button{
    height: 80px;
  }
}
</style>