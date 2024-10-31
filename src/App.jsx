import { useState } from 'react';
import { Chess } from 'chess.js'; // Import Chess from chess.js
import Board, { callAPI } from './chessboard/components/Board';
import Button from './chessboard/components/Button';
import TextBox from './chessboard/components/TextBox';

function App() {
  const [bestMove, setBestMove] = useState("");
  const [game] = useState(new Chess()); // Create a Chess instance to track game state

  const handleBestMoveClick = async () => {
    const fen = game.fen(); // Use the current game state FEN
    const move = await callAPI(fen); // Call the API with the FEN string
    if (move) {
      setBestMove(move);
    }
  };

  return (
    <div>
      <Button onClick={handleBestMoveClick}>Best Move</Button>
      <TextBox bestMove={bestMove} />
      <Board />
    </div>
  );
}

export default App;
