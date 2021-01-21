import React, {PureComponent} from 'react'
import {SafeAreaView, View, TouchableOpacity, Image} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'
import {Header} from 'react-native-elements'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import {Grid, Col, Row} from 'react-native-easy-grid'
import styles from './styles'

const genders = ['WOMEN', 'MEN', 'Unisex']
const sections = ['Brands', 'Category', 'Availability', 'Color', 'Size', 'Sample', 'Still Life Image', 'Material']
const closeBtnImage = require('../../../images/navi/close.png')

class FilterScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      gender: genders[0],
      section: sections[0],
    }
  }
  componentDidMount() {
    this.modalOption('FILTER')
  }
  handleSelectGender = gender => {
    this.setState({gender})
  }
  handleSelectSection = section => {
    this.setState({section})
  }
  render() {
    const {gender, section} = this.state
    return (
      <>
        <Header
          backgroundColor={'#ffffff'}
          barStyle="dark-content"
          statusBarProps={{
            translucent: true,
            backgroundColor: '#ffffff',
          }}
          containerStyle={{
            borderBottomWidth: 0,
            height: 90,
          }}
          leftComponent={
            <TouchableOpacity style={{paddingLeft: 12}}>
              <Image style={{width: 30, height: 30}} source={closeBtnImage} />
            </TouchableOpacity>
          }
          centerComponent={<Text style={{fontSize: 24, fontWeight: 'bold', color: '#000000', alignSelf: 'center'}}>FILTER</Text>}
          centerContainerStyle={{justifyContent: 'center'}}
        />
        <SafeAreaView style={styles.container}>
          <Grid>
            <Row style={styles.headerWrapper}>
              {_.map(genders, (item, index) => {
                const selected = item === gender
                return (
                  <TouchableOpacity key={index} onPress={() => this.handleSelectGender(item)}>
                    <Text style={selected ? styles.headerTextOn : styles.headerText}>{item}</Text>
                  </TouchableOpacity>
                )
              })}
            </Row>
            <Row>
              <Col size={35}>
                {_.map(sections, (item, index) => {
                  const selected = item === section
                  return (
                    <TouchableOpacity onPress={() => this.handleSelectSection(item)}>
                      <Row style={selected ? styles.sectionWrapperOn : styles.sectionWrapper}>
                        <Text style={selected ? styles.sectionTextOn : styles.sectionText}>{item}</Text>
                      </Row>
                    </TouchableOpacity>
                  )
                })}
              </Col>
              <Col size={65}>
                {/* <TouchableOpacity onPress={() => this.alert('', 'ok2')}> */}
                <Row
                  style={{
                    // width: mConst.wWidth,
                    height: mUtils.wScale(50),
                    alignItems: 'center',
                    paddingHorizontal: mUtils.wScale(5),
                    borderTopWidth: 1,
                    borderColor: 'black',
                    backgroundColor: 'yellow',
                  }}
                >
                  <Text>Category (2)</Text>
                </Row>
                {/* </TouchableOpacity>
              <TouchableOpacity onPress={() => this.alert('', 'ok2')}> */}
                <Row
                  style={{
                    // width: mConst.wWidth,
                    height: mUtils.wScale(50),
                    alignItems: 'center',
                    paddingHorizontal: mUtils.wScale(5),
                    borderTopWidth: 1,
                    borderColor: 'black',
                    backgroundColor: 'yellow',
                  }}
                >
                  <Text>Category (2)</Text>
                </Row>
                {/* </TouchableOpacity>
              <TouchableOpacity onPress={() => this.alert('', 'ok2')}> */}
                <Row
                  style={{
                    // width: mConst.wWidth,
                    height: mUtils.wScale(50),
                    alignItems: 'center',
                    paddingHorizontal: mUtils.wScale(5),
                    borderTopWidth: 1,
                    borderColor: 'black',
                    backgroundColor: 'yellow',
                  }}
                >
                  <Text>Category (2)</Text>
                </Row>
                {/* </TouchableOpacity>
              <TouchableOpacity onPress={() => this.alert('', 'ok2')}> */}
                <Row
                  style={{
                    // width: mConst.wWidth,
                    height: mUtils.wScale(50),
                    alignItems: 'center',
                    paddingHorizontal: mUtils.wScale(5),
                    borderTopWidth: 1,
                    borderColor: 'black',
                    backgroundColor: 'yellow',
                  }}
                >
                  <Text>Category (2)</Text>
                </Row>
                {/* </TouchableOpacity>
              <TouchableOpacity onPress={() => this.alert('', 'ok2')}> */}
                <Row
                  style={{
                    // width: mConst.wWidth,
                    height: mUtils.wScale(50),
                    alignItems: 'center',
                    paddingHorizontal: mUtils.wScale(5),
                    borderTopWidth: 1,
                    borderColor: 'black',
                    backgroundColor: 'yellow',
                  }}
                >
                  <Text>Category (2)</Text>
                </Row>
                {/* </TouchableOpacity> */}
              </Col>
            </Row>
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
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(FilterScreen)
