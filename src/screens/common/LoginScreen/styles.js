import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

const sGap = mConst.hGapUnit / 4
const sWidth = mConst.wWidth - sGap * 2

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
  },
  idWrap : {
    flexDirection:'row',
    backgroundColor:'#ccc',
    height:mUtils.wScale(50),
    justifyContent: 'center',
    alignItems:'center'
  },
  logoImg: {
    width: mUtils.wScale(113.5),
    height: mUtils.wScale(77.5),
  },
  screenTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: mUtils.wScale(30),
    paddingHorizontal: mUtils.wScale(20),
    paddingBottom: mUtils.wScale(10),
  },
  screenTitleView: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: mUtils.wScale(80),
    marginBottom: mUtils.wScale(60),
  },
  upperWrapper: {
    paddingHorizontal: mUtils.wScale(20),
  },
  inputTitleText: {
    fontSize: 12,
    color: mConst.darkGray,
  },
  inputTextWrapper: {
    height: mUtils.wScale(40),
    paddingHorizontal: mUtils.wScale(10),
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderColor: mConst.lightGray,
    borderRadius: 5,
    marginTop: mUtils.wScale(10),
  },
  input: {
    fontSize: mUtils.wScale(15),
    color: mConst.textBaseColor,
    padding: 0,
    // backgroundColor: 'green',
  },
  middleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: mUtils.wScale(35),
    // backgroundColor: 'green',
  },
  loginButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: mConst.wWidth - mUtils.wScale(40),
    height: mUtils.wScale(55),
    backgroundColor: mConst.black,
  },
  joinButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: mConst.wWidth - mUtils.wScale(40),
    height: mUtils.wScale(55),
    backgroundColor: mConst.white,
    borderWidth: 1,
    marginTop: mUtils.wScale(15),
  },
  loginButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: mConst.white,
  },
  joinButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: mConst.black,
  },
  lowerWrapper: {
    alignItems: 'center',
    paddingTop: mUtils.wScale(20),
  },
  lowerSubWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTextWrapper: {
    alignItems: 'center',
    justifyContent:'flex-end',
    height: mUtils.wScale(50),
    marginHorizontal : mUtils.wScale(10),
    paddingBottom:mUtils.wScale(5),
    // backgroundColor: 'green',
  },
  itemClose : {
    position:'absolute',
    right:0,
    top:2,
    height: mUtils.wScale(50),
    width: mUtils.wScale(20),
  },
  itemText: {
    fontSize: 14,
    color: '#555555',
  },
  fence: {
    fontSize: 10,
    color: mConst.borderGray,
  },
})
