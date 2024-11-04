import { useEffect, useState } from "react";

const text = {
  "en": {
    0: "Best Move",
    1: "Player Analysis",
    2: "Board Analysis",
    3: "Chess Mentor",
    4: "Turn",
    'w': "White",
    'b': "Black",
    'lan': "Language",
    'welc': 'Are you ready to play chess? I am Magnus Carlsen your handsome instructor',
    'msg': 'Write your questions here',
    'cls': 'Close',
    'sn': 'Send',
  },
  "es": {
    0: "Mejor Movimiento",
    1: "Análisis de jugador",
    2: "Análisis del tablero",
    3: "Mentor de ajedrez",
    4: "Turno",
    'b': "Negras",
    'w': "Blancas",
    'lan': "Idioma",
    'welc': '¿Estás listo para jugar al ajedrez? Soy Magnus Carlsen, tu atractivo instructor.',
    'msg': 'Escribe tus preguntas aquí',
    'cls': 'Cerrar',
    'sn': 'Enviar',
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
    'welc': 'Etes-vous prêt à jouer aux échecs ? Je suis Magnus Carlsen, votre bel instructeur',
    'msg': 'Écrivez vos questions ici',
    'cls': 'Fermer',
    'sn': 'Envoyer',
  }
}

export const useLanguage = () => {
  const [language, setLanguage] = useState('en');

  const storedLanguage = localStorage.getItem('language');
  if (storedLanguage ) {
    if (language !== storedLanguage) {
      setLanguage(storedLanguage);
    }
  } else {
    localStorage.setItem('language', language);
  }

  const changeLanguage = (newLanguage) => {
    localStorage.setItem('language', newLanguage);
    setLanguage(newLanguage);
  };

  return { language, text: text[language], changeLanguage };
}