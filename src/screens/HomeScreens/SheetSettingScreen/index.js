import React, {PureComponent} from 'react'
import {SafeAreaView, ScrollView, View, TouchableOpacity, TextInput} from 'react-native'
import {connect} from 'react-redux'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'
import API from '../../../common/aws-api'

const topList = ['연결시트공지사항']
const reg = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/

class FilterSettingScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      select: topList[0],
      notice: '',
    }
  }

  postNotice = () => {
    this.alert('연결시트 공지사항', '내용을 수정하시겠습니까?', [{onPress: this.actionPostNotice}, {}])
  }

  actionPostNotice = async () => {
    const {notice} = this.state;
    try {
      const response = await API.postSheetNotice({
        notice: notice,
      })
      //console.log('postNotice>>>', response)
      if (response.success) {
        this.goBack()
      }
    } catch (error) {
      console.log('postNotice>>>', error)
    }
  }


  getNotice = async () => {
    try {
      const response = await API.getSheetNotice()
      console.log('getNotice>>>', response)
      if (response.success) {
        this.setState({notice: response.content})
      }
    } catch (error) {
      //console.log('getNotice>>>', error)
    }
  }


  componentDidMount() {
    this.modalOption('Settings')
    this.onFocus(this.handleOnFocus)
  }
  componentWillUnmount() {
    this.removeFocus()
  }

  handleOnFocus = () => {
    this.getNotice();
  }

  handleSelectTop = select => {
    this.setState({select: select})
  }
  selectView() {
    const {notice} = this.state;
    switch (this.state.select) {
      case '연결시트공지사항':
        return (
          <TextInput
            style={styles.desc}
            multiline={true}
            textAlignVertical={'top'}
            placeholder={'연결시트에 들어갈 공지사항을 기재해 주세요.'}
            placeholderTextColor={mConst.gray}
            value={notice}
            onChangeText={text => {
              this.setState({notice: text})
            }}
          />
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
          <TouchableOpacity
            style={styles.rightButton}
            onPress={() => {this.postNotice()}}
          >
            <Text style={styles.rightText}>Confirm</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(FilterSettingScreen)
