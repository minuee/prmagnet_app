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
      selectBrand: '',
      brands: [],
      search: [],
    }
  }
  componentDidMount() {
    this.modalOption('Brands')
    this.getBrandSearchCompanyAZ()
  }
  selectBrand = brand => {
    this.setState({selectBrand: brand})
  }
  searchResult = text => {
    this.setState({search: text})
  }
  getBrandSearchCompanyAZ = async () => {
    try {
      let response = await API.getBrandSearchCompanyAZ()
      console.log('getBrandSearchCompanyAZ>>>', JSON.stringify(response))
      this.setState({brands: response.list})
    } catch (error) {
      console.log('getBrandSearchCompanyAZ>>>', error)
      await API.postErrLog({error: JSON.stringify(error), desc: 'getBrandSearchCompanyAZError'})
    }
  }
  render() {
    const {brands} = this.state
    return (
      <SafeAreaView style={styles.container}>
        <Grid>
          <Row style={styles.middle}>
            <BrandGroup data={brands} search={this.searchResult} brand={this.selectBrand} />
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
