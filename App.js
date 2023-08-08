import { StyleSheet, View } from 'react-native';
import GetImages from './screens/GetImages';
import React, { useEffect } from "react";
import Home from './Home';
import AdsTxt from './AdsTxt';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


export default function App() {
  
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6890415870609973";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <Router>
      <Routes>
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