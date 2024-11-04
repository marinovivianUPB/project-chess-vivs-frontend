import { useState } from 'react';
import { Chess } from 'chess.js';
import Board from './chessboard/components/Board';
import Button from './chessboard/components/Button';
import TextBox from './chessboard/components/textBox';
import { callAPI, callAnalysisAPI, callStateAPI } from './chessboard/api';
import Chatbot from './chatbot/components/Chatbot';

function App() {
  const [bestMove, setBestMove] = useState("");
  const [title, setTitle] = useState("Chess App");
  const [game, setGame] = useState(new Chess());
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
      setBestMove(analysis);
    }
  };

  const handleStateClick = async () => {
    setTitle("State");
    const fen = game.fen();
    const stateAnalysis = await callStateAPI(fen);
    if (stateAnalysis) {
      setBestMove(stateAnalysis); 
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <div style={{ display: 'flex-col' }}>
        <Board game={game} setGame={setGame} onGameUpdate={setFenHistory} />
      </div>
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#000000', borderLeft: '1px solid #ddd' }}>
        <h1 style={{ textAlign: 'center', margin: '20px', color: 'white' }}>{title}</h1>
        <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
          <Button onClick={handleBestMoveClick} style={{ flex: 1 }}>Best Move</Button>
          <Button onClick={handleAnalysisClick} style={{ flex: 1 }}>Analysis</Button>
          <Button onClick={handleStateClick} style={{ flex: 1 }}>State</Button>
        </div>
        <div style={{ display: 'flex', gap: '10px', width: '100%', marginTop: '10px' }}>
          <TextBox content={bestMove} style={{ flex: 1 }} /> 
        </div>
        <div>
          <Chatbot/>
        </div>  
      </div>
      
    </div>
  );
}

export default App;
