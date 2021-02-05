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
  titleWrapper: {
    width: mConst.wWidth - mUtils.wScale(20) * 2,
    height: mUtils.wScale(60),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: mUtils.wScale(20),
    paddingBottom: mUtils.wScale(18),
    marginHorizontal: mUtils.wScale(20),
    borderBottomWidth: 1,
  },
  goImage: {
    width: mUtils.wScale(24),
    height: mUtils.wScale(24),
  },
  titleSubWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSubText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  unfoldImage: {
    width: mUtils.wScale(36 / 3),
    height: mUtils.wScale(20 / 3),
    marginLeft: mUtils.wScale(8),
  },
  middleWrapper: {
    width: mConst.wWidth - mUtils.wScale(20) * 2,
    paddingTop: mUtils.wScale(16),
    paddingBottom: mUtils.wScale(12),
    marginHorizontal: mUtils.wScale(20),
    borderBottomWidth: 1,
    borderColor: '#f3f3f3',
  },
  middleGroupWrapper: {
    width: mConst.wWidth - mUtils.wScale(20) * 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  middleDualWrapper: {
    width: (mConst.wWidth - mUtils.wScale(20) * 2) / 2 - mUtils.wScale(4),
    paddingTop: mUtils.wScale(16),
    paddingBottom: mUtils.wScale(12),
    borderBottomWidth: 1,
    borderColor: '#f3f3f3',
  },
  middleTripleWrapper: {
    width: (mConst.wWidth - mUtils.wScale(20) * 2) / 3 - mUtils.wScale(4),
    paddingTop: mUtils.wScale(16),
    paddingBottom: mUtils.wScale(12),
    borderBottomWidth: 1,
    borderColor: '#f3f3f3',
  },
  middleText: {
    fontSize: 14,
    color: '#555555',
  },
  middleDescWrapper: {
    flexDirection: 'row',
  },
  middleDescText: {
    fontSize: 16,
    color: mConst.black,
    paddingTop: mUtils.wScale(16),
  },
  middleDescTextBold: {
    fontSize: 16,
    fontWeight: 'bold',
    color: mConst.black,
    paddingTop: mUtils.wScale(16),
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
    borderTopWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: mConst.borderGray,
  },
  sectionWrapperOn: {
    height: mUtils.wScale(60),
    alignItems: 'center',
    paddingHorizontal: mUtils.wScale(20),
    backgroundColor: mConst.baseColor,
  },
  sectionText: {
    fontSize: 15,
    fontWeight: '500',
  },
  sectionTextOn: {
    fontSize: 15,
    fontWeight: '500',
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
    fontWeight: '500',
  },
  itemText: {
    fontSize: 14,
    color: '#555555',
  },
  foldImage: {
    width: mUtils.wScale(40 / 3),
    height: mUtils.wScale(22 / 3),
  },
})
