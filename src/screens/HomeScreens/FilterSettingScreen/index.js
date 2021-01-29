import React, {PureComponent} from 'react'
import {SafeAreaView, ScrollView, View, TouchableOpacity, TextInput} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import {Grid, Col, Row} from 'react-native-easy-grid'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'

const topList = ['공지사항', '문의번호', '쇼룸문의']

class FilterSettingScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      select: topList[0],
      desc: '',
      number: '',
      number1: '',
      email: '',
    }
  }
  componentDidMount() {
    this.modalOption('Settings')
  }
  handleSelectTop = select => {
    this.setState({select})
  }
  selectView() {
    switch (this.state.select) {
      case '공지사항':
        return (
          <TextInput
            style={styles.desc}
            multiline={true}
            textAlignVertical={'top'}
            placeholder={'공지사항을 입력해 주세요.'}
            placeholderTextColor={mConst.gray}
            value={this.state.desc}
            onChangeText={text => {
              this.setState({...this.state, desc: text})
            }}
          />
        )
      case '문의번호':
        return (
          <View style={{flex: 1}}>
            <TextInput
              style={styles.numberBox}
              placeholder={'02-2222-2222'}
              placeholderTextColor={mConst.gray}
              value={this.state.number}
              onChangeText={text => {
                this.setState({...this.state, number: text})
              }}
            />
          </View>
        )
      case '쇼룸문의':
        return (
          <View style={{flex: 1}}>
            <TextInput
              style={styles.numberBox}
              placeholder={'02-2222-2222'}
              placeholderTextColor={mConst.gray}
              value={this.state.number1}
              onChangeText={text => {
                this.setState({...this.state, number1: text})
              }}
            />
            <TextInput
              style={{...styles.numberBox, marginTop: mUtils.wScale(10)}}
              placeholder={'ADQWFDA@naver.com'}
              placeholderTextColor={mConst.gray}
              value={this.state.email}
              onChangeText={text => {
                this.setState({...this.state, email: text})
              }}
            />
          </View>
        )
    }
  }
  render() {
    const {select} = this.state
    return (
      <>
        <SafeAreaView style={styles.container}>
          <View style={styles.headerWrapper}>
            {_.map(topList, (item, index) => {
              const selected = item === select
              return (
                <TouchableOpacity
                  style={selected ? styles.headerBorderOn : styles.headerBorder}
                  key={index}
                  onPress={() => this.handleSelectTop(item)}
                >
                  <Text style={selected ? styles.headerTextOn : styles.headerText}>{item}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
          {this.selectView()}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity style={styles.leftButton}>
              <Text style={styles.leftText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightButton}>
              <Text style={styles.rightText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(FilterSettingScreen)
