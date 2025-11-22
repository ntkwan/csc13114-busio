'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Bus,
    Ticket,
    Users,
    Settings,
    LogOut,
    Map,
    BarChart3,
    X,
} from 'lucide-react';
import { cn } from '@/utils/cn';

const sidebarItems = [
    {
        title: 'Dashboard',
        href: '/admin',
        icon: LayoutDashboard,
    },
    {
        title: 'Chuyến xe',
        href: '/admin/trips',
        icon: Bus,
    },
    {
        title: 'Vé đã đặt',
        href: '/admin/bookings',
        icon: Ticket,
    },
    {
        title: 'Sơ đồ ghế',
        href: '/admin/seat-maps',
        icon: Map,
    },
    {
        title: 'Khách hàng',
        href: '/admin/customers',
        icon: Users,
    },
    {
        title: 'Báo cáo',
        href: '/admin/reports',
        icon: BarChart3,
    },
    {
        title: 'Cài đặt',
        href: '/admin/settings',
        icon: Settings,
    },
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const pathname = usePathname();

    return (
        <>
            {/* Overlay for mobile */}
            <div
                className={cn(
                    'fixed inset-0 z-30 bg-gray-900/50 transition-opacity lg:hidden',
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
                )}
                onClick={onClose}
            />

            <aside
                className={cn(
                    'fixed left-0 top-0 z-40 h-screen w-64 border-r border-border02 bg-white transition-transform lg:translate-x-0',
                    isOpen ? 'translate-x-0' : '-translate-x-full',
                )}
            >
                <div className="flex h-full flex-col px-3 py-4">
                    <div className="mb-6 flex items-center justify-between pl-2.5">
                        <div className="flex items-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary02 text-white shadow-lg shadow-primary02/20">
                                <Bus className="h-6 w-6" />
                            </div>
                            <span className="ml-3 self-center whitespace-nowrap text-xl font-bold text-foreground">
                                Busio Admin
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 text-subtext hover:text-foreground"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex-1 space-y-1 overflow-y-auto">
                        <ul className="space-y-2 font-medium">
                            {sidebarItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            onClick={() => onClose()} // Close sidebar on mobile when link clicked
                                            className={cn(
                                                'flex items-center rounded-lg p-3 text-text hover:bg-secondary02 group transition-all duration-200',
                                                isActive && 'bg-secondary01 text-primary02',
                                            )}
                                        >
                                            <item.icon
                                                className={cn(
                                                    'h-5 w-5 flex-shrink-0 text-subtext transition duration-75 group-hover:text-foreground',
                                                    isActive && 'text-primary02',
                                                )}
                                            />
                                            <span className="ml-3">{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="mt-auto border-t border-border02 pt-4">
                        <button className="flex w-full items-center rounded-lg p-3 text-text hover:bg-red-50 hover:text-red-600 transition-colors">
                            <LogOut className="h-5 w-5 flex-shrink-0" />
                            <span className="ml-3 whitespace-nowrap">Đăng xuất</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
