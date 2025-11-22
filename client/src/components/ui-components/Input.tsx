'use client';

import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    variant?: 'standard' | 'compact';
    error?: string;
    helperText?: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    variant?: 'standard' | 'compact';
    error?: string;
    helperText?: string;
    placeholder?: string;
    children: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        { className, type, label, variant = 'standard', error, helperText, disabled, ...props },
        ref,
    ) => {
        const isStandard = variant === 'standard';

        return (
            <div className="w-full">
                {label && (
                    <label
                        className={`block text-base font-normal mb-2 ${disabled ? 'text-gray-400' : 'text-text'}`}
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        type={type}
                        disabled={disabled}
                        className={`
                            w-full border rounded-lg px-3 transition-colors
                            focus:outline-none focus:ring-1 focus:ring-primary01 focus:border-primary01
                            placeholder:text-border01 placeholder:font-normal
                            ${isStandard ? 'h-[55px] text-base' : 'h-[45px] text-sm'}
                            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-primary01'}
                            ${
                                disabled
                                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300 opacity-60'
                                    : 'bg-white text-text'
                            }
                            ${className || ''}
                            `}
                        placeholder={!label ? props.placeholder : props.placeholder}
                        ref={ref}
                        {...props}
                    />
                    {disabled && <div className="absolute inset-0 cursor-not-allowed rounded-lg" />}
                </div>
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
            </div>
        );
    },
);

Input.displayName = 'Input';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            className,
            label,
            variant = 'standard',
            error,
            helperText,
            placeholder,
            disabled,
            children,
            ...props
        },
        ref,
    ) => {
        const isStandard = variant === 'standard';

        return (
            <div className="w-full">
                {label && (
                    <label
                        className={`block text-base font-normal mb-2 ${disabled ? 'text-gray-400' : 'text-text'}`}
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    <select
                        disabled={disabled}
                        className={`
                            w-full border rounded-lg px-3 pr-10 transition-colors appearance-none
                            focus:outline-none focus:ring-1 focus:ring-primary01 focus:border-primary01
                            ${isStandard ? 'h-[55px] text-base' : 'h-[45px] text-sm'}
                            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-primary01'}
                            ${
                                disabled
                                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300 opacity-60'
                                    : 'bg-white text-text'
                            }
                            ${className || ''}
                            `}
                        ref={ref}
                        {...props}
                    >
                        {!label && (
                            <option value="" disabled>
                                {placeholder || 'Chọn...'}
                            </option>
                        )}
                        {children}
                    </select>
                    <ChevronDown
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none ${disabled ? 'text-gray-400' : 'text-border'}`}
                    />
                    {disabled && <div className="absolute inset-0 cursor-not-allowed rounded-lg" />}
                </div>
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                {helperText && !error && <p className="mt-1 text-sm text-border01">{helperText}</p>}
            </div>
        );
    },
);

Select.displayName = 'Select';
