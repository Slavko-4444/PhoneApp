import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import NewArticleDTO from '../../../DTO/articles types/new.article.dto';


const AddSingleArticle = (props: any) => {

    const { title, excerpt, description, status } = props.a;
    return (
        <ScrollView style={styles.container}>
            <View style={styles.titleContainer}>
                <TextInput style={styles.inputContainer} label={"Insert your post title"} value={title} onChangeText={(value)=>props.onChange('title', value)} />
            </View>
            <View style={styles.titleContainer}>
                <TextInput style={styles.inputContainer} label={"Short inforamations"} value={excerpt} onChangeText={(value)=>props.onChange('excerpt', value)} />
            </View>
            <View style={styles.titleContainer}>
            <TextInput
                        label={'Detail description'}
                        multiline={true}
                        numberOfLines={10}
                        onChangeText={text => props.onChange('description', text)}
                        value={description}
                    />
            </View>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 15,
    },
    titleContainer: {
        marginVertical: 10,
    },
    inputContainer: {
        height: 60,
        fontSize: 18,
    }
})

export default AddSingleArticle;