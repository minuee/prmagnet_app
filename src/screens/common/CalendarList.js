import React, {PureComponent} from 'react'
import {SafeAreaView, FlatList, View, TouchableOpacity} from 'react-native'
import moment from 'moment'
import _ from 'lodash'

import mConst from '../../common/constants'
import mUtils from '../../common/utils'
import Text from './Text'

const WeekHead = props => {
  const weekNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', paddingVertical: 15}}>
      {weekNames.map((n, i) => {
        return (
          <View key={i} style={{width: mConst.wWidth / 7, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
            <Text style={{color: i === 0 ? 'red' : i === 6 ? 'blue' : 'black', fontSize: 15}}>{n}</Text>
          </View>
        )
      })}
    </View>
  )
}
const Week = props => {
  const {children} = props
  return <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16}}>{children}</View>
}
const DayBack = props => {
  const {over, children} = props
  const half = mConst.wWidth / 14
  if (over !== 'selected' && (over === 'start' || over === 'end')) {
    return (
      <View style={{width: mConst.wWidth / 7, height: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{width: half, height: 30, backgroundColor: over === 'end' ? '#dddddd' : 'white'}} />
        <View style={{width: half, height: 30, backgroundColor: over === 'start' ? '#dddddd' : 'white'}} />
        <View style={{position: 'absolute', justifyContent: 'center', alignItems: 'center'}}>{children}</View>
      </View>
    )
  }
  return (
    <View
      style={{
        width: mConst.wWidth / 7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: over === 'on' ? '#dddddd' : 'white',
      }}
    >
      {children}
    </View>
  )
}
const Day = props => {
  const {style, children, type, selected, onPress} = props
  return (
    <TouchableOpacity
      style={{
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: selected ? '#999999' : null,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: 'bold',
          color: type === 'prev' ? '#999999' : type === 'unAvail' ? '#bebebe' : '#000000',
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  )
}

class CalendarList extends PureComponent {
  constructor(props) {
    super(props)
    const min = props.minDate ? moment(props.minDate) : moment()
    const max = props.maxDate ? moment(props.maxDate) : min.clone().add({month: 14})
    const dates = [min]
    for (let i = min.clone().add(1, 'month'); i.isBefore(max); i = i.clone().add(1, 'month')) {
      dates.push(i)
    }
    this.state = {
      min,
      max,
      start: props.start,
      end: props.end,
      markedDates: [],
      dates,
    }
  }
  checkMarkedDates = dt => {
    const {markedDates} = this.state
    for (let i = 0; i < markedDates.length; i++) {
      console.log('UnAvail : ', markedDates[i])
      const st_result = moment(markedDates[i]).isAfter(moment(start).format('YYYY-MM-DD'))
      const end_result = moment(markedDates[i]).isBefore(moment(dt).format('YYYY-MM-DD'))
      if (st_result && end_result) {
        return true
      }
    }
    return false
  }
  handleScrollOver = () => {
    this.setState(prevState => {
      const lastDate = prevState.dates[prevState.dates.length - 1].clone()
      const newLastDate = lastDate.add(5, 'month')
      const dates = prevState.dates
      for (let i = lastDate.clone().add(1, 'month'); i.isBefore(newLastDate); i = i.clone().add(1, 'month')) {
        dates.push(i)
      }
      return {dates}
    })
  }
  showMonth = ({nowDate}) => {
    const {start, end, onDayPress, markedDates} = this.props
    const today = nowDate || moment()
    const startWeek = today.clone().startOf('month').week()
    const endWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week()
    let calendar = []
    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <Week key={week}>
          {Array(7)
            .fill(0)
            .map((n, i) => {
              const current = today
                .clone()
                .week(week)
                .startOf('week')
                .add(n + i, 'day')
              const isStart = current.isSame(start, 'day')
              const isEnd = current.isSame(end, 'day')
              const isSelected = isStart || isEnd
              let isOver = ''
              // const unAvailable = markedDates.filter(v => v === current.format('YYYY-MM-DD')).length
              if (isSelected && (_.isEmpty(start) || _.isEmpty(end) || start.isSame(end, 'day'))) {
                isOver = 'selected'
              } else if (isStart) {
                // console.log('###strStartDt:', current.format('L'))
                isOver = 'start'
              } else if (isEnd) {
                // console.log('###strEndDt:', current.format('L'))
                isOver = 'end'
              } else if (current.isAfter(start) && current.isBefore(end)) {
                isOver = 'on'
              }
              // console.log('WEEK : ', week)
              if (!current.isSame(today, 'month')) return <DayBack key={i} />
              return (
                <DayBack key={i} over={isOver}>
                  {/* <Day type={null} onPress={() => onDayPress(current)} selected={isSelected} unAvail={unAvailable > 0 ? true : false}> */}
                  <Day type={null} onPress={() => onDayPress(current)} selected={isSelected}>
                    {current.format('D')}
                  </Day>
                  {/* {unAvailable > 0 && <DayUnAvailableChk />} */}
                </DayBack>
              )
            })}
        </Week>
      )
    }
    return (
      <View>
        <Text style={{fontSize: 24, fontWeight: 'bold', margin: mUtils.wScale(20)}}>{moment(today).format('MM')}</Text>
        {calendar}
      </View>
    )
  }
  render() {
    const {dates} = this.state
    return (
      <View>
        <WeekHead />
        <FlatList
          contentContainerStyle={{paddingVertical: 10}}
          data={dates}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return this.showMonth({nowDate: item})
          }}
          onConfirm={this.handleConfirm}
          onReset={this.handleReset}
          onEndReachedThreshold={2}
          onEndReached={this.handleScrollOver}
        />
      </View>
    )
  }
}

export default CalendarList
