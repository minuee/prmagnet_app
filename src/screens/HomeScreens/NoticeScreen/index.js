import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, FlatList, TouchableOpacity, Pressable, Image, TextInput} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import {Grid, Col, Row} from 'react-native-easy-grid'
import styles from './styles'
import {multicastChannel} from 'redux-saga'

class NoticeScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      desc: '',
    }
  }
  componentDidMount() {
    this.modalOption('Notice')
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style>
          <TextInput
            style={styles.desc}
            multiline={true}
            textAlignVertical={'top'}
            placeholder={'공지사항을 입력해주세요.'}
            placeholderTextColor={mConst.gray}
            value={this.state.desc}
            onChangeText={text => {
              this.setState({...this.state, desc: text})
            }}
          />
        </ScrollView>
        <TouchableOpacity style={styles.box}>
          <Text style={styles.bottom}>Confirm</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(NoticeScreen)
