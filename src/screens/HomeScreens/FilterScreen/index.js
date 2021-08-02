import React, {PureComponent} from 'react'
import {SafeAreaView, ScrollView, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {Grid, Col, Row} from 'react-native-easy-grid'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import CategoryGroup from '../../common/CategoryGroup'
import ColorGroup from '../../common/ColorGroup'
import SizeGroup from '../../common/SizeGroup'
import FlagGroup from '../../common/FlagGroup'
import MaterialGroup from '../../common/MaterialGroup'
import styles from './styles'

const genderSection = {여성: 'Women', 남성: 'Men', 유니섹스: 'Unisex'}
const sections = ['Category', 'Color', 'Size', 'Sample', 'Still Life Image', 'Material']

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
      sample: null,
      stillLifeImg: null,
      material: [],
    }
  }
  componentDidMount() {
    this.modalOption('FILTER')
    const {info} = this.params
    this.setState(info)
  }
  goFilter = () => {
    const {setFilter} = this.params
    setFilter(this.state)
    this.goBack()
  }
  handleReset = () => {
    this.setState({
      gender: [],
      section: sections[0],
      category: [],
      color: [],
      size: [],
      sample: null,
      stillLifeImg: null,
      material: [],
    })
  }
  toggleStateList = property => value => {
    if (value) {
      this.setState(prevstate => {
        const list = prevstate[property]?.includes(value) ? prevstate[property]?.filter(item => item !== value) : prevstate[property]?.concat(value)
        if (property === 'gender' && list.length === 3) return {gender: []}
        return {[property]: list}
      })
    } else {
      this.setState({[property]: []})
    }
  }
  handleSetState = property => value => {
    this.setState({[property]: value})
  }
  render() {
    const {gender, section, category, color, size, sample, stillLifeImg, material} = this.state
    const {data} = this.params
    const sizeData = data?.category?.filter(item => item.sample_catgry_lrge_cl_nm === 'Shoes')[0]?.gender_size_list
    const cRtwData = data?.category
      ?.filter(item => item.sample_catgry_lrge_cl_nm === 'RTW')[0]
      ?.each_list.flatMap(item => item.sample_catgry_middle_cl_cd)
    const cShoesData = data?.category
      ?.filter(item => item.sample_catgry_lrge_cl_nm === 'Shoes')[0]
      ?.each_list.flatMap(item => item.sample_catgry_middle_cl_cd)
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
                {_.map(data.gender, (item, index) => {
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
                      <TouchableOpacity key={index} onPress={() => this.handleSetState('section')(item)}>
                        <Row style={selected ? styles.sectionWrapperOn : styles.sectionWrapper}>
                          <Text style={selected ? styles.sectionTextOn : styles.sectionText}>{item}</Text>
                        </Row>
                      </TouchableOpacity>
                    )
                  })}
                </Col>
                <Col size={65}>
                  <CategoryGroup data={data.category} value={category} hide={section !== 'Category'} setFilter={this.toggleStateList('category')} />
                  <ColorGroup data={data.color} value={color} hide={section !== 'Color'} setFilter={this.toggleStateList('color')} />
                  <SizeGroup
                    data={sizeData}
                    showRtw={category.some(item => cRtwData?.includes(item))}
                    showShoes={category.some(item => cShoesData?.includes(item))}
                    value={size}
                    hide={section !== 'Size'}
                    setFilter={this.toggleStateList('size')}
                  />
                  <FlagGroup value={sample} hide={section !== 'Sample'} setFilter={this.handleSetState('sample')} />
                  <FlagGroup value={stillLifeImg} hide={section !== 'Still Life Image'} setFilter={this.handleSetState('stillLifeImg')} />
                  <MaterialGroup data={data.material} value={material} hide={section !== 'Material'} setFilter={this.toggleStateList('material')} />
                </Col>
              </Row>
            </Grid>
          </ScrollView>
          <Row style={styles.bottom}>
            <TouchableOpacity style={styles.leftButton} onPress={() => this.handleReset()}>
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
