import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
  },
  mainTitle: {
    fontSize: 22,
    fontFamily: 'Roboto-Bold',
    textAlign: 'left',
    color: mConst.black,
  },
  rightSmall: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    textAlign: 'right',
    color: '#555555',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    textAlign: 'left',
    color: '#000000',
  },
  dt: {
    fontFamily: 'Roboto-Medium',
    fontSize: 13,
    textAlign: 'left',
    color: '#070708',
  },
  status: {
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    textAlign: 'left',
    color: mConst.black,
  },
  delete: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    textAlign: 'left',
    color: '#070708',
  },
  layout1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: mUtils.wScale(20),
    paddingTop: mUtils.wScale(35),
    paddingBottom: mUtils.wScale(10),
    backgroundColor: mConst.white,
  },
  layout2: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  layout3: {
    paddingHorizontal: mUtils.wScale(20),
    paddingVertical: mUtils.wScale(15),
    backgroundColor: mConst.white,
  },
  layout4: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  layout5: {
    width: mUtils.wScale(70),
    height: mUtils.wScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -mUtils.wScale(33),
  },
  latestImg: {
    width: mUtils.wScale(7),
    height: mUtils.wScale(4.5),
    marginLeft: mUtils.wScale(5),
  },
  moreImg: {
    width: mUtils.wScale(5),
    height: mUtils.wScale(20),
  },
  smallBox: {
    width: mUtils.wScale(80),
    height: mUtils.wScale(27),
    borderStyle: 'solid',
    borderWidth: 0.7,
    borderColor: mConst.borderGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyBar: {
    width: '100%',
    height: mUtils.wScale(7),
    backgroundColor: '#f6f6f6',
  },
})
