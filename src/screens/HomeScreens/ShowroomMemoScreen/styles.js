import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
  },
  select: {
    fontFamily: 'Roboto-Light',
    fontSize: 13,
    textAlign: 'left',
    color: '#555555',
  },
  nameWrap : {
    width: '90%',
    padding: mUtils.wScale(10),
    margin: mUtils.wScale(20),
    borderStyle: 'solid',
    borderWidth: 0.7,
    borderColor: '#dddddd',
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#555555',
  },
  bottom: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    textAlign: 'center',
    color: mConst.white,
  },
  layout: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  layout1: {
    width: '100%',
  },
  layout2: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 0.7,
    borderColor: '#dddddd',
    paddingVertical: mUtils.wScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: mUtils.wScale(10),
  },
  layout3: {
    width: '100%',
    height: mUtils.wScale(270),
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 0.7,
    borderColor: '#dddddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: mUtils.wScale(10),
    fontSize: 14,
    fontWeight: 'normal',
    color: mConst.black,
  },
  colorBox: {
    width: '100%',
    height: mUtils.wScale(411.2),
  },
  color: {
    width: mUtils.wScale(59.5),
    height: mUtils.wScale(59),
  },
  box: {
    backgroundColor: mConst.getBaseColor(),
    paddingVertical: mUtils.wScale(20),
  },
  desc: {
    width: '100%',
    fontSize: 14,
    fontWeight: 'normal',
    color: mConst.black,
  },
  moreImg: {
    width: mUtils.wScale(12),
    height: mUtils.wScale(5.5),
  },
  leftButton: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mConst.borderGray,
    paddingVertical: mUtils.wScale(20),
  },
  leftText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: '#070708',
  },
  checkImg: {
    width: '100%',
    height: '100%',
  },
})
