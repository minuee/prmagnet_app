import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, FlatList, TouchableOpacity, Pressable, Image, TextInput} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'
import DropDown from '../../common/DropDown'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import {Grid, Col, Row} from 'react-native-easy-grid'
import styles from './styles'
import {multicastChannel} from 'redux-saga'

class ScheduleMemoScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      color1: ['#c18c8c', '#c1a68c', '#b8c18c', '#8cc1a7', '#8cc1c1', '#8cafc1', '#908cc1'],
      color2: ['#af8cc1', '#e1c668', '#c1c3c3', '#b0a581', '#e1af7b', '#d78979', '#e6e667'],
      look: ['LOOK #1', 'LOOK #2', 'LOOK #3', 'LOOK #4', 'LOOK #5', 'LOOK #6', 'LOOK #7', 'LOOK #8', 'LOOK #9', 'LOOK #10', 'Apply All Looks'],
      drop: false,
      select: 'LOOK #1',
      desc: '',
    }
  }
  componentDidMount() {
    this.modalOption('')
  }
  onSelect = (idx, value) => {
    this.setState({...this.state, select: value})
  }
  render() {
    const {color1, color2, select, look} = this.state
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style>
          <View style={styles.layout}>
            {color1.map((item, index) => {
              return <TouchableOpacity key={index} style={{...styles.color, backgroundColor: item}} />
            })}
          </View>
          <View style={styles.layout}>
            {color2.map((item, index) => {
              return <TouchableOpacity key={index} style={{...styles.color, backgroundColor: item}} />
            })}
          </View>
          <View style={{paddingHorizontal: mUtils.wScale(20)}}>
            <DropDown options={look} value={select} onSelect={this.onSelect} />
          </View>
          <TextInput
            style={styles.desc}
            multiline={true}
            textAlignVertical={'top'}
            placeholder={'메모 입력해주세요.'}
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
)(ScheduleMemoScreen)
