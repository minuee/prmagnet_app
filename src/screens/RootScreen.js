import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createDrawerNavigator} from '@react-navigation/drawer'
import SplashScreen from 'react-native-splash-screen'
import FastImage from 'react-native-fast-image'

import mConst from '../common/constants'
import mUtils from '../common/utils'
import Text from './common/Text'
import CustomBottomTabBar from './common/CustomBottomTabBar'

import StartScreen from './HomeScreens/StartScreen'
import FilterScreen from './HomeScreens/FilterScreen'
import LoginScreen from './common/LoginScreen'
import MenuScreen from './common/MenuScreen'
import HomeScreen from './HomeScreens/HomeScreen'
import SelectScheduleScreen from './HomeScreens/SelectScheduleScreen'
import ContactScreen from './HomeScreens/ContactScreen'
import NotificationScreen from './HomeScreens/NotificationScreen'
import MyPageScreen from './HomeScreens/MyPageScreen'
import NotiSettingScreen from './HomeScreens/NotiSettingScreen'

// 스크린 기본 설정
const basicScreenOptions = (headerShown = true, gestureEnabled = mConst.bIos) => ({
  headerShown,
  gestureEnabled,
  headerTitleAlign: 'center',
  ...TransitionPresets.SlideFromRightIOS,
})
// 모달 애니메이션 설정
const modalScreenOptions = (headerShown = false, gestureEnabled = mConst.bIos) => ({
  headerShown,
  gestureEnabled,
  headerTitleAlign: 'center',
  ...TransitionPresets.ModalSlideFromBottomIOS,
})

const TabStack = () => {
  const iconStyle = {
    width: 26,
    height: 26,
  }
  const tabTextStyle = focused => ({
    fontSize: 10,
    color: focused ? 'blue' : mConst.white,
    marginTop: -5,
    marginBottom: 10,
  })

  const TabNavi = createBottomTabNavigator()
  const TabHomeStack = createStackNavigator()
  const TabShowStack = createStackNavigator()
  const TabLookStack = createStackNavigator()
  const TabScheduleStack = createStackNavigator()
  const TabLinkStack = createStackNavigator()

  const tabIconHome = require('../images/navi/tab_home.png')
  const tabIconShow = require('../images/navi/tab_show.png')
  const tabIconLook = require('../images/navi/tab_look.png')
  const tabIconSchedule = require('../images/navi/tab_schedule.png')
  const tabIconLink = require('../images/navi/tab_link.png')
  const tabIconHomeOn = require('../images/navi/tab_home_on.png')
  const tabIconShowOn = require('../images/navi/tab_show_on.png')
  const tabIconLookOn = require('../images/navi/tab_look_on.png')
  const tabIconScheduleOn = require('../images/navi/tab_schedule_on.png')
  const tabIconLinkOn = require('../images/navi/tab_link_on.png')
  return (
    // TODO 탭바 높이값 지정
    <TabNavi.Navigator
      tabBarOptions={{style: {height: mConst.bottomTabHeight, backgroundColor: '#7ea1b2'}}}
      tabBar={props => <CustomBottomTabBar {...props} />}
    >
      <TabNavi.Screen
        name="HomeTab"
        options={{
          tabBarIcon: ({focused}) => <FastImage source={focused ? tabIconHomeOn : tabIconHome} style={iconStyle} />,
          tabBarLabel: ({focused}) => <Text style={tabTextStyle(focused)}>HOME</Text>,
        }}
        children={() => (
          <TabHomeStack.Navigator>
            <TabHomeStack.Screen name="HomeScreen" component={HomeScreen} />
          </TabHomeStack.Navigator>
        )}
      />
      <TabNavi.Screen
        name="ShowTab"
        options={{
          tabBarIcon: ({focused}) => <FastImage source={focused ? tabIconShowOn : tabIconShow} style={iconStyle} />,
          tabBarLabel: ({focused}) => <Text style={tabTextStyle(focused)}>디지털쇼룸</Text>,
        }}
        children={() => (
          <TabShowStack.Navigator>
            <TabShowStack.Screen name="ShowScreen" component={HomeScreen} />
          </TabShowStack.Navigator>
        )}
      />
      <TabNavi.Screen
        name="LookTab"
        options={{
          tabBarIcon: ({focused}) => <FastImage source={focused ? tabIconLookOn : tabIconLook} style={iconStyle} />,
          tabBarLabel: ({focused}) => <Text style={tabTextStyle(focused)}>룩북</Text>,
        }}
        children={() => (
          <TabLookStack.Navigator>
            <TabLookStack.Screen name="LookScreen" component={HomeScreen} />
          </TabLookStack.Navigator>
        )}
      />
      <TabNavi.Screen
        name="ScheduleTab"
        options={{
          tabBarIcon: ({focused}) => <FastImage source={focused ? tabIconScheduleOn : tabIconSchedule} style={iconStyle} />,
          tabBarLabel: ({focused}) => <Text style={tabTextStyle(focused)}>스케쥴</Text>,
        }}
        children={() => (
          <TabScheduleStack.Navigator>
            <TabScheduleStack.Screen name="ScheduleScreen" component={HomeScreen} />
          </TabScheduleStack.Navigator>
        )}
      />
      <TabNavi.Screen
        name="LinkTab"
        options={{
          tabBarIcon: ({focused}) => <FastImage source={focused ? tabIconLinkOn : tabIconLink} style={iconStyle} />,
          tabBarLabel: ({focused}) => <Text style={tabTextStyle(focused)}>연결시트</Text>,
        }}
        children={() => (
          <TabLinkStack.Navigator>
            <TabLinkStack.Screen name="LinkScreen" component={HomeScreen} />
          </TabLinkStack.Navigator>
        )}
      />
    </TabNavi.Navigator>
  )
}

