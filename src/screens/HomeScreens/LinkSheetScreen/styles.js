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
    fontSize: 13,
    color: '#555555',
  },
  middleDescWrapper: {
    flexDirection: 'row',
  },
  middleDescText: {
    fontSize: 15,
    color: mConst.black,
    paddingTop: mUtils.wScale(16),
  },
  middleDescTextBold: {
    fontSize: 15,
    fontWeight: 'bold',
    color: mConst.black,
    paddingTop: mUtils.wScale(16),
  },
  grid: {
    marginTop: mUtils.wScale(30),
  },
  col: (heightScale = 1, center) => ({
    justifyContent: center ? 'center' : undefined,
    alignItems: center ? 'center' : undefined,
    height: mUtils.wScale(30) * heightScale,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: center ? StyleSheet.hairlineWidth : 0,
  }),
  row: (backgroundColor = mConst.white) => ({
    justifyContent: 'center',
    alignItems: 'center',
    height: mUtils.wScale(30),
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor,
  }),
  sText: (fontSize = 10, color = mConst.textBaseColor) => ({
    fontSize,
    color,
  }),
  modelImage: {
    width: mUtils.wScale(45),
    height: mUtils.wScale((45 * 945) / 630),
  },
  bottom: {
    width: '100%',
    height: mUtils.hScale(50),
    backgroundColor: mConst.bgBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: mConst.white,
  },
})
