import React, {PureComponent} from 'react'
import {SafeAreaView, FlatList, View, TouchableOpacity} from 'react-native'
import {WebView} from 'react-native-webview'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'
import API from '../../../common/aws-api'
import Loading from '../../common/Loading'

const getMobileHtml = contents => `
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PRMagnet 개인정보 처리방침</title>
  </head>
<body style="margin: 0; padding: 2em">${contents}
</body>
</html>
`

class PrivacyScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      data: '',
      loading: true,
    }
  }

  async componentDidMount() {
    this.pushOption('개인정보 처리방침')
    try {
      const response = await API.getPrivacyPolicy()
      this.setState({data: _.get(response, 'privacy_policy', ''), loading: false})
      console.log('TOS:', JSON.stringify(response))
    } catch (error) {
      this.setState({loading: false})
      console.log('TOS error:', error)
    }
  }

  render() {
    const {data, loading} = this.state
    if (loading) {
      return <Loading />
    }
    return <WebView style={{flex: 1}} originWhitelist={['*']} source={{html: getMobileHtml(data)}} />
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(PrivacyScreen)
