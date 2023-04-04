import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView, ActivityIndicator, TouchableOpacity, Linking} from 'react-native';
import api, { ApiResponse } from '../../../api/api';
import ReceivedArticleDto from '../../../DTO/articles types/received.one.article.dto';
import { MyColors } from '../../colors';


const ArticleUserForDeleteBox = ({navigation, route}: any) => {
    
    const { data } = route.params; 
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: data.userArticles[0].user.forename + "'s POST ",
            
        });
      }, [navigation, data.userArticles[0].user.forename]);  
      
    return (
        <View style={{...styles.ArticleMainView}}>
            <ScrollView style={styles.ArticleMainScrollView}>
                <Text style={styles.Title}>{data.title}</Text>
                <Text style={styles.Excerpt}>{data.excerpt }</Text>
                <Text style={styles.Describtion}>{ data.description } Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                
                
                <Text style={styles.Excerpt}>Detail info:</Text>

                <View style={styles.ViewInfo}>
                    <Text style={styles.Info}>Posted:</Text>
                    <Text style={styles.describeText}>{ String(data.userArticles[0].createdAt).slice(0, -8).replace(/T/g, ' ') }</Text>
                </View>
                <View style={styles.ViewInfo}>
                    <Text style={styles.Info}>Name:</Text>
                    <Text style={styles.describeText}>{data.userArticles[0].user.surname} {data.userArticles[0].user.forename}</Text>
                </View>
                <View style={styles.ViewInfo}>
                    <Text style={styles.Info}>Contact :</Text>
                    <Text style={styles.describeText}>{data.userArticles[0].user.phoneNumber}</Text>
                </View>
                <View style={styles.ViewInfoLast}>
                    <Text style={styles.Info}>Email :</Text>
                    <Text style={styles.describeText}>{data.userArticles[0].user.email}</Text>
                
                </View>
            </ScrollView>
        

        </View>
    )

}


const styles = StyleSheet.create({
    ArticleMainView: {
        flex: 1,
        paddingHorizontal: 10,
        
    },
    ArticleMainScrollView: {
        flex: 1,
        backgroundColor: MyColors.specificWhite,
        paddingHorizontal: 5,
        
    },
    Title: {
        fontSize: 20,
        fontStyle: 'italic',
        fontWeight: '700',
        color: MyColors.niceOrange,
        marginBottom: 18,
    },
    Excerpt: {
        fontSize: 18,
        fontWeight: '700',
        color: MyColors.fancyBlack,
        marginVertical: 5,
    },
    Describtion: {
        fontSize: 17,
    },
    describeText: {
        fontSize: 18,
        fontWeight: '500',
        color: MyColors.fancyRed,
    },
    ViewInfo: {
        marginVertical: 12,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ViewInfoLast: {
        paddingBottom: 90,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    Info: {
        fontSize: 16,
        fontWeight: '800',
    },

})

export default  ArticleUserForDeleteBox;