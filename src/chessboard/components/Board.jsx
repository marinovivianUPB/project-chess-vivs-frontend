import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from "chess.js";

const Board = () => {
  const [game, setGame] = useState(new Chess());

  const callAPI = async () => {
    const fen = game.fen();
    const params = new URLSearchParams({ fen });
    const url = new URL(`http://localhost:8000/best-move`);
    url.search = params.toString();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json()).then((data) => {
      console.log(data.message);
      console.log("AI Response:", data.data.response);
      // gameCopy.move(data.bestMove);
      // setGame(gameCopy);
    });
  };

  function makeAMove(move) {
    const gameCopy = { ...game };
    const result = gameCopy.move(move);

    
    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if the move was legal
  }
  
  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
      return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
    callAPI();
  }

  function onDrop(sourceSquare, targetSquare) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return false;
    setTimeout(makeRandomMove, 200);
    return true;
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vh' }}>
      <Chessboard position={game.fen()} onPieceDrop={onDrop} />
    </div>
  );
};

export default Board;
