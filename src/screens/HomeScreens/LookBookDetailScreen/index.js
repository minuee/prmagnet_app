import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, FlatList, TouchableOpacity, Pressable, Share} from 'react-native'
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
import Modal from 'react-native-modal';
import Clipboard from '@react-native-clipboard/clipboard';
import KakaoShareLink from 'react-native-kakao-share-link';

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'
import Loading from '../../common/Loading'
import API from '../../../common/aws-api'

const kakaoIcon = require('../../../images/common/kakao_icon.png')
const modelImg = require('../../../images/sample/model_1.png')
const newImg = require('../../../images/navi/new_1.png')
const closeImg = require('../../../images/navi/close_2.png')

class LookBookDetailScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      list: [],
      brandTitle: '',
      page: 1,
      limit: 10,
      share_uuid: '',
      link: false,
    }
  }

  copyToClipboard = () => {
    const {share_uuid} = this.state
    Clipboard.setString(` https://www.prmagnet.kr/#/share-lookbook/${share_uuid}`)
    this.setState({link: false})
    setTimeout(() => {
      this.alert('', '복사 완료')
    }, 500)
  }

  getLookBookDetail = async () => {
    const {lookbook_no} = this.props.route.params
    const {page, limit, list} = this.state
    try {
      const response = await API.getLookBookDetail({lookbook_no: lookbook_no, page: page, limit: limit})
      //console.log('getLookBookDetail>>>', JSON.stringify(response))
      if (response.success) {
        if (response.list.length > 0) {
          this.setState({list: list.concat(response.list), page: page + 1,brandTitle: response.lookbook_nm})
        }
      }
    } catch (error) {
      //console.log('getLookBookDetail>>>', error)
    }
  }

  getShare = async () => {
    const {lookbook_nm, lookbook_no} = this.props.route.params
    try {
      const response = await API.getShare({lookbook_no: lookbook_no})
      //console.log('getShare>>>', response)
      if (response.success) {
        this.setState({...this.state, share_uuid: response.share_uuid})
      }
    } catch (error) {
      //console.log('getShare>>>', error)
    }
  }

  componentDidMount() {
    this.pushOption('LookBook')
    this.onFocus(this.handleOnFocus)
    this.getShare()
  }
  componentWillUnmount() {
    this.removeFocus()
  }

  handleOnFocus = () => {
    this.getLookBookDetail()
  }

  kakaoshare = async() => {
    const {brandTitle, share_uuid} = this.state;
    const domain = mConst.shareDomain;
    try {
      const response = await KakaoShareLink.sendFeed({
        content: {
          title: '[PR MAGENT LookBook Share]' +brandTitle,
          imageUrl: 'https://www.prmagnet.kr/logo_meta2.png',
          link: {
            webUrl: domain + "#/share-lookbook/" + share_uuid,
            mobileWebUrl: domain + "#/share-lookbook/" + share_uuid,
          },
          description:  brandTitle,
        },
        buttons: [
          {
            title: '웹에서 보기',
            link: {
              webUrl: domain + "#/share-lookbook/" + share_uuid,
              mobileWebUrl: domain + "#/share-lookbook/" + share_uuid,
            },
          }
        ],
      });
      console.log(response);
    } catch (e) {
      console.error(e);
      console.error(e.message);
    }
  }

  renderItem = ({item}) => {
    //console.log('????', item)
    const {lookbook_no} = this.props.route.params
    return (
      <View style={{width: '49%', height: mUtils.wScale(350)}}>
        <View style={{width: '100%', height: mUtils.wScale(275)}}>
          <Pressable
            onPressOut={() => {
              this.pushTo('DigitalSRDetailScreen', {no: item.showroom_no, lookNo: lookbook_no, type: 'lookbook',title:item.showroom_nm})
            }}
          >
            {({pressed}) => (
              <FastImage resizeMode={'cover'} style={styles.modelImg} source={{uri: item.image_url}}>
                {pressed ? (
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(126, 161, 178, 0.8)',

                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={styles.title}>{item.showroom_nm}</Text>
                    {item.all_in_yn ? <Text style={styles.desc1}>ALL IN</Text> : null}
                    {item.category_list.map((item, index) => {
                      return <Text style={styles.desc2}>{item}</Text>
                    })}
                  </View>
                ) : null}
              </FastImage>
            )}
          </Pressable>
          {item.is_new ? <FastImage resizeMode={'contain'} style={styles.newImg} source={newImg} /> : null}
        </View>
        <Text style={styles.title1}>{item.showroom_nm}</Text>
        <View style={styles.desc3Wrap}>
          {/* {item.category_list.map((item, index) => {
            return <Text style={styles.desc3} key={index}>{item}</Text>
          })} */}
          {item.new_category_list !== null &&
            item.new_category_list.map((d,idx) => <Text key={d} style={styles.desc3}>{idx>0 && ","} {d.category_nm}{!d.is_input && '(미입고)'}</Text>)
          }
          {item.all_in_yn ? <Text style={styles.desc3}>{"  "}ALL IN</Text> : null}
        </View>
      </View>
    )
  }

  render() {
    const {list, brandTitle, link, share_uuid} = this.state
    const {user} = this.props
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.layout1}>
          <Text style={styles.mainTitle}>LookBook</Text>
          <View style={styles.shareWrap}>
            <TouchableOpacity style={styles.smallBox2} onPress={() => this.kakaoshare()}>
              <FastImage resizeMode={'contain'} style={styles.modelImg} source={kakaoIcon}></FastImage>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallBox} onPress={() => { this.setState({link: true}) }} >
              <Text style={styles.rightSmall}>Share</Text>
            </TouchableOpacity>            
          </View>
        </View>
        <View style={{paddingHorizontal: mUtils.wScale(20)}}>
          <Text style={styles.brandTitle}>{brandTitle}</Text>
          <FlatList
            bounces={false}
            data={list}
            renderItem={this.renderItem}
            keyExtractor={item => `${item.showroom_nm}_${Math.random()}`}
            contentContainerStyle={{paddingVertical: mUtils.wScale(20), paddingBottom: mUtils.wScale(150)}}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <Modal isVisible={link} style={{margin: 0, padding: 0, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                this.setState({link: false})
              }}
            >
              <FastImage style={styles.closeImg} resizeMode={'contain'} source={closeImg} />
            </TouchableOpacity>
            <Text style={styles.shareText}>Share</Text>
            <TouchableOpacity
              style={styles.layout3}
              onPress={() => {
                this.copyToClipboard()
              }}
            >
              <View style={styles.urlBox}>
                <Text style={styles.urlText} numberOfLines={1}>
                  https://www.prmagnet.kr/share-lookbook/{share_uuid}
                </Text>
              </View>
              <View style={styles.urlButton}>
                <Text style={styles.buttonText}>링크복사</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({})
)(LookBookDetailScreen)
