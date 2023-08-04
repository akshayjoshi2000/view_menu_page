import { StyleSheet, View } from 'react-native';
import GetImages from './screens/GetImages';

export default function App() {
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