import React from 'react';
import { Modal, View } from 'react-native';

import {
  FooterContainer,
  ModalContainer,
  ModalContent,
  ModalSubtitle,
  ModalTitle,
} from './styles';
import { SharedModalProps } from './types';

const SharedModal: React.FC<SharedModalProps> = ({
  open,
  onClose,
  title,
  subtitle,
  body,
  footer,
}) => {
  return (
    <Modal
      visible={open}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <ModalContainer>
        <ModalContent>
          <ModalTitle>{title}</ModalTitle>
          {subtitle && <ModalSubtitle>{subtitle}</ModalSubtitle>}
          <View>{body}</View>
          {footer && <FooterContainer>{footer}</FooterContainer>}
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default SharedModal;
