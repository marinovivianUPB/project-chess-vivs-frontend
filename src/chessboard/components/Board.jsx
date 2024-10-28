import React from 'react';
import { Chessboard } from 'react-chessboard';

const Board = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vh' }}>
      <Chessboard />
    </div>
  );
};

export default Board;
