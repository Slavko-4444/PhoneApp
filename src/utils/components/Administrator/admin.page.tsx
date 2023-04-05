import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import { RefreshControl, ScrollView,  } from "react-native-gesture-handler";
import { MyColors } from "../../colors";
import { ActivityIndicator, Button } from "react-native-paper";
import api, { ApiResponse } from "../../../api/api";
import { UserInfoDto } from "../../../DTO/user types/user.dto.info";


type Props = {
    user: UserInfoDto
}

const AdminPageComponent = ({navigation, route}: any) => {

    const { admin } = route.params;
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState<UserInfoDto[]>([]);
    const [refershing, setRefreshing] = useState(false);
    useEffect(() => {
        setErrorMessage('');
        API();
    }, [])

    function API() {
        api('/api/administrator/all/users', 'get', {}, "administrator").then((res: ApiResponse) => {
            
            if (res.status === 'service Error') {
                setErrorMessage("Service error");
                return;
              }
        
            if (res.status === 'login Error') {
                let message: string ='login error';
                if (res.data.statusCode !== undefined && res.data.message !== undefined) {
                    message = res.data.message;
                    setErrorMessage(message);
                    setLoading(false)
                  console.log(errorMessage)
                }
            }
            if (res.status === 'ok') {
                if (res.data.message !== undefined)
                    setErrorMessage(res.data.message)  
                else 
                    setData(res.data);
                
                setLoading(false)
            }
        })
    }

    const deleteUser = (id: number) => {

        setErrorMessage('');
        api(`/api/administrator/user/${id}`, 'delete', {}, 'administrator').then((res: ApiResponse) => {
            if (res.status === 'service Error') {
                setErrorMessage("Service error");
                return;
              }
        
            if (res.status === 'login Error') {
                let message: string ='login error';
                if (res.data.statusCode !== undefined && res.data.message !== undefined) {
                    message = res.data.message;
                    setErrorMessage(message);
                    setLoading(false)
                  console.log(errorMessage)
                }
            }
            if (res.status === 'ok') {
                if (res.data.message !== undefined) {
                    console.log(res.data);
                }
            }
        })
    }

    const handleDeleteUser = (user : UserInfoDto) => {
        console.log("Pritisnuto")
        return Alert.alert(
            'User',
            'Delete ' + user.surname + " " + user.forename,
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Confirm',
                onPress:()=> deleteUser(user.userId),
              }
            ],
              {
                cancelable: true,
                
              },
      
            )
    }
    
    async function handleRefresh() {
        setRefreshing(true);
        await API();
        setRefreshing(false);
      
    }


    const AlerComponent = () => {
        return (
            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontSize: 25, borderRadius:4, padding:10, backgroundColor:MyColors.fancyRed, color: "#000000", fontWeight: '900'}}>{errorMessage}</Text>
         </View>
        );
    }

    const LoadingCompnent = () => {
        return (
            <View>
                <View style={{ paddingVertical: 200, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </View>
        )
    }

   
    const UserShowComponent = (props: Props) => {
        const { user } = props;   
        return (
            <TouchableOpacity onPress={()=>handleDeleteUser(user)}>
                <View style={styles.userBox}>
                    <View style={styles.ItemFirst}>
                        <Text style={{fontSize:16, ...styles.ItemText}}>Name</Text>
                        <Text style={styles.ItemText}>{user.surname} {user.forename}</Text>
                    </View>
                    <View style={styles.Item}>
                        <Text style={{fontSize:16, ...styles.ItemText}}>Birth date</Text>
                        <Text style={styles.ItemText}>{ user.userInfo.birthDate }</Text>
                    </View>
                    <View style={styles.ItemLast}>
                        <Text style={{fontSize:16, ...styles.ItemText}}>Occupation</Text>
                        <Text style={styles.ItemText}>{ user.userInfo.occupation }</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const UsersMappingComponent = () => {
        
        return (
            <>
                {
                    data.map((user,index)=> <UserShowComponent user={user} key={index}/>)
                }
            </>
        )
    }

    return (
        <ScrollView style={styles.scrollContainer} refreshControl={<RefreshControl refreshing={refershing} onRefresh={handleRefresh} />}>
                    <Text style={{fontSize: 21, fontWeight: '700', color: MyColors.fancyBlack, marginVertical: 15}}>Users </Text>
            {loading ? <LoadingCompnent /> : errorMessage != '' ? <AlerComponent /> : <UsersMappingComponent/> }
        </ScrollView>       
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        padding: 10,  
    },
    userBox: {
        height: 70,
        borderWidth: 3,
        borderRadius: 18,
        marginVertical: 8,
        borderColor: MyColors.fancyBlue,
        flexDirection: 'row',
        
    },
    Item: {
        flex: 1,
        borderLeftWidth:3,
        borderLeftColor: MyColors.fancyBlue,
        padding: 4,
        flexDirection: 'column',
    },
    ItemFirst: {
        flex: 1,
        borderRighttWidth:3,
        borderRightColor: MyColors.fancyBlue,
        padding: 4,
        justifyContent: 'flex-start',
    },
    ItemLast: {
        flex: 1,
        borderLeftWidth:3,
        borderLeftColor: MyColors.fancyBlue,
        flexDirection: 'column',
        padding: 4,
    },
    ItemText: {
        color: '#900C3F',
        fontWeight:'700',
    },
    
});

export default AdminPageComponent;