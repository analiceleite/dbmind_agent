import React from 'react';
import { Overlay, Dialog, DialogHeader, DialogTitle, DialogBody, DialogFooter, Button, CloseIcon } from './ModalStyle';

interface Props {
  isOpen: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

export const Modal = ({ isOpen, title, children, onClose, onConfirm, confirmLabel = 'Confirm', cancelLabel = 'Cancel' }: Props) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Dialog role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <DialogHeader>
          <DialogTitle id="modal-title">{title}</DialogTitle>
          <CloseIcon onClick={onClose} aria-label="close">✕</CloseIcon>
        </DialogHeader>
        <DialogBody>{children}</DialogBody>
        <DialogFooter>
          <Button kind="ghost" onClick={onClose}>{cancelLabel}</Button>
          {onConfirm && <Button kind="primary" onClick={onConfirm}>{confirmLabel}</Button>}
        </DialogFooter>
      </Dialog>
    </Overlay>
  );
};

export default Modal;
