import React,{ useState,useContext } from 'react';
import { TouchableOpacity,StyleSheet,View,Image,Dimensions,Text,Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {CheckBox} from 'react-native-elements';
import mUtils from '../../../common/utils';
import mConst from '../../../common/constants';
import cBind, {callOnce} from '../../../common/navigation';
const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');
import { Modal } from "./CustomModal";

const circleCheckImage = require('../../../images/common/circle_check.png');
const circleCheckOnImage = require('../../../images/common/circle_check_on.png');

const PopImage = require('../../../images/pop_20231221.jpg');

const PopupScreen = (props) => {

    const [showPopupLayer, setShowPopLayer] = useState(false);

    const closePopUp = async() => {
        if ( showPopupLayer ) { // 더이상 안보기 클릭처리 
            let ExpireDate = new Date();
            ExpireDate = ExpireDate.setHours(ExpireDate.getHours() + 24);
            console.log("ExpireDate",ExpireDate)
            try {
                await AsyncStorage.setItem('homeVisited', ExpireDate.toString());
            } catch (e) {
                console.log(e);
            }
        }
        setTimeout(() => {
            props.setModalVisible(false)
        }, 500);
    }

    handleFindPw = callOnce(async () => {
        await Linking.openURL('https://forms.gle/NJyURQDbypmWG1fK6')
      })

    return (
        <Modal 
            isVisible={props.isModalVisible}
            setModalVisible={props.setModalVisible}
        >
            <Modal.Container>
                <Modal.Body>
                    <View style={styles.modalDataOuterWrap}>        
                        <View style={[styles.modalCommonWrap,{flex:5}]}>
                            
                            <View style={styles.modalDataWrap}>
                                <View style={styles.closeWrap}>
                                    <TouchableOpacity 
                                        onPress={()=>closePopUp()}
                                        style={{ flex:1,flexGrow:1,justifyContent:'center',alignItems:'flex-end',padding:mUtils.wScale(10)}}
                                    >
                                        <Icon
                                            name="close"
                                            size={mUtils.wScale(35)}
                                            color={'#fff'}
                                        />   
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity   onPress={()=>handleFindPw()}>
                                <Image 
                                    source={PopImage} 
                                    resizeMode={'contain'} 
                                    style={{
                                        height : '100%',
                                        aspectRatio:1,
                                        zIndex:1
                                    }} 
                                />
                                </TouchableOpacity>
                                <View style={styles.checkBoxWrap}>
                                    <View style={{flex:3,flexDirection:'row',alignItems:'center'}}>
                                        <CheckBox 
                                            containerStyle={{padding:0,margin:0}}   
                                            iconType={'FontAwesome'}
                                            checkedIcon={<Image source={circleCheckOnImage} resizeMode='contain' style={styles.checkboxIcon} />}
                                            uncheckedIcon={<Image source={circleCheckImage} resizeMode='contain' style={styles.checkboxIcon} />}
                                            checkedColor={mConst.bgBlue}                          
                                            checked={showPopupLayer}
                                            onPress={() => setShowPopLayer(!showPopupLayer)}
                                        />
                                        <Text style={styles.menuText}>24시간동안 보지 않기</Text>
                                    </View>
                                </View>
                                
                            </View>
                        </View>
                    </View> 
                    
                </Modal.Body>
            </Modal.Container>
        </Modal>
    );
}

export default PopupScreen;


const styles = StyleSheet.create({
    
    titleText : {
        color:'#555',
        fontWeight:'bold',
        fontSize: mUtils.wScale(15),
        lineHeight: mUtils.wScale(25),
    },
    checkBoxWrap : {
        position:'absolute',
        left:0,
        bottom:0,
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        paddingLeft:mUtils.wScale(100),
        height:mUtils.wScale(50),
        zIndex:999,
    },
    checkboxIcon : {
        width : mUtils.wScale(20),
        height:mUtils.wScale(20)
    },
    checkboxIcon2 : {
        width:mUtils.wScale(20),
        height:mUtils.wScale(20)
    },
    menuText : {
        color: '#fff',
        fontWeight:'bold',
        fontSize: mUtils.wScale(16)
    },
    infoText : {
        color: '#fff',
        fontSize: mUtils.wScale(16),
        lineHeight :  mUtils.wScale(22)
    },
    //modal
    closeWrap : {
        position:'absolute',
        left:0,
        top:0,
        display:'flex',
        flexDirection:'row',
        height:mUtils.wScale(45),
        width:'100%',
        paddingRight:mUtils.wScale(100),
        justifyContent:'center',
        alignItems:'flex-end',
        zIndex:999,
    },
    modalDataWrap : {
        display:'flex',
        height:'100%',
    },
    hrWrap : {
        marginVertical:10,
        marginHorizontal:20,
        borderTopColor:mConst.bgBlue,
        borderTopWidth:1
    },
    modalTopBottomWrap : {
        height:mUtils.wScale(30),
        justifyContent:'center',
        alignItems:'center'
    },
    modalDataOuterWrap : {
        minWidth:'100%',
        minHeight:SCREEN_HEIGHT*0.65,
        alignSelf:'center',
        justifyContent:'center',
        backgroundColor:'transparent'
    },
    modalCommonWrap : {
       flex:1,
    }
  });