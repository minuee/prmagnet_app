import React, {PureComponent} from 'react'
import {SafeAreaView, KeyboardAvoidingView,ScrollView,View, TextInput, TouchableOpacity, Keyboard} from 'react-native'
import {connect} from 'react-redux'
import _ from 'lodash'

import mConst from '../../../../common/constants'
import mUtils from '../../../../common/utils'
import cBind, {callOnce} from '../../../../common/navigation'
import Text from '../../../common/Text'
import styles from './styles'
import API from '../../../../common/aws-api'

class Contact extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      title: '',
      desc: '',
    }
  }

  postQna = async () => {
    const {title, desc} = this.state
    const userType = mConst.getUserType()
    try {
      const response = await API.postQna({subject: title, content: desc, userType: userType})
      console.log('postQna>>>>', response)
      if (response.success) {
        this.setState({title: '', desc: ''})
        this.alert('문의하기 완료', '문의가 정상적으로 접수되었습니다.', [{onPress: () => null}])
      }
    } catch (error) {
      console.log('postQna>>>>', error)
    }
  }

  render() {
    return (
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? "padding" : 'height'}  enabled> 
          <ScrollView
              showsVerticalScrollIndicator={false}
              indicatorStyle={'white'}
              style={{width:'100%'}}
          >
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
          </ScrollView>
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              this.postQna();
            }}
            style={styles.bottom}
          >
            <Text style={styles.bottomText}>Confirm</Text>
          </TouchableOpacity>
          </KeyboardAvoidingView>
        </SafeAreaView>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(Contact)
