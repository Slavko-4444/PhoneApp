import { faArrowAltCircleDown, faAt, faBed, faBedPulse, faBookReader, faCouch, faEthernet, faEye, faEyeSlash, faMailBulk, faRightToBracket, faScrewdriverWrench, faUnlockKeyhole, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, NativeSyntheticEvent, TextInputChangeEventData, Alert, KeyboardAvoidingView} from 'react-native';
import { MyColors } from '../colors';
import { TextInput, Button } from 'react-native-paper';
import api, {ApiResponse, getIdentity, getToken, saveIdentity, saveRefreshToken, saveToken} from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';



const LoginComponent = ({ navigation, route }: any) => {
  
  const [seePass, setSeePass] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [login, setLogin] = useState(false); 
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  
    const doLogin = () => {
      if (data.email == '' || data.password === '')
        return setErrorMessage('Emtpy field')
      
    api('/auth/Admin/login/user', 'post', {
      email: data.email,
      password: data.password
    }).then(async (res: ApiResponse) => {
    
      if (res.status === 'service Error') {
        console.log("Service error ")
        setErrorMessage("Service error");
        return;
      }

      if (res.status === 'login Error')
        if (res.data.statusCode !== undefined && res.data.message !== undefined) {
          let message: string = res.data.message;
          setErrorMessage(message);
          return;
        }
      // ovdje znaci da smo povezani sa serverom, da je prosla prijava i da ocekujemo token i fresh token
      if (res.status === 'ok') {
        saveToken(res.data.token, "user");
        saveRefreshToken(res.data.refreshToken, 'user');
        saveIdentity(res.data.identity, "user");
        setLogin(true);
        setErrorMessage('');
      }
      navigation.navigate('Main', { userId: res.data.Id });
      setData({
        email: '',
        password: ''
      });
    })

  }

  const doAdminLogIn = () => {

      if (data.email == '' || data.password === '')
        return setErrorMessage('Emtpy field')
      
    api('/auth/Admin/login/admin', 'post', {
      username: data.email,
      password: data.password
    }).then(async (res: ApiResponse) => {
    
      if (res.status === 'service Error') {
        console.log("Service error ")
        setErrorMessage("Service error");
        return;
      }

      if (res.status === 'login Error')
        if (res.data.statusCode !== undefined && res.data.message !== undefined) {
          let message: string = res.data.message;
          setErrorMessage(message);
          return;
        }
      // ovdje znaci da smo povezani sa serverom, da je prosla prijava i da ocekujemo token i fresh token
      if (res.status === 'ok') {
        saveToken(res.data.token, "administrator");
        saveRefreshToken(res.data.refreshToken, 'administrator');
        saveIdentity(res.data.identity, "administrator");
        setLogin(true);
        setErrorMessage('');

      }
      navigation.navigate('Admin', { admin: res.data});
      setData({
        email: '',
        password: ''
      });
    })

  }

  return (
    <View style={{flex:1, backgroundColor: MyColors.softWhite}}>
      <ScrollView style={styles.container}>
          <View style={styles.TitileContainer}>
            <View style={styles.BedOnSide}>
                <Text style={styles.SofaTitle}>Sofasurfing </Text>
              <FontAwesomeIcon icon={faCouch} size={50} color={MyColors.fancyRed} />
            </View>

          <Text style={styles.LoginTitle}> LOGIN </Text>
        
          </View>
          <View style={styles.LoginMainContainer}>
            <TextInput label="Email"  value={data.email} onChangeText={text=>setData({...data, email: text})} left={<TextInput.Icon icon={() => <FontAwesomeIcon icon={faAt} size={15} color={ MyColors.niceOrange } />}/>}  right={<TextInput.Affix text="/100" />} style={styles.EmailContainer} textColor={MyColors.fancyBlack} />
            <TextInput label="Password" value={data.password} onChangeText={text=>setData({...data, password: text})} left={<TextInput.Icon icon={() => <FontAwesomeIcon icon={faUnlockKeyhole} size={15} color={MyColors.niceOrange} />} />} secureTextEntry={!seePass} style={styles.EmailContainer} textColor={MyColors.fancyBlack}
              right={
                <TextInput.Icon icon={(prop) =>
                  <TouchableOpacity onPress={()=>setSeePass(!seePass)}>
                    <FontAwesomeIcon icon={faEye} color={MyColors.fancyRed} />
                  </TouchableOpacity>
                } />
              }
          />
         <View style={{ display: (errorMessage!='') ? 'flex' : 'none' ,...styles.ViewError}}>
            <Text style={styles.ErrorMessageAlert}>{errorMessage}</Text>  
          </View>    
        </View>

        <View style= {styles.BottomContainer}>
            <Button onPress={doLogin} contentStyle={{ flexDirection: 'row-reverse'}} icon={() => <FontAwesomeIcon icon={faRightToBracket} size={20} color={MyColors.white} />}  mode="contained" buttonColor={MyColors.fancyRed}><Text style={{fontWeight:'800'}}>Log in</Text></Button>
          <Button onPress={() => navigation.navigate('Registration',
            {
              latitude: 37.78928,
              longitude: -122.4324
            })}
            contentStyle={{ flexDirection: 'row-reverse' }} icon={() => <FontAwesomeIcon icon={faUserPlus} size={20} color={MyColors.white} />} mode="contained" buttonColor={MyColors.fancyRed}><Text style={{ fontWeight: '800' }}>Sign up</Text></Button>
        </View>     
        <Button onPress={doAdminLogIn} contentStyle={{ flexDirection: 'row-reverse' }} icon={() => <FontAwesomeIcon icon={faScrewdriverWrench} size={20} color={MyColors.white} />} mode="contained" buttonColor={MyColors.brutalBlue}><Text style={{ fontWeight: '800' }}>Admin</Text></Button>
           
      </ScrollView>
     
    </View>
    );
};

const styles = StyleSheet.create({
 
    container: {
      flexGrow: 1,
      marginHorizontal: 10,
      backgroundColor: MyColors.softWhite,
    },
  TitileContainer: {
      paddingTop: 55,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 30,

    },
    LoginMainContainer: {
      marginVertical: 25,
    },
    BottomContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      paddingVertical: 10,
      marginVertical: 18,
    },
    LoginTitle: {
      fontSize: 28,
      fontWeight: '900',
      color: MyColors.fancyBlack,
      letterSpacing: 3,

    },
    SofaTitle: {
      fontSize: 34,
      fontWeight: '900',
      color: MyColors.niceOrange,
      fontStyle: 'italic',
    },
    BedOnSide: {
      flexDirection: 'row',
    },
  EmailContainer: {
      marginTop: 15,
      marginBottom: 30,
      fontSize: 18,
      fontWeight: '700',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
    },
    ViewError: {
      borderWidth: 3,
      alignSelf: 'center',
      height: 40,
      width: 300,
      borderColor: "#ff0000",
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: '#ff0000',
      borderRadius: 14,
    },
    ErrorMessageAlert: {
      color: MyColors.white,
      fontSize: 16,
      lineHeight: 30,
      fontWeight: 'bold',
      height: 30,
    },

  });
  
export default LoginComponent;