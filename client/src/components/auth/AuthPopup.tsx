'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui-components';
import { X } from 'lucide-react';

interface AuthPopupProps {
    isOpen: boolean;
    onClose: () => void;
    phoneNumber: string;
    onChangePhone: () => void;
    onContinue: () => void;
}

const AuthPopup: React.FC<AuthPopupProps> = ({
    isOpen,
    onClose,
    phoneNumber,
    onChangePhone,
    onContinue,
}) => {
    // Khóa scroll khi popup mở (phương pháp đơn giản hơn)
    useEffect(() => {
        if (isOpen) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';

            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="relative bg-white rounded-lg shadow-lg w-full max-w-[400px] p-6 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X className="w-6 h-6" />
                </button>

                <p className="text-center text-black mb-6 text-lg leading-relaxed mt-4">
                    Mã xác thực sẽ được gửi đến số <br />
                    <span className="font-bold">{phoneNumber}</span> qua tin nhắn Zalo
                </p>

                <div className="space-y-4">
                    <Button variant="standard" size="large" className="w-full" onClick={onContinue}>
                        <Image src="/zalo.png" alt="Zalo" width={30} height={30} className="mr-2" />
                        Tiếp tục với Zalo
                    </Button>

                    <Button variant="outline" size="xl" className="w-full" onClick={onChangePhone}>
                        Thay đổi số điện thoại
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AuthPopup;
