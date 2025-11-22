import React, { useEffect, useRef } from 'react';
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
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // save previously focused element
    previouslyFocused.current = document.activeElement as HTMLElement | null;

    // prevent background scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // focus the first focusable element inside the dialog or the dialog itself
    const dialog = dialogRef.current;
    if (dialog) {
      const focusable = dialog.querySelector<HTMLElement>('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
      (focusable || dialog).focus();
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Tab' && dialog) {
        // simple focus trap
        const elements = Array.from(dialog.querySelectorAll<HTMLElement>('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'))
          .filter(el => !el.hasAttribute('disabled'));
        if (elements.length === 0) return;
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      // restore focus
      if (previouslyFocused.current && typeof previouslyFocused.current.focus === 'function') {
        previouslyFocused.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <Overlay ref={overlayRef} onClick={handleOverlayClick}>
      <Dialog ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="modal-title">
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
