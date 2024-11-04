const api_url = import.meta.env.VITE_API_URL;

export const bestMoveAnalysis = async (fen, language) => {
    const url = `${api_url}/best-move`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fen, language })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching best move:", error);
      return null;
    }
  };
  

  export const playerAnalysis = async (fen, history, language, player) => {
    const url = `${api_url}/player`;
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
    const url = `${api_url}/state`;
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

export const chatbotAPI = async (message) => {
  const url = `${api_url}/chat`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }) 
    });
    const data = await response.json();
    return data.agent_response; 
  } catch (error) {
    console.error("Error connecting with chatbot:", error);
    return null;
  }
};
