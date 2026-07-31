import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function Stats() {
  return (
    <>
      <div className="main-container">
        <div className="floating-menu stats-info">
          <Link to="/">
            <Button text="" iconLeft={<ArrowLeft />} variant="outline" />
          </Link>
        </div>

        <div>
          <h1>Statistics</h1>
          <p>This is the Stats page.</p>
        </div>

        <div>
            ___
        </div>
      </div>
    </>
  );
}
