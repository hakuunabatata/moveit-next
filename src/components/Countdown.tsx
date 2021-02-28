import { CountdownContext } from "../contexts/CountdownContext";

import { useContext } from "react";
import styles from "../styles/components/Countdown.module.css";

export function Countdown() {
  const {
    time,
    minutes,
    seconds,
    hasFinished,
    isActive,
    stopCountdown,
    startCountdown,
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={`${styles.countdownButton}`}>
          Ciclo encerrado
        </button>
      ) : isActive ? (
        <button
          type="button"
          className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
          onClick={stopCountdown}
        >
          Abandonar Ciclo
        </button>
      ) : (
        <button
          type="button"
          className={styles.countdownButton}
          onClick={startCountdown}
        >
          Iniciar Ciclo
        </button>
      )}
    </div>
  );
}
