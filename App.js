import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import HomeNavigator from './app/navigations/HomeNavigator';


export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <HomeNavigator />
      </NavigationContainer>
      {/* <Home></Home> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    paddingTop: 30
  },
});
