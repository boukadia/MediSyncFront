import { Modal as BSModal, type ModalProps } from 'react-bootstrap';
import type { ReactNode } from 'react';

interface CustomModalProps extends ModalProps {
    children: ReactNode;
    title?: string;
}

export default function Modal({ children, title, ...props }: CustomModalProps) {
    return (
        <BSModal {...props} centered>
            {title && (
                <BSModal.Header closeButton>
                    <BSModal.Title>{title}</BSModal.Title>
                </BSModal.Header>
            )}
            <BSModal.Body>{children}</BSModal.Body>
        </BSModal>
    );
}
