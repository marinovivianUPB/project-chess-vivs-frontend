import { useState } from 'react';
import { Chess } from 'chess.js'; 
import Board from './chessboard/components/Board';
import Button from './chessboard/components/Button';
import TextBox from './chessboard/components/textBox';
import { callAPI, callAnalysisAPI, callStateAPI } from './chessboard/api'; 

function App() {
  const [bestMove, setBestMove] = useState("");
  const [title, setTitle] = useState("Chess App"); 
  const [game] = useState(new Chess());
  const [fenHistory, setFenHistory] = useState([]);

  const handleBestMoveClick = async () => {
    setTitle("Best Move"); 
    const fen = game.fen(); 
    const move = await callAPI(fen); 
    if (move) {
      setBestMove(move);
    }
  };

  const handleAnalysisClick = async () => {
    setTitle("Analysis"); 
    const analysis = await callAnalysisAPI(fenHistory);
    if (analysis) {
      console.log("Game Analysis:", analysis);
    }
  };

  const handleStateClick = async () => {
    setTitle("State"); 
    const fen = game.fen(); 
    const stateAnalysis = await callStateAPI(fen); 
    if (stateAnalysis) {
      console.log("State Analysis:", stateAnalysis);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Board onGameUpdate={setFenHistory} />
      </div> 
      <div style={{ width: '300px', padding: '20px', backgroundColor: '#000000', borderLeft: '1px solid #ddd' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>{title}</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button onClick={handleBestMoveClick}>Best Move</Button>
          <Button onClick={handleAnalysisClick}>Analysis</Button>
          <Button onClick={handleStateClick}>State</Button>
          <TextBox bestMove={bestMove} />
        </div>
      </div>
    </div>
  );
}

export default App;
