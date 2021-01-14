import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Modal from 'react-native-modal'
import RootSiblings from 'react-native-root-siblings'

import mConst from '../../common/constants'

let elements = null
export const alert = (title, content, button) => {
  if (elements !== null) return
  elements = new RootSiblings(
    (
      <Modal style={styles.container} isVisible={true} useNativeDriver backdropColor={'#000000'} backdropOpacity={0.7} animationIn="fadeIn">
        <View style={styles.contentContainer}>
          <View style={styles.contentWrapper}>
            {typeof title === 'string' && title !== '' && <Text style={styles.titleText}>{title}</Text>}
            {typeof content === 'string' && content !== '' && <Text style={styles.contentText}>{content}</Text>}
          </View>
          {(typeof button === 'undefined' || (Array.isArray(button) && button.length === 1)) && (
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (button && button[0].onPress) {
                    button[0].onPress()
                  }
                  elements.destroy()
                  elements = null
                }}
              >
                <Text style={styles.buttonText}>{button && button[0].text ? button[0].text : '확인'}</Text>
              </TouchableOpacity>
            </View>
          )}
          {Array.isArray(button) && button.length >= 2 && (
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (button && button[0].onPress) {
                    button[0].onPress()
                  }
                  elements.destroy()
                  elements = null
                }}
              >
                <Text style={styles.buttonText}>{button[0].text || '취소'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (button && button[1].onPress) {
                    button[1].onPress()
                  }
                  elements.destroy()
                  elements = null
                }}
              >
                <Text style={styles.buttonText}>{button[1].text || '확인'}</Text>
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
  contentContainer: {
    width: mConst.wGapUnit * 8,
    backgroundColor: 'white',
  },
  contentWrapper: {
    padding: 24,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: mConst.textBaseColor,
    marginBottom: 20,
  },
  contentText: {
    fontSize: 16,
    color: mConst.textBaseColor,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: mConst.textBaseColor,
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginBottom: 12,
    marginRight: 8,
  },
  button: {
    padding: 16,
  },
})
