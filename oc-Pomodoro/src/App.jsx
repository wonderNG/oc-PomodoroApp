import {
  BarChart2,
  Cross,
  CrossIcon,
  InfoIcon,
  Play,
  Pause,
  X,
  RotateCcw,
} from "lucide-react";
import "./App.css";
import { trackAppOpen, trackSessionCompleted } from "./lib/usageTracking";
import { SpeedInsights } from "@vercel/speed-insights/react"
import Button from "./Button";
import { SelectInput } from "./SelectInput";
import { Timer } from "./Timer";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { recordSessionStart, recordSessionComplete } from "./services/storage";
function App() {
  //array that contains time values for time options
  const timeOptions = Array.from({ length: 12 }, (_, index) => (index + 1) * 5); //default to *5 when done doing the stats part test

  //state variable that takes that time value
  const [breakTime, setBreakTime] = useState(5); //default to 05 when done doing the stats part test
  const [focusTime, setFocusTime] = useState(25); //default to 25 when done doing the stats part test

  //set time depending on what's been clicked
  const [activeMode, setActiveMode] = useState(null);
  const timeHandler = (selectedTime) => {
    if (activeMode === "break") {
      setBreakTime(selectedTime);
    } else if (activeMode === "focus") {
      setFocusTime(selectedTime);
    }

    //reset active mode
    setActiveMode(null);
  };

  //track whether the timer is currently running Focus or Break
  const [currentSession, setCurrentSession] = useState("focus");
  //set an active session so the reset button makes sense
  const [activeSession, setActiveSession] = useState(false);
  const [resetKey, setResetKey] = useState(0); //to rerender Timer to initial state
  const handleReset = () => {
    setIsRunning(false);
    setActiveSession(false);
    setResetKey((prev) => prev + 1);
  };

  useEffect(() => {
    trackAppOpen();
  }, []);

  // Timer things
  const [isRunning, setIsRunning] = useState(false);
  const handleSessionStart = () => {
    if (!activeSession) {
      // Record 'Started' metric when initiating a fresh focus session
      recordSessionStart();
    }
    setIsRunning((prev) => !prev);
    setActiveSession(true);
  };
  const handleSessionComplete = () => {
    trackSessionCompleted(
      currentSession,
      currentSession === "focus" ? focusTime : breakTime,
    );
    recordSessionComplete(focusTime);
    setCurrentSession((prev) => (prev === "focus" ? "break" : "focus"));
    setIsRunning(false);
    setActiveSession(false);
  };

  //keyboard listener
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space" || event.key === " ") {
        event.preventDefault();
        setIsRunning((prev) => !prev);
        setActiveSession(true);
      }

      if (event.key.toLowerCase() === "r") {
        event.preventDefault();
        handleReset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="main-container">
      <SpeedInsights />
        {activeSession ? (
          <div className="floating-menu stats-info">
            <span style={{ color: "grey" }}>
              oc-Pomodoro App
              <br />
              <strong>{currentSession.toUpperCase()}</strong>
            </span>
          </div>
        ) : (
          <div className="floating-menu stats-info">
            <Link to="/stats">
              <Button
                text=""
                iconLeft={<BarChart2 fill="white" />}
                variant="outline"
              />
            </Link>

            <Link to="/info">
              <Button text="" iconLeft={<InfoIcon />} variant="outline" />
            </Link>
          </div>
        )}

        <Timer
          key={`*${currentSession}-${resetKey}`}
          initialMinutes={currentSession === "focus" ? focusTime : breakTime}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          onComplete={handleSessionComplete}
          actionButton={
            <Button
              variant="transparent"
              text=""
              iconLeft={
                isRunning ? (
                  <Pause className="timer-icon" />
                ) : (
                  <Play className="timer-icon" />
                )
              }
              onClick={handleSessionStart}
            />
          }
        />

        {activeMode !== null && (
          <div className="floating-menu floating-options">
            {timeOptions.map((time, index) => (
              <span
                key={index}
                onClick={() => {
                  timeHandler(time);
                }}
              >
                {time}
              </span>
            ))}
            <X
              onClick={() => setActiveMode(null)}
              style={{ cursor: "pointer" }}
            />
          </div>
        )}

        {!activeSession ? (
          <div className="floating-menu main-menu">
            <SelectInput
              name="Break"
              defDuration={breakTime}
              onClick={() => setActiveMode("break")}
            />
            <Button
              text={isRunning ? "Pause" : "Start"}
              iconLeft={
                isRunning ? <Pause fill="white" /> : <Play fill="white" />
              }
              onClick={() => {
                setIsRunning((prev) => !prev);
                setActiveSession(true);
              }}
            />
            <SelectInput
              name="Focus"
              defDuration={focusTime}
              onClick={() => setActiveMode("focus")}
            />
          </div>
        ) : (
          <div className="floating-menu main-menu">
            <Button
              variant="outline"
              text="Reset"
              iconLeft={<RotateCcw />}
              onClick={handleReset}
            />
            <Button
              variant="outline"
              text={isRunning ? "Pause" : "Start"}
              iconLeft={isRunning ? <Pause /> : <Play />}
              onClick={() => setIsRunning((prev) => !prev)}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
