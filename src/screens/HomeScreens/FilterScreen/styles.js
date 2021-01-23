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
