import React, { useEffect, useState } from "react";
import "./PokemonList.css";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  // const [pokemonList, setPokemonList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [nextUrl, setNextUrl] = useState("");
  // const [previousUrl, setpreviousUrl] = useState("");
  // const [pokedexUrl, setPokedexUrl] = useState(
  //   "https://pokeapi.co/api/v2/pokemon"
  // );

  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    nextUrl: "",
    previousUrl: "",
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
  });

  let [page, setPage] = useState(0);

  async function downloadPokemons() {
    // setIsLoading(true);
    setPokemonListState((state) => ({ ...state, isLoading: true }));
    const response = await axios.get(pokemonListState.pokedexUrl); //This downloads list of 20 pokemons
    const pokemonResults = response.data.results; //we extract out array of the pokemons

    //setting the values of url into the state;

    // setNextUrl(response.data.next);
    setPokemonListState({
      ...pokemonListState,
      nextUrl: response.data.next,
      previousUrl: response.data.previous,
    });
    // setpreviousUrl(response.data.previous);

    // Iterating over the array of pokemons, and using their url, to create an array of promises
    // that will downlaod 20 pokemons
    const pokemonResultsPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );

    // passing the promse array to axios.all();
    const pokemonData = await axios.all(pokemonResultsPromise); //array of 20 pokemon's detailed data

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
    // setPokemonList(pokeListResult);

    setPokemonListState((state) => ({
      ...state,
      pokemonList: pokeListResult,
      isLoading: false,
    }));
  }

  useEffect(() => {
    setPage(page + 1);
    downloadPokemons();

    // setIsLoading(false);
  }, [pokemonListState.pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      <center>
        {" "}
        <h1>PokemonList</h1>
      </center>
      <div className="pokemon-wrapper">
        {pokemonListState.isLoading ? (
          <h1>Loading...</h1>
        ) : (
          pokemonListState.pokemonList.map((p) => (
            <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
          ))
        )}
      </div>
      <div>
        <center className="controls">
          <button
            disabled={pokemonListState.previousUrl === null}
            onClick={() => {
              const urlToSet = pokemonListState.previousUrl;
              setPokemonListState({
                ...pokemonListState,
                pokedexUrl: urlToSet,
              });
            }}
          >
            Prev
          </button>
          <span className="pageDisplay">{page}</span>
          <button
            disabled={pokemonListState.nextUrl == null}
            onClick={() => {
              const urlToSet = pokemonListState.nextUrl;
              setPokemonListState({
                ...pokemonListState,
                pokedexUrl: urlToSet,
              });
            }}
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
