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
  layout: {
    flexDirection: 'row',
    alignItems: 'center',
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
  switchIc: {
    transform: [
      {
        scaleX: Platform.OS === 'ios' ? 0.8 : 1,
      },
      {
        scaleY: Platform.OS === 'ios' ? 0.8 : 1,
      },
    ],
  },
  modalView: {
    width: mUtils.wScale(320),
    height: mUtils.wScale(350),
    backgroundColor: mConst.white,
    justifyContent: 'space-between',
  },
  modalTopB: {
    width: '50%',
    paddingVertical: mUtils.wScale(15),
    borderBottomWidth: 1,
  },
  modalBottomL: {
    width: '50%',
    paddingVertical: mUtils.wScale(15),
    backgroundColor: '#dddddd',
  },
  modalBottomR: {
    width: '50%',
    paddingVertical: mUtils.wScale(15),
    backgroundColor: mConst.getBaseXColor(),
  },
  datePicker: {
    width: mUtils.wScale(320),
    alignSelf: 'center',
    height: mUtils.wScale(250),
  },
  modalTopT: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    textAlign: 'center',
  },
  modalBottomLT: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    textAlign: 'center',
    color: mConst.black,
  },
  modalBottomRT: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    textAlign: 'center',
    color: mConst.white,
  },
})
