import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, Switch, Platform} from 'react-native'
import {connect} from 'react-redux'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'
import Loading from '../../common/Loading'

const magazine = [
  {title: '디지털 쇼룸', desc: '디지털 쇼룸의 알림을 받아보세요'},
  {title: '샘플 요청', desc: '샘플 요청의 알림을 받아보세요'},
  {title: 'PR GPS 소식', desc: 'PR GPS의 새로운 소식을 받아보세요'},
  {title: '방해 금지 시간', desc: '특정 시간동안 알림을 받지않아요'},
  {title: '보도자료', desc: '보도자료의 알림을 받아보세요 '},
]

const brand = [
  {title: '샘플 요청', desc: '샘플 요청의 알림을 받아보세요'},
  {title: 'PR GPS 소식', desc: 'PR GPS의 새로운 소식을 받아보세요'},
  {title: '방해 금지 시간', desc: '특정 시간동안 알림을 받지않아요'},
]

class NotiSettingScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {isEnabled: ''}
  }

  componentDidMount() {
    this.pushOption('알림 설정')
    const arr = mConst.getUserType() === 'M' ? [false, false, false, false, false] : [false, false, false]
    this.setState({isEnabled: arr})
  }

  render() {
    const {isEnabled} = this.state
    const userType = mConst.getUserType()
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scroll}>
            {_.map(userType === 'M' ? magazine : brand, (item, index) => {
              return (
                <View key={index} style={styles.listBox}>
                  <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.desc}>{item.desc}</Text>
                  </View>
                  <Switch
                    style={styles.switchIc}
                    trackColor={{false: mConst.borderGray, true: mConst.black}}
                    thumbColor={mConst.white}
                    ios_backgroundColor={mConst.borderGray}
                    value={isEnabled[index]}
                    onValueChange={switchValue => {
                      const copy = [...isEnabled]
                      copy.splice(index, 1, switchValue)
                      this.setState({isEnabled: copy})
                    }}
                  />
                </View>
              )
            })}
          </ScrollView>
        </SafeAreaView>
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(NotiSettingScreen)
