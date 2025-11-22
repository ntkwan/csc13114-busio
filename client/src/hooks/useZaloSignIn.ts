import { useState } from 'react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const useZaloSignIn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const zaloSignIn = async (phoneNumber: string, otp: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${BACKEND_URL}/api/auth/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: phoneNumber,
                    otp: otp,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Xác thực thất bại');
                return false;
            }

            // Lưu token vào localStorage hoặc cookie nếu cần
            if (data.token) {
                localStorage.setItem('authToken', data.token);
            }

            return true;
        } catch (err) {
            setError('Lỗi kết nối. Vui lòng thử lại.');
            console.error('Zalo sign in error:', err);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        zaloSignIn,
        isLoading,
        error,
    };
};
