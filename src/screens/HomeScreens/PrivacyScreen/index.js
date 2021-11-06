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

const getMobileHtml = contents => `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="format-detection" content="telephone=no" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
  />
  <title>PRMagnet 이용약관</title>
  <style type="text/css">
    * {
      margin: 0;
      padding: 0;
      letter-spacing: -0.5px;
      line-height: 1.6;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue",
        "Helvetica", "Arial", sans-serif !important;
    }
    body {
      margin: 0;
      padding: 15px;
      font-size: 14px;
      -webkit-text-size-adjust: none;
    }
    ul,
    li {
      list-style: none;
    }
    table {
      border-spacing: 0;
      padding: 0;
      border: 0;
      border-collapse: collapse;
    }
    th,
    td {
      border: solid 1px #000000;
      padding: 10px;
      margin: 0;
    }
  </style>
</head>
<body>
${contents}
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
      //console.log('TOS:', JSON.stringify(response))
    } catch (error) {
      this.setState({loading: false})
      //console.log('TOS error:', error)
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
