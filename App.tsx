import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, FlatList, SectionList, Button, StatusBar, Alert, Image} from 'react-native';
import { MyColors } from './src/utils/colors'
import ArticleUserForDeleteBox from './src/utils/components/Articles/article.delete.user';
import ArticleUserBox from './src/utils/components/Articles/article.user';
import LoginComponent  from './src/utils/components/login';
import MainComponent from './src/utils/components/main';
import RegistrationComponent from './src/utils/components/Registration/registration';
import AdminPageComponent from './src/utils/components/Administrator/admin.page';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconButton } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapComponent from './src/utils/components/Maps/map';
import {enableLatestRenderer} from 'react-native-maps';
import {PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import MapUsdrComponent from './src/utils/components/Maps/map.users';



enableLatestRenderer();
PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;


type RootStackParamList = {
  Login: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
 
  
  const handleBackLogin = async ({navigation}: any) => {
    let keys;
    try {

      await AsyncStorage.removeItem('api_tokenadministrator');
      await AsyncStorage.removeItem('api_refreshTokenadministrator');
      await AsyncStorage.removeItem('api_identityadministrator');
      navigation.navigate('Login')
   } catch (error) {
      console.log("Problem with deletin items from storage: ", error)  
   } 
  }

  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown:false, gestureEnabled: false}}>
        <Stack.Screen name='Login' component={LoginComponent} />
      <Stack.Screen name='Registration' component={RegistrationComponent}  />
      <Stack.Screen name='Main' component={MainComponent} />
      <Stack.Screen name='UsersArticle' component={ArticleUserBox} options={{
        headerShown: true,
        headerTitleStyle: {
          color: MyColors.gold,
          fontSize: 22,
        }
      }} />
      <Stack.Screen name='UsersArticleDelete' component={ArticleUserForDeleteBox} options={({navigation})=>({
        headerShown: true,
        headerTitleStyle: {
          color: MyColors.gold,
          fontSize: 28,
          },
        
      })} />
      <Stack.Screen name='Map' component={MapComponent} options={({navigation})=>({
        headerShown: false
      })} />
      <Stack.Screen name='MapUsers' component={MapUsdrComponent} options={({navigation})=>({
          headerShown: true,
      })} />
      <Stack.Screen name='Admin' component={AdminPageComponent} options={({navigation})=>({
          headerShown: true,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 28,
          fontWeight: 'bold',
          }, 
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#1F51FF',
          },
          headerBackVisible: false, 
          headerRight: () => (
            <View style={{ paddingRight: 5 }}> 
              <IconButton style={{ borderWidth: 3,backgroundColor:MyColors.brightBlue, borderColor: MyColors.white, width: 60, height: 50 }} onPress={() =>Alert.alert(
      'Admin page',
      'You want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log out',
          onPress:()=> handleBackLogin({ navigation }),
        }
      ],
        {
          cancelable: true,
          
        },

      )}
                icon={() => <FontAwesomeIcon icon={faHome} size={30} color={MyColors.white} />} />                  
            </View>
        ),
      })} />
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
