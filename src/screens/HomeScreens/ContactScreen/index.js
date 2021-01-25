import React, {PureComponent} from 'react'
import {SafeAreaView, View, TouchableOpacity, Image} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import Contact from './Contact'
import ContactConfirm from './ContactConfirm'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import {Grid, Col, Row} from 'react-native-easy-grid'
import styles from './styles'

const closeBtnImage = require('../../../images/navi/close.png')
const Tab = createMaterialTopTabNavigator()
const black = mConst.black

class ContactScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
  }

  componentDidMount() {
    this.pushOption('문의하기')
  }

  render() {
    return (
      <>
        <Tab.Navigator
          swipeEnabled={false}
          tabBarOptions={{
            activeTintColor: black,
            inactiveTintColor: mConst.gray,
            indicatorStyle: {
              backgroundColor: black,
            },
            labelStyle: {fontSize: 14, fontWeight: 'bold'},
            style: {backgroundColor: mConst.white},
          }}
        >
          <Tab.Screen name="Contact" component={Contact} options={{tabBarLabel: '문의하기'}} />
          <Tab.Screen name="ContactConfirm" component={ContactConfirm} options={{tabBarLabel: '문의내역확인'}} />
        </Tab.Navigator>
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(ContactScreen)
