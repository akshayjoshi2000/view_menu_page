import { StyleSheet, View } from 'react-native';
import GetImages from './screens/GetImages';
import Demo from './screens/Demo';
import React, { useEffect } from "react";
import Home from './Home';
import Contact from './screens/Contact';
import AboutUsPage from './screens/AboutUsPage';
import PrivacyPolicy from './screens/PrivacyPolicy';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './global.css'; // Import the global CSS file
import ReactDOM from "react-dom/client";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);



export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/view" element={<GetImages />} />
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