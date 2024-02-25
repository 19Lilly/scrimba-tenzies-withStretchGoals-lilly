import React from 'react';
import Die from './Die';
import QuestionMarkIcon from './QuestionMarkIcon';
import { nanoid } from 'nanoid';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [sec, setSec] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [moves, setMoves] = React.useState(0);
  const { width, height } = useWindowSize();
  const [scores, setScores] = React.useState(
    JSON.parse(localStorage.getItem('scores')) || []
  );
  const [highScore, setHighScore] = React.useState([]);
  const [isShown, setIsShown] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      setIsPlaying(false);
      const newScore = { moves, sec };
      const storedScores = JSON.parse(localStorage.getItem('scores')) || [];
      const updatedScores = [newScore, ...storedScores].sort((a, b) => {
        if (a.moves !== b.moves) {
          return a.moves - b.moves;
        } else {
          return a.sec - b.sec;
        }
      });
      setScores(updatedScores);
      localStorage.setItem('scores', JSON.stringify(updatedScores));
    }
  }, [dice]);

  React.useEffect(() => {
    if (scores.length > 0) {
      setHighScore(scores[0]);
    } else {
      setHighScore([]);
    }
  }, [scores]);

  let highScoreTime =
    highScore.sec < 10
      ? `00:0${highScore.sec}`
      : highScore.sec < 60
      ? `00:${highScore.sec}`
      : highScore.sec % 60 < 10
      ? `0${Math.floor(highScore.sec / 60)}:0${highScore.sec % 60}`
      : `0${Math.floor(highScore.sec / 60)}:${highScore.sec % 60}`;

  React.useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setSec(sec => sec + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying]);

  let time =
    sec < 10
      ? `00:0${sec}`
      : sec < 60
      ? `00:${sec}`
      : sec % 60 < 10
      ? `0${Math.floor(sec / 60)}:0${sec % 60}`
      : `0${Math.floor(sec / 60)}:${sec % 60}`;

  function clearLocalStorage() {
    localStorage.clear();
    setScores([]);
  }

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    setIsPlaying(true);
    if (!tenzies) {
      setMoves(prevVal => prevVal + 1);
      setDice(oldDice =>
        oldDice.map(die => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setIsPlaying(false);
      setSec(0);
      setMoves(0);
    }
  }

  function holdDice(id) {
    setIsPlaying(true);
    setDice(oldDice =>
      oldDice.map(die => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function showInstruction() {
    setIsShown(prevVal => !prevVal);
  }

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti width={width} height={height} />}
      <div className='heading'>
        <h1 className='title'>
          Tenzies
          <QuestionMarkIcon onClick={showInstruction} />
        </h1>
        {isShown && (
          <p className='instructions'>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        )}
      </div>
      <div className='dice-container'>{diceElements}</div>
      <div className='score-time'>
        <span>Moves: {moves}</span>
        <span>Time: {time}</span>
      </div>
      <button className='roll-dice' onClick={rollDice}>
        {tenzies ? 'New Game' : 'Roll'}
      </button>
      <div className='high-score-container'>
        <h2>High score</h2>
        <div className='high-score-text'>
          <p> Moves: {highScore.length === 0 ? '0' : highScore.moves} </p>
          <p> Time:{highScore.length === 0 ? '00:00' : highScoreTime} min </p>
        </div>
        <button className='clear-localStorage-btn' onClick={clearLocalStorage}>
          Reset score
        </button>
      </div>
    </main>
  );
}

