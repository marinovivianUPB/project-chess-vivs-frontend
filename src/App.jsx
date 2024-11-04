import { useState } from 'react';
import { Chess } from 'chess.js';
import Board from './chessboard/components/Board';
import Button from './chessboard/components/Button';
import TextBox from './chessboard/components/textBox';
import { bestMoveAnalysis, playerAnalysis, boardAnalysis } from './chessboard/api';
import Spinner from './assets/Spinner';
import { useLanguage } from './language';
import Chatbot from './chatbot/components/Chatbot';

function App() {
  const [bestMove, setBestMove] = useState("");
  const [title, setTitle] = useState("");
  const [game, setGame] = useState(new Chess());
  const [fenHistory, setFenHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [colorMenu, setColorMenu] = useState(false);
  const [arrows, setArrows] = useState([]);

  const { language, text, changeLanguage } = useLanguage();

  const loader = async (fun) => {
    setLoading(true);
    const res = await fun()
    setLoading(false);
    return res;
  }

  const handleBestMoveClick = async () => {
    setTitle(text[0]);
    const fen = game.fen();
    const move = await loader(() => bestMoveAnalysis(fen, language));
    if (move) {
      setBestMove(move.agent_response);
      console.log(move)
      setArrows([[move.data.from_square, move.data.to_square, 'green']]);
    }
  };

  const handleAnalysisClick = async (player) => {
    setColorMenu(false);
    setTitle(text[1]);
    const fen = game.fen();
    const history = game.history({ verbose: true });
    const analysis = await loader(() => playerAnalysis(fen, history, language, player));
    if (analysis) {
      setBestMove(analysis);
    }
  };

  const handleStateClick = async () => {
    setTitle(text[2]);
    const fen = game.fen();
    const stateAnalysis = await loader(() => boardAnalysis(fen, language));
    if (stateAnalysis) {
      setBestMove(stateAnalysis);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <div style={{ display: 'flex' }}>
        <Board game={game} setGame={setGame} onGameUpdate={() =>setArrows([])} arrows={arrows} />
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
          <Button onClick={handleStateClick} style={{ flex: 1 }}>{text[2]}</Button>
          <div className='flex-1 flex flex-col w-48'>
            <Button onClick={() => setColorMenu(col => !col)}>{text[1]}</Button>
            {colorMenu &&
              <div className='absolute w-48 z-10'>
                <div className='relative top-12 w-full'>
                  <button 
                    className='bg-white text-black w-full px-2'
                    onClick={() => handleAnalysisClick(1)}
                  >
                    {text['w']}
                  </button>
                  <button 
                    className='w-full'
                    onClick={() => handleAnalysisClick(0)}
                  >
                    {text['b']}
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
        <div className='mt-5'>
          <h2 className='text-xl font-bold'>{title}</h2>
          {loading ? <div className='flex w-full justify-center mt-20'><Spinner /></div> :
            <TextBox content={bestMove} style={{ flex: 1 }} />
          }
        </div>
        <div>
          <Chatbot
            welcomeMsg ={text['welc']}
            msg={text['msg']}
          />
        </div>  
      </div>
      
    </div>
  );
}

export default App;
