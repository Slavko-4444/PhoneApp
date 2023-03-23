import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button} from 'react-native';
import { MyColors } from '../colors';


const RegistrationComponent = ({ navigation }: any) => {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
                <Text>Registration screen</Text>
                <Button onPress={() => {
                    navigation.navigate('Login')
                }} title="Go to login" />
                
      </SafeAreaView>
      </View>
    );
};
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: MyColors.white,
      padding: 20,
    },
  });
  
export default RegistrationComponent;