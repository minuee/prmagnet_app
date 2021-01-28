import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
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
  seasonGen: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    textAlign: 'left',
    color: '#555555',
  },
  dt: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    textAlign: 'left',
    color: '#999999',
    marginTop: mUtils.wScale(5),
  },
  brand: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    color: '#7ea1b2',
  },
  layout1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: mUtils.wScale(20),
    paddingTop: mUtils.wScale(20),
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
    paddingVertical: mUtils.wScale(25),
    backgroundColor: mConst.white,
    marginBottom: mUtils.wScale(7),
  },
  layout4: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    borderColor: '#7ea1b2',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
