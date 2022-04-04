import * as React from "react";
import "./header.styles.scss";

interface HeaderProps {
  displayName: string | null;
}

const Header: React.FC<HeaderProps> = ({ displayName }) => {
  return (
    <div className="header-container">
      <h1 className="header-text">{`Hello, ${displayName}`}</h1>
    </div>
  );
};

export default Header;
