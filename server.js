import express from "express";
import { getPokemonListPaginated, getSpecificDataForPokemon } from "./utils/pokemon_general.js";

const app = express();

app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
    try {
        const pokemonList = await getPokemonListPaginated(1, 151);
        res.render("index.ejs", { pokemonList });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error loading Pokémon");
    }
});

app.get("/pokemon/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const pokemon = await getSpecificDataForPokemon(id);
        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Pokémon data" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});