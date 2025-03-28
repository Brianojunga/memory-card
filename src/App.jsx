import { useState, useEffect } from "react";
import "./App.css";
import DisplayPokemon from "./pokemon";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=12`, { mode: "cors" })
      .then((response) => {
        if (response >= 400) throw new Error("server error");
        return response.json();
      })
      .then((response) => {
        const pokemonsPromises = response.results.map((pokemon) =>
          fetch(pokemon.url).then((response) => response.json()),
        );

        Promise.all(pokemonsPromises).then((response) => {
          const sortedResponse = response.map((pokemon) => {
            return {
              id: crypto.randomUUID(),
              name: pokemon.name,
              url: pokemon.sprites.other["official-artwork"].front_default,
            };
          });
          setPokemons(sortedResponse);
        });
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Network error was encountered</p>;

  return <DisplayPokemon pokemons={pokemons} setFunction={setPokemons} />;
}

export default App;
