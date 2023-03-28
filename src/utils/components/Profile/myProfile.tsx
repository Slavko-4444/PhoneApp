import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button} from 'react-native';
import api, { ApiResponse } from '../../../api/api';
import { UserInfoDto } from '../../../DTO/user types/user.dto.info';
import { MyColors } from '../../colors';

const MyProfileComponent = ({navigation, route}: any) => {

    const [userInfo, setUserInfo] = useState<UserInfoDto>({} as UserInfoDto);

    const [data, setData] = useState({ ...route.params.params.params });
    useEffect(() => {
        api('/api/administrator/spec/user', 'get', data.Id)
            .then((res: ApiResponse) => {
            
        })
    }, [])
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          
            <Text>My Profile:{data.Id}</Text>
            <Text>My : {data.identity}</Text>
        </View>
    );
}

export default MyProfileComponent;