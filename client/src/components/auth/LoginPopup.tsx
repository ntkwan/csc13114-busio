'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button, Input } from '@/components/ui-components';
import { X } from 'lucide-react';
import { usePreventScroll } from '@/hooks/usePreventScroll';
import AuthPopup from './AuthPopup';
import AuthInputPopup from './AuthInputPopup';

interface LoginPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onBackToLogin: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ isOpen, onClose }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showAuthPopup, setShowAuthPopup] = useState(false);
    const [showOtpPopup, setShowOtpPopup] = useState(false);
    usePreventScroll(isOpen || showAuthPopup || showOtpPopup);

    useEffect(() => {
        if (!isOpen) {
            setShowAuthPopup(false);
            setShowOtpPopup(false);
        }
    }, [isOpen]);

    const handleCloseAll = () => {
        setShowOtpPopup(false);
        setShowAuthPopup(false);
    };

    const handleGoogleLogin = () => {
        onClose();
    };

    if (!isOpen && !showAuthPopup && !showOtpPopup) return null;

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={onClose} />

                    <div className="relative rounded-lg p-6 w-[475px] h-[420px] z-10 shadow-lg flex items-center justify-center bg-white backdrop-blur-md">
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-40"
                            style={{ backgroundImage: "url('/Login-bg.png')" }}
                        />

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-20"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="relative z-10 w-[340px] h-[360px] flex flex-col mx-auto">
                            <h2 className="font-bold text-[36px] leading-[54px] mb-6 text-[#FD735D] text-left">
                                Bắt đầu
                            </h2>

                            <div className="space-y-4 flex-1">
                                <Input
                                    type="text"
                                    placeholder="Nhập số điện thoại"
                                    className="w-full bg-white border border-gray-300"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />

                                <Button
                                    variant="standard"
                                    size="large"
                                    className="w-full"
                                    onClick={() => setShowAuthPopup(true)}
                                >
                                    Bắt đầu
                                </Button>

                                <div className="flex items-center my-4">
                                    <div className="grow h-px bg-text" />
                                    <span className="px-2 text-text text-sm">hoặc</span>
                                    <div className="grow h-px bg-text" />
                                </div>

                                <Button
                                    variant="outline"
                                    className="w-full h-[55px] flex items-center justify-center rounded-md text-text! hover:text-white! border-gray-300"
                                    onClick={handleGoogleLogin}
                                >
                                    <Image
                                        src="/google.png"
                                        alt="Google"
                                        width={20}
                                        height={20}
                                        className="mr-3"
                                    />
                                    <span className="font-normal text-[18px] leading-[27px] ">
                                        Tiếp tục với Google
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showAuthPopup && (
                <AuthPopup
                    isOpen={true}
                    onClose={() => setShowAuthPopup(false)}
                    phoneNumber="+84906885156"
                    // phoneNumber={phoneNumber} để nhận số từ input
                    onChangePhone={() => setShowAuthPopup(false)}
                    onContinue={() => {
                        setShowAuthPopup(false);
                        setShowOtpPopup(true);
                    }}
                />
            )}

            {showOtpPopup && (
                <AuthInputPopup
                    isOpen={true}
                    onBackToLogin={() => {
                        setShowOtpPopup(false);
                    }}
                    phoneNumber="+84906885156"
                    // phoneNumber={phoneNumber} để nhận số từ input // số điện thoại cố định
                    onCloseAll={handleCloseAll}
                />
            )}
        </>
    );
};

export default LoginPopup;
