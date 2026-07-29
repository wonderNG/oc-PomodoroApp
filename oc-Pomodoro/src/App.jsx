import {
  BarChart,
  BarChart2,
  BarChart4,
  ClosedCaptionIcon,
  Cross,
  CrossIcon,
  Info,
  InfoIcon,
  Play,
  Pointer,
  Pause,
  User,
  X,
} from "lucide-react";
import "./App.css";
import Button from "./Button";
import { SelectInput } from "./SelectInput";
import { Timer } from "./Timer";
import { useState } from "react";

function App() {
  //array that contains time values
  const timeOptions = Array.from({ length: 12 }, (_, index) => (index + 1) * 5);

  //state variable that takes that time value
  const [breakTime, setBreakTime] = useState(5);
  const [focusTime, setFocusTime] = useState(25);

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

  //Timer things
  const [isRunning, setIsRunning] = useState(false);
  const handleSessionComplete = () => {
    setCurrentSession((prev) => (prev === "focus" ? "break" : "focus"));

    // Wait for the user to click Start
    setIsRunning(false);
  };

  return (
    <>
      <div className="main-container">
        <div className="floating-menu stats-info">
          <Button
            text=""
            iconLeft={<BarChart2 fill="white" />}
            variant="outline"
          />

          <Button text="" iconLeft={<InfoIcon />} variant="outline" />
        </div>

        <Timer
          key={currentSession}
          initialMinutes={currentSession === "focus" ? focusTime : breakTime}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          onComplete={handleSessionComplete}
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
            onClick={() => setIsRunning((prev) => !prev)}
          />
          <SelectInput
            name="Focus"
            defDuration={focusTime}
            onClick={() => setActiveMode("focus")}
          />
        </div>
      </div>
    </>
  );
}

export default App;
