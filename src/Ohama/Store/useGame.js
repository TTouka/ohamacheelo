import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";
import compareHands from "../compareHands";

const GameContext = createContext();

export function GameContextProvider({ children }) {
  const [game, setGame] = useState({
    isOpen: true,
  });
  // 各参加者の
  const [rolls, setRolls] = useState([]);

  useEffect(() => {
    const savedGame = JSON.parse(window.localStorage.getItem("game"));
    if (savedGame) {
      setGame(savedGame);
    }
  }, []);

  const getRoll = useCallback(
    (memberName) => rolls.find(({ memberName: name }) => name === memberName),
    [rolls]
  );

  const setRoll = useCallback(
    (memberName, rollLog, bet) => {
      const lastRoll = rollLog.slice(-1)[0];

      const existing = rolls.findIndex(
        ({ memberName: name }) => name === memberName
      );

      if (existing >= 0) {
        // 上書き
        rolls[existing] = { memberName, ...lastRoll, log: rollLog, bet };
      } else {
        rolls.push({ memberName, ...lastRoll, log: rollLog, bet });
      }

      setRolls([...rolls]);
    },
    [setRolls, rolls]
  );

  /**
   * store game and save them to localStorage
   */
  const saveGame = useCallback(
    (newGame) => {
      setGame(newGame);
      window.localStorage.setItem("game", JSON.stringify(newGame));
    },
    [setGame]
  );

  const closeGame = useCallback(
    (dealerName, wonApplier) => {
      const dealerRoll = getRoll(dealerName);
      let dealerWon = 0;

      const refunded = rolls
        .map((roll) => {
          if (roll.memberName === dealerName) {
            return roll;
          }

          roll.refundMulti = compareHands(dealerRoll, roll);
          roll.won = roll.bet * roll.refundMulti;
          dealerWon -= roll.won;

          return roll;
        })
        .map((roll) => {
          if (roll.memberName === dealerName) {
            roll.won = dealerWon;
          }
          return roll;
        });

      setRolls([...refunded]);
      wonApplier(rolls);
      setGame({ ...game, isOpen: false });
    },
    [getRoll, setRolls, rolls, game, setGame]
  );

  const openNewGame = useCallback(() => {
    setRolls([]);
    setGame({ ...game, isOpen: true });
  }, [setRolls, setGame, game]);

  return (
    <GameContext.Provider
      value={{
        openNewGame,
        closeGame,
        game,
        setGame,
        saveGame,
        rolls,
        setRolls,
        getRoll,
        setRoll,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
