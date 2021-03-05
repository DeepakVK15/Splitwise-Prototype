import React from 'react';
import Main from "./Main";
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';


function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
    </Provider>
  );
}

export default App;
