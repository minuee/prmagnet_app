import React, {PureComponent} from 'react'
import {SafeAreaView, ScrollView, View, TouchableOpacity, Image} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import {Grid, Col, Row} from 'react-native-easy-grid'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import CategoryGroup from '../../common/CategoryGroup'
import ColorGroup from '../../common/ColorGroup'
import MaterialGroup from '../../common/MaterialGroup'
import BrandGroup from '../../common/BrandGroup'
import styles from './styles'
import API from '../../../common/aws-api'

const genderSection = {여성: 'Women', 남성: 'Men', 유니섹스: 'Unisex'}
const sections = ['Category', 'Color', 'Size', 'Sample', 'Still Life Image', 'Material']
const categories = [
  ['RTW', '아우터웨어', '탑 & 셔츠', '드레스', '팬츠', '스커트', '티셔츠 & 스웨트셔츠', '니트웨어', '언더웨어 & 스윔웨어', '액티브 웨어', '데님'],
  ['Bag', '탑 핸들 백', '토트 백', '숄더 백', '크로스바디 백', '벨트 백 & 백팩', '미니 백', '클러치 & 포트폴리오', '러기지 & 트레블 백'],
  ['Deco', '캔들', '체어', '월페이퍼', '스크린', '트레이', '테이블웨어', '쿠션', '담요', '머그'],
  ['Accessory', '벨트', '아이웨어', '넥타이', '모자', '스카프 & 장갑', '테크', '지갑', '파우치', 'Others'],
  ['Jewelry', '링', '브레이슬릿', '이어링', '네크리스', '워치', 'Others'],
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
]
const colors = [
  ['white', '화이트'],
  ['black', '블랙'],
  ['red', '레드'],
  ['orange', '오렌지'],
  ['yellow', '옐로우'],
  ['green', '그린'],
  ['blue', '블루'],
  ['navy', '네이비'],
  ['purple', '퍼플'],
  ['brown', '브라운'],
  ['gold', '골드/실버'],
  ['pink', '핑크'],
  ['multi', '멀티컬러'],
]
const materials = [
  '코튼',
  '레더',
  '레더-카프스킨',
  '레더-램스킨',
  '레더-프리셔스 스킨',
  '울',
  '캔버스',
  '데님',
  '벨벳',
  '실크',
  '시어링',
  '지속가능한 소재',
  'etc',
]

const closeBtnImage = require('../../../images/navi/close.png')
const foldImage = require('../../../images/common/fold.png')
const unfoldImage = require('../../../images/common/unfold.png')
const selectedImage = require('../../../images/common/selected.png')
const moreImg = require('../../../images/navi/more_2.png')
const moreImgOn = require('../../../images/navi/more_2_1.png')

class FilterScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      gender: [],
      section: sections[0],
      category: [],
      color: [],
      size: [],
      material: [],
    }
  }
  goFilter = () => {
    console.log('>>>>>>', this.params.setFilter)
    const {selectBrand} = this.state
    this.params.setFilter({
      brand_id: selectBrand,
    })
    this.goBack()
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
  toggleStateList = property => value => {
    if (value) {
      this.setState(
        prevstate => {
          const list = prevstate[property]?.includes(value) ? prevstate[property]?.filter(item => item !== value) : prevstate[property]?.concat(value)
          if (property === 'gender' && list.length === 3) return {gender: []}
          return {[property]: list}
        },
        () => console.log('########:', this.state[property])
      )
    } else {
      this.setState({[property]: []})
    }
  }
  render() {
    const {gender, section, category, color, material} = this.state
    const {info} = this.params
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
                <TouchableOpacity onPress={() => this.toggleStateList('gender')()}>
                  <Text style={gender.length === 0 ? styles.headerTextOn : styles.headerText}>All</Text>
                </TouchableOpacity>
                {_.map(info.gender, (item, index) => {
                  const selected = gender.includes(item.cd_id)
                  return (
                    <TouchableOpacity key={index} onPress={() => this.toggleStateList('gender')(item.cd_id)}>
                      <Text style={selected ? styles.headerTextOn : styles.headerText}>{genderSection[item.cd_nm]}</Text>
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
                  {['Availability', 'Size', 'Sample', 'Still Life Image'].includes(section) && <Text>"{section}" : 서비스 준비중입니다.</Text>}
                  <CategoryGroup data={info.category} value={category} hide={section !== 'Category'} setFilter={this.toggleStateList('category')} />
                  <ColorGroup data={info.color} value={color} hide={section !== 'Color'} setFilter={this.toggleStateList('color')} />
                  <MaterialGroup data={info.material} value={material} hide={section !== 'Material'} setFilter={this.toggleStateList('material')} />
                </Col>
              </Row>
            </Grid>
          </ScrollView>
          <Row style={styles.bottom}>
            <TouchableOpacity style={styles.leftButton}>
              <Text style={styles.leftText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightButton} onPress={() => this.goFilter()}>
              <Text style={styles.rightText}>Confirm</Text>
            </TouchableOpacity>
          </Row>
        </SafeAreaView>
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(FilterScreen)
