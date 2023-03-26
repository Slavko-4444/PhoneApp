import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button} from 'react-native';
import { MyColors } from '../../colors';

const MyProfileComponent = ({navigation, route}: any) => {

    const [data, setData] = useState({
        Id: 0,
        identity: ''
    })
    console.log("Nasli smo ih ", route.params.params.params)
    if (route !== undefined)
    
    useEffect(() => {
        setData({...route.params.params.params})
    }, [route])
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          
            <Text>My Profile:{data.Id}</Text>
            <Text>My : {data.identity}</Text>
        </View>
    );
}

export default MyProfileComponent;