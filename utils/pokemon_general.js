import axios from "axios";
import { upper_limit_for_id, lower_limit_for_id } from "./pokemon_vars.js";


export const getGeneralInfoForPokemon = async (id)=>{
    if ( id > upper_limit_for_id || id < lower_limit_for_id) return null
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)

    if (res.status != 200) return null
    else return res.data
}

export const getPokemonListPaginated = async (start, end)=>{
    let pokemon_list = []
    if(start < lower_limit_for_id) start = lower_limit_for_id
    if(end > upper_limit_for_id) end = upper_limit_for_id

    for(let i = start; i <= end; i++){
        const pokemon = await getGeneralInfoForPokemon(i)
        pokemon_list.push({
            name : pokemon.name,
            id : pokemon.id,
            image : pokemon.sprites.front_default,
            types : pokemon.types.map(type => type.type.name),
        })
    }

    return pokemon_list
}