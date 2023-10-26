<template>
    <div class="pokemon-info" v-if="isVisible">
        <img :src="stats.image" alt="pokemon">
        <div class="name">

        </div>
        <div class="stats">

            <div class="stat">
                <div class="stat__name">Type</div>
                <div class="stat__info">
                    <span  v-for="(type, key) in stats.types"
                            :key="key">
                        {{ type }}
                    </span> <br>
                </div>
            </div>

            <div class="stat">
                <div class="stat__name">Attack</div>
                <div class="stat__info">{{ stats.attack }}</div>
            </div>

            <div class="stat">
                <div class="stat__name">Defense</div>
                <div class="stat__info"> {{ stats.defense }} </div>
            </div>

            <div class="stat">
                <div class="stat__name">HP</div>
                <div class="stat__info"> {{ stats.hp }} </div>
            </div>

            <div class="stat">
                <div class="stat__name">SP Attack</div>
                <div class="stat__info">{{ stats[`special-attack`] }}</div>
            </div>

            <div class="stat">
                <div class="stat__name">SP Defense</div>
                <div class="stat__info"> {{ stats[`special-defense`] }}</div>
            </div>

            <div class="stat">
                <div class="stat__name">Weight</div>
                <div class="stat__info">{{ stats.weight }}</div>
            </div>

            <div class="stat">
                <div class="stat__name">Total movies</div>
                <div class="stat__info">{{ stats.moves }}</div>
            </div>

        </div>
    </div>
</template>
  
<script>
import { eventBus } from '@/main';
export default {
    name: 'PokemonInfo',
    data() {
        return {
            stats: null,
        };
    },
    created() {
        eventBus.$on('pokemon-stats', (pokemonStats) => {
            this.stats = pokemonStats;
        });
    },
    computed: {
        isVisible: function(){
            if (this.stats){
                return true
            }
            else{
                return false;
            }
        }
    }
}
</script>
  
<style scoped lang="scss">
img{
    object-fit: cover;
    width: 60%;
}
.pokemon-info{
    display: block;
    border: 2px solid black;
    width: 100%;
    height: max-content;
    .stats{
        display: grid;
        border: 2px solid #020202;
        grid-template-rows: 1fr;
        margin: 20px;
        @media (max-width: 768px) {
            margin: 0;
        }
        .stat{
            display: grid;
            grid-template-columns: 1.8fr 1fr;
            border: 2px solid #020202;
            &__name{
                display: flex;
                align-items: center;
                justify-content: center;
                border-right: 2px solid #020202;
            }
        }

    }
}
</style>
  