function Buttons({ score, highScore }) {
  return (
    <div className="flex justify-between  static btn">
      <button>score : {score}</button>
      <button>High score : {highScore}</button>
    </div>
  );
}

export default Buttons;
