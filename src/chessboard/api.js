export const bestMoveAnalysis = async (fen, language) => {
    const url = `http://localhost:8000/best-move`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fen, language })
      });
      const data = await response.json();
      return data.agent_response;
    } catch (error) {
      console.error("Error fetching best move:", error);
      return null;
    }
  };
  

  export const playerAnalysis = async (fen, history, language, player) => {
    const url = `http://localhost:8000/player`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fen, history, language, player }) 
      });
      const data = await response.json();
      return data.agent_response;
    } catch (error) {
      console.error("Error fetching analysis:", error);
      return null;
    }
  };
  
  export const boardAnalysis = async (fen, language) => {
    const url = `http://localhost:8000/state`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fen, language }) 
      });
      const data = await response.json();
      return data.agent_response; 
    } catch (error) {
      console.error("Error fetching state analysis:", error);
      return null;
    }
  };