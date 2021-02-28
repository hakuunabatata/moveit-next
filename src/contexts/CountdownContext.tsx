import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownProviderProps {
  children: ReactNode;
}

interface CountdownContextData {
  time: number;
  isActive: boolean;
  hasFinished: boolean;
  minutes: number;
  seconds: number;
  startCountdown: () => void;
  stopCountdown: () => void;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(25 * 60);
  const [isActive, setActive] = useState(false);
  const [hasFinished, setFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setActive(true);
    setFinished(false);
  }

  function stopCountdown() {
    clearTimeout(countdownTimeout);
    setTime(25 * 60);
    setActive(false);
    setFinished(false);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => setTime(time - 1), 1000);
    } else if (isActive && time === 0) {
      setFinished(true);
      setActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
        time,
        isActive,
        hasFinished,
        minutes,
        seconds,
        startCountdown,
        stopCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
