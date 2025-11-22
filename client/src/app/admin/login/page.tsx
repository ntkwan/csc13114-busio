'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bus } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { Input } from '@/components/ui-components/Input';

const AdminLoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // Mock login delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // For now, just redirect to dashboard
        router.push('/admin');
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/adminbg.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md p-4 animate-in fade-in zoom-in duration-500">
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
                    <div className="text-center mb-8">
                        <div className="mx-auto h-16 w-16 bg-primary02 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary02/20 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                            <Bus className="h-8 w-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-foreground tracking-tight">
                            Chào mừng trở lại
                        </h2>
                        <p className="mt-2 text-subtext font-medium">
                            Đăng nhập để quản lý hệ thống
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div className="space-y-4">
                            <Input
                                label="Địa chỉ Email"
                                type="email"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setEmail(e.target.value)
                                }
                                required
                                className="bg-white/50 focus:bg-white transition-colors"
                            />

                            <Input
                                label="Mật khẩu"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setPassword(e.target.value)
                                }
                                required
                                className="bg-white/50 focus:bg-white transition-colors"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-primary02 focus:ring-primary02 border-border01 rounded cursor-pointer"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-text cursor-pointer select-none"
                                >
                                    Ghi nhớ đăng nhập
                                </label>
                            </div>

                            <div className="text-sm">
                                <a
                                    href="#"
                                    className="font-medium text-primary02 hover:text-primary01 transition-colors"
                                >
                                    Quên mật khẩu?
                                </a>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-primary02/30 text-sm font-bold text-white bg-primary02 hover:bg-primary01 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary02 transition-all duration-200 hover:shadow-primary02/50 hover:-translate-y-0.5"
                        >
                            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </Button>
                    </form>
                </div>

                <p className="text-center mt-8 text-white/80 text-sm font-medium drop-shadow-md">
                    &copy; {new Date().getFullYear()} Busio System. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default AdminLoginPage;
