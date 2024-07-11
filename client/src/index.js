import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './store';
import App from './App';
import {Provider} from "react-redux"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditNote from './components/EditNote';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
    <Routes>
    <Route path="/" element={<App/>} />
      <Route path="/notes/edit/:id" element={<EditNote/>} />

    
    </Routes>
  </Router>
    </Provider>
   
  </React.StrictMode>
);

