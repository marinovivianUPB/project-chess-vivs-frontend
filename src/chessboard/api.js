export const callAPI = async (fen, language) => {
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
  

  export const callAnalysisAPI = async (history, language) => {
    const url = `http://localhost:8000/analysis`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history, language }) 
      });
      const data = await response.json();
      return data.agent_response;
    } catch (error) {
      console.error("Error fetching analysis:", error);
      return null;
    }
  };
  
  export const callStateAPI = async (fen, language) => {
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