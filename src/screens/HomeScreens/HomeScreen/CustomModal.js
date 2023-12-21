import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import RNModal from "react-native-modal";
import mUtils from '../../../common/utils';

export const Modal = ({
  isVisible = false,
  children,
  ...props
}) => {
  return (
    <RNModal
        onBackdropPress={()=>props.setModalVisible(false)}
        isVisible={isVisible}
        animationInTiming={1}
        animationOutTiming={1}
        backdropTransitionInTiming={1}
        backdropTransitionOutTiming={1}
        useNativeDriver={true}
        useNativeDriverForBackdrop={true}
        hideModalContentWhileAnimating={true}
        backdropOpacity={0.7}
        {...props}
    >
        {children}
    </RNModal>
  );
};

const ModalContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const ModalHeader = ({ title }) => (
  <View style={styles.header}>
    <Text style={styles.text}>{title}</Text>
  </View>
);

const ModalBody = ({ children }) => (
  <View style={styles.body}>{children}</View>
);

const ModalFooter = ({ children }) => (
  <View style={styles.footer}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    borderRadius: mUtils.wScale(10),
    display:'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems:'center',
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    paddingTop: 10,
    textAlign: "center",
    fontSize: 24,
  },
  body: {
    minWidth:mUtils.wScale(300),
    minHeight:mUtils.wScale(250),
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
  },
});

Modal.Header = ModalHeader;
Modal.Container = ModalContainer;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;