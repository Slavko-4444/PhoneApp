import Geolocation from "@react-native-community/geolocation";
import { useEffect, useState,useContext } from "react";
import {  Alert, Dimensions, PermissionsAndroid, Platform, StyleSheet, Text, SafeAreaView, FlatList, FlatListProps } from "react-native";
import { View } from "react-native";
import MapView, { Callout, Circle, LatLng, Marker, Point } from 'react-native-maps';
import { Button, TextInput } from "react-native-paper";
import { PERMISSIONS, PermissionStatus, check, } from "react-native-permissions";
import { MyColors } from "../../colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationCrosshairs, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import api, { ApiResponse } from "../../../api/api";
import axios from "axios";


type InfoLocations = {
    locations: LatLng;
    user: String;
}
type InfoData = {
    address: String;
    surname: String;
    forename: String;
}


const { width, height } = Dimensions.get('window');

const MapUsdrComponent = ({navigation, route}: any) => {
  
  const [userGpsButton, setUserGpsButton] = useState(false);   
  const [searchText, setSearchText] = useState('');
  const [ filteredData, setFilteredData ] = useState<InfoLocations[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState({
        latitude: 37.78928,
        longitude: -122.4324
  })
  const [infoUsers, setInfoUsers] = useState<InfoLocations[]>([]);
  const [searchedCoordinates, setSeachedCoordinates] = useState<LatLng>({
    latitude: 37.78928,
    longitude: -122.4324
  });
  
  
  useEffect(() => { 
        setIsLoaded(false);
      api('/api/userInfo/', 'get', {})
          .then((res: ApiResponse) => {
        
              
                
                if (res.status === 'service Error') {
                    console.log("Service error");
                    return;
                }
                
            
                if (res.status === 'login Error') {
                    let message: string ='login error';
                    if (res.data.statusCode !== undefined && res.data.message !== undefined) {
                        message = res.data.message;
                        console.log(message);
                    return;
                    }
                }
            if (res.status === 'ok') {
                    
                let DATA: InfoData[] = [];
                
                res.data.map((e: InfoData) => {
                    
                    DATA.push({
                        address: e.address,
                        surname: e.surname,
                        forename: e.forename
                    })    
                });
                let location: LatLng;
                let User: String;
                let uSL: InfoLocations[]=[];
                DATA.map((e,index) => {
                    
                    const [x, y] = e.address.split(' ').map(parseFloat);
                    location = {
                        latitude: x,
                        longitude: y
                    }
                    User = e.surname + " " + e.forename;
                    const newLocation: InfoLocations = {
                        locations: location,
                        user: User,
                    } 
                    
                    // console.log("Data ", newLocation);   
                    uSL.push(newLocation);
                })
                setInfoUsers(uSL); // dodajemo novog korisnika 
                setIsLoaded(true);
            }            
          })    
}, [])


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
  
    const UserComponent = (l:InfoLocations) => {

        return (
            <>
                <Marker pinColor={MyColors.brightBlue} coordinate={l.locations}                  
                >
                    <Callout>
                    <Text style={{fontWeight: 'bold'}}>
                        {l.user!=''?l.user:"I'm here"}
                    </Text>
                    </Callout>
                </Marker>
                <Circle
                    center={{
                ...l.locations
                    }}
                    radius={200}
                />
            </>
        );
    }
    
  const handleSearchChange = () => {
    setFilteredData([]);
    
    let usersNames: InfoLocations[] = infoUsers.filter((value: InfoLocations, index) => {
      let t;
      if (searchText.length != 0)
         return value.user.toLocaleLowerCase().includes(searchText.toLocaleLowerCase());
      else
        return false;
    })
    setFilteredData(usersNames);
  } 

  const renderItem = (item: InfoLocations) => (
    <Text onPress={()=>{setSeachedCoordinates(item.locations)}} style={styles.ItemsContainer}>{item.user}</Text>
  );
  
  

  return (  
      <SafeAreaView style={styles.container}>
          <View style={styles.container}>        
              <MapView
              showsUserLocation={userGpsButton}
              showsTraffic={true}
              loadingEnabled={true}
              style={styles.map}
              region={{
                  latitude: searchedCoordinates.latitude,
                  longitude: searchedCoordinates.longitude,
                  latitudeDelta: 0.505,
                  longitudeDelta: 0.0221,
              }}
              
              onLongPress={(e)=> handleMapLongPress(e)}
              > 
              {isLoaded?<>{infoUsers.map((e, index) => <UserComponent key={index} {...e} />) }</>: null}
        </MapView>
        <View style={{position:'absolute', top: 0, flexDirection: 'column', 
          left: width * 0.17,
        }}>
          <TextInput onSubmitEditing={handleSearchChange} label="Search Users"  mode='outlined' value={searchText} onChangeText={text=>setSearchText(text)} left={<TextInput.Icon icon={() => <FontAwesomeIcon icon={faSearch} size={15} color={MyColors.brutalBlue} />} />}
            style={{
              ...styles.SearchContainer,
              backgroundColor: searchText.length == 0 ? 'rgba(255,255,255, 0.5)' : MyColors.white,
              width: searchText.length==0?width * 0.7:width * 0.73,
            }} textColor={MyColors.fancyBlack} />
          <FlatList
            style={{
              borderBottomWidth: filteredData.length>0?3: undefined,
              borderBottomColor: filteredData.length>0?MyColors.myGreen:undefined,
              borderBottomLeftRadius: filteredData.length>0?7:undefined,
              borderBottomRightRadius: filteredData.length>0?7:undefined,
            }}
            data={filteredData.reverse()}
            keyExtractor={(item) => item.user + String(item.locations.latitude)}
            renderItem={({item}) => renderItem(item)}
            />
        </View>
        <Button onPress={handleGPS} style={styles.ButtonGPS} icon={() => <FontAwesomeIcon style={{ marginLeft: 10 }} size={40} color={MyColors.brightBlue} icon={faLocationCrosshairs} />}> </Button>
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
  SearchContainer: {
    top: 5,
    fontSize: 17,
    fontWeight: '400',
    marginBottom: 5,
  },
  ItemsContainer: {
    backgroundColor: MyColors.white,
    fontSize: 20,
    padding: 10,
    borderBottomWidth: 0.7,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopColor: MyColors.appleCore,
    
  }
  
 });

export default MapUsdrComponent;