import {  faAt, faCouch, faEye, faMapLocationDot, faRightToBracket, faSackDollar, faUnlockKeyhole, faUser, faUserEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, {createContext, useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView,  Alert, Button as B, TouchableOpacity} from 'react-native';
import { MyColors } from '../../colors';
import { TextInput, Button,  } from 'react-native-paper';
import api, {ApiResponse} from '../../../api/api';
import { UserRegistrationDto } from '../../../DTO/login types/registration.dto';
import { ScrollView } from 'react-native-gesture-handler';
import PhoneInput from 'react-native-phone-number-input';
import DatePicker from 'react-native-date-picker';
import MapComponent from '../Maps/map';
import { LatLng } from 'react-native-maps';


type VariableContextType = {
  uLocation: LatLng;
  setuLocation: (value: LatLng) => void;
};

export const VariableContext = createContext<VariableContextType>({
  uLocation: {
    latitude: 37.78928,
    longitude: -122.4324
  },
  setuLocation: () => {},
});

const RegistrationComponent =({ navigation, route }: any) => {
  const [colorLine, setColorLine] = useState(MyColors.brutalBlue);
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState<UserRegistrationDto>({contact:'email'} as UserRegistrationDto)
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(new Date());

  const [uLocation, setuLocation] = useState<LatLng>({
    latitude: 37.78928,
    longitude: -122.4324
  });

  useEffect(() => {
    console.log("Uso", route.params);
    if (route.params) {
      setuLocation(route.params);
    }
  },[route.params])
 
  const doRegistration = () => {

    data.address = String(uLocation.latitude) + " " + String(uLocation.longitude);
    
    api('/auth/Admin/user/registration', 'post', data)
      .then((res: ApiResponse) => {
        console.log("Res", res);

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
          "Have a fun",
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

  const handleMapPress = () => {
    
    navigation.navigate('Map',uLocation);
  }

 
  const DateComponent = () => {

        
    return (
        <View style={{marginVertical: 15,}}>
          <B title="Insert birth date" onPress={() => setOpen(true)} />
          <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={(date) => {
                setOpen(false)
                setDate(date)
                setData({...data,birthDate: formatDateForMySQL(date)})
          }}
          
          onCancel={() => {
                setOpen(false)
            }}
            />
        </View>
    )
}

  return (
    <View style={styles.container}>

      <VariableContext.Provider value={{
        uLocation: uLocation, setuLocation(value) {
        setuLocation(value);
      },
      }} />
      
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
        <TextInput label="Password" value={data.password} onChangeText={text=>setData({...data, password: text})} left={<TextInput.Icon icon={() => <FontAwesomeIcon icon={faUnlockKeyhole} size={15} color={MyColors.brutalBlue} />} />} style={styles.EmailContainer} textColor={MyColors.fancyBlack}
              right={<TextInput.Icon icon={(prop) =><FontAwesomeIcon icon={faEye} color={MyColors.brutalBlue}/> } />}/>
        
        <View style={{ borderBottomWidth: 2, borderBottomColor: colorLine }}> 
            <PhoneInput value={data.phoneNumber}  onChangeFormattedText={(text)=> {setColorLine(MyColors.myGreen); return setData({...data, phoneNumber: text})}} defaultCode='ME'/>
        </View>
            
        <DateComponent/>  
        <TextInput label="Occupation"  value={data.occupation} onChangeText={text=>setData({...data, occupation: text})} left={<TextInput.Icon icon={() => <FontAwesomeIcon icon={faSackDollar} size={18} color={ MyColors.brutalBlue } />}/>}  right={<TextInput.Affix text="/100" />} style={styles.EmailContainer} textColor={MyColors.fancyBlack} />
        
        <TouchableOpacity onPress={handleMapPress}>
            <View style={styles.mapContainer}>
                <FontAwesomeIcon style={styles.mapContainer} icon={faMapLocationDot} size={40} color={MyColors.myGreen} />      
            </View>      
        </TouchableOpacity>
        
        <View style={{ display: (errorMessage != '') ? 'flex' : 'none', ...styles.ViewError }}>
            <Text style={styles.ErrorMessageAlert}>{errorMessage}</Text>  
        </View>    
        </View>
  
      
          <View style={styles.BottomContainer} >
            <Button onPress={()=> navigation.goBack()} contentStyle={{ flexDirection: 'row-reverse'}} icon={() => <FontAwesomeIcon icon={faRightToBracket} size={20} color={MyColors.gold} />}  mode="contained" buttonColor={MyColors.brutalBlue}><Text style={{fontWeight:'800'}}>Go to log in</Text></Button>
            <Button onPress={doRegistration} contentStyle={{ flexDirection: 'row-reverse' }} icon={() => <FontAwesomeIcon icon={faUserPlus} size={20} color={MyColors.fancyRed} />}  mode="contained" buttonColor={MyColors.brutalBlue}><Text style={{fontWeight:'800'}}>Sign up</Text></Button>
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
  mapContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MyColors.brightBlue,
    marginHorizontal: 100,
    height: 80,
    borderWidth: 2,
    borderColor: MyColors.niceRed,
    borderRadius: 25,
  }
});
  
function formatDateForMySQL(date: Date) {
  // pretvori date u string u formatu: yyyy-mm-dd hh:mm:ss
  const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');

  return formattedDate.substr(0, 10);
}

export default RegistrationComponent;