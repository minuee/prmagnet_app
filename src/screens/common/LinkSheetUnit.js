import React, {PureComponent} from 'react';
import {TouchableWithoutFeedback, TouchableOpacity,Pressable, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Col, Row} from 'react-native-easy-grid';
import _ from 'lodash';

import mConst from '../../common/constants';
import mUtils from '../../common/utils';
import Text from './Text';
import SwiperUnit from './SwiperUnit';

const circleCheckImage = require('../../images/common/circle_check.png');
const circleCheckOnImage = require('../../images/common/circle_check_on.png');

export default class LinkSheetUnit extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            swiped: false,
        }
    }

    onSwipe = gesture => {
        this.setState({swiped: gesture === 'left' ? true : false});
    }

    render() {
        const {swiped} = this.state;
        const {name, phone, unitType,viewType,onPress, onPressPhone, onSwipeCheck, color, checked, readOnly,sendUser,returnUser,subData,loaningDate} = this.props;
        if ( viewType === 'sendout' ) {
            if (unitType === 'to') {
                return (
                    <>
                        <Row style={styles.row(color)}>
                            <Col style={styles.col(1, true, color, false)} size={3}>
                                <Text style={styles.sText()} numberOfLines={1}>              
                                    {mUtils.isEmpty(returnUser.user_nm) ? name :  returnUser.user_nm} 
                                    {!mUtils.isEmpty(returnUser.position) && returnUser.position}
                                </Text>
                            </Col>
                            { subData?.returncheck_yn && (
                            <Col style={styles.col(1, true, subData?.returncheck_yn ? color : mConst.white, subData?.returncheck_yn)} size={1}>
                                <FastImage source={subData?.returncheck_yn ? circleCheckOnImage : circleCheckImage} style={styles.checkImage} />
                            </Col>
                            )}
                        </Row>
                        <Pressable onPress={onPressPhone}>
                        {
                            ({pressed}) => (
                                <Row style={styles.row(pressed ? 'rgba(0, 0, 0, 0.2)' : mConst.white)}>
                                    <Text style={styles.sText(mConst.darkGray)}>
                                        {mUtils.isEmpty(sendUser.phone_no) ? phone : mUtils.phoneFormat(sendUser.phone_no)}
                                    </Text>
                                </Row>
                            )
                        }
                        </Pressable>
                    </>
                )
            }
           
            return (
                <>
                    <SwiperUnit onSwipeLeft={() => this.onSwipe('left')} onSwipeRight={() => this.onSwipe('right')}>
                        {
                            swiped || checked ? (
                            <TouchableWithoutFeedback onPress={swiped ? onSwipeCheck : null}>
                                <Row style={styles.row(color)}>
                                    <Col style={styles.col(1, true, color, checked)} size={3}>
                                        <Text style={styles.sText()} numberOfLines={1}>
                                            {mUtils.isEmpty(sendUser.user_nm) ? name :  sendUser.user_nm} 
                                            {!mUtils.isEmpty(sendUser.position) && sendUser.position}
                                            {/* {!mUtils.isEmpty(sendUser.mgzn_nm) && "("+sendUser.mgzn_nm+")"} */}
                                            
                                            { mUtils.convertUnixToDate(loaningDate) != mUtils.dateToDate(subData.return_dt) &&
                                                <Text style={styles.sText()}>
                                                    {"\n"}발송일({mUtils.dateToDate(subData.return_dt)})
                                                </Text>
                                            }
                                        </Text>
                                    </Col>
                                    <Col style={styles.col(1, true, checked ? color : mConst.white, checked)} size={1}>
                                        <FastImage source={checked ? circleCheckOnImage : circleCheckImage} style={styles.checkImage} />
                                    </Col>
                                </Row>
                            </TouchableWithoutFeedback>
                            ) : (
                            <Pressable onPress={onPress}>
                            {
                                ({pressed}) => (
                                    <Row style={styles.row(pressed ? 'rgba(0, 0, 0, 0.2)' : color)}>
                                        { 
                                        mUtils.convertUnixToDate(loaningDate) != mUtils.dateToDate(subData.sendout_dt) ?
                                        <Text style={styles.sText()} numberOfLines={2}>
                                            {mUtils.isEmpty(sendUser.user_nm) ? name :  sendUser.user_nm}
                                            {!mUtils.isEmpty(sendUser.position) && sendUser.position}
                                           {/*  {!mUtils.isEmpty(sendUser.company_nm) && "("+sendUser.company_nm+")"} */}
                                            { mUtils.convertUnixToDate(loaningDate) != mUtils.dateToDate(subData.return_dt) &&
                                                <Text style={styles.sText()}>
                                                    {"\n"}발송일({mUtils.dateToDate(subData.return_dt)})
                                                </Text>
                                            }
                                        </Text>
                                        :
                                        <Text style={styles.sText()} numberOfLines={1}>
                                            {mUtils.isEmpty(sendUser.user_nm) ? name :  sendUser.user_nm} {!mUtils.isEmpty(sendUser.position) && sendUser.position}
                                        </Text>
                                        }
                                    </Row>
                                )
                            }
                            </Pressable>
                            )
                        }
                    </SwiperUnit>
                    <Pressable onPress={onPressPhone}>
                        {
                            ({pressed}) => (
                            <Row style={styles.row(pressed ? 'rgba(0, 0, 0, 0.2)' : mConst.white)}>
                                <Text style={styles.sText(mConst.darkGray)}>
                                    {mUtils.isEmpty(sendUser.phone_no) ? phone : mUtils.phoneFormat(sendUser.phone_no)}
                                </Text>
                            </Row>
                            )
                        }
                    </Pressable>
                </>
            )
        }else{
            if (unitType === 'from') {
                
                return (
                    <>
                        <Row style={styles.row(color)}>
                            { mUtils.convertUnixToDate(loaningDate) != mUtils.dateToDate(subData.sendout_dt) ?
                            <Text style={styles.sText()} numberOfLines={2}>              
                                {mUtils.isEmpty(sendUser.user_nm) ? name :  sendUser.user_nm}
                                {mUtils.isEmpty(sendUser.position) ? name :  sendUser.position} 
                                {/* {!mUtils.isEmpty(sendUser.mgzn_nm) && "("+sendUser.mgzn_nm+")"}  */}
                                { mUtils.convertUnixToDate(loaningDate) != mUtils.dateToDate(subData.sendout_dt) &&
                                    <Text style={styles.sText()}>
                                        {"\n"}픽업일({mUtils.dateToDate(subData.sendout_dt)})
                                    </Text>
                                }
                            </Text>
                            :
                            <Text style={styles.sText()} numberOfLines={1}>
                                {mUtils.isEmpty(sendUser.user_nm) ? name :  sendUser.user_nm} 
                                {mUtils.isEmpty(sendUser.position) ? name :  sendUser.position} 
                                {/* {!mUtils.isEmpty(sendUser.mgzn_nm) && "("+sendUser.mgzn_nm+")"} */}
                            </Text>
                            }
                            
                        </Row>
                        
                        <Pressable onPress={onPressPhone}>
                        {
                            ({pressed}) => (
                                <Row style={styles.row(pressed ? 'rgba(0, 0, 0, 0.2)' : mConst.white)}>
                                    <Text style={styles.sText(mConst.darkGray)}>
                                        {mUtils.isEmpty(sendUser.phone_no) ? phone : mUtils.phoneFormat(sendUser.phone_no)}
                                    </Text>
                                </Row>
                            )
                        }
                        </Pressable>
                    </>
                )
            }
            return (
                <>
                    <SwiperUnit onSwipeLeft={() => this.onSwipe('left')} onSwipeRight={() => this.onSwipe('right')}>
                        {
                            swiped || checked ? (
                            <TouchableWithoutFeedback onPress={swiped ? onSwipeCheck : null}>
                                <Row style={styles.row(color)}>
                                    <Col style={styles.col(1, true, color, checked)} size={3}>
                                        <Text style={styles.sText()} numberOfLines={1}>                                        
                                            {mUtils.isEmpty(returnUser.user_nm) ? name :  returnUser.user_nm} 
                                            {!mUtils.isEmpty(returnUser.position) && returnUser.position}
                                            {/* {!mUtils.isEmpty(returnUser.company_nm) && "("+returnUser.company_nm+")"} */}
                                        </Text>
                                    </Col>
                                    <Col style={styles.col(1, true, checked ? color : mConst.white, checked)} size={1}>
                                        <FastImage source={checked ? circleCheckOnImage : circleCheckImage} style={styles.checkImage} />
                                    </Col>
                                </Row>
                            </TouchableWithoutFeedback>
                            ) : (
                            <Pressable onPress={onPress}>
                            {
                                ({pressed}) => (
                                    <Row style={styles.row(pressed ? 'rgba(0, 0, 0, 0.2)' : color)}>
                                        <Text style={styles.sText()} numberOfLines={1}>
                                            {mUtils.isEmpty(returnUser.user_nm) ? name :  returnUser.user_nm} 
                                            {!mUtils.isEmpty(returnUser.position) && returnUser.position}
                                            {/* {!mUtils.isEmpty(returnUser.company_nm) && "("+returnUser.company_nm+")"} */}
                                        </Text>
                                    </Row>
                                )
                            }
                            </Pressable>
                            )
                        }
                    </SwiperUnit>
                    <Pressable onPress={onPressPhone}>
                        {
                            ({pressed}) => (
                            <Row style={styles.row(pressed ? 'rgba(0, 0, 0, 0.2)' : mConst.white)}>
                                <Text style={styles.sText(mConst.darkGray)}>
                                    {mUtils.isEmpty(sendUser.phone_no) ? phone : mUtils.phoneFormat(sendUser.phone_no)}
                                </Text>
                            </Row>
                            )
                        }
                    </Pressable>
                </>
            )
        }
    }
}

const styles = StyleSheet.create({
    col: (heightScale = 1, center, backgroundColor = mConst.white, noSideBorder = false) => ({
        justifyContent: center ? 'center' : undefined,
        alignItems: center ? 'center' : undefined,
        height: mUtils.wScale(30) * heightScale,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: center ? StyleSheet.hairlineWidth : 0,
        borderLeftWidth: noSideBorder ? 0 : StyleSheet.hairlineWidth,
        borderRightWidth: noSideBorder ? 0 : StyleSheet.hairlineWidth,
        backgroundColor,
    }),
    row: (backgroundColor = mConst.white) => ({
        justifyContent: 'center',
        alignItems: 'center',
        height: mUtils.wScale(30),
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor,
    }),
    sText: (color = mConst.textBaseColor) => ({
        fontSize: 12,
        color,
    }),
    checkImage: {
        width: mUtils.wScale(15),
        height: mUtils.wScale(15),
    },
})