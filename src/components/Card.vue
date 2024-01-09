<template>
    <div class="card col-lg-4 col-md-6 col-12" @click="openPokemonInfo(pokemon)">
        <div class="card__item">
            <img :src="`${pokemon.image}`">
            <h4>
                {{ pokemon.name }}  
            </h4>
            <div v-for="(type, key) in pokemon.types" :key="key">
                <button class="btn" :style="`background-color:${typeColor[type]}`">{{ type }}</button>
            </div>
            
        </div>
    </div>
</template>
  
<script>
import { eventBus } from '@/main';
    export default {
        name: 'Card',
        data() {
            return {
                typeColor: {
                    normal: '#FFFF',
                    fighting: '#990000',
                    flying: '#9BECFF',
                    poison: '#0DCF0C',
                    ground: '#8E403A',
                    rock: '#8E403A',
                    bug: '#817F26',
                    ghost: '#C2C2C2',
                    steel: '#C0C0C0',
                    fire: '#EB3324',
                    water: '#3282F6',
                    grass: '#377D22',
                    electric: '#FFFD55',
                    psychic: '#7A80F0',
                    ice: '#CCE3ED',
                    dragon: '#FF8F17',
                    dark: '#37382F',
                    fairy: '#DE14FA',
                    unknown: '#FAD2ED',
                    shadow: '#61515C',
                }
            };
        },
        props: {
            pokemon:{
                type: Object,
                default() {
                    return {
                    };
                }
            },
        },
        computed:{
            colorType(){
                if(this.typeColor){
                    return 
                }
            }
        },
        methods: {
            async openPokemonInfo(pokemon){
                eventBus.$emit('pokemon-stats', pokemon);
            },
        }
    }
</script>
  
<style scoped lang="scss">
    .card{
        margin-bottom: 20px;
        display: block;
        cursor: pointer;
        border: none;
        &__item{
            transition: 0.4s;
            height: 100%;
            border: 2px solid black;
            &:hover{
                box-shadow: 1px 6px 21px -10px rgba(0,0,0,0.42);
            }
            button{
                margin: 5px;
                transition: 0.4s;
                &:hover{
                    opacity: 0.8;
                }
            }
        }

    }
    img{
        object-fit: cover;
        width: 100%;
    }
</style>
  