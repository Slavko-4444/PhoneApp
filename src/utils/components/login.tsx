import { faArrowAltCircleDown, faAt, faBed, faBedPulse, faBookReader, faCouch, faEthernet, faEye, faEyeSlash, faMailBulk, faRightToBracket, faUnlockKeyhole, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, NativeSyntheticEvent, TextInputChangeEventData, Alert} from 'react-native';
import { MyColors } from '../colors';
import { TextInput, Button } from 'react-native-paper';
import api, {ApiResponse, saveRefreshToken, saveToken} from '../../api/api';



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
    }).then((res: ApiResponse) => {
    

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
        saveToken(res.data.token, "user")
        saveRefreshToken(res.data.refreshToken, 'user')
        setLogin(true);
        setErrorMessage('');
      }
      // sve je proslo ok...

      navigation.navigate('Main', res.data);
    })

  }

  return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.TitileContainer}>
            <View style={styles.BedOnSide}>
                <Text style={styles.SofaTitle}>Sofasurfing </Text>
              <FontAwesomeIcon icon={faCouch} size={50} color={MyColors.fancyRed} />
            </View>

          <Text style={styles.LoginTitle}> Login </Text>
        
          </View>
          <View style={styles.LoginMainContainer}>
            <TextInput label="Email"  value={data.email} onChangeText={text=>setData({...data, email: text})} left={<TextInput.Icon icon={() => <FontAwesomeIcon icon={faAt} size={15} color={ MyColors.niceOrange } />}/>}  right={<TextInput.Affix text="/100" />} style={styles.EmailContainer} textColor={MyColors.fancyBlack} />
            <TextInput label="Password" value={data.password} onChangeText={text=>setData({...data, password: text})} left={<TextInput.Icon icon={() => <FontAwesomeIcon icon={faUnlockKeyhole} size={15} color={MyColors.niceOrange} />} />} secureTextEntry={seePass} style={styles.EmailContainer} textColor={MyColors.fancyBlack}
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
          <View style={styles.BottomContainer}>
            <Button onPress={doLogin} contentStyle={{ flexDirection: 'row-reverse'}} icon={() => <FontAwesomeIcon icon={faRightToBracket} size={20} color={MyColors.fancyBlack} />}  mode="contained" buttonColor={MyColors.fancyBlue}><Text style={{fontWeight:'800'}}>Log in</Text></Button>
            <Button onPress={()=> navigation.navigate('Registration')} contentStyle={{ flexDirection: 'row-reverse' }} icon={() => <FontAwesomeIcon icon={faUserPlus} size={20} color={MyColors.fancyBlack} />}  mode="contained" buttonColor={MyColors.fancyBlue}><Text style={{fontWeight:'800'}}>Sign up</Text></Button>
          </View>
         
      </SafeAreaView>
      </View>
    );
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 10,
      backgroundColor: MyColors.softWhite,
    },
    TitileContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 10,

    },
    LoginMainContainer: {
      flex: 2,
    },
    BottomContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    LoginTitle: {
      fontSize: 30,
      fontWeight: '800',
      color: MyColors.fancyBlack,
      letterSpacing: 3,
      fontFamily: "serif",
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