class RootScreen extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    SplashScreen.hide()
  }
  StartStack = () => {
    const StartStack = createStackNavigator()
    return (
      <StartStack.Navigator screenOptions={basicScreenOptions(true)} initialRouteName={'FilterScreen'}>
        <StartStack.Screen name="NotiSettingScreen" component={NotiSettingScreen} />
        <StartStack.Screen name="MyPageScreen" component={MyPageScreen} />
        <StartStack.Screen name="NotificationScreen" component={NotificationScreen} />
        <StartStack.Screen name="ContactScreen" component={ContactScreen} />
        <StartStack.Screen name="SelectScheduleScreen" component={SelectScheduleScreen} />
        <StartStack.Screen name="FilterScreen" component={FilterScreen} />
        <StartStack.Screen name="StartScreen" component={StartScreen} options={{headerShown: false}} />
        <StartStack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
      </StartStack.Navigator>
    )
  }
  MemberStack = () => {
    const MemberStack = createStackNavigator()
    return (
      <MemberStack.Navigator screenOptions={basicScreenOptions(true)}>
        <MemberStack.Screen name="HomeScreen" component={this.MenuDrawer} options={{headerShown: false, gestureEnabled: false}} />
      </MemberStack.Navigator>
    )
  }
  MenuDrawer = () => {
    const MenuDrawer = createDrawerNavigator()
    return (
      <MenuDrawer.Navigator
        initialRouteName="HomeScreen"
        drawerStyle={{width: '100%', backgroundColor: '#ffffff'}}
        screenOptions={basicScreenOptions(false, true)}
        drawerContent={props => <MenuScreen {...props} />}
      >
        <MenuDrawer.Screen name="HomeScreen" component={TabStack} />
      </MenuDrawer.Navigator>
    )
  }
  render() {
    const {user} = this.props
    const RootStack = createStackNavigator()
    return (
      <NavigationContainer>
        <RootStack.Navigator screenOptions={basicScreenOptions(false)}>
          {user.isLogged ? (
            <RootStack.Screen name="MemberStack" component={this.MemberStack} />
          ) : (
            <RootStack.Screen name="StartStack" component={this.StartStack} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({})
)(RootScreen)
