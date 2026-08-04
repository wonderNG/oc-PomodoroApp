import { ArrowLeft, Code, Heart, Sparkles, GraduationCap, Icon, FlaskConical } from "lucide-react";
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

        <div
          style={{
            textAlign: "center",
            maxWidth: "500px",
            margin: "0 auto",
            padding: "1rem",
          }}
        >
          {/* Developer Section */}
          <div style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
              className="info-title"
            >
              <Code size={20} /> Developed By
            </h3>
            <p>
              Built by <strong>Wonder NG</strong> as a capstone project after a
              2-week journey learning React!
              <br />
            </p>
          </div>

          {/* Credits & Special Thanks Section */}
          <div>
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
              className="info-title"
            >
              <Sparkles size={20} /> Special Thanks & Credits
            </h3>
            <p style={{ marginBottom: "1rem" }}>
              Huge appreciation to the platforms and tools that helped bring
              this app to life:
            </p>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                textAlign: "left",
                display: "inline-block",
              }}
            >
              <li
                style={{
                  marginBottom: "0.75rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                }}
              >
                <GraduationCap
                  size={18}
                  style={{ marginTop: "3px", flexShrink: 0 }}
                />
                <span>
                  <strong>freeCodeCamp</strong> : For their incredible React
                  course that built the foundation.
                </span>
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                }}
              >
                <Heart size={18} style={{ marginTop: "3px", flexShrink: 0 }} />
                <span>
                  <strong>ChatGPT, Claude & Gemini</strong> : For acting as my
                  AI pair programmers, tutors, and debugging partners along the
                  way.
                </span>
              </li>
              <br />
              <li
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                }}
              >
                <FlaskConical size={18} style={{ marginTop: "3px", flexShrink: 0 }} />
                <span>
                  <strong>Lucide Icon</strong> : For their wonderful icon library.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
