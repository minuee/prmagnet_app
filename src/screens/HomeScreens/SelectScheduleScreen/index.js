import React, {PureComponent} from 'react'
import {SafeAreaView, FlatList, View, TouchableOpacity} from 'react-native'
import moment from 'moment'
import {Grid, Row} from 'react-native-easy-grid'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import CalendarList from '../../common/CalendarList'
import styles from './styles'

class CalTestScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      start: '',
      end: '',
      markedDates: [],
    }
  }
  async componentDidMount() {
    this.modalOption('Select schedule')
  }
  onDayPress = dt => {
    const {start, end} = this.state
    if (start === '' && end === '') {
      this.setState({start: dt})
    } else if (start !== '' && end === '') {
      if (moment(dt) < moment(start)) {
        // console.log('CHK1')
        this.setState({start: dt, end: start})
      } else if (moment(dt).format('YYYY-MM-DD') === moment(start).format('YYYY-MM-DD')) {
        // console.log('CHK2')
        this.setState({start: dt, end: dt})
      } else {
        // if (!this.checkMarkedDates(dt)) {
        //   this.setState({end: dt})
        // } else {
        //   console.log('Unavailable!!!')
        // }
        this.setState({end: dt})
      }
    } else {
      this.setState({start: dt, end: ''})
    }
  }
  handleReset = () => {
    this.setState({start: '', end: ''})
  }
  handleConfirm = () => {
    const {start, end} = this.state
    const {caller} = this.params
    if (_.isEmpty(start) || _.isEmpty(end)) {
      this.alert('', '날짜 설정이 필요합니다')
      return
    }
    console.log('>>>>>?!?!?!?!?!', this.params)
    this.params.get({start: Math.floor(start.valueOf() / 1000), end: Math.floor(end.valueOf() / 1000)})
    this.goBack()
    //this.pushTo(caller, {start: mUtils.getDayValue(start.year, start.month, start.day), end: mUtils.getDayValue(end.year, end.month, end.day, true)})
  }
  render() {
    const {start, end, markedDates} = this.state
    return (
      <SafeAreaView style={styles.container}>
        <Grid>
          <Row>
            <CalendarList minDate={mUtils.getCalendarMinDate()} start={start} end={end} onDayPress={this.onDayPress} markedDates={markedDates} />
          </Row>
          <Row style={styles.bottom}>
            <TouchableOpacity style={styles.leftButton} onPress={this.handleReset}>
              <Text style={styles.leftText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightButton} onPress={this.handleConfirm}>
              <Text style={styles.rightText}>Confirm</Text>
            </TouchableOpacity>
          </Row>
        </Grid>
      </SafeAreaView>
    )
  }
}

export default CalTestScreen
