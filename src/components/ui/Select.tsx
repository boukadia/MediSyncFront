import { Form } from 'react-bootstrap';
import type { ReactNode } from 'react';

interface SelectProps {
    label?: string;
    error?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    required?: boolean;
}

export default function Select({ 
    label, 
    error, 
    children, 
    className = '', 
    ...props 
}: SelectProps) {
    return (
        <Form.Group className="mb-3">
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Select
                isInvalid={!!error}
                className={className}
                {...props}
            >
                {children}
            </Form.Select>
            {error && (
                <Form.Control.Feedback type="invalid">
                    {error}
                </Form.Control.Feedback>
            )}
        </Form.Group>
    );
}
