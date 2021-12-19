import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
  },
  notiImg: {},
  itemBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: mUtils.wScale(20),
    width: '100%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
  },
  items: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'normal',
    textAlign: 'left',
    color: mConst.black,
  },
  desc: {
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#555555',
    marginTop: 3,
  },
  dt: {
    fontSize: 13,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'left',
    color: mConst.gray,
    marginTop: 6,
  },
  list: {
    paddingHorizontal: mUtils.wScale(20),
  },
  listImg: {width: mUtils.wScale(40), height: mUtils.wScale(40), marginRight: mUtils.wScale(12)},
  closeImg: {width: mUtils.wScale(20), height: mUtils.wScale(20)},
})
