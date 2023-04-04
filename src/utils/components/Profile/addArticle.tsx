import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import api, { ApiResponse } from '../../../api/api';
import { UserInfoDto } from '../../../DTO/user types/user.dto.info';
import { MyColors } from '../../colors';
import DatePicker from 'react-native-date-picker'
import PhoneInput from 'react-native-phone-number-input';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane, faShareFromSquare } from '@fortawesome/free-solid-svg-icons';
import { UserUpdateDTO } from '../../../DTO/user types/user.update.dto';
import NewArticleDTO from '../../../DTO/articles types/new.article.dto';
import AddSingleArticle from './add.single.article';

type ArticleKey = keyof NewArticleDTO;
type ChangeEventHandler  = (
    key: ArticleKey,
    value: string
  ) => void;

const AddArticleComponent = ({navigation, route}: any) => {
    
    const [uInfo, setuInfo] = useState<UserInfoDto>({} as UserInfoDto);
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const { userId } = route.params.params.params;
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date());
    const [isCleared, setIsCleared] = useState(true);
    const [isSecCleared, setIsSecCleared] = useState(true);
    const [article, setArticle] = useState<NewArticleDTO>({ description: '', title: '', excerpt: '', status: 'visible' });
    const [SpecColor, setSpecColor] = useState(MyColors.myGreen);
    const [showInputs, setShowInputs] = useState(false);
    const [colorTitle, setColorTitle] = useState(MyColors.white);
    const [bkg, setBkg] = useState(MyColors.fancyRed);
    useEffect(() => {

        setLoading(true)
        api('/api/administrator/spec/user', 'post', { userId: userId })
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
                      let tempDATA: UserInfoDto = {
                          email: res.data.email,
                          forename: res.data.forename,
                          surname: res.data.surname,
                          phoneNumber: res.data.phoneNumber,
                          userId: res.data.userId,
                          userInfo: {
                            userInfoId: res.data.userInfo.userInfoId,
                            address: res.data.userInfo.address,
                            birthDate: res.data.userInfo.birthDate,
                            occupation: res.data.userInfo.occupation,
                          }
                      };
                      setuInfo(tempDATA);
                      setLoading(false)
                }
               
            })
    }, [])

    const handleAccountChange = () => {

        // api for chagning user's atributes...
        let reqData: UserUpdateDTO = {
            userId: uInfo.userId,
            surname: uInfo.surname,
            forename: uInfo.forename,
            address: uInfo.userInfo.address,
            birthDate: uInfo.userInfo.birthDate,
            occupation: uInfo.userInfo.occupation,
            email: uInfo.email,
            phoneNumber: uInfo.phoneNumber
        }
        api('/api/userInfo/changeInfo', 'patch', reqData).then((res: ApiResponse) => {   
            
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
                setErrorMessage('Successfully updated!');
                setIsCleared(false)
                const timeout =  setTimeout(() => {
                    setIsCleared(true)
                  }, 7000);
                return () => {
                      clearTimeout(timeout);
                    };
              }
        })
    }

    function handleArticleAdd() {
        
        if (article.description === '' || article.excerpt === '' || article.title === ''){
            setMessage('You have empty fields!');
                    setIsSecCleared(false);
                    setSpecColor(MyColors.fancyRed)
                    const timeout =  setTimeout(() => {
                        setIsSecCleared(true)
                        setSpecColor(MyColors.myGreen)
                        setMessage('')
                    }, 5000);
                    return () => {
                        clearTimeout(timeout);
                        };
        }
        
        api(`/api/articles/${uInfo.userId}`, 'post', article)
            .then((res: ApiResponse) => {
                console.log('Status', res.status)
                if (res.status === 'service Error') {
                    setMessage("Service error");
                    return;
                  }
                  
                  if (res.status === 'login Error')
                    if (res.data.statusCode !== undefined && res.data.message !== undefined) {
                      let message: string = res.data.message;
                      setMessage(message);
                      return;
                    }
                  // ovdje znaci da smo povezani sa serverom, da je prosla prijava i da ocekujemo token i fresh token
                if (res.status === 'ok') {
                    setMessage('Successfully post added');
                    setArticle({description:'', excerpt:'', status: '', title: ''})
                    setIsSecCleared(false);
                    const timeout =  setTimeout(() => {
                        setIsSecCleared(true)
                    }, 6000);
                    return () => {
                        clearTimeout(timeout);
                        };
                  }
        })
    }

    // dodavanje u add article komponenti...
    const handleChange:ChangeEventHandler = (key, value) => {
        const updatedArticle = { ...article, [key]: value };
        setArticle(updatedArticle);
      };

    const AlertComponent = (props: any) => {
        const { message } = props; 
        return (
            <View style={{ backgroundColor:SpecColor, borderRadius:5, marginVertical: 15, padding: 10, marginRight: 10,}}>
                <Text style={{fontSize: 22, color:'#ffffff', fontWeight: '500'}}>{message}</Text>
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


    const DateComponent = () => {

        
        return (
                <>
                <Button title="Change birth date" onPress={() => setOpen(true)} />
                <DatePicker
                    modal
                mode="date"
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    setuInfo({...uInfo, userInfo:{...uInfo.userInfo, birthDate: formatDateForMySQL(date)}})
                }}
                onCancel={() => {
                    setOpen(false)
                }}
                />
            </>
        )
    }

    function handleTitleButton() {
        console.log(showInputs)
        if (!showInputs) {
            setColorTitle(MyColors.fancyRed);
            setBkg('#ffffff');
        }
        else {
            setColorTitle('#ffffff');
            setBkg(MyColors.fancyRed);
        }
        
        setShowInputs(!showInputs)
    }
    
    return (
        <View style={{ flex: 1, paddingHorizontal: 15,  backgroundColor: '#ffffff'  }}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.changeUserContainer}>
                    {loading ? <LoadingCompnent /> :
                    <>
                        <View style={styles.ViewInfo}>
                            <Text style={styles.Info}>Forename</Text>
                            <View style={{ paddingLeft: 15, flexDirection: 'column', flex: 1, alignItems: 'flex-end' }}>
                                <TextInput style={styles.describeText} value={uInfo.forename} onChangeText={text=> setuInfo({...uInfo, forename: text}) } />
                            </View>
                        </View>

                        <View style={styles.ViewInfo}>
                            <Text style={styles.Info}>Surname</Text>
                            <View style={{ paddingLeft: 15, flexDirection: 'column', flex: 1, alignItems: 'flex-end' }}>
                                <TextInput style={styles.describeText} value={uInfo.surname} onChangeText={text=> setuInfo({...uInfo, surname: text}) } />
                            </View>
                        </View>

                        <DateComponent/>    
                          
                        <View style={styles.ViewInfo}>
                            <Text style={styles.Info}>Birth date </Text>
                            <Text style={styles.describeText}>{uInfo.userInfo.birthDate.replace(/-/g,'.')}</Text>
                        </View>

                        <View style={styles.ViewInfo}>
                            <Text style={styles.Info}>Address </Text>
                            <View style={{paddingLeft:15, flexDirection: 'column', flex: 1, alignItems:'flex-end'}}>
                                <TextInput style={styles.describeText} value={uInfo.userInfo.address} onChangeText={text=> setuInfo({...uInfo, userInfo: {...uInfo.userInfo, address:text}}) } />
                            </View>
                        </View>

                        <View style={styles.ViewInfo}>
                            <Text style={styles.Info}>Occupation</Text>
                            <View style={{paddingLeft:15, flexDirection: 'column', alignItems:'flex-end', flex: 1}}>
                                <TextInput style={styles.describeText} value={uInfo.userInfo.occupation} onChangeText={text=> setuInfo({...uInfo, userInfo: {...uInfo.userInfo, occupation:text}}) } />
                            </View>
                        </View>

                        <View style={styles.ViewInfo}>
                                <Text style={styles.Info}>Contact </Text>
                                <TextInput style={styles.describeText} value={uInfo.phoneNumber} onChangeText={text=> setuInfo({...uInfo, phoneNumber: text}) } />
                        </View>

                        <View style={styles.ViewInfoLast}>
                            <Text style={styles.Info}>Email</Text>
                            <View style={{paddingLeft:15, flexDirection: 'column', alignItems:'flex-end', flex: 1}}>
                                <TextInput style={styles.describeText} value={uInfo.email} onChangeText={text=> setuInfo({...uInfo, email: text}) } />
                            </View>
                        </View>
                            
                        <View style={{ flexDirection: 'row-reverse'}}>    
                            
                            <TouchableOpacity onPress={handleAccountChange} style={{width: 70, height:40, borderRadius:10, paddingHorizontal: 10, marginRight: 10, backgroundColor: MyColors.brightBlue, flexDirection:"row", justifyContent: 'center', alignItems: 'center'}}>
                                <FontAwesomeIcon  size={20} icon={faShareFromSquare} color={MyColors.softWhite} />
                            </TouchableOpacity>
                        </View>
                            
                        {isCleared ? null : <View style={{ flexDirection: 'row-reverse' }}><AlertComponent message={errorMessage} /></View>}
                        
                        <View style={{height: 4,
                                        backgroundColor: 'orange',
                                        marginTop: 10,
                            marginBottom: 10,
                        }} />
                        <View style={{marginBottom: 85, flexDirection: 'column', paddingHorizontal: 10,}}> 
                                <TouchableOpacity onPress={() => handleTitleButton()}>
                                    <Text style={{ fontSize: 21, borderRadius: 4, fontWeight: '700', backgroundColor: bkg, color: colorTitle, paddingHorizontal: 10, paddingVertical: 5, marginTop: 5, }}>
                                        Add an article</Text>
                                </TouchableOpacity>
                            {showInputs?<><AddSingleArticle a={article} onChange={handleChange} />
                            <View style={{ flexDirection: 'row-reverse'}}>    
                                <TouchableOpacity onPress={handleArticleAdd} style={{width: 70, height:40, borderRadius:10, backgroundColor: MyColors.brightBlue, flexDirection:"row", justifyContent: 'center', alignItems: 'center'}}>
                                    <FontAwesomeIcon  size={20} icon={faPaperPlane} color={MyColors.softWhite} />
                                </TouchableOpacity>
                            </View>
                                    {isSecCleared ? null : <View style={{ flexDirection: 'row-reverse' }}><AlertComponent message={message} /></View>}</>
                            :null}
                           
                        </View>    
                        
                        
            </>}
                </View>
            </ScrollView>
    </View>
    );
}


const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: MyColors.softWhite,
    },
    changeUserContainer: {
        flex: 1,   
    },
    describeText: {
        height: 35,
        fontSize: 15,
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
    },
})


function formatDateForMySQL(date: Date) {
    // pretvori date u string u formatu: yyyy-mm-dd hh:mm:ss
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
  
    return formattedDate.substr(0, 10);
  }
export default AddArticleComponent;