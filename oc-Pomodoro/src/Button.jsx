

const Button = ({
  text = "Button",
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  iconLeft,
  iconRight,
  onClick,
  className = "",
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`btn btn-${variant} btn-${size} ${
        fullWidth ? "btn-full" : ""
      } ${className}`}
    >
      {iconLeft && <span className="btn-icon">{iconLeft}</span>}

      <span>{text}</span>

      {iconRight && <span className="btn-icon">{iconRight}</span>}
    </button>
  );
};

export default Button;