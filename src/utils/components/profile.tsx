import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddArticleComponent from './addArticle';
import MyProfileComponent from './Profile/myProfile'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faNewspaper, faCog, faUser, faList, faPlusCircle, } from '@fortawesome/free-solid-svg-icons';
import { MyColors } from '../colors';

const Tab = createBottomTabNavigator();

const ProfileTabComponent = ({navigation, route}: any) => {

    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                position: 'absolute',
                borderTopColor: 'rgba(255, 50, 0, 1.5)',
                height: 70,
            }, 
            tabBarActiveTintColor: "#b10000",
            tabBarInactiveTintColor: "#ff8a8a",
            
        }}>
            <Tab.Screen name="Profile" initialParams={route} component={MyProfileComponent} options={{
                tabBarLabelStyle: styles.tabLabelContainer,
                tabBarLabel: (props)=> <Text style={{color: props.color, ...styles.tabLabelContainer}}>My Profile</Text>,
                tabBarIcon: (props) => (
                     <FontAwesomeIcon icon={faUser} size={20} color={props.color} />
                 ),
                headerRight: () => (
                  <View style={{ paddingRight: 20 }}> 
                        <TouchableOpacity onPressIn={()=> navigation.navigate('Articles', {screen: 'Login'})}>
                            <FontAwesomeIcon icon={faHome} size={30} color={MyColors.niceOrange} /> 
                        </TouchableOpacity>
                  </View>
              ),
        }} />
            <Tab.Screen name="AddArticle"  component={AddArticleComponent} options={{
                headerTitle: prop => <Text style={{fontWeight:'900', fontSize: 20, }}>Add your article</Text>,
                tabBarLabelStyle: styles.tabLabelContainer,
                tabBarLabel:(props) => <Text style={{color: props.color, ...styles.tabLabelContainer}}>Add</Text>,
                tabBarIcon: (props) => (
                    <FontAwesomeIcon icon={faPlusCircle} size={20} color={props.color} />
                ),
                headerRight: () => (
                    <View style={{ paddingRight: 20 }}> 
                        <TouchableOpacity onPressIn={()=> navigation.navigate('Articles', {screen: 'Login'})}>
                            <FontAwesomeIcon icon={faHome} size={30} color={MyColors.niceOrange} /> 
                        </TouchableOpacity>
                    </View>
                ),
             
                
        }} />
      </Tab.Navigator>
    );
}


const styles = StyleSheet.create({
    tabLabelContainer: {
        paddingBottom: 7,
        fontWeight: "900",
        fontSize: 12,
    },

})

export default ProfileTabComponent;