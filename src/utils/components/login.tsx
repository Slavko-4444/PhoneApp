import { faArrowAltCircleDown, faAt, faBed, faBedPulse, faBookReader, faCouch, faEthernet, faEye, faEyeSlash, faMailBulk, faRightToBracket, faUnlockKeyhole, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import { MyColors } from '../colors';
import { TextInput, Button } from 'react-native-paper';


const LoginComponent = ({ navigation }: any) => {

  const [seePass, setSeePass] = useState(false);


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
            <TextInput label="Email"  value='asdfsda' left={<TextInput.Icon icon={() => <FontAwesomeIcon icon={faAt} size={15} color={ MyColors.niceOrange } />}/>}  right={<TextInput.Affix text="/100" />} style={styles.EmailContainer} textColor={MyColors.fancyBlack} />
            <TextInput label="Password" value='asdf' left={<TextInput.Icon icon={() => <FontAwesomeIcon icon={faUnlockKeyhole} size={15} color={MyColors.niceOrange} />} />} secureTextEntry={seePass} style={styles.EmailContainer} textColor={MyColors.fancyBlack}
              right={
                <TextInput.Icon icon={(prop) =>
                  <TouchableOpacity onPress={()=>setSeePass(!seePass)}>
                    <FontAwesomeIcon icon={faEye} color={MyColors.fancyRed} />
                  </TouchableOpacity>
                } />
              }
            />
          </View>
          <View style={styles.BottomContainer}>
            <Button  contentStyle={{ flexDirection: 'row-reverse'}} icon={() => <FontAwesomeIcon icon={faRightToBracket} size={20} color={MyColors.fancyBlack} />}  mode="contained" buttonColor={MyColors.fancyBlue}><Text style={{fontWeight:'800'}}>Log in</Text></Button>
            <Button contentStyle={{ flexDirection: 'row-reverse' }} icon={() => <FontAwesomeIcon icon={faUserPlus} size={20} color={MyColors.fancyBlack} />}  mode="contained" buttonColor={MyColors.fancyBlue}><Text style={{fontWeight:'800'}}>Sign up</Text></Button>
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
      borderWidth: 1,
      borderColor: '#0000f0',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 10,

    },
    LoginMainContainer: {
      flex: 2,
      borderWidth: 1,
      borderColor: '#ff0000',
    },
    BottomContainer: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#00ff00',
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
      fontSize: 20,
      fontWeight: '700',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
    },


  });
  
export default LoginComponent;