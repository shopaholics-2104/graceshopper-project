import React from "react";
import Navbar from "./components/Navbar";
import Routes from "./Routes";

const App = () => {
  return (
    <div className="home">
      <Navbar />

      <Routes />

      <div className="row">
        <div className="col">
          <h1 className="title">MARVELOUS COOKIES</h1>
          <p className="subtitle">The most magical cookie in the world</p>
        </div>
      </div>
    </div>
  );
};

export default App;
