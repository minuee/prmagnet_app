import {StyleSheet} from 'react-native'

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
  img: {
    shadowColor: mConst.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    alignSelf: 'center',
    width: mUtils.wScale(80),
    height: mUtils.wScale(80),
    borderRadius: mUtils.wScale(50),
  },
  box: {
    width: '100%',
    borderBottomColor: '#f3f3f3',
    borderBottomWidth: 1,
    paddingLeft: mUtils.wScale(6),
    paddingVertical: mUtils.wScale(10),
    marginTop: mUtils.wScale(5),
  },
  top: {
    marginTop: mUtils.wScale(25),
  },
  goImg: {
    width: mUtils.wScale(7),
    height: mUtils.wScale(14),
  },
  profileImg: {
    width: mUtils.wScale(80),
    height: mUtils.wScale(80),
  },
  cameraImg: {
    width: mUtils.wScale(26),
    height: mUtils.wScale(26),
    position: 'absolute',
    right: mUtils.wScale(2),
    bottom: mUtils.wScale(2),
  },
  title: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    fontWeight: 'normal',
    textAlign: 'left',
    color: '#555555',
  },
  desc: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'left',
    color: mConst.black,
  },
  alert: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    textAlign: 'left',
    color: '#999999',
    marginTop: mUtils.wScale(30),
  },
  modal: {
    alignItems: 'center',
  },
  modalView: {
    width: mUtils.wScale(280),
    backgroundColor: mConst.white,
    borderStyle: 'solid',
    borderWidth: 0.3,
    borderColor: '#707070',
  },
  select: {
    paddingHorizontal: mUtils.wScale(20),
    paddingVertical: mUtils.wScale(16),
  },
  modaltext: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#1d1d1d',
  },
})
