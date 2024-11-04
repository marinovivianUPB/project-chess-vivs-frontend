import { useState } from 'react';
import { Chess } from 'chess.js';
import Board from './chessboard/components/Board';
import Button from './chessboard/components/Button';
import TextBox from './chessboard/components/textBox';
import { callAPI, callAnalysisAPI, callStateAPI } from './chessboard/api';
import Spinner from './assets/Spinner';
import { useLanguage } from './language';

function App() {
  const [bestMove, setBestMove] = useState("");
  const [title, setTitle] = useState("");
  const [game, setGame] = useState(new Chess());
  const [fenHistory, setFenHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const { language, text, changeLanguage } = useLanguage();

  const loader = async (fun) => {
    debugger
    setLoading(true);
    const res = await fun()
    setLoading(false);
    return res;
  }

  const handleBestMoveClick = async () => {
    setTitle(text[0]);
    const fen = game.fen();
    const move = await loader(() => callAPI(fen, language));
    if (move) {
      setBestMove(move);
    }
  };

  const handleAnalysisClick = async () => {
    setTitle(text[1]);
    const analysis = await loader(() => callAnalysisAPI(fenHistory, language));
    if (analysis) {
      setBestMove(analysis);
    }
  };

  const handleStateClick = async () => {
    setTitle(text[2]);
    const fen = game.fen();
    const stateAnalysis = await loader(() => callStateAPI(fen, language));
    if (stateAnalysis) {
      setBestMove(stateAnalysis);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <div style={{ display: 'flex' }}>
        <Board game={game} setGame={setGame} onGameUpdate={setFenHistory} />
      </div>
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#000000', borderLeft: '1px solid #ddd' }}>
        <div className='flex justify-between'>
          <p> <span className='font-bold'>{text[4]}: </span>{text[game.turn()]}</p>
          <div>
            <label className='mr-4 font-bold'>{text['lan']}:</label>
            <select value={language} onChange={e => changeLanguage(e.target.value)}>{['en', 'es', 'fr'].map(lan =>
              (<option key={lan} value={lan}>{lan}</option>))}
            </select>
          </div>
        </div>
        <h1 style={{ textAlign: 'center', margin: '20px', color: 'white' }}>{text[3]}</h1>
        <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
          <Button onClick={handleBestMoveClick} style={{ flex: 1 }}>{text[0]}</Button>
          <Button onClick={handleAnalysisClick} style={{ flex: 1 }}>{text[1]}</Button>
          <Button onClick={handleStateClick} style={{ flex: 1 }}>{text[2]}</Button>
        </div>
        <div className='mt-5'>
          <h2 className='text-xl font-bold'>{title}</h2>
          {loading ? <div className='flex w-full justify-center mt-20'><Spinner /></div> :
            <TextBox content={bestMove} style={{ flex: 1 }} />
          }
        </div>
      </div>
    </div>
  );
}

export default App;
