import React, {PureComponent} from 'react'
import {SafeAreaView, TouchableOpacity} from 'react-native'
import {Grid, Row} from 'react-native-easy-grid'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import API from '../../../common/aws-api'
import BrandGroup from '../../common/BrandGroup'
import Text from '../../common/Text'
import styles from './styles'

class SelectBrandScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      brandId: this.params.brandId,
      brands: [],
      search: [],
    }
  }
  componentDidMount() {
    this.modalOption('Brands')
    this.getBrandSearchCompanyAZ()
    //console.log('###SelectBrandScreen-brandId:', this.params.brandId)
  }
  setBrand = brandId => {
    this.setState({brandId})
  }
  searchResult = text => {
    this.setState({search: text})
  }
  getBrandSearchCompanyAZ = async () => {
    try {
      const response = await API.getBrandSearchCompanyAZ()
      //console.log('getBrandSearchCompanyAZ>>>', JSON.stringify(response))
      const brands = _.get(response, 'list', []);
      const brandDatas = brands.filter((item) =>  item.each_list.length > 0 )
      this.setState({brands:brandDatas })
    } catch (error) {
      console.log('getBrandSearchCompanyAZ>>>', error)
      await API.postErrLog({error: JSON.stringify(error), desc: 'getBrandSearchCompanyAZError'})
    }
  }
  handleReset = () => {
    this.setState({brandId: ''})
  }
  handleConfirm = () => {
    const {brandId} = this.state
    const {setBrand} = this.params
    brandId ? setBrand(brandId) : setBrand(this.params.brandId)
    this.goBack()
  }
  render() {
    const {brandId, brands} = this.state;
    
    return (
      <SafeAreaView style={styles.container}>
        <Grid>
          <Row style={styles.middle}>
            <BrandGroup data={brands} brandId={brandId} setBrand={this.setBrand} />
          </Row>
          <Row style={styles.bottom}>
            <TouchableOpacity style={styles.leftButton} onPress={this.handleReset}>
              <Text style={styles.leftText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightButton} onPress={this.handleConfirm}>
              <Text style={styles.rightText}>Confirm</Text>
            </TouchableOpacity>
          </Row>
        </Grid>
      </SafeAreaView>
    )
  }
}

export default SelectBrandScreen
