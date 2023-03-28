import { faArrowAltCircleDown, faAt, faBed, faBedPulse, faBookReader, faCouch, faEthernet, faEye, faEyeSlash, faHomeUser, faMailBulk, faPlus, faRightToBracket, faUnlockKeyhole, faUser, faUserEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useRef, useState} from 'react';
import { Keyboard, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, NativeSyntheticEvent, TextInputChangeEventData, Alert, Platform, KeyboardAvoidingView, TextInputBase, Modal} from 'react-native';
import { MyColors } from '../../colors';
import { TextInput, Button } from 'react-native-paper';
import api, {ApiResponse, saveRefreshToken, saveToken} from '../../../api/api';
import { UserRegistrationDto } from '../../../DTO/login types/registration.dto';
import { ScrollView } from 'react-native-gesture-handler';
import PhoneInput from 'react-native-phone-number-input';

const RegistrationComponent =({ navigation, route }: any) => {
  const [colorLine, setColorLine] = useState(MyColors.brutalBlue);
  const [seePass, setSeePass] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState<UserRegistrationDto>({} as UserRegistrationDto)

  const doRegistration = () => {

    api('/auth/Admin/user/registration', 'post', data)
      .then((res: ApiResponse) => {
        console.log(res.data)
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
        setErrorMessage('');
        Alert.alert(
          'Successfully registrated!',
          'Your ',
          [
            {
              text: 'Log in now!',
              onPress:()=> navigation.navigate('Login'),
            }
          ],
            {
              cancelable: false,   
            },
    
          )
      }
    })

  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{flex: 1}}>
      
      <View style={styles.TitileContainer}>
        <View style={styles.BedOnSide}>
            <Text style={styles.SofaTitle}>Sofasurfing </Text>
          <FontAwesomeIcon icon={faCouch} size={50} color={MyColors.fancyRed} />
        </View>

      <Text style={styles.LoginTitle}> Make an account </Text>
    
      </View>
      <View style={styles.LoginMainContainer}>
        <TextInput label="Surname" value={data.surname} onChangeText={text => setData({ ...data, surname: text })} left={<TextInput.Icon icon={() => <FontAwesomeIcon icon={faUser} size={15} color={MyColors.brutalBlue} />} />} style={styles.EmailContainer} textColor={MyColors.fancyBlack} />
        <TextInput label="Forename" value={data.forename} onChangeText={text => setData({ ...data, forename: text })} left={<TextInput.Icon icon={() => <FontAwesomeIcon icon={faUserEdit} size={15} color={MyColors.brutalBlue} />} />}  style={styles.EmailContainer} textColor={MyColors.fancyBlack} />
        <TextInput label="Email"  value={data.email} onChangeText={text=>setData({...data, email: text})} left={<TextInput.Icon icon={() => <FontAwesomeIcon icon={faAt} size={15} color={ MyColors.brutalBlue } />}/>}  right={<TextInput.Affix text="/100" />} style={styles.EmailContainer} textColor={MyColors.fancyBlack} />
        <TextInput label="Password" value={data.password} onChangeText={text=>setData({...data, password: text})} left={<TextInput.Icon icon={() => <FontAwesomeIcon icon={faUnlockKeyhole} size={15} color={MyColors.brutalBlue} />} />} secureTextEntry={seePass} style={styles.EmailContainer} textColor={MyColors.fancyBlack}
              right={<TextInput.Icon icon={(prop) =><FontAwesomeIcon icon={faEye} color={MyColors.brutalBlue}/> } />}/>
        
        <View style={{ borderBottomWidth: 2, borderBottomColor: colorLine }}> 
            <PhoneInput value={data.phoneNumber}  onChangeFormattedText={(text)=> {setColorLine(MyColors.myGreen); return setData({...data, phoneNumber: text})}} defaultCode='ME'/>
        </View>
           
        <View style={{ display: (errorMessage != '') ? 'flex' : 'none', ...styles.ViewError }}>
            <Text style={styles.ErrorMessageAlert}>{errorMessage}</Text>  
          </View>    
        </View>
  
      
          <View style={styles.BottomContainer} >
            <Button onPress={()=> navigation.goBack()} contentStyle={{ flexDirection: 'row-reverse'}} icon={() => <FontAwesomeIcon icon={faRightToBracket} size={20} color={MyColors.fancyBlack} />}  mode="contained" buttonColor={MyColors.fancyBlue}><Text style={{fontWeight:'800'}}>Go to log in</Text></Button>
            <Button onPress={doRegistration} contentStyle={{ flexDirection: 'row-reverse' }} icon={() => <FontAwesomeIcon icon={faUserPlus} size={20} color={MyColors.fancyBlack} />}  mode="contained" buttonColor={MyColors.fancyBlue}><Text style={{fontWeight:'800'}}>Sign up</Text></Button>
          </View>   
      </ScrollView>
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
    flex: 3,
  },
  BottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 30,
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
    marginBottom: 20,
    fontSize: 18,
    fontWeight: '700',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  ViewError: {
    alignSelf: 'center',
    height: 40,
    width: 300,
    marginVertical: 10,
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
  containerKey: {
    flex: 1,
  },
  
});
  
export default RegistrationComponent;