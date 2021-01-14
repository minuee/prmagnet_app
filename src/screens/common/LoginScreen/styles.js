import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

const sGap = mConst.hGapUnit / 4
const sWidth = mConst.wWidth - sGap * 2

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: mConst.white,
  },
  upperWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: mConst.hGapUnit * 1.5,
  },
  targetText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: mConst.baseColor,
  },
  descText: {
    fontSize: 18,
    marginTop: 6,
  },
  mainTitleText: {
    fontSize: 45,
    color: mConst.baseColor,
    marginTop: 6,
  },
  horizonLine: {
    alignSelf: 'center',
    width: mConst.wGapUnit * 1.5,
    height: 2,
    backgroundColor: mConst.baseColor,
  },
  middleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideText: {
    fontSize: 20,
    marginTop: 5,
  },
  guideTextBold: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  lowerWrapper: {
    alignItems: 'center',
    height: mConst.hGapUnit * 3,
    paddingTop: 30,
  },
  inputIcon: {
    width: mUtils.wScale(30),
    height: mUtils.wScale(30),
    margin: mUtils.wScale(11),
  },
  inputTextWrapper: {
    width: mConst.wWidth - mConst.wGapUnit * 3,
    height: mUtils.wScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: mConst.black,
    borderRadius: 5,
    marginBottom: 8,
  },
  input: {
    width: mConst.wWidth - mConst.wGapUnit * 5,
    fontSize: mUtils.wScale(15),
    color: mConst.textBaseColor,
  },
  lowerSubWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
  },
  itemTextWrapper: {
    justifyContent: 'center',
    height: 40,
  },
  itemText: {
    fontSize: 13,
    color: '#494949',
  },
  bottomWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: mConst.hGapUnit * 1.3,
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: sWidth,
    height: mUtils.wScale(55),
    borderRadius: mUtils.wScale(5),
    backgroundColor: mConst.baseColor,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: mConst.white,
  },
})
