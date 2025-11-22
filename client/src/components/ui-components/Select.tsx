'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';

export interface SelectOption {
    label: string;
    value: string;
}

interface SelectProps {
    options: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    searchable?: boolean;
    clearable?: boolean;
    icon?: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({
    options,
    value,
    onChange,
    placeholder = 'Chọn...',
    className = '',
    searchable = true,
    clearable = true,
    icon,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    const filteredOptions =
        searchable && searchTerm
            ? options.filter(
                  (option) =>
                      option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      option.value.toLowerCase().includes(searchTerm.toLowerCase()),
              )
            : options;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen && searchable && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen, searchable]);

    const handleSelect = (optionValue: string) => {
        onChange?.(optionValue);
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange?.('');
        setSearchTerm('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) {
            if (e.key === 'Enter' || e.key === ' ') {
                setIsOpen(true);
                e.preventDefault();
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex((prev) =>
                    prev < filteredOptions.length - 1 ? prev + 1 : prev,
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
                    handleSelect(filteredOptions[highlightedIndex].value);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                setSearchTerm('');
                break;
        }
    };

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <div
                className={`w-full h-[55px] bg-white rounded-lg border border-border01 focus-within:border-primary01 flex items-center px-4 gap-3.5 cursor-pointer transition-all ${
                    isOpen ? 'border-primary01' : ''
                }`}
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                tabIndex={0}
            >
                {icon && <div className="shrink-0">{icon}</div>}

                {searchable && isOpen ? (
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 outline-none text-base text-text placeholder-text"
                        placeholder={placeholder}
                    />
                ) : (
                    <span className={`flex-1 text-base ${value ? 'text-text' : 'text-subtext'}`}>
                        {selectedOption?.label || placeholder}
                    </span>
                )}

                <div className="flex items-center gap-2">
                    {clearable && value && !isOpen && (
                        <button
                            onClick={handleClear}
                            className="hover:bg-gray-100 rounded-full p-1 transition-colors"
                            type="button"
                        >
                            <X className="w-4 h-4 text-subtext" />
                        </button>
                    )}
                    <ChevronDown
                        className={`w-5 h-5 text-subtext transition-transform ${
                            isOpen ? 'rotate-180' : ''
                        }`}
                    />
                </div>
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg border border-border01 shadow-lg z-50 max-h-[300px] overflow-auto">
                    {filteredOptions.length === 0 ? (
                        <div className="px-4 py-3 text-subtext text-center">
                            Không tìm thấy kết quả
                        </div>
                    ) : (
                        <ul className="py-1">
                            {filteredOptions.map((option, index) => (
                                <li
                                    key={option.value}
                                    onClick={() => handleSelect(option.value)}
                                    className={`px-4 py-2.5 cursor-pointer transition-colors text-base ${
                                        option.value === value
                                            ? 'bg-primary01 text-white'
                                            : highlightedIndex === index
                                              ? 'bg-secondary01 text-text'
                                              : 'text-text hover:bg-secondary01'
                                    }`}
                                    onMouseEnter={() => setHighlightedIndex(index)}
                                >
                                    {option.label}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};
