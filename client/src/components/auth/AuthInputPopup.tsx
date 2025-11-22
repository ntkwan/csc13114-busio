'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui-components';
import { usePreventScroll } from '@/hooks/usePreventScroll';
import Swal from 'sweetalert2';
import { useZaloSignIn } from '@/hooks';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

interface AuthInputPopupProps {
    isOpen: boolean;
    onBackToLogin: () => void;
    phoneNumber: string;
    onCloseAll: () => void;
    remainingAttemptsInitial?: number | null;
}

const AuthInputPopup: React.FC<AuthInputPopupProps> = ({
    isOpen,
    onBackToLogin,
    phoneNumber,
    onCloseAll,
    remainingAttemptsInitial,
}) => {
    const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);
    const firstInputRef = React.useRef<HTMLInputElement | null>(null);
    const { zaloSignIn } = useZaloSignIn();
    usePreventScroll(isOpen);

    const [otp, setOtp] = React.useState<string[]>(Array(6).fill(''));
    const [secondsLeft, setSecondsLeft] = React.useState(300);
    const [resending, setResending] = React.useState(false);
    const [remainingAttempts, setRemainingAttempts] = React.useState<number | null>(null);

    React.useEffect(() => {
        if (!isOpen) return;
        setSecondsLeft(300);
        setOtp(Array(6).fill(''));
        inputsRef.current.forEach((el) => el && (el.value = ''));
        setRemainingAttempts(
            typeof remainingAttemptsInitial === 'number' ? remainingAttemptsInitial : null,
        );
        const id = requestAnimationFrame(() => firstInputRef.current?.focus());
        return () => cancelAnimationFrame(id);
    }, [isOpen, remainingAttemptsInitial]);

    React.useEffect(() => {
        if (!isOpen || secondsLeft <= 0) return;
        const timer = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [isOpen, secondsLeft]);

    if (!isOpen) return null;

    const mm = `0${Math.floor(secondsLeft / 60)}`.slice(-2);
    const ss = `0${secondsLeft % 60}`.slice(-2);

    const clearInputs = () => {
        setOtp(Array(6).fill(''));
        inputsRef.current.forEach((el) => el && (el.value = ''));
    };

    const refocusFirst = () => {
        requestAnimationFrame(() => firstInputRef.current?.focus());
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const v = e.target.value.replace(/\D/g, '').slice(0, 1);
        e.currentTarget.value = v;
        setOtp((prev) => {
            const next = [...prev];
            next[idx] = v;
            return next;
        });
        if (v && idx < inputsRef.current.length - 1) {
            inputsRef.current[idx + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
        if (e.key === 'Backspace' && !e.currentTarget.value && idx > 0) {
            inputsRef.current[idx - 1]?.focus();
        }
        if (e.key === 'Enter' && otp.join('').length === 6) {
            handleContinue();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const data = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (!data) return;
        const arr = data.split('');
        arr.forEach((d, i) => {
            if (inputsRef.current[i]) inputsRef.current[i]!.value = d;
        });
        setOtp((prev) => {
            const next = [...prev];
            for (let i = 0; i < 6; i++) next[i] = arr[i] || '';
            return next;
        });
        inputsRef.current[Math.min(arr.length, 6) - 1]?.focus();
    };

    const handleContinue = async () => {
        const code = otp.join('');
        if (code.length !== 6) return;

        Swal.fire({
            title: 'Đang xử lý...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
        });

        try {
            const result = await zaloSignIn(phoneNumber, code);
            Swal.close();

            if (!result) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Lỗi đăng nhập',
                    text: 'OTP không hợp lệ',
                    confirmButtonText: 'Đóng',
                    confirmButtonColor: '#5f87c1',
                });
                clearInputs();
                refocusFirst();
                return;
            }
            await Swal.fire({
                icon: 'success',
                title: 'Đăng nhập thành công!',
                confirmButtonText: 'Tiếp tục',
                confirmButtonColor: '#5f87c1',
            });
            onCloseAll();
        } catch (err) {
            Swal.close();
            console.error('Error in handleContinue:', err);
            await Swal.fire({
                icon: 'error',
                title: 'Lỗi kết nối',
                text: 'Không thể xác thực. Vui lòng thử lại.',
                confirmButtonText: 'Đóng',
                confirmButtonColor: '#5f87c1',
            });
            clearInputs();
            refocusFirst();
        }
    };

    const handleResend = async () => {
        if (resending) return;
        setResending(true);

        Swal.fire({
            title: 'Đang gửi lại mã...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
        });

        try {
            const res = await fetch(`${BACKEND_URL}/api/auth/request-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: phoneNumber }),
            });
            Swal.close();

            const resdata = await res.json();
            const remaining = resdata.data.remainingAttempts;

            if (typeof remaining === 'number') setRemainingAttempts(remaining);

            if (res.ok) {
                setSecondsLeft(300);
                clearInputs();

                await Swal.fire({
                    icon: 'success',
                    title: 'Đã gửi lại mã OTP!',
                    text: 'Vui lòng kiểm tra tin nhắn.',
                    confirmButtonText: 'Đóng',
                    confirmButtonColor: '#5f87c1',
                });

                refocusFirst();
            } else {
                switch (res.status) {
                    case 429:
                        await Swal.fire({
                            icon: 'error',
                            title: 'Quá số lần gửi OTP',
                            text: 'Bạn đã gửi OTP tối đa 4 lần/ngày. Vui lòng thử lại sau.',
                            confirmButtonText: 'Đóng',
                            confirmButtonColor: '#5f87c1',
                        });
                        break;
                    default:
                        await Swal.fire({
                            icon: 'error',
                            title: 'Lỗi hệ thống',
                            text: 'Không thể gửi lại mã. Vui lòng thử lại sau.',
                            confirmButtonText: 'Đóng',
                            confirmButtonColor: '#5f87c1',
                        });
                        break;
                }
                refocusFirst();
            }
        } catch (err) {
            Swal.close();
            console.error('Resend OTP failed:', err);
            await Swal.fire({
                icon: 'error',
                title: 'Lỗi kết nối',
                text: 'Không thể gửi lại mã. Vui lòng thử lại.',
                confirmButtonText: 'Đóng',
                confirmButtonColor: '#5f87c1',
            });
            refocusFirst();
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onBackToLogin} />

            <div className="relative z-10 w-[400px] rounded-lg bg-white p-6 shadow-lg">
                <button
                    onClick={onBackToLogin}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X className="h-6 w-6" />
                </button>

                <p className="mb-8 text-center text-[18px] leading-[27px] text-black">
                    Nhập mã xác thực được gửi đến số <br />
                    <span className="font-bold">{phoneNumber}</span> qua tin nhắn Zalo
                </p>

                <div className="mb-8 flex justify-between">
                    {Array.from({ length: 6 }).map((_, idx) => (
                        <input
                            key={idx}
                            ref={(el) => {
                                inputsRef.current[idx] = el;
                                if (idx === 0) firstInputRef.current = el;
                            }}
                            inputMode="numeric"
                            type="text"
                            maxLength={1}
                            onChange={(e) => handleChange(e, idx)}
                            onKeyDown={(e) => handleKeyDown(e, idx)}
                            onPaste={idx === 0 ? handlePaste : undefined}
                            className="h-12 w-10 border-b-2 border-black text-center text-xl focus:outline-none"
                        />
                    ))}
                </div>

                <Button
                    variant="standard"
                    size="large"
                    className="mb-6 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleContinue}
                    disabled={otp.join('').length !== 6}
                >
                    Tiếp tục
                </Button>

                <div className="text-center text-sm text-subtext">
                    <p className="mb-2 text-[14px] leading-[100%] font-normal tracking-[0px] text-text">
                        Không nhận được mã xác thực?
                        <button
                            className="ml-1 underline text-primary02 disabled:no-underline disabled:text-gray-400"
                            onClick={handleResend}
                            disabled={resending}
                        >
                            Gửi lại mã
                        </button>
                    </p>

                    <p className="mb-1 text-[14px] leading-[100%] text-text mt-4">
                        Số lần gửi mã OTP còn lại:{' '}
                        <span className="text-primary02 font-semibold">
                            {remainingAttempts ?? 0}
                        </span>
                    </p>

                    <p className="text-[14px] leading-[100%] text-text mt-4">
                        Thời gian hiệu lực còn lại của mã OTP:{' '}
                        <span className="text-primary02 font-semibold">
                            {mm}:{ss}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthInputPopup;
