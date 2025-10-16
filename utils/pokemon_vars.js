import axios from "axios";

const res = await axios.get("https://pokeapi.co/api/v2/pokemon",{
    headers: null, // header
    data: null, // body
    timeout :  1500,
    responseType : "json",
    responseEncoding : "utf8",
})

export const upper_limit_for_id =  res.data.count
export const lower_limit_for_id = 1;