import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView, ActivityIndicator} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ReceivedArticleDto from '../../../DTO/articles types/received.one.article.dto';
import { MyColors } from '../../colors';
import ArticleUserBox from './article.user';

interface Props {
    data: ReceivedArticleDto;
}

const ArticleBox = (props: Props) => {
   
    const { data } = props;
 
    
    return (
        
            <View style={styles.ArticleBox}>
                <View style={styles.LeftSide}>
                    <Text style={{fontSize:14, fontWeight:'bold', color:MyColors.gold}}>{data.title}</Text>
                    <Text style={styles.describeText}>{data.excerpt}</Text>
                    <Text style={styles.describeText}>{data.userArticles[0].user.surname} {data.userArticles[0].user.forename}</Text>
                    <Text style={styles.describeText}>Contact : {data.userArticles[0].user.phoneNumber}</Text>
                    <Text style={styles.describeText}>email: {data.userArticles[0].user.email}</Text>
                </View>
                <View style={styles.RightSide}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>Posted:</Text>
                    <Text style={{fontSize: 14}}>{ data.userArticles[0].createdAt }</Text>
                    <Text style={{fontSize: 14}}>Location: </Text>
                    
                </View>
                
            </View>
   

            
        )

}

const styles = StyleSheet.create({
    ArticleBox: {
        height: 110,
        borderWidth: 3,
        borderRadius: 18,
        marginVertical: 8,
        borderColor: MyColors.niceOrange,
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
        borderLeftColor: MyColors.niceOrange,
        padding: 4,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    describeText: {
        fontSize: 12,
        fontWeight: '700',
    },

});

export default ArticleBox;