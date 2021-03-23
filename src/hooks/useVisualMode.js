import React, {useState} from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    
    if (!replace) {
      setMode(newMode)
      setHistory([...history, newMode])
    }
    
    if (replace === true) {
      setMode(newMode)
      setHistory([...history])
    }
  }
  
  function back() {
    if(history.length > 1) {
      setMode(history[history.length - 2]);
      const newHistory = history.slice(0, history.length - 1)
      setHistory(newHistory)
    }
  }

  return {mode, transition, back};
}
