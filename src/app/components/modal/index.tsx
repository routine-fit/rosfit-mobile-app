import React, { FC } from 'react';
import { Modal, View } from 'react-native';

import Text from '../text';
import { FooterContainer, ModalContainer, ModalContent } from './styles';
import { SharedModalProps } from './types';

const SharedModal: FC<SharedModalProps> = ({
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
          <Text fontSize="xl" fontWeight="bold">
            {title}
          </Text>
          {subtitle && <Text>{subtitle}</Text>}
          <View>{body}</View>
          {footer && <FooterContainer>{footer}</FooterContainer>}
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default SharedModal;
