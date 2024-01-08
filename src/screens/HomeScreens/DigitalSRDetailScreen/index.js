import React, {PureComponent} from 'react';
import {SafeAreaView, Dimensions,View, ScrollView, FlatList, TouchableOpacity, Pressable, Image} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import Header from '../../common/Header';
import _ from 'lodash';
import Swiper from 'react-native-swiper';
import Modal from 'react-native-modal';
import Clipboard from '@react-native-clipboard/clipboard';
import KakaoShareLink from 'react-native-kakao-share-link';
import Icon from 'react-native-vector-icons/AntDesign';
import mConst from '../../../common/constants';
import mUtils from '../../../common/utils';
import cBind, {callOnce} from '../../../common/navigation';
import Text from '../../common/Text';
import styles from './styles';
import API from '../../../common/aws-api';
import Loading from '../../common/Loading';
import MoreLoading from '../../common/MoreLoading';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');
const noCheckImg = require('../../../images/navi/no_check_1.png');
const checkImg = require('../../../images/navi/check_1.png');
const shareImg = require('../../../images/navi/share_1.png');
const closeImg = require('../../../images/navi/close_2.png');
const LeftArrowImg = require('../../../images/navi/back.png');
const RightArrowImg = require('../../../images/navi/go_1.png');
class DigitalSRDetailScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      data: '', 
      link: false,
      moreLoading : false,
      screenTitle: '',
      showTopButton :false
    }
  }

  copyToClipboard = () => {
    const {share_uuid,no} = this.state
    Clipboard.setString(` https://www.prmagnet.kr/#/share-lookbook-detail/${share_uuid}/${no}`)
    this.setState({link: false})
    setTimeout(() => {
      this.alert('', '복사 완료')
    }, 500)
  }

  getSRDetail = async (sno = null) => {
    const {no} = this.props.route.params
    try {
      const response = await API.getSRDetail(sno === null ? no : sno)
      console.log('getSRDetail>>>', no, JSON.stringify(response))
      this.setState({
        data: response,
        moreLoading : false,
        screenTitle : response.showroom_nm
      })
      this.titleOption(response.showroom_nm || '')
    } catch (error) {
      this.setState({moreLoading : false,})
      console.log('getSRDetail>>111>', error)
    }
  }

  getLookBookSRDetail = async ( ) => {
    const {no, lookNo} = this.props.route.params
    try {
      const response = await API.getLookBookSRDetail(lookNo, no)
      //console.log('getSRDetail>>>', JSON.stringify(response))
      this.setState({
          data: response,
          no, lookNo,
          screenTitle : response.showroom_nm
      })
    } catch (error) {
      console.log('getLookBookSRDetail>>>', error)
    }
  }

  getShare = async () => {
    const {no, lookNo} = this.props.route.params
    try {
      const response = await API.getShare({lookbook_no: lookNo})
      //console.log('getShare>>>', response)
      if (response.success) {
        this.setState({...this.state, share_uuid: response.share_uuid,no, lookNo})
      }
    } catch (error) {
      //console.log('getShare>>>', error)
    }
  }

  componentDidMount() {    
    const {title,type} = this.props.route.params;
    if ( type !== 'digital' ) {
      this.setState({
        screenTitle : title
      })
      this.shareOption(title , this.handleshare, this.kakaoshare);
    }else{
      this.titleOption(title || '')
    }
    
    this.onFocus(this.handleOnFocus)
  }
  componentWillUnmount() {
    this.removeFocus()
  }

  handleshare = () => {
    this.setState({link: true})
  }

  moveNextShowroom = async(sno = null) => {
    if ( sno != null ) {
      await this.setState({moreLoading:true})
      await this.getSRDetail(sno)
      this.scrollView.scrollTo({ x: 0,  animated: true });
    }
  }

  kakaoshare = async() => {
    const {share_uuid,no,data,screenTitle} = this.state
    const domain = mConst.shareDomain;
    try {
      const response = await KakaoShareLink.sendFeed({
        content: {
          title: '[PR MAGENT LookBook Share]' + screenTitle,
          imageUrl: mUtils.isEmpty(data.sample_list[0].sample_image_list[0].full_url) ? 'https://www.prmagnet.kr/logo_meta2.png' : data.sample_list[0].sample_image_list[0].full_url,
          link: {
            webUrl: domain + "#/share-lookbook-detail/" + share_uuid + "/" + no,
            mobileWebUrl: domain + "#/share-lookbook-detail/" + share_uuid+ "/" + no,
          },
          description:  screenTitle,
        },
        buttons: [
          {
            title: '웹에서 보기',
            link: {
              webUrl: domain + "#/share-lookbook-detail/" + share_uuid+ "/" + no,
              mobileWebUrl: domain + "#/share-lookbook-detail/" + share_uuid+ "/" + no,
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

  handleOnFocus = () => {
    const {type} = this.props.route.params

    type !== 'digital' ? (this.getLookBookSRDetail(), this.getShare()) : this.getSRDetail()
  }

  upButtonHandler = () => {        
    this.scrollView.scrollTo({ x: 0,  animated: true });
  };

  handleOnScroll (event) {             
    if ( event.nativeEvent.contentOffset.y >= SCREEN_HEIGHT*0.8 ) {
        this.setState({showTopButton : true}) 
    }else{
        this.setState({showTopButton : false}) 
    }
  }
  render() {
    const {data, link, share_uuid} = this.state;
    const {type} = this.props.route.params
    return data ? (
      <SafeAreaView style={styles.container}>
        {/*  <Header pushTo={this.pushTo} userType={this.props.user.userType}  /> */}

        { this.state.showTopButton &&
          <TouchableOpacity 
              style={styles.fixedUpButton}
              onPress={e => this.upButtonHandler()}
          >
              <Icon name="up" size={mUtils.wScale(25)} color="#555" />
          </TouchableOpacity>
        }
        <ScrollView
          ref={(ref) => {this.scrollView = ref;}}
          showsVerticalScrollIndicator={false}
          indicatorStyle={'white'}
          scrollEventThrottle={16}
          keyboardDismissMode={'on-drag'}
          onScroll={e => this.handleOnScroll(e)}
        >
         
          {/* {type !== 'digital' && (
            <TouchableOpacity
              style={styles.shareTouch}
              onPress={() => {
                this.setState({link: true})
              }}
            >
              <FastImage style={styles.shareImg} resizeMode={'contain'} source={shareImg} />
            </TouchableOpacity>
          )}
        */}
          { type == 'digital' && 
          <View style={{paddingHorizontal: mUtils.wScale(20), marginTop: mUtils.wScale(25)}}>
            <View style={styles.topLayout}> 
              <Text style={styles.left}>공개여부{" "}</Text><FastImage resizeMode={'contain'} style={styles.checkImg} source={data.show_yn == 'Y' ? checkImg : noCheckImg} />
              <Text style={styles.left}>{"   "}주력상품{" "}</Text><FastImage resizeMode={'contain'} style={styles.checkImg} source={data.mfrc_sample_yn ? checkImg : noCheckImg} />
            </View>
          </View>
          }
          {data.sample_list.map((item, index) => {
            return (
              <React.Fragment key={index}>
                
                <View>
                  <Swiper
                    loop={false}
                    height={mUtils.wScale(500)}
                    style={{height: mUtils.wScale(500), flex: 0}}
                    containerStyle={{
                      height: mUtils.wScale(500),
                      flex: 0,
                    }}
                    activeDotColor={mConst.black}
                    dotColor={mConst.white}
                    dotStyle={styles.swipeDot}
                    activeDotStyle={styles.swipeActiveDot}
                  >
                    {
                    Array.isArray(item.sample_image_list) &&
                    item.sample_image_list.map((sitem, sindex) => {
                      return (
                        <FastImage
                          key={sindex}
                          resizeMode={'contain'}
                          style={{width: '100%', height: mUtils.wScale(500)}}
                          source={{uri: sitem.full_url}}
                        />
                      )
                    })}
                  </Swiper>
                </View>

                <View style={{paddingHorizontal: mUtils.wScale(20), marginTop: mUtils.wScale(25)}}>
                  {index === 0 ? <Text style={styles.title}>{data.showroom_nm}</Text> : null}

                  <View style={styles.emptyBar} />
                  <View style={styles.layout}>
                    <View style={styles.layoutLeft}> 
                      <Text style={styles.left}>Sample Name</Text>
                    </View>
                    <View style={styles.layoutRight}> 
                      <Text style={{...styles.left2}}>{item.sample_nm}</Text>
                    </View>
                                      
                  </View>
                  {/* <View style={styles.layout}>
                    <Text style={styles.left}>이용 상태</Text>
                    { 
                      item.now_req_status_nm === '대여중' ?
                      <Text style={{...styles.rightRed}}>
                        {item.now_req_status_nm}{"\n"}
                        {mUtils.dateToDate(item.duty_recpt_dt)} ~ {mUtils.dateToDate(item.return_prearnge_dt)}
                      </Text>
                      :
                      <Text style={{...styles.right}}>
                        {item.now_req_status_nm}
                      </Text>
                    }  
                  </View> */}
                  <View style={styles.layout}>
                    <View style={styles.layoutLeft}> 
                      <Text style={styles.left}>Season</Text>
                    </View>
                    <View style={styles.layoutRight}> 
                      <Text style={{...styles.right}}>{data.season_text}</Text>
                    </View>
                  </View>
                  <View style={styles.layout}>
                    <View style={styles.layoutLeft}> 
                      <Text style={styles.left}>Gender</Text>
                    </View>
                    <View style={styles.layoutRight}> 
                      <Text style={{...styles.right}}>{item.gender_text}</Text>
                    </View>
                  </View>
                  <View style={styles.layout}>
                    <View style={styles.layoutLeft}> 
                      <Text style={styles.left}>Category</Text>
                    </View>
                    <View style={styles.layoutRight}> 
                      <Text style={{...styles.right}}>{item.category_middle_text}</Text>
                    </View>
                  </View>
                  <View style={styles.layout}>
                    <View style={styles.layoutLeft}> 
                      <Text style={styles.left}>Color</Text>
                    </View>
                    <View style={styles.layoutRight}> 
                      <Text style={{...styles.right}}>
                        {item.color_text?.map((d, i) =>
                          i === item.color_text.length - 1 ? d : d + ", "
                        )}
                       </Text>
                    </View>
                  </View>
                  <View style={styles.layout}>
                    <View style={styles.layoutLeft}> 
                      <Text style={styles.left}>Price</Text>
                    </View>
                    <View style={styles.layoutRight}> 
                      <Text style={{...styles.right}}>
                      {
                        ( item.price == 0 || item.price == null ) ?
                        '가격미정'
                        :
                        item.price*1 > 0 ? mUtils.numberWithCommas(item.price)
                        :
                        item.price
                      }
                      {
                        (item.price === null || item.price === 0 || item?.price_is_real )
                        ? ""
                        : 
                        "만원대"
                      }
                      </Text>
                    </View>
                  </View>
                  <View style={styles.layout}>
                    <View style={styles.layoutLeft}> 
                      <Text style={styles.left}>Material</Text>
                    </View>
                    <View style={styles.layoutRight}> 
                      <Text style={{...styles.right}}>{item.material_text}</Text>
                    </View>
                  </View>                 
                  <View style={styles.layout}>
                    <View style={styles.layoutLeft}> 
                      <Text style={styles.left}>Size</Text>
                    </View>
                    <View style={styles.layoutRight}> 
                      <Text style={{...styles.right}}>{item.size_direct_input}</Text>
                    </View>
                  </View>
                  <View style={styles.layout}>
                    <View style={styles.layoutLeft}> 
                      <Text style={styles.left}>샘플 입고</Text>
                    </View>
                    <View style={styles.right}> 
                      <FastImage resizeMode={'contain'} style={styles.checkImg} source={item.in_yn ? checkImg : noCheckImg} />
                    </View>
                  </View>

                  <Text style={styles.left2}>국문 캡션</Text>
                  <View style={{...styles.layout1, marginTop: mUtils.wScale(10)}}>
                    <Text style={styles.desc}>{item.caption_korean}</Text>
                  </View>
                  <Text style={[styles.left2,{ marginTop: mUtils.wScale(16)}]}>영문 캡션</Text>
                  <View style={{...styles.layout1, marginTop: mUtils.wScale(6), marginBottom: mUtils.wScale(13)}}>
                    <Text style={styles.desc}>{item.caption_english}</Text>
                  </View>
                  <Text style={styles.left2}>기타 사항</Text>
                  <View style={{...styles.layout2, marginTop: mUtils.wScale(10), marginBottom: mUtils.wScale(30)}}>
                    <Text style={styles.desc}>{item.etc}</Text>
                  </View>
                </View>
              </React.Fragment>
            )
          })}
          { type == 'digital' && 
          <View style={{paddingHorizontal: mUtils.wScale(20), marginTop: mUtils.wScale(25)}}>
            <View style={styles.bottomLayout}> 
              { !mUtils.isEmpty(data.prev_showroom_no) ? 
                <TouchableOpacity style={styles.layoutLeft} onPress={()=> this.moveNextShowroom(data.prev_showroom_no)}>
                  <FastImage style={styles.closeImg} resizeMode={'contain'} source={LeftArrowImg} />
                </TouchableOpacity>
                :
                <View  style={styles.layoutLeft} />
              }
              { !mUtils.isEmpty(data.next_showroom_no) ? 
                <TouchableOpacity  style={styles.layoutRight} onPress={()=> this.moveNextShowroom(data.next_showroom_no)}>
                    <FastImage style={styles.closeImg} resizeMode={'contain'} source={RightArrowImg} />
                </TouchableOpacity>
                :
                <View  style={styles.layoutRight}/>
              }
            </View>
          </View>
          }
        </ScrollView>
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
        { this.state.moreLoading &&
            <MoreLoading />
        }
      </SafeAreaView>
    ) : (
      <Loading />
    )
  }
}

export default connect(
  state => ({user: state.user,}),
  dispatch => ({})
)(DigitalSRDetailScreen)