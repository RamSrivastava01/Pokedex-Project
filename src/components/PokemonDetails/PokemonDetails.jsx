import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//css import

import "./PokemonDetails.css";

const PokemonDetails = () => {
  //useParams used here
  const { id } = useParams();

  //useState used here
  const [pokemon, setPokemon] = useState({});
  console.log(pokemon);

  async function downloadPokemon() {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log(res.data);
    setPokemon({
      name: res.data.name,
      image: res.data.sprites.other.dream_world.front_default,
      weight: res.data.weight,
      height: res.data.height,
      types: res.data.types.map((t) => t.type.name),
    });
  }

  useEffect(() => {
    downloadPokemon();
  }, []);
  console.log(id);

  return (
    <div className="pokemon-details-wrapper">
      <div className="pokemon-details-name">name: {pokemon.name}</div>
      <img className="pokemon-image" src={pokemon.image} />
      <div className="height">height : {pokemon.height}</div>
      <div className="weight">weight : {pokemon.weight}</div>
      <div className="pokemon-details-types">
        {pokemon.types && pokemon.types.map((t) => <div key={t}> ⇨ {t} </div>)}
      </div>
    </div>
  );
};

export default PokemonDetails;
