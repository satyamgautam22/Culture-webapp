// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './HomePage/Homepage';
import Login from './Login/Login';
import Register from './Register/Register';
import Dashboard from './Dashboard/Dasboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />
       <Route path="/dashboard" element={

    <Dashboard />
 
} />
      </Routes>
    </Router>
  );
}

export default App;
