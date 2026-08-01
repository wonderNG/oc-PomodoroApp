import { useState, useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react";
import completeSound from "./assets/complete.mp3";

export function Timer({
  initialMinutes,
  isRunning,
  setIsRunning,
  onComplete,
  actionButton
}) {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);

  //sound part
  const audioRef = useRef(new Audio(completeSound));
  //notification permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  //reset timer whenever the session changes
  useEffect(() => {
    setSecondsLeft(initialMinutes * 60);
    setIsRunning(false);
  }, [initialMinutes, setIsRunning]);

  //countdown
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

  //timer completed
  useEffect(() => {
    if (secondsLeft !== 0) return;

    setIsRunning(false);

    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((err) => console.log("Audio play blocked:", err));

    //desktop notification
    if ("Notification" in window && Notification.permission === "granted") {
      const notification = new Notification("Time's Up!", {
        body: "Time to switch buddy!!!",
        silent: true
      });

      //Electron window to focus if the user clicks the banner
      notification.onclick = () => {
        window.focus();
      };
    }

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
        actionButton || ("")
      }
    </div>
  );
}