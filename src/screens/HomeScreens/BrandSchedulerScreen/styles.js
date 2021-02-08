import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
  },
  mainTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    textAlign: 'left',
    color: mConst.black,
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    textAlign: 'center',
    color: '#070708',
  },
  celLook: {
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    textAlign: 'left',
    color: mConst.black,
  },
  dateSeason: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    textAlign: 'left',
    color: mConst.black,
  },
  date: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    textAlign: 'left',
    color: mConst.black,
  },
  change: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 14,
    textAlign: 'left',
    color: '#7ea1b2',
  },
  smallTitle: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 11,
    textAlign: 'left',
    color: mConst.black,
  },
  smallDesc: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 11,
    textAlign: 'left',
    color: mConst.black,
  },
  name: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 15,
    textAlign: 'left',
    color: mConst.black,
  },
  brandDate: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    textAlign: 'left',
    color: '#999999',
  },
  desc: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    textAlign: 'left',
    color: mConst.black,
  },
  layout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  layout1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  layout2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: mUtils.wScale(3),
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: mConst.borderGray,
    justifyContent: 'center',
    paddingHorizontal: mUtils.wScale(8),
    paddingVertical: mUtils.wScale(5),
  },
  layout3: {
    width: '100%',
    borderRadius: mUtils.wScale(5),
    backgroundColor: mConst.white,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: mConst.borderGray,
    paddingHorizontal: mUtils.wScale(7),
    paddingTop: mUtils.wScale(4),
    paddingBottom: mUtils.wScale(10),
  },
  layout4: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  layout5: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: mConst.borderGray,
    borderRadius: mUtils.wScale(5),
  },
  layout6: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#c18c8c',
    borderTopLeftRadius: mUtils.wScale(4),
    borderTopRightRadius: mUtils.wScale(4),
    paddingHorizontal: mUtils.wScale(6),
    paddingVertical: mUtils.wScale(6),
  },
  layout7: {
    paddingHorizontal: mUtils.wScale(5),
    paddingTop: mUtils.wScale(8),
    paddingBottom: mUtils.wScale(15),
  },
  layout8: {
    position: 'absolute',
    bottom: 50,
    right: 20,
  },
  moreImg1: {
    width: mUtils.wScale(8),
    height: mUtils.wScale(8),
    marginLeft: mUtils.wScale(5),
  },
  moreImg2: {
    width: mUtils.wScale(11),
    height: mUtils.wScale(11),
    marginLeft: mUtils.wScale(5),
  },
  fixImg: {
    width: mUtils.wScale(17),
    height: mUtils.wScale(17),
  },
  schedulerImg: {
    width: mUtils.wScale(15),
    height: mUtils.wScale(15),
    marginRight: mUtils.wScale(5),
  },
  modelImg: {
    width: '100%',
    height: mUtils.wScale(250),
  },
  dollarImg1: {
    width: mUtils.wScale(15),
    height: mUtils.wScale(15),
  },
  airplaneImg: {
    width: mUtils.wScale(15),
    height: mUtils.wScale(15),
    marginLeft: mUtils.wScale(5),
  },
  plusImg: {
    width: mUtils.wScale(35),
    height: mUtils.wScale(35),
    marginTop: mUtils.wScale(15),
    alignSelf: 'center',
  },
  memoImg: {
    width: mUtils.wScale(60),
    height: mUtils.wScale(60),
  },
})
