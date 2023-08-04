import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import GetImages from './screens/GetImages';


export default function App() {
  return (
    <View style={styles.container}>
      <GetImages />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#323035',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
