import Geolocation from "@react-native-community/geolocation";
import { useEffect, useState,useContext } from "react";
import {  Alert, Dimensions, PermissionsAndroid, Platform, StyleSheet, Text, TextInput, Linking, SafeAreaView } from "react-native";
import { View } from "react-native";
import MapView, { Callout, Circle, LatLng, Marker, Point } from 'react-native-maps';
import { Button } from "react-native-paper";
import { PERMISSIONS, PermissionStatus, check, } from "react-native-permissions";
import { MyColors } from "../../colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationCrosshairs, faUser, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { VariableContext } from "../Registration/registration";


const { width, height } = Dimensions.get('window');

const MapComponent = ({navigation, route}: any) => {
  
  const [userGpsButton, setUserGpsButton] = useState(false);     
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.78928,
    longitude: -122.4324
  });
  const [userSLocation, setUserSLocation] = useState<LatLng>({
    latitude: 37.78928,
    longitude: -122.4324
  });
  

  useEffect(() => { 
    setUserLocation(route.params);
    setUserSLocation(route.params);
  }, [])

  function handleGPS1() {
    navigation.navigate('Registration', userLocation )
  }

  function handleGPS() {

    setUserGpsButton(false)

      Geolocation.getCurrentPosition(
        (info) => {    
        setUserGpsButton(true)
        setUserLocation({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude
        })
      },
      (error) => {
      // Obavijesti korisnika da uključi GPS
     Alert.alert(
            'Turn on GPS',
            'To find your coordintates you should turn on GPS', 
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Confirm',
                onPress: () => {
                  handleGPS();
                },
              }
            ],
              {
                cancelable: true,
                
              },
      
            )
    }, 
    );
  }

  
  const handleMapLongPress = (e: { nativeEvent: { coordinate: LatLng } }) => {
    const { coordinate } = e.nativeEvent;
    setUserLocation(coordinate);
  }
  
    return (  
      <SafeAreaView style={styles.container}>
         <View style={styles.container}>

<MapView
  showsUserLocation={userGpsButton}
  showsTraffic={true}
  loadingEnabled={true}
  style={styles.map}
  region={{
    latitude: userSLocation.latitude,
    longitude: userSLocation.longitude,
    latitudeDelta: 0.085,
    longitudeDelta: 0.0121,
  }}
  
  onLongPress={(e)=> handleMapLongPress(e)}
> 
  <Marker draggable={true} pinColor={MyColors.brightBlue} coordinate={userLocation}
    onDragEnd={(e) => {
      setUserLocation({
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      })
    }}
    
  >
    <Callout>
      <Text style={{fontWeight: 'bold'}}>
        I'm here
      </Text>
    </Callout>
  </Marker>
  <Circle
    center={{
   ...userLocation
    }}
    radius={200}
  />
</MapView>

<Button onPress={handleGPS} style={styles.ButtonGPS} icon={()=> <FontAwesomeIcon style={{marginLeft: 10}} size={40}  color={MyColors.brightBlue} icon={faLocationCrosshairs}/>}> </Button>
<Button onPress={handleGPS1} style={styles.ButtonGPS1} icon={()=> <FontAwesomeIcon style={{marginLeft: 15}} size={30}  color={MyColors.brightBlue} icon={faUser}/>}> </Button>
</View>
     </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: height,
    width: width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,

  },
  ButtonGPS: {
    position: 'absolute',
    bottom: 100,
    right: 25,
    backgroundColor: MyColors.white,
    height: 68,
    width: 68,
    padding: 12,
  },
  ButtonGPS1: {
    position: 'absolute',
    top: 10,
    left: 15,
    backgroundColor: MyColors.white,
    height: 55,
    width: 55,
    padding: 12,
  }
 });

export default MapComponent;