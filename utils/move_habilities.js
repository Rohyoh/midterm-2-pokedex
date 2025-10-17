import axios from "axios";

export const getAbilityInfo = async(ability_name)=>{
    const res = (await axios.get(`https://pokeapi.co/api/v2/ability/${ability_name}`))

    if (res.status != 200) return null
    
    const ability = {
        name : res.data.name,
        effect_entries : res.data.effect_entries.filter((entry)=>{return entry.language.name == "en"})[0].short_effect,
        effect_changes : res.data.effect_changes[0].effect_entries.filter((entry)=>{return entry.language.name == "en"})[0].effect,
    }

    return ability
}

export const getMoveInfo = async(move_name)=>{
    const res = (await axios.get(`https://pokeapi.co/api/v2/move/${move_name}`))

    if (res.status != 200) return null
    
    const move = {
        name : res.data.name,
        power : res.data.power,
        type : res.data.type.name,
        accuracy : res.data.accuracy,
        pp : res.data.pp,
        priority : res.data.priority,
        damage_class : res.data.damage_class.name,
    }
    
    return move
}