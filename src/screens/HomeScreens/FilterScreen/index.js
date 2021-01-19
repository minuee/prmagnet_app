import React, {PureComponent} from 'react'
import {SafeAreaView, View, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import CodePush from '../../common/CodePush'
import mConst from '../../../common/constants'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
// import {Col, Row, Grid} from '../../common/EasyGrid'
import {Col, Row, Grid} from 'react-native-easy-grid'
import styles from './styles'

class FilterScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
  }
  componentDidMount() {
    this.modalOption('FILTER')
  }
  render() {
    return (
      // <SafeAreaView style={styles.container}>
      //   {/* <Grid>
      //     <Row>
      //       <Col style={{background: 'red'}}></Col>
      //       <Col style={{background: 'green'}}></Col>
      //     </Row>
      //   </Grid> */}
      //   <Text>11</Text>
      //   <Grid style={{flex: 1, height: 1000}}>
      //     <Row style={{flex: 1, backgroundColor: 'red', height: 100}} size={10}></Row>
      //     <Row style={{flex: 1, backgroundColor: 'green', height: 100}} size={10}></Row>
      //   </Grid>
      // </SafeAreaView>
      <SafeAreaView style={styles.container}>
        <Grid>
          <Col style={{backgroundColor: 'red'}}>
            <Text>1</Text>
          </Col>
          <Col>
            {/* <Row style={{backgroundColor: 'yellow'}}><Text>2</Text></Row>
            <Row style={{backgroundColor: 'green'}}>
              <Text>3</Text>
            </Row> */}
          </Col>
        </Grid>
        <Grid>
          <Row style={{width: '30%', backgroundColor: 'yellow'}}>
            <Col style={{backgroundColor: 'red'}}>
              <Text>1</Text>
            </Col>
            <Col style={{backgroundColor: 'green'}}>
              <Text>2</Text>
            </Col>
          </Row>
          <Row style={{backgroundColor: 'yellow'}}>
            <Text>3</Text>
          </Row>
        </Grid>
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(FilterScreen)
