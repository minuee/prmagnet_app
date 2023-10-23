import React, {PureComponent} from 'react'
import {SafeAreaView, ScrollView, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {Grid, Col, Row} from 'react-native-easy-grid'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import API from '../../../common/aws-api'
import CategoryGroup from '../../common/CategoryGroup'
import ColorGroup from '../../common/ColorGroup'
import SizeGroup from '../../common/SizeGroup'
import SeasonsGroup from '../../common/SeasonsGroup'
import MaterialGroup from '../../common/MaterialGroup'
import BrandGroup from '../../common/BrandGroup'
import styles from './styles'

const genderSection = {여성: 'Women', 남성: 'Men', 젠더리스: 'Acc & Decor'}
//const sections = ['Brand', 'Category', 'Color', 'Size', 'Sample', 'Still Life Image', 'Material']
const sections = ['Brand', 'Category', 'Color', 'Size', 'Material']

class FilterScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      gender: [],
      section: _.has(this.params, 'brandId') ? sections[0] : sections[1],
      brands: [],
      brandId: this.params?.brandId || '',
      category: [],
      color: [],
      size: [],
      sample: null,
      stillLifeImg: null,
      material: [],
      seasons: [],
      dataSeason : null
    }
  }
  componentDidMount() {
    this.modalOption('FILTER')
    const {info} = this.params
    this.setState(info)
    this.getBrandSearchCompanyAZ()
    //this.getBrandSeason()
  }
  getBrandSeason = async () => {
    try {
      const response = await API.getBrandSeason()
      this.setState({dataSeason: response.list})
    } catch (error) {
    }
  }
  goFilter = () => {
    const {setFilter} = this.params
    setFilter(this.state)
    this.goBack()
  }
  handleReset = () => {
    this.setState({
      gender: [],
      section: _.has(this.params, 'brandId') ? sections[0] : sections[1],
      brandId: '',
      category: [],
      color: [],
      size: [],
      sample: null,
      stillLifeImg: null,
      material: [],
      seasons: [],
    })
  }
  toggleStateList = property => value => {
    //console.log('toggleStateList>>>', property, value)
    if (value) {
      this.setState(prevstate => {
        const list = prevstate[property]?.includes(value) ? prevstate[property]?.filter(item => item !== value) : prevstate[property]?.concat(value)
        //console.log('toggleStalisteList>>>', list)
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
  setBrand = brandId => {
    this.setState({brandId})
  }
  getBrandSearchCompanyAZ = async () => {
    try {
      const response = await API.getBrandSearchCompanyAZ()
      //console.log('getBrandSearchCompanyAZ>>>', JSON.stringify(response))
      this.setState({brands: response.list})
    } catch (error) {
      //console.log('getBrandSearchCompanyAZ>>>', error)
      await API.postErrLog({error: JSON.stringify(error), desc: 'getBrandSearchCompanyAZError'})
    }
  }
  render() {
    const {gender, section, brands, brandId, category, color, size, seasons, dataSeason, material} = this.state
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
                    if (!_.has(this.params, 'brandId') && item === 'Brand') return null
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
                  <BrandGroup data={brands} brandId={brandId} hide={section !== 'Brand'} setBrand={this.setBrand} />
                  <CategoryGroup 
                    data={data.category} 
                    value={category} 
                    genderList={gender} 
                    hide={section !== 'Category'} 
                    setFilter={this.toggleStateList('category')} 
                  />
                  <ColorGroup data={data.color} value={color} hide={section !== 'Color'} setFilter={this.toggleStateList('color')} />
                  <SizeGroup
                    data={sizeData}
                    showRtw={category.some(item => cRtwData?.includes(item))}
                    showShoes={category.some(item => cShoesData?.includes(item))}
                    value={size}
                    hide={section !== 'Size'}
                    setFilter={this.toggleStateList('size')}
                  />
                  {/* <FlagGroup value={sample} hide={section !== 'Sample'} name={'샘플'} setFilter={this.handleSetState('sample')} />
                  <FlagGroup
                    value={stillLifeImg}
                    hide={section !== 'Still Life Image'}
                    name={'누끼컷'}
                    setFilter={this.handleSetState('stillLifeImg')}
                  /> */}
                  <MaterialGroup data={data.material} value={material} hide={section !== 'Material'} setFilter={this.toggleStateList('material')} />
                  <SeasonsGroup data={dataSeason} value={seasons} hide={section !== 'Seasons'} setFilter={this.toggleStateList('seasons')} />
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
