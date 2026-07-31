import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function Info() {
  return (
    <>
      <div className="main-container">
        <div className="floating-menu stats-info">
          <Link to="/">
            <Button text="" iconLeft={<ArrowLeft />} variant="outline" />
          </Link>
        </div>

        <div style={{textAlign:"center"}}>
          <div>
            <h3>Developped by</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <div>
            <h3>Credits</h3>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus soluta ut perspiciatis commodi porro harum!
            </p>
          </div>
        </div>

        <div>___</div>
      </div>
    </>
  );
}
