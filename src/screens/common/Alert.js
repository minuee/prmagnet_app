import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import Modal from 'react-native-modal'
import RootSiblings from 'react-native-root-siblings'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import mConst from '../../common/constants'
import mUtils from '../../common/utils'
import Text from './Text'

const closeBtnImage = require('../../images/navi/close.png')

let elements = null
export const alert = (title, content, button) => {
  if (elements !== null) return
  const isConfirm = Array.isArray(button) && button.length >= 2
  elements = new RootSiblings(
    (
      <Modal style={styles.container} isVisible={true} useNativeDriver backdropColor={'#000000'} backdropOpacity={0.7} animationIn="fadeIn">
        <View style={styles.contentContainer}>
          {isConfirm && (
            <TouchableOpacity
              onPress={() => {
                elements.destroy()
                elements = null
              }}
            >
              <FastImage source={closeBtnImage} style={styles.closeImage} />
            </TouchableOpacity>
          )}
          <View style={styles.contentWrapper(isConfirm)}>
            {typeof title === 'string' && title !== '' && <Text style={styles.titleText}>{title}</Text>}
            {typeof content === 'string' && content !== '' && <Text style={styles.contentText}>{content}</Text>}
          </View>
          {(typeof button === 'undefined' || (Array.isArray(button) && button.length === 1)) && (
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (_.get(button, '[0].onPress')) {
                    button[0].onPress()
                  }
                  elements.destroy()
                  elements = null
                }}
              >
                <Text style={styles.buttonText}>{_.get(button, '[0].text', 'Confirm')}</Text>
              </TouchableOpacity>
            </View>
          )}
          {isConfirm && (
            <View style={styles.buttonsWrapper}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  if (_.get(button, '[0].onPress')) {
                    button[0].onPress()
                  }
                  elements.destroy()
                  elements = null
                }}
              >
                <Text style={styles.confirmButtonText}>{_.get(button, '[0].text', 'Confirm')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  if (_.get(button, '[1].onPress')) {
                    button[1].onPress()
                  }
                  elements.destroy()
                  elements = null
                }}
              >
                <Text style={styles.cancelButtonText}>{_.get(button, '[1].text', 'Cancel')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    )
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeImage: {
    width: mUtils.wScale(30),
    height: mUtils.wScale(30),
    alignSelf: 'flex-end',
    padding: mUtils.wScale(10),
    margin: mUtils.wScale(5),
  },
  contentContainer: {
    width: mConst.wWidth - mUtils.wScale(40),
    backgroundColor: 'white',
  },
  contentWrapper: isConfirm => ({
    paddingTop: isConfirm ? mUtils.wScale(20) : mUtils.wScale(35),
    paddingBottom: mUtils.wScale(35),
    alignItems: 'center',
  }),
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: mConst.textBaseColor,
    marginBottom: 20,
  },
  contentText: {
    fontSize: 16,
    color: mConst.textGray,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: mConst.lightBlue,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopWidth: StyleSheet.hairlineWidth * 2,
    borderColor: '#ebebeb',
  },
  button: {
    paddingVertical: mUtils.wScale(18),
    paddingHorizontal: mUtils.wScale(50),
  },
  buttonsWrapper: {
    alignItems: 'center',
    marginBottom: mUtils.wScale(40),
  },
  confirmButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: mConst.wWidth - mConst.wGapUnit * 3,
    height: mUtils.wScale(50),
    borderRadius: mUtils.wScale(5),
    backgroundColor: mConst.lightBlue,
  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: mConst.wWidth - mConst.wGapUnit * 3,
    height: mUtils.wScale(50),
    borderRadius: mUtils.wScale(5),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: mConst.borderGray,
    backgroundColor: mConst.white,
    marginTop: mUtils.wScale(12),
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: mConst.white,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: mConst.textGray,
  },
})
