'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui-components';
import { Smartphone, Bell, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import LoginPopup from '@/components/auth/LoginPopup';
// import { useAppSelector } from '@/shared/hooks';
// import { selectIsAuthenticated } from '@/auth/slices/authSlice';
// import UserMenu from '../ui/UserMenu';
// import LoginPopup from '../../../../app/(auth)/login/LoginPopup';

interface HeaderProps {
    className?: string;
}

const menuItems = [
    { label: 'TRANG CHỦ', href: '/' },
    { label: 'HOÀN/HUỶ VÉ', href: '/cancel-refund' },
    { label: 'TRA CỨU VÉ', href: '/ticket-lookup' },
    { label: 'LỊCH TRÌNH', href: '/schedule' },
];

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
    const pathname = usePathname();

    // const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const isAuthenticated = false;

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 w-full bg-secondary02 shadow-2xl ${className}`}
            style={{ boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)' }}
        >
            <div className="flex items-center justify-between h-[90px] px-4 md:px-8 lg:px-20 relative">
                <button
                    className="xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle mobile menu"
                >
                    {isMobileMenuOpen ? (
                        <X className="w-6 h-6 text-primary01" />
                    ) : (
                        <Menu className="w-6 h-6 text-primary01" />
                    )}
                </button>

                <Image
                    src="/favicon.svg"
                    alt="Logo"
                    width={72}
                    height={72}
                    className="object-contain w-12 h-12 md:w-[60px] md:h-[60px] lg:w-[72px] lg:h-[72px]"
                    priority
                />

                <nav className="hidden xl:flex items-center space-x-15">
                    {menuItems.map((item, index) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={
                                    `text-primary02 font-normal text-xl transition-all px-2 py-1 whitespace-nowrap ` +
                                    `hover:font-bold hover:text-primary02 ` +
                                    (isActive ? 'font-bold border-b-2 border-primary02' : '')
                                }
                                style={{
                                    borderBottomWidth: isActive ? 2 : 0,
                                    borderColor: isActive ? 'var(--primary02)' : 'transparent',
                                    ...(isActive && { fontWeight: '700' }),
                                }}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center ">
                    <Image
                        src="/vnflag.svg"
                        alt="vnflag"
                        width={48}
                        height={32}
                        className="object-contain w-10 h-6 md:w-10 md:h-7 lg:w-12 lg:h-8 mr-4"
                        priority
                    />

                    <div className="block w-px h-8 md:h-10 bg-subtext opacity-60 md:opacity-100 mr-4" />

                    {isAuthenticated ? (
                        <div className="flex items-center space-x-2 md:space-x-5">
                            <button className="relative p-1 md:p-2 rounded-full hover:bg-gray-100 transition-colors">
                                <Bell className="w-5 h-5 md:w-6 md:h-6 text-black" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                                    3
                                </span>
                            </button>
                            {/* <UserMenu /> */}
                        </div>
                    ) : (
                        <>
                            <Button
                                variant="standard"
                                size="medium"
                                onClick={() => setIsLoginOpen(true)}
                            >
                                Đăng nhập
                            </Button>
                            <LoginPopup
                                isOpen={isLoginOpen}
                                onClose={() => setIsLoginOpen(false)}
                                onBackToLogin={() => setIsLoginOpen(false)}
                            />
                        </>
                    )}
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="xl:hidden bg-secondary01 border-t border-gray-200 shadow-lg">
                    <nav className="px-4 py-4 space-y-2">
                        {menuItems.map((item, index) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={
                                        `block w-full text-left px-4 py-3 rounded-lg transition-all ` +
                                        `hover:bg-gray-200 ` +
                                        (isActive
                                            ? 'bg-secondary02 text-primary01 font-bold border-l-4 border-primary01 rounded-l-none'
                                            : 'text-primary02 font-normal')
                                    }
                                >
                                    {item.label}
                                </Link>
                            );
                        })}

                        <div className="pt-2 ">
                            <Button
                                variant="outline"
                                size="large"
                                icon={<Smartphone className="w-4 h-4" />}
                                className="w-full justify-center"
                            >
                                Tải về Mobile
                            </Button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
