import React from "react";
import Header from "./header";
import "../styles/Template.css"; 

const Template = ({ children }) => {
  return (
    <div className="template-container">
      <Header />
      <main className="template-content">{children}</main>
    </div>
  );
};

export default Template;
