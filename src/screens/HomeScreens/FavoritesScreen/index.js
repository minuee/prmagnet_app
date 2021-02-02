import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import DigitalShowroom from './DigitalShowroom'
import PressRelease from './PressRelease'

import mConst from '../../../common/constants'
import cBind from '../../../common/navigation'

const closeBtnImage = require('../../../images/navi/close.png')
const Tab = createMaterialTopTabNavigator()
const black = mConst.black

class FavoritesScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
  }

  componentDidMount() {
    this.pushOption('Favorites')
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
          <Tab.Screen name="DigitalShowroom" component={DigitalShowroom} options={{tabBarLabel: 'Digital Showroom'}} />
          <Tab.Screen name="PressRelease" component={PressRelease} options={{tabBarLabel: 'Press Release'}} />
        </Tab.Navigator>
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(FavoritesScreen)
