import { StyleSheet, View } from 'react-native';
import GetImages from './screens/GetImages';
import React, { useEffect } from "react";
import Home from './Home';
import AdsTxt from './ads.txt';
import Contact from './screens/Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './global.css'; // Import the global CSS file
import ReactDOM from "react-dom/client";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);



export default function App() {

  return (
    <Router>
      <Routes>
       <Route path="/contact" element={<Contact />} />
        <Route path="/view" element={<GetImages />} />
        <Route path="/ads.txt" element={<AdsTxt />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    overscrollBehavior: 'none',
    maxHeight: '100vh'
  },
});