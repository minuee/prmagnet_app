import React, {PureComponent} from 'react'
import {SafeAreaView, ScrollView, View, TouchableOpacity, Image} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import {Grid, Col, Row} from 'react-native-easy-grid'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
// import cBind, {callOnce} from '../../../common/header'
import Text from '../../common/Text'
import CategoryGroup from '../../common/CategoryGroup'
import styles from './styles'

const genders = ['WOMEN', 'MEN', 'Unisex']
const sections = ['Brands', 'Category', 'Availability', 'Color', 'Size', 'Sample', 'Still Life Image', 'Material']
const categories = [
  ['Jewelry', '링', '브레이슬릿', '이어링', '네크리스', '워치', 'Others'],
  ['Accessory', '벨트', '아이웨어', '넥타이', '모자', '스카프 & 장갑', '테크', '지갑', '파우치', 'Others'],
  ['Handbag', '탑 핸들 백', '토트 백', '숄더 백', '크로스바디 백', '벨트 백 & 백팩', '미니 백', '클러치 & 포트폴리오', '러기지 & 트레블 백'],
  ['Decor', '캔들', '체어', '월페이퍼', '스크린', '트레이', '테이블웨어', '쿠션', '담요', '머그'],
  [
    'Shoes',
    '스니커즈',
    '펌프스 & 뮬',
    '슬리퍼',
    '샌들',
    '발레리나 슈즈',
    '부츠 & 부티',
    '슬라이트 & 통',
    '모카신 & 로퍼',
    '에스파드리유 & 웨지',
    '레이스업',
  ],
  ['RTW', '아우터웨어', '탑 & 셔츠', '드레스', '팬츠', '스커트', '티셔츠 & 스웨트셔츠', '니트웨어', '언더웨어 & 스윔웨어', '액티브 웨어', '데님'],
]
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
  componentDidMount() {
    this.pushOption('FILTER')
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
          <ScrollView
            ref={comp => (this.scrollView = comp)}
            // contentContainerStyle={{paddingVertical: 10}}
            onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
          >
            {/* {this.closeBackOption(closeBtnImage, 'FILTER', null)} */}
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
                  {_.map(categories, (item, index) => (
                    <CategoryGroup key={index} data={item} />
                  ))}
                </Col>
              </Row>
            </Grid>
          </ScrollView>
        </SafeAreaView>
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(FilterScreen)
