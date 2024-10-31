import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from "chess.js";

export const callAPI = async (fen) => {
  const params = new URLSearchParams({ fen });
  const url = new URL(`http://localhost:8000/best-move`);
  url.search = params.toString();
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.bestMove;
  } catch (error) {
    console.error("Error calling API:", error);
    return null;
  }
};

const Board = () => {
  const [game, setGame] = useState(new Chess());

  function makeAMove(move) {
    const gameCopy = { ...game };
    const result = gameCopy.move(move);
    setGame(gameCopy);
    return result;
  }

  function onDrop(sourceSquare, targetSquare) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) return false;
    return true;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vh' }}>
      <Chessboard position={game.fen()} onPieceDrop={onDrop} />
    </div>
  );
};

export default Board;
