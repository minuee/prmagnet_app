import {StyleSheet, Platform} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: mUtils.wScale(20),
    paddingVertical: mUtils.wScale(25),
  },
  listBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: mUtils.wScale(25),
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    color: mConst.black,
  },
  desc: {
    fontSize: 13,
    fontWeight: 'normal',
    textAlign: 'left',
    color: '#555555',
    marginTop: mUtils.wScale(7),
  },
  switchIc: {transform: [{scaleX: Platform.OS === 'ios' ? 0.8 : 1}, {scaleY: Platform.OS === 'ios' ? 0.8 : 1}]},
})
