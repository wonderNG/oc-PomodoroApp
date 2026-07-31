import { useState, useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react";
import completeSound from "./assets/complete.mp3";
import Button from "./Button";

export function Timer({
  initialMinutes,
  isRunning,
  setIsRunning,
  onComplete,
  Button
}) {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);

  // Keep a single Audio instance
  const audioRef = useRef(new Audio(completeSound));

  // Reset timer whenever the session changes
  useEffect(() => {
    setSecondsLeft(initialMinutes * 60);
    setIsRunning(false);
  }, [initialMinutes, setIsRunning]);

  // Countdown
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Timer completed
  useEffect(() => {
    if (secondsLeft !== 0) return;

    setIsRunning(false);

    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});

    onComplete?.();
  }, [secondsLeft, onComplete, setIsRunning]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="timer-container">
      <div className="timer">{formatTime(secondsLeft)}</div>
      {
        Button || ("")
      }
    </div>
  );
}