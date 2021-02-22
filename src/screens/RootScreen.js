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
import ContactDetailScreen from './HomeScreens/ContactDetailScreen'
import NotificationScreen from './HomeScreens/NotificationScreen'
import MyPageScreen from './HomeScreens/MyPageScreen'
import NotiSettingScreen from './HomeScreens/NotiSettingScreen'
import AccountSettingScreen from './HomeScreens/AccountSettingScreen'
import LookBookScreen from './HomeScreens/LookBookScreen'
import LookBookDetailScreen from './HomeScreens/LookBookDetailScreen'
import FilterSettingScreen from './HomeScreens/FilterSettingScreen'
import DigitalSRScreen from './HomeScreens/DigitalSRScreen'
import DigitalSRDetailScreen from './HomeScreens/DigitalSRDetailScreen'
import FavoritesScreen from './HomeScreens/FavoritesScreen'
import BrandSchedulerScreen from './HomeScreens/BrandSchedulerScreen'
import ScheduleMemoScreen from './HomeScreens/ScheduleMemoScreen'
import NoticeScreen from './HomeScreens/NoticeScreen'
import SampleRequestsScreen from './HomeScreens/SampleRequestsScreen'
import SampleRequestsListScreen from './HomeScreens/SampleRequestsListScreen'
import LinkSheetScreen from './HomeScreens/LinkSheetScreen'
import MagazineSchedulerScreen from './HomeScreens/MagazineSchedulerScreen'
import BrandLinkSheetScreen from './HomeScreens/BrandLinkSheetScreen'
import ByBrandsSearchScreen from './HomeScreens/ByBrandsSearchScreen'
import SearchScreen from './HomeScreens/SearchScreen'

