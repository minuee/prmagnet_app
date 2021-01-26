import {StyleSheet} from 'react-native'

import mConst from '../../../../common/constants'
import mUtils from '../../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
  },
  itemBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: mUtils.wScale(20),
    width: '100%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    textAlign: 'left',
    color: mConst.black,
  },
  dt: {
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'left',
    color: mConst.gray,
    marginTop: mUtils.wScale(3.5),
  },
  box: {
    width: mUtils.wScale(66),
    height: mUtils.wScale(26.75),
    borderStyle: 'solid',
    borderWidth: 0.7,
    borderColor: mConst.borderGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxtext: {
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'center',
    color: mConst.black,
  },
  list: {
    paddingHorizontal: mUtils.wScale(20),
  },
})
