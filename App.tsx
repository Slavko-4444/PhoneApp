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
import { TouchableOpacity } from 'react-native-gesture-handler';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconButton } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackScreenProps } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      <Stack.Screen name='Registration' component={RegistrationComponent} />
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
          fontSize: 22,
        }
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
            backgroundColor: '#f4511e',
          },
          headerBackVisible: false, 
          headerRight: () => (
            <View style={{ paddingRight: 20 }}> 
              <IconButton onPress={()=> handleBackLogin({navigation})} icon={()=>  <FontAwesomeIcon icon={faHome} size={30} color={MyColors.niceOrange} /> }/>                  
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
