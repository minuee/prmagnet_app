import React, {PureComponent} from 'react'
import {SafeAreaView, View, TouchableOpacity, Image} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'
import {CalendarList, LocaleConfig} from 'react-native-calendars'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/header'
import Text from '../../common/Text'
import {Grid, Col, Row} from 'react-native-easy-grid'
import styles from './styles'

const closeBtnImage = require('../../../images/navi/close.png')
LocaleConfig.locales['ko'] = {
  monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  today: '오늘',
}
LocaleConfig.defaultLocale = 'ko'

class SelectScheduleScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {start: {}, end: {}, period: {}}
  }
  getDateString(timestamp) {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    let dateString = `${year}-`
    if (month < 10) {
      dateString += `0${month}-`
    } else {
      dateString += `${month}-`
    }
    if (day < 10) {
      dateString += `0${day}`
    } else {
      dateString += day
    }

    return dateString
  }

  getPeriod(startTimestamp, endTimestamp) {
    const period = {}
    let currentTimestamp = startTimestamp
    while (currentTimestamp < endTimestamp) {
      const dateString = this.getDateString(currentTimestamp)
      period[dateString] = {
        color: currentTimestamp === startTimestamp ? '#999999' : '#dddddd',
        startingDay: currentTimestamp === startTimestamp,
        customContainerStyle: {
          borderTopRightRadius: 5,
          borderBottomRightRadius: 16,
        },
      }
      currentTimestamp += 24 * 60 * 60 * 1000
    }
    const dateString = this.getDateString(endTimestamp)
    period[dateString] = {
      color: '#999999',
      endingDay: true,
      customContainerStyle: {
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
      },
    }
    return period
  }

  setDay(dayObj) {
    const {start, end} = this.state
    const {dateString, day, month, year} = dayObj
    // timestamp returned by dayObj is in 12:00AM UTC 0, want local 12:00AM
    const timestamp = new Date(year, month - 1, day).getTime()
    const newDayObj = {...dayObj, timestamp}
    // if there is no start day, add start. or if there is already a end and start date, restart
    const startIsEmpty = _.isEmpty(start)
    if (startIsEmpty || (!startIsEmpty && !_.isEmpty(end))) {
      const period = {
        [dateString]: {
          color: '#999999',
          endingDay: true,
          startingDay: true,
        },
      }
      this.setState({start: newDayObj, period, end: {}})
    } else {
      // if end date is older than start date switch
      const {timestamp: savedTimestamp} = start
      if (savedTimestamp > timestamp) {
        const period = this.getPeriod(timestamp, savedTimestamp)
        this.setState({start: newDayObj, end: start, period})
      } else {
        const period = this.getPeriod(savedTimestamp, timestamp)
        this.setState({end: newDayObj, start, period})
      }
    }
  }

  render() {
    const {period} = this.state
    return (
      <>
        <SafeAreaView style={styles.container}>
          {this.closeBackOption(closeBtnImage, 'Select schedule')}
          <Grid>
            <Col>
              <CalendarList
                onVisibleMonthsChange={months => {
                  console.log('now these months are visible', months)
                }}
                pastScrollRange={0}
                futureScrollRange={50}
                scrollEnabled={true}
                showScrollIndicator={true}
                minDate={Date()}
                current={Date()}
                onDayPress={this.setDay.bind(this)}
                markingType="period"
                markedDates={period}
              />
              {console.log(this.state)}
            </Col>
          </Grid>
        </SafeAreaView>
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(SelectScheduleScreen)
