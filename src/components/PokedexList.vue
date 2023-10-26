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
import {getPokemonList, getPokemonByUrl,} from './pokedex.service';


export default {
  name: 'PokedexList',
  components: { Card, PokemonInfo },
  data() {
    return {
      pokemonList: [],
      next: null,
      mountCount: 0,
    };
  },
  methods: {
    async  getPokemonData(name){

      const response = await getPokemonByUrl(`https://pokeapi.co/api/v2/pokemon/${name}`);

      const pokemonStats = {

        weight: response.data.weight,
        image: response.data.sprites.other.home.front_default,
        moves: response.data.moves.length,
        types: response.data.types.map((t) => {
          return t.type.name;
        })
      }

      response.data.stats.forEach((s) => {
          pokemonStats[`${s.stat.name}`] = s.base_stat;
      })
      
      return pokemonStats;
    },

    async loadMore(){
      if (this.next){
        const responseData = await getPokemonList(this.next);
        this.next = responseData.next;
        responseData.results.forEach(async (p) => {
          let stats = await this.getPokemonData(p.name);
          this.pokemonList.push({...p, ...stats});
        });
      }
    },

  },
  
  async mounted() {
    const responseData = await getPokemonList('https://pokeapi.co/api/v2/pokemon/?limit=12');
    const pokemons = [];

    for (let i = 0; i < responseData.results.length; i++){
      let stats = await this.getPokemonData(responseData.results[i].name)
      pokemons.push({...responseData.results[i], ...stats})
    }

    this.next = responseData.next;
    this.pokemonList = pokemons;
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
