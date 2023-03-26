import React, { useState, } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Alert} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import { MyColors } from '../colors';
import ProfileTabComponent from './profile';
import ArticleComponent from './Articles/articles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHomeUser, faPeopleCarry, faPeopleGroup, faPeopleRoof, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Drawer = createDrawerNavigator();


const MainComponent = ({ navigation, route }: any) => {
    
    return (
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props}/>} screenOptions={{
        headerShadowVisible: true,
        headerTintColor: MyColors.niceOrange,
        headerTitleStyle: {
          fontSize: 23,
          fontWeight: '700',
        },
        drawerLabelStyle: {
          ...styles.drawerScreenContainer
        }
      }} >
        <Drawer.Screen name='Articles' component={ArticleComponent}  options={{
          headerTitle: 'All articles',
          headerTitleAlign: 'center',
          drawerIcon: (props) =>  <FontAwesomeIcon icon={faPeopleRoof} color={"#b10000"} size={25} />,  
              }} />
        <Drawer.Screen name='MyApp' component={ProfileTabComponent} initialParams={route} options={{
          headerShown: false,
          drawerLabel: 'My profile',
          drawerIcon: (props) => <FontAwesomeIcon icon={faHomeUser} color={"#b10000"} size={20} />,
        }} />
        </Drawer.Navigator>
    );
}

function CustomDrawerContent(props: any) {
 
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem icon={(props)=>singOutIcon} label="Sign out" labelStyle={styles.AlertContainer} onPress={() =>Alert.alert(
      'You sure?',
      'You want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log out',
          onPress:()=> props.navigation.navigate('Login'),
        }
      ],
        {
          cancelable: false,
          
        },

      )}/>
    </DrawerContentScrollView>
  );
}

const singOutIcon = <FontAwesomeIcon icon={faRightFromBracket} size={25} color={"#b10000"} />;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: MyColors.white,
      padding: 20,
  },
  drawerScreenContainer: {
    fontSize: 20,
    fontWeight: 'bold',
    color:MyColors.niceOrange,
  },
  AlertContainer: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  }
  
  });

export default MainComponent;
