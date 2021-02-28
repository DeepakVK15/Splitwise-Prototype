import React from 'react';
import Main from "./Main";
import './App.css';
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;
