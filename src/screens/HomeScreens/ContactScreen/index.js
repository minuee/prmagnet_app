import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import Contact from './Contact'
import ContactConfirm from './ContactConfirm'

import mConst from '../../../common/constants'
import cBind from '../../../common/navigation'

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
            activeTintColor: mConst.getBaseXColor(),
            inactiveTintColor: mConst.gray,
            indicatorStyle: {
              backgroundColor: mConst.getBaseXColor(),
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
