import {Platform} from 'react-native'
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
  middleSubWrapper: (size = 2) => ({
    width: (mConst.wWidth - mUtils.wScale(20) * 2) / size - mUtils.wScale(4),
    paddingTop: mUtils.wScale(16),
    paddingBottom: mUtils.wScale(12),
    borderBottomWidth: 1,
    borderColor: '#f3f3f3',
  }),
  middleText: {
    fontSize: 13,
    color: '#555555',
  },
  middleDescWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
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
  col: (heightScale = 1, center, backgroundColor = mConst.white) => ({
    justifyContent: center ? 'center' : undefined,
    alignItems: center ? 'center' : undefined,
    height: mUtils.wScale(30) * heightScale,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: center ? StyleSheet.hairlineWidth : 0,
    backgroundColor,
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
  checkWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mConst.white,
    height: mUtils.wScale(30),
  },
  checkImage: {
    width: mUtils.wScale(15),
    height: mUtils.wScale(15),
  },
  bottom: {
    width: '100%',
    height: mUtils.hScale(50),
    backgroundColor: mConst.getBaseColor(),
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: mConst.white,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    marginBottom: Platform.OS === 'ios' ? mUtils.wScale(30) : 0,
  },
  modalView: {
    backgroundColor: mConst.white,
    width: '100%',
    height: mUtils.wScale(130),
    alignItems: 'center',
    justifyContent: 'center',
  },
  layout: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: mConst.white,
    width: '100%',
    justifyContent: 'space-between',
    marginTop: -mUtils.wScale(3),
  },
  modalButton: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ebebeb',
    width: '50%',
    paddingVertical: mUtils.wScale(15),
  },
  modalName: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 18,
    textAlign: 'center',
    color: '#222222',
  },
  modalPhone: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: mConst.black,
    marginTop: mUtils.wScale(15),
  },
  modalText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: '#7ea1b2',
  },
})
