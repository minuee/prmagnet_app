import {StyleSheet, Platform} from 'react-native'

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
    paddingVertical: mUtils.wScale(10),
    paddingHorizontal: mUtils.wScale(10),
    marginRight: -mUtils.wScale(10),
    marginVertical: -mUtils.wScale(10),
  },
  subDt: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    textAlign: 'left',
    color: '#555555',
  },
  name: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 15,
    textAlign: 'left',
    color: mConst.black,
  },
  brand: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    textAlign: 'left',
    color: '#999999',
  },
  menuText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    textAlign: 'left',
    color: '#070708',
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
  moreImg: {
    width: mUtils.wScale(12),
    height: mUtils.wScale(12),
    marginLeft: mUtils.wScale(10),
  },
  schedulerImg: {
    width: mUtils.wScale(15),
    height: mUtils.wScale(15),
    marginRight: mUtils.wScale(5),
  },
  checkImg: {
    width: mUtils.wScale(12),
    height: mUtils.wScale(12),
    marginRight: mUtils.wScale(5),
  },
  brandImg: {
    width: mUtils.wScale(40),
    height: mUtils.wScale(10),
  },
  brandBox: {
    width: '48%',
    borderStyle: 'solid',
    borderWidth: 0.7,
    borderColor: '#f3f3f3',
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: mUtils.wScale(7),
    marginBottom: mUtils.wScale(12),
  },
  box1: {
    borderTopLeftRadius: mUtils.wScale(7),
    borderTopRightRadius: mUtils.wScale(7),
    paddingHorizontal: mUtils.wScale(8),
    paddingVertical: mUtils.wScale(8),
  },
  box2: {
    backgroundColor: 'white',
    borderBottomLeftRadius: mUtils.wScale(7),
    borderBottomRightRadius: mUtils.wScale(7),
    paddingHorizontal: mUtils.wScale(8),
    paddingTop: mUtils.wScale(10),
    paddingBottom: mUtils.wScale(20),
  },
  menuOptions: {
    marginTop: mUtils.wScale(45),
    marginLeft: mUtils.wScale(20),
    width: mUtils.wScale(158),
    paddingVertical: mUtils.wScale(7),
  },
  menuOption: {
    paddingHorizontal: mUtils.wScale(15),
    paddingVertical: mUtils.wScale(8),
  },
  bottomSheet: {
    width: '100%',
    paddingHorizontal: mUtils.wScale(20),
    paddingVertical: mUtils.wScale(10),
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: mConst.white,
  },
  bottomText1: {
    fontFamily: 'Roboto-Light',
    fontSize: 14,
    textAlign: 'left',
    color: mConst.black,
  },
  bottomText2: {
    fontFamily: 'Roboto-Bold',
    fontSize: 32,
    textAlign: 'left',
    color: '#7ea1b2',
  },
  bottomText3: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    textAlign: 'center',
    color: mConst.white,
  },
  bottomButton: {
    borderRadius: mUtils.wScale(7),
    backgroundColor: mConst.black,
    paddingVertical: mUtils.wScale(12),
    paddingHorizontal: mUtils.wScale(12),
  },
})
