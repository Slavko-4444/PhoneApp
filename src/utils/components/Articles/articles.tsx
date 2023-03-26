import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView, ActivityIndicator, TouchableOpacity} from 'react-native';
import ReceivedArticleDto from '../../../DTO/articles types/received.one.article.dto';
import { MyColors } from '../../colors';
import ArticleBox from './article.box';
import api, {ApiResponse} from '../../../api/api';
import ArticleUserBox  from './article.user';






const ArticleComponent = ({ navigation }: any) => {
    

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [articles, setArticles] = useState<ReceivedArticleDto[]>([]);

    useEffect(() => {
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
                      return;
                    }
                }
                if (res.status === 'ok') {
                      
                      setErrorMessage('');
                      let DATA: ReceivedArticleDto[] = res.data;
                 
                    setArticles(DATA)
                    setLoading(false)
                    }
        })
        
    },[])


    const articlePosting = (arts: ReceivedArticleDto[]) => {


        return (
            <>
                {
                    arts.map((article, index) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('UsersArticle', {data: article})}>
                                <ArticleBox data={article} key={index} />
                            </TouchableOpacity>
                        )
                    })
                }
            </>
        );
    }


    if (loading || articles.length === 0)
        return (
        <View>
            <View style={{ padding: 30, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        </View>
        )
    else 
    return (
        <View style={{...styles.ArticleMainView}}>
            <ScrollView >
                <Text>Articles :</Text>

                { articlePosting(articles) } 
              
            </ScrollView>
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
});
export default ArticleComponent;