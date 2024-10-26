import React from 'react';
import { GAME_STATE } from '../GameState';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function ToggleGameState({ gameState, setGameState, gridSize, setGridSize, setTotalTime }) {
  const handleStartEndClick = () => {
    if (gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED) {
      setGameState(GAME_STATE.IN_PROGRESS);
      setTotalTime(0);
    } else if (gameState === GAME_STATE.IN_PROGRESS) {
      setGameState(GAME_STATE.ENDED);
    }
  };

  const handleSizeChange = (event) => {
    setGridSize(event.target.value);
  };

  return (
    <div className="ToggleGameState">
      <Button variant="contained" onClick={handleStartEndClick}>
        {gameState === GAME_STATE.IN_PROGRESS ? 'End Game' : 'Start Game'}
      </Button>
      {(gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED) && (
        <Select value={gridSize} onChange={handleSizeChange}>
          {[3, 4, 5, 6, 7, 8, 9, 10].map(size => (
            <MenuItem key={size} value={size}>{size}</MenuItem>
          ))}
        </Select>
      )}
    </div>
  );
}

export default ToggleGameState;
