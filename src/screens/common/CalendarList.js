import React, {PureComponent} from 'react'
import {SafeAreaView, FlatList, View, TouchableOpacity} from 'react-native'
import moment from 'moment'
import _ from 'lodash'

import mConst from '../../common/constants'
import mUtils from '../../common/utils'
import Text from './Text'

const DAY_WIDTH = mConst.wWidth / 7
const WeekHead = () => {
  const weekdays = []
  const weekNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  for (let i = 0; i < 7; i++) {
    weekdays.push(
      <View key={i} style={{width: DAY_WIDTH, alignItems: 'center'}}>
        <Text style={{color: i === 0 ? 'red' : i === 6 ? 'blue' : 'black', fontSize: 15}}>{weekNames[i]}</Text>
      </View>
    )
  }
  return <View style={{flexDirection: 'row', justifyContent: 'center', backgroundColor: 'white', paddingVertical: 15}}>{weekdays}</View>
}
const isSameDay = (dateItem, timestamp) => {
  const today = new Date(timestamp)
  return dateItem.getDate() === today.getDate() && dateItem.getMonth() === today.getMonth() && dateItem.getFullYear() === today.getFullYear()
}
const isWithin = (dateItem, start, end) => {
  return dateItem.getTime() > start && dateItem.getTime() < end
}
const isPrev = (dateItem, month) => {
  return dateItem.getMonth() !== month || dateItem.getDate() === 0
}
const Month = ({year, month, start, end, onDayPress}) => {
  const firstWeekday = new Date(year, month, 1).getDay()
  const prevDates = []
  for (let idx = 1; idx <= firstWeekday; idx++) {
    const date = new Date(year, month, 0)
    date.setDate(date.getDate() - idx)
    prevDates.unshift(date)
  }
  const lastDate = new Date(year, month + 1, 0).getDate()
  const dates = []
  for (let idx = 1; idx <= lastDate; idx++) {
    dates.push(new Date(year, month, idx))
  }
  const monthDates = [...prevDates, ...dates]
  const dayWrapStyle = {width: DAY_WIDTH, height: 30, justifyContent: 'center', alignItems: 'center', marginVertical: 8}
  const dayStyle = {width: 30, height: 30, justifyContent: 'center', alignItems: 'center'}
  const renderDateItem = dateItem => {
    const selected = isSameDay(dateItem, start) || isSameDay(dateItem, end)
    return (
      <TouchableOpacity style={[dayStyle, {borderRadius: 15, backgroundColor: selected ? '#999999' : null}]} onPress={() => onDayPress(dateItem)}>
        <Text style={{fontSize: 14, fontWeight: 'bold'}}>{dateItem.getDate()}</Text>
      </TouchableOpacity>
    )
  }
  const renderDate = dateItem => {
    const widthin = isWithin(dateItem, start, end)
    if (isPrev(dateItem, month)) return <View style={dayWrapStyle} />
    if (isSameDay(dateItem, start) ^ isSameDay(dateItem, end)) {
      return (
        <View style={[dayWrapStyle, {flexDirection: 'row'}]}>
          <View style={{width: '50%', height: 30, backgroundColor: isSameDay(dateItem, end) && start ? '#dddddd' : 'white'}} />
          <View style={{width: '50%', height: 30, backgroundColor: isSameDay(dateItem, start) && end ? '#dddddd' : 'white'}} />
          <View style={{position: 'absolute', justifyContent: 'center', alignItems: 'center'}}>{renderDateItem(dateItem)}</View>
        </View>
      )
    }
    return <View style={[dayWrapStyle, {backgroundColor: widthin ? '#dddddd' : 'white'}]}>{renderDateItem(dateItem)}</View>
  }
  return (
    <View>
      <Text style={{fontSize: 24, fontWeight: 'bold', margin: mUtils.wScale(20), marginTop: mUtils.wScale(25)}}>
        {('0' + (new Date(year, month, 1).getMonth() + 1)).slice(-2)}
      </Text>
      <FlatList data={monthDates} numColumns={7} renderItem={({item}) => renderDate(item)} keyExtractor={(item, index) => index.toString()} />
    </View>
  )
}

class CalendarList extends PureComponent {
  constructor(props) {
    super(props)
    const today = new Date()
    const min = props.minDate || new Date(today.getFullYear(), today.getMonth() - 1, 1)
    const max = props.maxDate || new Date(today.getFullYear(), today.getMonth() + 12, 1)
    const firstRange = new Date(today.getFullYear(), today.getMonth() + 2, 1)
    const dates = []
    for (let i = min; i.getTime() <= firstRange.getTime(); i = new Date(i.getFullYear(), i.getMonth() + 1, 1)) {
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
  // checkMarkedDates = dt => {
  //   const {markedDates} = this.state
  //   for (let i = 0; i < markedDates.length; i++) {
  //     console.log('UnAvail : ', markedDates[i])
  //     const st_result = moment(markedDates[i]).isAfter(moment(start).format('YYYY-MM-DD'))
  //     const end_result = moment(markedDates[i]).isBefore(moment(dt).format('YYYY-MM-DD'))
  //     if (st_result && end_result) {
  //       return true
  //     }
  //   }
  //   return false
  // }
  handleScrollOver = () => {
    this.setState(prevState => {
      const lastDate = new Date(prevState.dates[prevState.dates.length - 1].getTime())
      const newLastDate = new Date(lastDate.getFullYear(), lastDate.getMonth() + 5, 1)
      const dates = prevState.dates
      for (
        let i = new Date(lastDate.getFullYear(), lastDate.getMonth() + 1, 1);
        i.getTime() <= newLastDate.getTime() && i.getTime() <= prevState.max.getTime();
        i = i = new Date(i.getFullYear(), i.getMonth() + 1, 1)
      ) {
        dates.push(i)
      }
      return {dates}
    })
  }
  render() {
    const {dates} = this.state
    const {start, end, onDayPress, markedDates} = this.props
    return (
      <View>
        <WeekHead />
        <FlatList
          contentContainerStyle={{paddingVertical: 10}}
          data={dates}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return Month({year: item.getFullYear(), month: item.getMonth(), start, end, onDayPress})
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
