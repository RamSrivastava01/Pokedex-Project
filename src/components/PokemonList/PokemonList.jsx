import React, { useEffect, useState } from "react";
import "./PokemonList.css";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function downloadPokemons() {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon"); //This downloads list of 20 pokemons
    const pokemonResults = response.data.results; //we extract out array of the pokemons

    // Iterating over the array of pokemons, and using their url, to create an array of promises
    // that will downlaod 20 pokemons
    const pokemonResultsPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );

    // passing the promse array to axios.all();
    const pokemonData = await axios.all(pokemonResultsPromise); //array of 20 pokemon's detailed data
    console.log(pokemonData.id);

    const pokeListResult = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
        id: pokemon.id,
      };
    });
    console.log(pokeListResult);
    setPokemonList(pokeListResult);
  }

  //Use effect
  useEffect(() => {
    downloadPokemons();
    setIsLoading(false);
  }, []);

  return (
    <div className="pokemon-list-wrapper">
      <h1>PokemonList</h1>
      {isLoading
        ? "Loading..."
        : pokemonList.map((p) => (
            <Pokemon name={p.name} image={p.image} id={p.id} />
          ))}
    </div>
  );
}

export default PokemonList;
