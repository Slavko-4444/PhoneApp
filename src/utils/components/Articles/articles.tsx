import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView, ActivityIndicator, TouchableOpacity} from 'react-native';
import ReceivedArticleDto from '../../../DTO/articles types/received.one.article.dto';
import { MyColors } from '../../colors';
import ArticleBox from './article.box';
import api, {ApiResponse} from '../../../api/api';
import { IconButton, TextInput } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight, faQuoteRightAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { RefreshControl } from 'react-native-gesture-handler';






const ArticleComponent = ({ navigation }: any) => {
    

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [articles, setArticles] = useState<ReceivedArticleDto[]>([]);
    const [searchText, setSearchText] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        articleAPICall();
    },[])


    const articleAPICall = () => {
            api('/api/articles', 'get', {})
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
                            setLoading(false);
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
                        setLoading(false)
                        }
            })
            

    }

    const articlePosting = (arts: ReceivedArticleDto[]) => {
    
        return (
            <>
                {
                    arts.map((article, index) => {
                        return (     
                            <TouchableOpacity key={index} onPress={()=> navigation.navigate('UsersArticle', {data: article})}>
                                <ArticleBox data={article} key={index} />
                            </TouchableOpacity>
                        )
                    })
                }
            </>
        );
    }

    const handleSearch = () => {
        
        setLoading(true);
        api('/api/articles/search/specArticles', 'post', { keywords: searchText })
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
                        setLoading(false)
                      console.log(errorMessage)
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
                    setLoading(false)
                }
                
        })

    }

    async function handleRefresh() {
            setRefreshing(true);
            await articleAPICall();
            setRefreshing(false);
          
        }

    const ScrollArticles = () => {
        return (
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
                { articlePosting(articles) } 
            </ScrollView>
        );
    }

    const AlerComponent = () => {
        return (
            <View style={{ backgroundColor:MyColors.appleCore, marginVertical: 15, marginRight: 170}}>
                <Text style={{fontSize: 22, color: MyColors.fancyBlack, fontWeight: '500'}}>{errorMessage} found</Text>
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

    return (
        <View style={{ ...styles.ArticleMainView }}>
            
            <View style={{ flexDirection: 'row' }}>
            <View style={{flex:4, width: '100%'}}>
                <TextInput  label="Search" focusable={true} mode='outlined' value={searchText} onChangeText={text=>setSearchText(text)} left={<TextInput.Icon icon={() => <FontAwesomeIcon icon={faSearch} size={15} color={MyColors.brutalBlue} />} />}
                    style={styles.serchInput} textColor={MyColors.fancyBlack} />
            </View>
            <IconButton onPress={handleSearch} style={{flex: 1,  backgroundColor:MyColors.fancyRed}} icon={() => <FontAwesomeIcon icon={faArrowRight} color={MyColors.softWhite} size={20} />} />
            </View>
            <Text style={{fontSize: 21, fontWeight: '700', color: MyColors.fancyBlack, marginVertical: 15}}>Articles :</Text>
            {(errorMessage !== '')?<AlerComponent/>:(loading || articles.length === 0)?<LoadingCompnent/>: <ScrollArticles />}
        </View>
    ); 
}




const styles = StyleSheet.create({
    ArticleMainView: {
        flex: 1,
        padding: 10,
        
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
    serchInput: {
          
      }
      
});
export default ArticleComponent;