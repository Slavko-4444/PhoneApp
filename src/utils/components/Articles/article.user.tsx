import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView, ActivityIndicator, TouchableOpacity, Linking} from 'react-native';
import ReceivedArticleDto from '../../../DTO/articles types/received.one.article.dto';
import { MyColors } from '../../colors';


const ArticleUserBox = ({navigation, route}: any) => {
    
    const  { data } = route.params; 

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: data.userArticles[0].user.forename + "'s POST ",
            
        });
      }, [navigation, data.userArticles[0].user.forename]);

      type OpenSettingsButtonProps = {
        children: string;
      };
      
      const OpenSettingsButton = ({children}: OpenSettingsButtonProps) => {
        const handlePress = useCallback(async () => {
          // Open the custom settings if the app has one
          const phoneNumber = '1234567890';
          await Linking.openURL(`tel:${phoneNumber}`);
        }, []);
        return <View style={{...styles.LinkingButtton}}><Button color={MyColors.fancyRed}  title={children} onPress={handlePress} /></View>;
    };
    const OpenSMSButton = ({children}: OpenSettingsButtonProps) => {
        const handlePress = useCallback(async () => {
          // Open the custom settings if the app has one
          const phoneNumber = '1234567890';
          await Linking.openURL(`sms:${phoneNumber}`);
        }, []);
        return <View style={{...styles.LinkingButtton}}><Button color={'#0FD000'} title={children} onPress={handlePress} /></View>;
    };
    const OpenMailButton = ({children}: OpenSettingsButtonProps) => {
        const handlePress = useCallback(async () => {
          // Open the custom settings if the app has one
            const phoneNumber = 'sosicslavko8@gmail.com';
            const subject = 'Sofasurfing';
          await Linking.openURL(`mailto:${phoneNumber}?subject=${subject}`);
        }, []);
        return <View style={{...styles.LinkingButtton}}><Button title={children} onPress={handlePress} /></View>;
      };
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
        
            <View style={styles.ButtonCall}>
                <OpenSettingsButton>Call</OpenSettingsButton>
                <OpenSMSButton>SMS</OpenSMSButton>
                <OpenMailButton>Email</OpenMailButton>
            </View>

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
    ButtonCall: {
        marginBottom: 10,
        flexDirection: 'row',
    },
    LinkingButtton: {
        flex: 1,
        paddingHorizontal: 3,
        
    }
})

export default  ArticleUserBox;