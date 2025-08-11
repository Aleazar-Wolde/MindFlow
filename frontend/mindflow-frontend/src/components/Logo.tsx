import React from "react";
import { Link } from "react-router-dom";
import wordmark from "../assets/mindflow-wordmark.png";

type Props = {
  height?: number;     // px
  to?: string;         // route to link to
  className?: string;  // extra classes
};

const Logo: React.FC<Props> = ({ height = 24, to = "/", className = "" }) => {
  return (
    <Link to={to} className={`inline-flex items-center gap-2 ${className}`}>
      <img
        src={wordmark}
        alt="MindFlow"
        style={{ height }}
        className="block select-none"
        draggable={false}
      />
    </Link>
  );
};

export default Logo;
