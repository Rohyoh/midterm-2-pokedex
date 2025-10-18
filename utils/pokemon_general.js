import axios from "axios";
import { upper_limit_for_id, lower_limit_for_id } from "./pokemon_vars.js";


export const getGeneralInfoForPokemon = async (id)=>{
    if (  typeof(id) != "string" && id > upper_limit_for_id || id < lower_limit_for_id) return null
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

export const getSpecificDataForPokemon = async (id)=>{
    const data = await getGeneralInfoForPokemon(id)
    if (data == null) return {error : "pokemon_not_found"}

    const pokemon_info = {
        name : data.name,
        id : data.id,
        images : Object.values(data.sprites).filter(image => { return (typeof(image) == "string")}),
        types : data.types.map(type => type.type.name),
        stats : data.stats.map(stat => {
            return {
                name : stat.stat.name,
                value : stat.base_stat
            }
        }),
        weight : data.weight,
        height : data.height,
        experience : data.base_experience,
        abilities : data.abilities.map(ability => ability.ability.name),
        moves : data.moves.map(move =>move.move.name),
    }

    return pokemon_info
}