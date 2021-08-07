import React from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";
import Product from "./components/Products";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Product />
    </div>
  );
};

export default App;
