import React, {PureComponent} from 'react'
import {SafeAreaView, View, TouchableOpacity, Image} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
//import cBind, {callOnce} from '../../../common/navigation'
import cBind, {callOnce} from '../../../common/header'
import Text from '../../common/Text'
import {Grid, Col, Row} from 'react-native-easy-grid'
import styles from './styles'

const genders = ['WOMEN', 'MEN', 'Unisex']
const sections = ['Brands', 'Category', 'Availability', 'Color', 'Size', 'Sample', 'Still Life Image', 'Material']
const closeBtnImage = require('../../../images/navi/close.png')
const foldImage = require('../../../images/common/fold.png')
const unfoldImage = require('../../../images/common/unfold.png')
const selectedImage = require('../../../images/common/selected.png')

class FilterScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      gender: genders[0],
      section: sections[0],
    }
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
        <SafeAreaView style={styles.container}>
          {this.closeBackOption(closeBtnImage, 'FILTER', null)}
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
                    <TouchableOpacity key={index} onPress={() => this.handleSelectSection(item)}>
                      <Row style={selected ? styles.sectionWrapperOn : styles.sectionWrapper}>
                        <Text style={selected ? styles.sectionTextOn : styles.sectionText}>{item}</Text>
                      </Row>
                    </TouchableOpacity>
                  )
                })}
              </Col>
              <Col size={65}>
                <TouchableOpacity onPress={() => this.alert('', 'ok2')}>
                  <Row style={styles.itemWrapper}>
                    <Text style={styles.itemHeadText}>RTW</Text>
                    <FastImage source={foldImage} style={styles.foldImage} />
                  </Row>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.alert('', 'ok2')}>
                  <Row style={styles.itemWrapper}>
                    <Text style={styles.itemText}>ㄴ 아우터웨어</Text>
                    <FastImage source={selectedImage} style={styles.foldImage} />
                  </Row>
                </TouchableOpacity>
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
