import { StyleSheet, View } from 'react-native';
import GetImages from './screens/GetImages';
import React, { useEffect } from "react";


export default function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6890415870609973";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <View style={styles.container}>
      <GetImages /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});