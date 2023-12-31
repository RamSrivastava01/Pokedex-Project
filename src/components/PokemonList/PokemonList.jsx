import React, { useEffect, useState } from "react";
import "./PokemonList.css";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let [page, setPage] = useState(0);

  const [pokedexUrl, setPokedexUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );

  const [nextUrl, setNextUrl] = useState("");

  const [previousUrl, setpreviousUrl] = useState("");

  async function downloadPokemons() {
    setIsLoading(true);
    const response = await axios.get(pokedexUrl); //This downloads list of 20 pokemons
    const pokemonResults = response.data.results; //we extract out array of the pokemons
    // console.log(response.data);

    //setting the values of url into the state;

    setNextUrl(response.data.next);
    setpreviousUrl(response.data.previous);

    // Iterating over the array of pokemons, and using their url, to create an array of promises
    // that will downlaod 20 pokemons
    const pokemonResultsPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );

    // passing the promse array to axios.all();
    const pokemonData = await axios.all(pokemonResultsPromise); //array of 20 pokemon's detailed data
    // console.log(pokemonData.id);
    // setPage(page++);

    const pokeListResult = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
        id: pokemon.id,
      };
    });
    // console.log(pokeListResult);
    setPokemonList(pokeListResult);
  }

  //Use effect
  useEffect(() => {
    setPage(page + 1);
    downloadPokemons();

    setIsLoading(false);
  }, [pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      <center>
        {" "}
        <h1>PokemonList</h1>
      </center>
      <div className="pokemon-wrapper">
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          pokemonList.map((p) => (
            <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
          ))
        )}
      </div>
      <div>
        <center className="controls">
          <button
            disabled={previousUrl === null}
            onClick={() => setPokedexUrl(previousUrl)}
          >
            {" "}
            Prev{" "}
          </button>
          <span className="pageDisplay">{page}</span>
          <button
            disabled={nextUrl == null}
            onClick={() => setPokedexUrl(nextUrl)}
          >
            {" "}
            Next{" "}
          </button>
        </center>
      </div>
    </div>
  );
}

export default PokemonList;