import DevNavigationScreen from './HomeScreens/DevNavigationScreen'

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
  const iconStyle = (width = 96) => ({
    width: (42 * width) / 155,
    height: 42,
    marginTop: 8,
  })

  const TabNavi = createBottomTabNavigator()
  const TabHomeStack = createStackNavigator()
  const TabShowStack = createStackNavigator()
  const TabLookStack = createStackNavigator()
  const TabScheduleStack = createStackNavigator()
  const TabLinkStack = createStackNavigator()

  const tabIconHome = require('../images/tabs/tab_home.png')
  const tabIconShow = require('../images/tabs/tab_show.png')
  const tabIconLook = require('../images/tabs/tab_look.png')
  const tabIconSchedule = require('../images/tabs/tab_schedule.png')
  const tabIconLink = require('../images/tabs/tab_link.png')
  const tabIconHomeOn = require('../images/tabs/tab_home_on.png')
  const tabIconShowOn = require('../images/tabs/tab_show_on.png')
  const tabIconLookOn = require('../images/tabs/tab_look_on.png')
  const tabIconScheduleOn = require('../images/tabs/tab_schedule_on.png')
  const tabIconLinkOn = require('../images/tabs/tab_link_on.png')
  return (
    // TODO 탭바 높이값 지정
    <TabNavi.Navigator
      tabBarOptions={{style: {height: mConst.bottomTabHeight, backgroundColor: mConst.black}}}
      tabBar={props => <CustomBottomTabBar {...props} />}
    >
      <TabNavi.Screen
        name="HomeTab"
        options={{
          tabBarIcon: ({focused}) => <FastImage source={focused ? tabIconHomeOn : tabIconHome} style={iconStyle()} />,
          tabBarLabel: () => null,
        }}
        children={() => (
          <TabHomeStack.Navigator>
            <TabHomeStack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
          </TabHomeStack.Navigator>
        )}
      />
      <TabNavi.Screen
        name="ShowTab"
        options={{
          tabBarIcon: ({focused}) => <FastImage source={focused ? tabIconShowOn : tabIconShow} style={iconStyle(136)} />,
          tabBarLabel: () => null,
        }}
        children={() => (
          <TabShowStack.Navigator>
            <TabShowStack.Screen name="ShowScreen" component={DigitalSRScreen} options={{headerShown: false}} />
          </TabShowStack.Navigator>
        )}
      />
      <TabNavi.Screen
        name="LookTab"
        options={{
          tabBarIcon: ({focused}) => <FastImage source={focused ? tabIconLookOn : tabIconLook} style={iconStyle(97)} />,
          tabBarLabel: () => null,
        }}
        children={() => (
          <TabLookStack.Navigator>
            <TabLookStack.Screen name="LookScreen" component={LookBookScreen} options={{headerShown: false}} />
          </TabLookStack.Navigator>
        )}
      />
      <TabNavi.Screen
        name="ScheduleTab"
        options={{
          tabBarIcon: ({focused}) => <FastImage source={focused ? tabIconScheduleOn : tabIconSchedule} style={iconStyle()} />,
          tabBarLabel: () => null,
        }}
        children={() => (
          <TabScheduleStack.Navigator>
            <TabScheduleStack.Screen name="ScheduleScreen" component={MagazineSchedulerScreen} options={{headerShown: false}} />
          </TabScheduleStack.Navigator>
        )}
      />
      <TabNavi.Screen
        name="LinkTab"
        options={{
          tabBarIcon: ({focused}) => <FastImage source={focused ? tabIconLinkOn : tabIconLink} style={iconStyle(110)} />,
          tabBarLabel: () => null,
        }}
        children={() => (
          <TabLinkStack.Navigator>
            <TabLinkStack.Screen name="LinkScreen" component={LinkSheetScreen} options={{headerShown: false}} />
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
      <StartStack.Navigator screenOptions={basicScreenOptions(true)} initialRouteName={'DevNavigationScreen'}>
        <StartStack.Screen name="LoginScreen" component={LoginScreen} />
        <StartStack.Screen name="DevNavigationScreen" component={DevNavigationScreen} />
        <StartStack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
        <StartStack.Screen name="SearchScreen" component={SearchScreen} />
        <StartStack.Screen name="ByBrandsSearchScreen" component={ByBrandsSearchScreen} />
        <StartStack.Screen name="BrandLinkSheetScreen" component={BrandLinkSheetScreen} options={{headerShown: false}} />
        <StartStack.Screen name="MagazineSchedulerScreen" component={MagazineSchedulerScreen} options={{headerShown: false}} />
        <StartStack.Screen name="SampleRequestsListScreen" component={SampleRequestsListScreen} options={{headerShown: false}} />
        <StartStack.Screen name="SampleRequestsScreen" component={SampleRequestsScreen} options={{headerShown: false}} />
        <StartStack.Screen name="NoticeScreen" component={NoticeScreen} />
        <StartStack.Screen name="ScheduleMemoScreen" component={ScheduleMemoScreen} />
        <StartStack.Screen name="BrandSchedulerScreen" component={BrandSchedulerScreen} options={{headerShown: false}} />
        <StartStack.Screen name="FavoritesScreen" component={FavoritesScreen} />
        <StartStack.Screen name="DigitalSRDetailScreen" component={DigitalSRDetailScreen} />
        <StartStack.Screen name="DigitalSRScreen" component={DigitalSRScreen} options={{headerShown: false}} />
        <StartStack.Screen name="FilterSettingScreen" component={FilterSettingScreen} />
        <StartStack.Screen name="LookBookDetailScreen" component={LookBookDetailScreen} options={{headerShown: false}} />
        <StartStack.Screen name="LookBookScreen" component={LookBookScreen} options={{headerShown: false}} />
        <StartStack.Screen name="AccountSettingScreen" component={AccountSettingScreen} />
        <StartStack.Screen name="NotiSettingScreen" component={NotiSettingScreen} />
        <StartStack.Screen name="MyPageScreen" component={MyPageScreen} />
        <StartStack.Screen name="NotificationScreen" component={NotificationScreen} />
        <StartStack.Screen name="ContactScreen" component={ContactScreen} />
        <StartStack.Screen name="ContactDetailScreen" component={ContactDetailScreen} />
        <StartStack.Screen name="SelectScheduleScreen" component={SelectScheduleScreen} />
        <StartStack.Screen name="FilterScreen" component={FilterScreen} />
        <StartStack.Screen name="StartScreen" component={StartScreen} options={{headerShown: false}} />
        <StartStack.Screen name="LinkSheetScreen" component={LinkSheetScreen} />
      </StartStack.Navigator>
    )
  }
  MemberStack = () => {
    const MemberStack = createStackNavigator()
    return (
      <MemberStack.Navigator screenOptions={basicScreenOptions(true)} initialRouteName={'HomeScreen'}>
        <MemberStack.Screen name="HomeScreen" component={this.MenuDrawer} options={{headerShown: false, gestureEnabled: false}} />
        <MemberStack.Screen name="ByBrandsSearchScreen" component={ByBrandsSearchScreen} />
        <MemberStack.Screen name="BrandLinkSheetScreen" component={BrandLinkSheetScreen} options={{headerShown: false}} />
        <MemberStack.Screen name="MagazineSchedulerScreen" component={MagazineSchedulerScreen} options={{headerShown: false}} />
        <MemberStack.Screen name="SampleRequestsListScreen" component={SampleRequestsListScreen} options={{headerShown: false}} />
        <MemberStack.Screen name="SampleRequestsScreen" component={SampleRequestsScreen} options={{headerShown: false}} />
        <MemberStack.Screen name="NoticeScreen" component={NoticeScreen} />
        <MemberStack.Screen name="ScheduleMemoScreen" component={ScheduleMemoScreen} />
        <MemberStack.Screen name="BrandSchedulerScreen" component={BrandSchedulerScreen} options={{headerShown: false}} />
        <MemberStack.Screen name="FavoritesScreen" component={FavoritesScreen} />
        <MemberStack.Screen name="DigitalSRDetailScreen" component={DigitalSRDetailScreen} />
        <MemberStack.Screen name="DigitalSRScreen" component={DigitalSRScreen} options={{headerShown: false}} />
        <MemberStack.Screen name="FilterSettingScreen" component={FilterSettingScreen} />
        <MemberStack.Screen name="LookBookDetailScreen" component={LookBookDetailScreen} options={{headerShown: false}} />
        <MemberStack.Screen name="LookBookScreen" component={LookBookScreen} options={{headerShown: false}} />
        <MemberStack.Screen name="AccountSettingScreen" component={AccountSettingScreen} />
        <MemberStack.Screen name="NotiSettingScreen" component={NotiSettingScreen} />
        <MemberStack.Screen name="MyPageScreen" component={MyPageScreen} />
        <MemberStack.Screen name="NotificationScreen" component={NotificationScreen} />
        <MemberStack.Screen name="ContactScreen" component={ContactScreen} />
        <MemberStack.Screen name="ContactDetailScreen" component={ContactDetailScreen} />
        <MemberStack.Screen name="SelectScheduleScreen" component={SelectScheduleScreen} />
        <MemberStack.Screen name="FilterScreen" component={FilterScreen} />
        <MemberStack.Screen name="StartScreen" component={StartScreen} options={{headerShown: false}} />
        <MemberStack.Screen name="LinkSheetScreen" component={LinkSheetScreen} />
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
