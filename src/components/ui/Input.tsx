import { Form, type FormControlProps } from 'react-bootstrap';
import { forwardRef } from 'react';

interface InputProps extends Omit<FormControlProps, 'type'> {
    label?: string;
    error?: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = '', ...props }, ref) => {
        return (
            <Form.Group className="mb-3">
                {label && <Form.Label>{label}</Form.Label>}
                <Form.Control
                    ref={ref}
                    isInvalid={!!error}
                    className={className}
                    {...props}
                />
                {error && (
                    <Form.Control.Feedback type="invalid">
                        {error}
                    </Form.Control.Feedback>
                )}
            </Form.Group>
        );
    }
);

Input.displayName = 'Input';

export default Input;
