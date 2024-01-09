import { client } from './pokemonClient.js';

export let pokemonService = (function(){

    async function getPokemonList(offset, limit=12){
        try {

        if(offset == null){
            console.log("Max pokemon count reached");
            return;
        } 

        let responseData = await client.getAll(offset, limit);
        let urlSearchParams = new URLSearchParams(new URL(responseData.next).search);
      
        let nextOffset = urlSearchParams.get('offset');

        let pokemonList = await Promise.all(responseData.results.map(async function (item) {
            let pokeInfo = await client.getByName(item.name);

            let pokemon = {
                name : item.name,
                weight: pokeInfo.weight,
                image: pokeInfo.sprites.other.home.front_default,
                moves: pokeInfo.moves.length,
                types: pokeInfo.types.map((t) => {
                    return t.type.name;
                })
            };

            pokeInfo.stats.forEach((s) => {
                pokemon[`${s.stat.name}`] = s.base_stat;
            });
            return pokemon;
        }));

        return {
            pokemonList,
            nextOffset
        };
    }
    catch (ex){
        console.log(ex);
        console.log("service crushed");
    }
    }

    return {
        getPokemonList : getPokemonList
    };
})();