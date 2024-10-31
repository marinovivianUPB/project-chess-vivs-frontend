import { useState } from 'react';
import { Chess } from 'chess.js'; 
import Board from './chessboard/components/Board';
import Button from './chessboard/components/Button';
import TextBox from './chessboard/components/TextBox';
import { callAPI, callAnalysisAPI, callStateAPI  } from './chessboard/api'; 


function App() {
  const [bestMove, setBestMove] = useState("");
  const [game] = useState(new Chess());
  const [fenHistory, setFenHistory] = useState([]);

  const handleBestMoveClick = async () => {
    const fen = game.fen(); 
    const move = await callAPI(fen); 
    if (move) {
      setBestMove(move);
    }
  };

  const handleAnalysisClick = async () => {
    const analysis = await callAnalysisAPI(fenHistory);
    if (analysis) {
      console.log("Game Analysis:", analysis);
    }
  };

  const handleStateClick = async () => {
    const fen = game.fen(); 
    const stateAnalysis = await callStateAPI(fen); 
    if (stateAnalysis) {
      console.log("State Analysis:", stateAnalysis);
    }
  };

  return (
    <div>
      <Button onClick={handleBestMoveClick}>Best Move</Button>
      <Button onClick={handleAnalysisClick}>Analysis</Button>
      <Button onClick={handleStateClick}>State</Button>
      <TextBox bestMove={bestMove} />
      <Board onGameUpdate={setFenHistory} />
    </div>
  );
}

export default App;
