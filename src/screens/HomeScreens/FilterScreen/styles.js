import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mConst.white,
  },
  headerWrapper: {
    width: mConst.wWidth,
    height: mUtils.wScale(60),
    alignItems: 'center',
    paddingHorizontal: mUtils.wScale(5),
    borderTopWidth: 1,
    borderColor: mConst.black,
    borderBottomWidth: 1,
    borderColor: mConst.borderGray
  },
  headerText: {
    padding: mUtils.wScale(15),
    fontSize: 15,
    color: mConst.gray,
  },
  headerTextOn: {
    padding: mUtils.wScale(15),
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  sectionWrapper: {
    height: mUtils.wScale(60),
    alignItems: 'center',
    paddingHorizontal: mUtils.wScale(20),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: mConst.borderGray,
  },
  sectionWrapperOn: {
    height: mUtils.wScale(60),
    alignItems: 'center',
    paddingHorizontal: mUtils.wScale(20),
    backgroundColor: mConst.getBaseColor(),
  },
  sectionText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    fontWeight: 'bold',
  },
  sectionTextOn: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    fontWeight: 'bold',
    color: mConst.white,
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: mUtils.wScale(50),
    alignItems: 'center',
    paddingLeft: mUtils.wScale(12),
    paddingRight: mUtils.wScale(24),
    borderTopWidth: 1,
    borderColor: mConst.borderGray,
  },
  itemHeadText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 14,
    color: '#555555',
  },
  foldImage: {
    width: mUtils.wScale(40 / 3),
    height: mUtils.wScale(22 / 3),
  },
  moreImg: {
    width: mUtils.wScale(13),
    height: mUtils.wScale(13),
  },
  brandText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    textAlign: 'left',
    color: mConst.black,
  },
  layout: {
    height: mUtils.wScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: mUtils.wScale(12),
    paddingRight: mUtils.wScale(24),
    borderTopWidth: 1,
    borderColor: mConst.borderGray,
    borderBottomWidth: 1,
  },
  bottom: {
    width: mConst.wWidth,
    height: mUtils.wScale(50),
  },
  leftButton: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mConst.borderGray,
  },
  leftText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#070708',
  },
  rightButton: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mConst.getBaseColor(),
  },
  rightText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: mConst.white,
  },
})
