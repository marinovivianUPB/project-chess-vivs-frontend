import { useEffect, useState } from "react";

const text = {
  "en": {
    0: "Best Move",
    1: "Player Analysis",
    2: "Board Analysis",
    3: "Chess App",
    4: "Turn",
    'w': "White",
    'b': "Black",
    'lan': "Language",
  },
  "es": {
    0: "Mejor Movimiento",
    1: "Análisis de jugador",
    2: "Análisis del tablero",
    3: "Aplicación de ajedrez",
    4: "Turno",
    'b': "Negras",
    'w': "Blancas",
    'lan': "Idioma",
  },
  "fr": {
    0: "Meilleur coup",
    1: "Analyse du joueur",
    2: "Analyse du tableau",
    3: "Application d'échecs",
    4: "Tour",
    'b': "Noir",
    'w': "Blanc",
    'lan': "Langue",
  }
}

export const useLanguage = () => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
    } else {
      localStorage.setItem('language', language);
    }
  }, []);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return { language, text: text[language], changeLanguage };
}