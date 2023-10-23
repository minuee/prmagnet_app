import React, {PureComponent} from 'react';
import {TouchableWithoutFeedback, Pressable, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Col, Row} from 'react-native-easy-grid';
import _ from 'lodash';

import mConst from '../../common/constants';
import mUtils from '../../common/utils';
import Text from './Text';
import SwiperUnit from './SwiperUnit';

const circleCheckImage = require('../../images/common/circle_check.png');
const circleCheckOnImage = require('../../images/common/circle_check_on.png');

export default class LinkSheetBrandUnit extends PureComponent {
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
        const {name, phone, onPress, unitType,viewType,onPressPhone, onSwipeCheck, color, checked, readOnly,sendUser,returnUser,isMagazineTarget,subData,loaningDate,phoneinfo} = this.props;
    
        if ( viewType === 'sendout' ) {
            if (unitType === 'to') {
                return (
                    <>
                        { checked ? 
                         <Row style={styles.row(color)}>
                            <Col style={styles.col(1, true, color, checked)} size={3}>
                                <Text style={styles.sText()} numberOfLines={2}>
                                    {mUtils.isEmpty(returnUser.user_nm) ? name :  returnUser.user_nm} {!mUtils.isEmpty(returnUser.position) && " "+returnUser.position}
                                    
                                </Text>
                            </Col>
                            <Col style={styles.col(1, true, checked ? color : mConst.white, checked)} size={1}>
                                <FastImage source={checked ? circleCheckOnImage : circleCheckImage} style={styles.checkImage} />
                            </Col>
                        </Row>
                        :
                        <Row style={styles.row(color)}>
                            <Text style={styles.sText()} numberOfLines={2}>              
                                {mUtils.isEmpty(returnUser.user_nm) ? name :  returnUser.user_nm} {!mUtils.isEmpty(returnUser.position) && " "+returnUser.position}
                            </Text>
                        </Row>
                       }
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
                return (
                    <>
                        <SwiperUnit onSwipeLeft={() => this.onSwipe('left')} onSwipeRight={() => this.onSwipe('right')}>
                            {
                                isMagazineTarget ?
                                <Row style={styles.row(color)}>
                                    { mUtils.convertUnixToDate(loaningDate) != mUtils.dateToDate(subData.sendout_dt) ?
                                        <Text style={styles.sText()} numberOfLines={2}>
                                            {mUtils.isEmpty(sendUser.user_nm) ? name :  sendUser.user_nm} {!mUtils.isEmpty(sendUser.position) && sendUser.position}
                                            <Text style={styles.sText2()}>
                                                {"\n"}발송일({mUtils.dateToDate(subData.sendout_dt)})
                                            </Text>
                                        </Text>
                                        :
                                        <Text style={styles.sText()} numberOfLines={2}>
                                            {mUtils.isEmpty(sendUser.user_nm) ? name :  sendUser.user_nm} {!mUtils.isEmpty(sendUser.position) && sendUser.position}
                                        </Text>
                                    }
                                </Row>
                                :
                                swiped || checked ? (
                                <TouchableWithoutFeedback onPress={swiped ? onSwipeCheck : null}>
                                    <Row style={styles.row(color)}>
                                        <Col style={styles.col(1, true, color, checked)} size={3}>
                                            <Text style={styles.sText()} numberOfLines={2}>
                                                {mUtils.isEmpty(sendUser.user_nm) ? name :  sendUser.user_nm} {!mUtils.isEmpty(sendUser.position) && sendUser.position}
                                                { mUtils.convertUnixToDate(loaningDate) != mUtils.dateToDate(subData.sendout_dt) &&
                                                <Text style={styles.sText()}>
                                                    {"\n"}발송일({mUtils.dateToDate(subData.sendout_dt)})
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
                                            <Text style={styles.sText()} numberOfLines={2}>
                                                {mUtils.isEmpty(sendUser.user_nm) ? name :  sendUser.user_nm} {!mUtils.isEmpty(sendUser.position) && sendUser.position}
                                                <Text style={styles.sText()}>
                                                { mUtils.convertUnixToDate(loaningDate) != mUtils.dateToDate(subData.sendout_dt) &&
                                                <Text style={styles.sText()}>
                                                    {"\n"}발송일({mUtils.dateToDate(subData.sendout_dt)})
                                                </Text>
                                                }
                                                ß</Text>
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
                                        {!mUtils.isEmpty(phoneinfo.send_user_phoneno) ? mUtils.phoneFormat(phoneinfo.send_user_phoneno) : mUtils.isEmpty(sendUser.phone_no) ? phone : mUtils.phoneFormat(sendUser.phone_no)}
                                    </Text>
                                </Row>
                                )
                            }
                        </Pressable>
                    </>
                )
            }

        }else{
            if (unitType === 'from') {
                return (
                    <>
                        { 
                        checked ?
                        <Row style={styles.row(color)}>
                            <Col style={{justifyContent:'center',alignItems:'center',borderLeftWidth:0}} size={3}>
                                { mUtils.convertUnixToDate(loaningDate) != mUtils.dateToDate(subData.return_dt) ?
                                    <Text style={styles.sText()} numberOfLines={2}>
                                        {mUtils.isEmpty(sendUser.user_nm) ? name :  sendUser.user_nm} {!mUtils.isEmpty(sendUser.position) && sendUser.position} 
                                        <Text style={styles.sText2()}>
                                            {"\n"}발송일({mUtils.dateToDate(subData.return_dt)})
                                        </Text>
                                    </Text>
                                    :
                                    <Text style={styles.sText()} numberOfLines={2}>
                                    {mUtils.isEmpty(sendUser.user_nm) ? name :  sendUser.user_nm} {!mUtils.isEmpty(sendUser.position) && sendUser.position} 
                                </Text>
                                }
                            </Col>
                            <Col style={{justifyContent:'center',alignItems:'center',borderLeftWidth:0}} size={1}>
                                <FastImage source={circleCheckOnImage } style={styles.checkImage} />
                            </Col>
                        </Row>
                        :
                        <Row style={styles.row(color)}>
                            <Text style={styles.sText()} numberOfLines={2}>              
                                {mUtils.isEmpty(sendUser.user_nm) ? name :  sendUser.user_nm} {!mUtils.isEmpty(sendUser.position) && sendUser.position} 
                                { mUtils.convertUnixToDate(loaningDate) != mUtils.dateToDate(subData.return_dt) &&
                                    <Text style={styles.sText()}>
                                        {"\n"}발송일({mUtils.dateToDate(subData.return_dt)})
                                    </Text>
                                }
                            </Text>
                        </Row>
                        }
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
                if ( isMagazineTarget ) {
                    return (
                        <>
                            <SwiperUnit onSwipeLeft={() => this.onSwipe('left')} onSwipeRight={() => this.onSwipe('right')}>
                                {
                                    swiped || checked ? (
                                    <TouchableWithoutFeedback onPress={swiped ? onSwipeCheck : null}>
                                        <Row style={styles.row(color)}>
                                            <Col style={styles.col(1, true, color, checked)} size={3}>
                                                <Text style={styles.sText()} numberOfLines={2}>                                        
                                                    {mUtils.isEmpty(returnUser.user_nm) ? name :  returnUser.user_nm} {!mUtils.isEmpty(returnUser.position) && returnUser.position}
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
                                                <Text style={styles.sText()} numberOfLines={2}>
                                                    {mUtils.isEmpty(returnUser.user_nm) ? name :  returnUser.user_nm} {!mUtils.isEmpty(returnUser.position) && returnUser.position}
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
                                            {mUtils.isEmpty(returnUser.phone_no) ? phone : mUtils.phoneFormat(returnUser.phone_no)}
                                        </Text>
                                    </Row>
                                    )
                                }
                            </Pressable>
                        </>
                    )

                }else{
                    return (
                        <>
                            <SwiperUnit onSwipeLeft={() => this.onSwipe('left')} onSwipeRight={() => this.onSwipe('right')}>
                                {
                                    swiped || checked ? (
                                    <TouchableWithoutFeedback onPress={swiped ? onSwipeCheck : null}>
                                        <Row style={styles.row(color)}>
                                            <Col style={styles.col(1, true, color, checked)} size={3}>
                                                <Text style={styles.sText()} numberOfLines={2}>                                        
                                                    {mUtils.isEmpty(returnUser.user_nm) ? name :  returnUser.user_nm} {!mUtils.isEmpty(returnUser.position) && returnUser.position}
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
                                                <Text style={styles.sText()} numberOfLines={2}>
                                                    {mUtils.isEmpty(returnUser.user_nm) ? name :  returnUser.user_nm} {!mUtils.isEmpty(returnUser.position) && returnUser.position}
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
                                            { !mUtils.isEmpty(phoneinfo.return_user_phoneno) ? mUtils.phoneFormat(phoneinfo.return_user_phoneno) : mUtils.isEmpty(returnUser.phone_no) ? phone : mUtils.phoneFormat(returnUser.phone_no)}
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
    sText2: (color = mConst.textBaseColor) => ({
        fontSize: 10,
        color,
    }),
    checkImage: {
        width: mUtils.wScale(15),
        height: mUtils.wScale(15),
    },
})