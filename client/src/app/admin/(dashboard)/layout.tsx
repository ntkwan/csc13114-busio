'use client';

import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-secondary02">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className="p-4 lg:ml-64">
                {/* Mobile Header for Sidebar Toggle */}
                <div className="mb-4 lg:hidden flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-border02">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 -ml-2 text-subtext hover:text-foreground rounded-lg hover:bg-secondary02"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <span className="font-bold text-foreground">Busio Admin</span>
                    <div className="w-10" /> {/* Spacer for centering */}
                </div>

                <div className="min-h-[calc(100vh-2rem)] rounded-2xl border-border02">
                    {children}
                </div>
            </div>
        </div>
    );
}
