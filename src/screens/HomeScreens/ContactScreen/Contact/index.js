import React, {PureComponent} from 'react'
import {SafeAreaView, View, TextInput, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import mConst from '../../../../common/constants'
import mUtils from '../../../../common/utils'
import cBind, {callOnce} from '../../../../common/navigation'
import Text from '../../../common/Text'
import {Grid, Col, Row} from 'react-native-easy-grid'
import styles from './styles'

const closeBtnImage = require('../../../../images/navi/close.png')

class Contact extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      title: '',
      desc: '',
    }
  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <TextInput
            style={styles.title}
            placeholder={'제목을 입력해주세요.'}
            placeholderTextColor={mConst.gray}
            value={this.state.title}
            onChangeText={text => {
              this.setState({...this.state, title: text})
            }}
          />
          <TextInput
            style={styles.desc}
            multiline={true}
            textAlignVertical={'top'}
            placeholder={'내용을 입력해주세요.'}
            placeholderTextColor={mConst.gray}
            value={this.state.desc}
            onChangeText={text => {
              this.setState({...this.state, desc: text})
            }}
          />
          <TouchableOpacity
            onPress={() => {
              this.alert('문의하기 완료', '문의가 정상적으로 접수되었습니다.')
            }}
            style={styles.bottom}
          >
            <Text style={styles.bottomText}>Confirm</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(Contact)
