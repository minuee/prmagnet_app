import React, {Component} from 'react';
import {View,TouchableOpacity,StyleSheet,Platform,BackHandler,SafeAreaView,NavState,Linking
} from 'react-native';
import {WebView} from 'react-native-webview';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNExitApp from 'react-native-exit-app';
import mUtils from '../../../common/utils';
import mConst from '../../../common/constants';
import cBind, {callOnce} from '../../../common/navigation';
import Loading from '../../common/Loading';
class WebViewComp extends Component {
  constructor(props) {
    super(props);
    cBind(this)
    this.state = {
      loading : true,
		  loadUrl : 'https://www.prmagnet.kr/join',
      navState: {}, // 히스토리 스택 관리를 위한 상태 변수.
      canGoBack: false,
      canGoForward: false,
      readyToExit: false, // root stack 에서 뒤로 가기 2번 클릭해야 뒤로 갈 수 있도록 해 주기 위한 변수.
    };
    this.webViewRef = null; // native 앱에서 WebView 히스토리 스택에 접근하기 위해 참조해 주는 변수
  }

  UNSAFE_componentWillMount () {
	  const {url,title} = this.props.route.params;
    console.log('UNSAFE_componentWillMount',url)
    this.pushOption(title);
    this.setState({
      loadUrl :  url
    })
  }

  componentDidMount() {
    /* android 기기에서 뒤로 가기 버튼 터치 시 동작 처리 이벤트 등록
    기본적으로 android 에서 웹뷰가 있는 상태에서 뒤로가기 버튼을 누르면 웹 히스토리 스택에 관계없이 앱이 종료되어 버린다. 이 상태를 방지하기 위함임.
    */
    if (Platform.OS === 'android') {
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.onAndroidBackPress,
      );
    }
    this.setState({
      loading : false
    })
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress');
    }
  }

  // android 기기에서 뒤로 가기 버튼 터치 시 동작 처리 이벤트 등록
  onAndroidBackPress = () => {
    //console.log('readyToExit',this.state.readyToExit)
    //console.log('canGoBack',this.state.canGoBack)
    if (this.webViewRef && this.state.canGoBack) {
      this.webViewRef.goBack();
      return true;
    } else if (this.webViewRef && !this.state.readyToExit) {
      this.setState({readyToExit: true});
      mUtils.fn_call_toast('한 번 더 누르시면 이젠 페이지로 이동합니다.');
      setTimeout(() => {
        this.setState({readyToExit: false});
      }, 2000);
      return true;
    } else {
      return false;
    }
  };

  // 브라우저에서 히스토리 스택이 변경되었을 때 실행해 주는 매서드
  webViewNavStateChange = (navState) => {    
    this.setState({
      navState: {...navState},
      canGoBack: navState.canGoBack,
      canGoForward: navState.canGoForward,
    });
  };

  // native 앱에서 웹 앞으로 가기 기능 실행해 주는 매서드
  webViewGoForward = () => {
    if (this.state.canGoForward) {
      this.webViewRef.goForward();
    } else {      
    }
  };

  // native 앱에서 웹 뒤로 가기 기능 실행해 주는 매서드
  webViewGoBack = () => {
    if (this.state.canGoBack) {
      this.webViewRef.goBack();
    } else if (!this.state.readyToExit) {
      this.setState({readyToExit: true});
      mUtils.fn_call_toast('한 번 더 누르시면 이젠 페이지로 이동합니다.');
      setTimeout(() => {
        this.setState({readyToExit: false});
      }, 2000);
    } else {
      RNExitApp.exitApp();
    }
  };

  handleNavigationStateChange = (event: NavState) => {    
    if (event.url ) {
        this.webViewRef.stopLoading();
        Linking.openURL(event.url);
    }
  };

  shouldStartLoadWithRequest = (req) => {
    if ( req.url === this.state.loadUrl) {
      this.webViewRef.reload();
    }else{
      Linking.openURL(req.url);
    }
    return false;
  };
  render() {
    // const {canGoForward, canGoBack} = this.state;    
    
    if ( this.state.loading ) {
      return (
        <Loading />
      )
    }else {
      return (
        <SafeAreaView style={{height: '100%', opacity: 0.99, overflow: 'hidden'}}>
          <WebView
            source={{
              uri: this.state.loadUrl
            }}
            ref={(webView) => {
              this.webViewRef = webView;
            }}
            //onShouldStartLoadWithRequest={this.shouldStartLoadWithRequest}
            //onNavigationStateChange={({nativeEvent}) => { this.handleNavigationStateChange(nativeEvent)}}          
            onLoadProgress={({nativeEvent}) => {
              if (Platform.OS === 'android') {              
                this.loadingProgress = nativeEvent.progress;
                if (nativeEvent) {
                  this.webViewNavStateChange(nativeEvent);
                }
              }
            }}
            containerStyle={{flex: 1,opacity: 0.99,overflow: 'hidden',}}
            //androidHardwareAccelerationDisabled={true}
          />
          
        </SafeAreaView>
      );
    }
  }
}

export default WebViewComp;

const styles = StyleSheet.create({
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#9e9e9e',
    backgroundColor: 'white',
  },
  navBtn: {
    marginHorizontal: 10,
  },
});
