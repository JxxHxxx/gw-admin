import React, { forwardRef } from "react";

interface InputProps {
    className?: string;
    id?: string;
    name?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: () => void;
    placeholder?: string;
    type?: string;
    minLength?: number;
    maxLength?: number;
    readOnly?: boolean;
    defaultValue?: string | number;
    disabled?: boolean;
    style?: object;
}

// forwardRef를 사용하여 ref를 전달
const Input = forwardRef<HTMLInputElement, InputProps>(({
    className = '',
    id = '',
    name = '',
    onChange = () => { },
    onKeyDown = () => { },
    placeholder = '',
    type = 'text',
    minLength = 0,  // Fixed typo 'minLegnth' to 'minLength'
    maxLength = 100,
    readOnly = false,
    defaultValue,
    disabled = false,
    style = {}
}, ref) => {

    return (
        disabled ? 
            <input
                style={style}
                className={className}
                id={id}
                name={name}
                onChange={onChange}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                minLength={minLength}
                maxLength={maxLength}
                readOnly={readOnly}
                type={type}
                defaultValue={defaultValue}
                disabled
                ref={ref}  // ref 전달
            /> :
            <input
                style={style}
                className={className}
                id={id}
                name={name}
                onChange={onChange}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                minLength={minLength}
                maxLength={maxLength}
                readOnly={readOnly}
                type={type}
                defaultValue={defaultValue}
                ref={ref}  // ref 전달
            />
    );
});

export default Input;
