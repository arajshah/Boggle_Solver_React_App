import React, { useState, useEffect } from 'react';
import { GAME_STATE } from './GameState';
import ToggleGameState from './components/ToggleGameState';
import Board from './components/Board';
import GuessInput from './components/GuessInput';
import SummaryResults from './components/SummaryResults';
import FoundSolutions from './components/FoundSolutions';
import BoggleSolver from './boggleSolver';
import './App.css';

function generateRandomGrid(size) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const grid = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
      row.push(randomLetter);
    }
    grid.push(row);
  }
  return grid;
}

function getDictionary() {
  // Replace with your own dictionary or fetch from an API
  return ['ART', 'EGO', 'GENT', 'GET', 'NET', 'NEW', 'PRY', 'QUART', 'TEN', 'WET', 'TARP'];
}

function App() {
  const [gameState, setGameState] = useState(GAME_STATE.BEFORE);
  const [gridSize, setGridSize] = useState(3);
  const [grid, setGrid] = useState([]);
  const [allSolutions, setAllSolutions] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    if (gameState === GAME_STATE.IN_PROGRESS) {
      // Generate random grid and solutions
      const newGrid = generateRandomGrid(gridSize);
      setGrid(newGrid);

      // Initialize BoggleSolver
      const dictionary = getDictionary(); // Implement this function to get your dictionary words
      const solver = new BoggleSolver(newGrid, dictionary);
      const solutions = solver.getSolutions();
      setAllSolutions(solutions);

      setFoundWords([]);
      setStartTime(Date.now());
    } else if (gameState === GAME_STATE.ENDED) {
      const endTime = Date.now();
      setTotalTime(((endTime - startTime) / 1000).toFixed(2));
      // Remove found words from allSolutions
      const missedWords = allSolutions.filter(word => !foundWords.includes(word));
      setAllSolutions(missedWords);
    }
  }, [gameState]);

  const handleWordSubmit = (word) => {
    const upperWord = word.toUpperCase();
    if (allSolutions.includes(upperWord) && !foundWords.includes(upperWord)) {
      setFoundWords([...foundWords, upperWord]);
    } else {
      // Handle invalid word (optional)
    }
  };

  return (
    <div className="App">
      <ToggleGameState
        gameState={gameState}
        setGameState={setGameState}
        gridSize={gridSize}
        setGridSize={setGridSize}
        setTotalTime={setTotalTime}
      />

      {gameState === GAME_STATE.IN_PROGRESS && (
        <>
          <Board grid={grid} />
          <GuessInput onWordSubmit={handleWordSubmit} />
          <FoundSolutions headerText="Words You've Found" words={foundWords} />
        </>
      )}

      {gameState === GAME_STATE.ENDED && (
        <>
          <Board grid={grid} />
          <SummaryResults totalWords={foundWords.length} totalTime={totalTime} />
          <FoundSolutions headerText="Missed Words" words={allSolutions} />
        </>
      )}
    </div>
  );
}

export default App;
