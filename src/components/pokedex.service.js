import axios from "axios";

// export interface PokemonsSearchParams{
//     limit: number;
// }

export async function getPokemonList(url) {
    const response = await axios.get(url);
    return response.data;
}

export async function getPokemonByUrl(url) {
    const pokemon = await axios.get(url);
    return pokemon;
}

export async function getPokemonTypes(url) {
    const types = await axios.get(url);
    console.log(`type ${types}`);
}