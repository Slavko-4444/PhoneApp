import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, FlatList, SectionList, Button, StatusBar, Alert, Image} from 'react-native';
import { MyColors } from './src/utils/colors'
import LoginComponent  from './src/utils/components/login';
import MainComponent from './src/utils/components/main';
import RegistrationComponent from './src/utils/components/registration.';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
 
  const [shown, setShown] = useState(true);
   
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='Login' component={LoginComponent} />
      <Stack.Screen name='Registration' component={RegistrationComponent} />
      <Stack.Screen name='Main' component={MainComponent} />
    </Stack.Navigator>      
  </NavigationContainer>
   
    
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyColors.iceCold,
    padding: 20,
  },
 
});

export default App;
