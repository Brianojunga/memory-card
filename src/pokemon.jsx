import { useState } from "react";
import Buttons from "./buttons";

function DisplayPokemon({ pokemons, setFunction }) {
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  function shuffle(array, setArr) {
    setArr(
      (prevArr) =>
        [...prevArr]
          .map((item) => ({ ...item, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort),
      // .map(({ ...rest }) => rest)
    );
  }

  function addToPokemonArr(id, pokemons, setFunction) {
    if (clicked.includes(id)) {
      if (score > highScore) {
        setHighScore(score);
      }
      setScore(0);
      setClicked([]);
      return;
    }
    setClicked((prevClicked) => [...prevClicked, id]);
    setScore((prevScore) => prevScore + 1);
    shuffle([...pokemons], setFunction);
  }

  return (
    <section className="w-full relative">
      <div className="text-center">
        <h1 className="text-center text-4xl">Pokemons MEMORY GAME</h1>
        <p className="text-sm text">
          (Get points by clicking on an image but don't click on any more than
          once!)
        </p>
      </div>

      <Buttons score={score} highScore={highScore} />
      <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] place-items-center">
        {pokemons.map((pokemon) => {
          return (
            <div
              key={pokemon.id}
              className="w-full aspect-square shadow-2xl rounded-lg"
              onClick={() => addToPokemonArr(pokemon.id, pokemons, setFunction)}
            >
              <img
                src={pokemon.url}
                alt={pokemon.name}
                className="w-full object-cover cursor-pointer"
              />
              <h3 className="text-center name">{pokemon.name}</h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default DisplayPokemon;
