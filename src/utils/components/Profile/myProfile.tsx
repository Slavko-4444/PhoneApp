import { useFocusEffect } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import api, { ApiResponse, getIdentity } from '../../../api/api';
import ReceivedArticleDto from '../../../DTO/articles types/received.one.article.dto';
import { UserInfoDto } from '../../../DTO/user types/user.dto.info';
import { MyColors } from '../../colors';
import ArticleSpecBox from '../Articles/article.user.box';
import { useIsFocused } from '@react-navigation/native';

const MyProfileComponent = ({ route, navigation}: any) => {
    
    const [userInfo, setUserInfo] = useState<UserInfoDto>({} as UserInfoDto);
    const [errorMessage, setErrorMessage] = useState('');
    const { userId } = route.params.params.params;
    const [articles, setArticles] = useState<ReceivedArticleDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingSecound, setLoadingSecound] = useState(true);
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        userInfoAPI();    
    }, [])


    useEffect(() => {
        setLoadingSecound(true);
        articleInfoAPI();
    }, [])
  
    const AlerComponent = () => {
        return (
            <View style={{ backgroundColor:MyColors.appleCore, marginVertical: 15, marginRight: 170}}>
                <Text style={{fontSize: 22, color: MyColors.fancyBlack, fontWeight: '500'}}>{errorMessage}</Text>
         </View>
        );
    }
    const LoadingCompnent = () => {
        return (
            <View>
                <View style={{ padding: 30, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </View>
        )
    }


    const ArticlePosting = () => {
    
        return (
            <View style={{marginBottom: 150,}}>
                {
                    articles.map((article, index) => {
                        return (     
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('UsersArticleDelete', {data: article})}>
                                <ArticleSpecBox data={article} key={index} />
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        );
    }
    
    const PersonalInfo = () => {

        return (
            <>
             <View style={styles.ViewInfo}>
                    <Text style={styles.Info}>Name:</Text>
                    <View style={{ paddingLeft: 15, flexDirection: 'column', flex: 1, alignItems: 'flex-end' }}>
                        <Text style={styles.describeText}>{userInfo.surname} {userInfo.forename}</Text>
                    </View>
                </View>
                <View style={styles.ViewInfo}>
                    <Text style={styles.Info}> Birth date:</Text>
                    <Text style={styles.describeText}>{userInfo.userInfo.birthDate.replace(/-/g,'.')}</Text>
                </View>

                <View style={styles.ViewInfo}>
                    <Text style={styles.Info}> Address:</Text>
                    <View style={{paddingLeft:15, flexDirection: 'column', flex: 1, alignItems:'flex-end'}}>
                        <Text style={styles.describeText}>{userInfo.userInfo.address}</Text>
                    </View>
                </View>

                <View style={styles.ViewInfo}>
                    <Text style={styles.Info}> Occupation:</Text>
                    <View style={{paddingLeft:15, flexDirection: 'column', alignItems:'flex-end', flex: 1}}>
                        <Text style={styles.describeText}>{userInfo.userInfo.occupation}</Text>
                    </View>
                </View>

                <View style={styles.ViewInfo}>
                    <Text style={styles.Info}>Contact :</Text>
                    <Text style={styles.describeText}>{userInfo.phoneNumber}</Text>
                </View>

                <View style={styles.ViewInfoLast}>
                    <Text style={styles.Info}>Email :</Text>
                    <View style={{paddingLeft:15, flexDirection: 'column', alignItems:'flex-end', flex: 1}}>
                        <Text style={styles.describeText}>{userInfo.email} </Text>
                    </View>
                </View>

                <View style={{height: 4,
                                backgroundColor: 'orange',
                                marginTop: 10,
                    marginBottom: 10,
                }}/>

                <Text style={{ fontSize: 21, maxWidth: 100, borderRadius: 4, fontWeight: '700', backgroundColor: MyColors.fancyRed, color: '#ffffff', paddingHorizontal: 10, paddingVertical: 5, marginVertical: 5 }}>Articles</Text>
                {(errorMessage!='')?<AlerComponent/>:loadingSecound?<LoadingCompnent/> : <ArticlePosting/> }
            </>
        );
    }
    async function articleInfoAPI() {
        
        api(`/api/articles/specUser/articlesBy/${userId}`, 'get', {})
        .then((res: ApiResponse) => {
            
                if (res.status === 'service Error') {
                    setErrorMessage("Service error");
                    return;
                  }
            
                if (res.status === 'login Error') {
                    let message: string ='login error';
                    if (res.data.statusCode !== undefined && res.data.message !== undefined) {
                        message = res.data.message;
                        setErrorMessage(message);
                        setLoadingSecound(false);
                      return;
                    }
                }
            if (res.status === 'ok') {
                    
                    if (res.data.message !== undefined)
                    {
                        setErrorMessage(res.data.message)  
                    } else {
                        setErrorMessage('');
                        let DATA: ReceivedArticleDto[] = res.data;
                        setArticles(DATA)
                    }
                    setLoadingSecound(false)
                    }
        })
    }
    async function userInfoAPI() {
       
       await api('/api/administrator/spec/user', 'post', { userId: userId })
        .then((res: ApiResponse) => {

            if (res.status === 'service Error') {
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
                  let tempDATA: UserInfoDto = res.data;
                  setUserInfo(tempDATA);
                  setLoading(false)
            }
           
        })
    }

    // sluzi nam za refreshovanje informacija User-a...
    async function handleRefresh() {
        setRefreshing(true);
        await userInfoAPI();
        await articleInfoAPI();
        setRefreshing(false);
      
    }

    return (
        <View style={{ flex: 1, paddingHorizontal: 15,  backgroundColor: '#ffffff'  }}>
            <ScrollView style={styles.scrollContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
               {loading?<LoadingCompnent/>:<PersonalInfo/>}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: MyColors.softWhite,
    },
    describeText: {
        fontSize: 18,
        fontWeight: '500',
        color: MyColors.fancyRed,
    },
    ViewInfo: {
        marginVertical: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ViewInfoLast: {
        paddingBottom: 30,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    Info: {
        fontSize: 16,
        fontWeight: '800',
        color: MyColors.fancyBlack,
    },
});

export default MyProfileComponent;