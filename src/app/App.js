import React from "react";
import "./App.scss";

import Article from "./components/article"
import Aside from "./components/aside"
import Footer from "./components/footer"
import Navbar from "./components/navbar"

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <Article />
          <Aside />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
