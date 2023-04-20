import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, ActivityIndicator} from 'react-native';
import { Button } from 'react-native-paper';
import api, { ApiResponse } from '../../../api/api';
import ReceivedArticleDto from '../../../DTO/articles types/received.one.article.dto';
import { MyColors } from '../../colors';
interface Props {
    data: ReceivedArticleDto;
}

const ArticleSpecBox = (props: Props) => {
   
    const { data } = props;
    const [errorMessage, setErrorMessage] = useState('');
    const [isVisible, setIsVisible] = useState(true);
    const [isCleared, setIsCleared] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        setIsCleared(true);
    }, []) 
    
    function handleDelete() {
        api(`/api/articles/specarticle/${data.articleId}`, 'delete', {})
            .then(async (res: ApiResponse) => {
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
                      setErrorMessage('Successfully deleted!');
                      setIsVisible(false);
                      setIsCleared(false);
                      const timeout =  setTimeout(() => {
                        setIsCleared(true)
                      }, 5000);
                      
                      return () => {
                        clearTimeout(timeout);
                        };
                    }
                }

        )
       
    }


  
    const DeletedMessage = () => {
        return (
            <View style={{backgroundColor:MyColors.fancyRed, borderRadius: 3,  width:220, padding:4, marginVertical: 15}}>
                <Text style={{fontSize:18, fontWeight:'bold', color:MyColors.white}}>{errorMessage}</Text>
            </View>
        );
    }

    const ShowAritcle = () => {
        return (
               <View style={styles.ArticleBox}>
                <View style={styles.LeftSide}>
                    <Text style={{fontSize:14, fontWeight:'bold', color:MyColors.brightBlue}}>{data.title}</Text>
                    <Text style={styles.describeText}>{data.excerpt}</Text>
                    <Text style={styles.describeText}>{data.userArticles[0].user.surname} {data.userArticles[0].user.forename}</Text>
                    <Text style={styles.describeText}>Contact : {data.userArticles[0].user.phoneNumber}</Text>
                    <Text style={styles.describeText}>email: {data.userArticles[0].user.email}</Text>
                </View>
            <View style={styles.RightSide}>
                    <Button onPress={handleDelete} textColor={MyColors.white}  contentStyle={{flexDirection:'column', justifyContent:'center', alignItems:'center', width: '100%', height: '100%', backgroundColor: MyColors.fancyRed }} icon={()=><FontAwesomeIcon icon={faTrashAlt} style={{marginRight:15, marginTop:10,}} size={35} color={MyColors.white } />} >Del</Button>
                </View>   
            </View> 

        )
    }
    
    return (
        <>
            {isVisible?(errorMessage ==='')?<ShowAritcle/>:<DeletedMessage/>:isCleared?null:<DeletedMessage/>}
        </>
        )

}

const styles = StyleSheet.create({
    ArticleBox: {
        height: 120,
        borderWidth: 3,
        borderRadius: 18,
        marginVertical: 8,
        borderColor: MyColors.brightBlue,
        flexDirection: 'row',
        
    },
    LeftSide: {
        flex: 2,
        paddingLeft: 5,
        paddingTop: 3,
        
    },
    RightSide: {
        flex: 1,
        borderLeftWidth:3,
        borderLeftColor: MyColors.brightBlue,
        padding: 4,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    describeText: {
        fontSize: 12,
        fontWeight: '700',
        color: MyColors.fancyBlack
    },

});

export default ArticleSpecBox;