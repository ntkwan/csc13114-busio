'use client';

import React from 'react';
import { Bell, Search } from 'lucide-react';
import DashboardMetrics from '@/components/admin/DashboardMetrics';
import DashboardCharts from '@/components/admin/DashboardCharts';
import RecentActivity from '@/components/admin/RecentActivity';

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                    <p className="text-sm text-subtext">
                        Chào mừng trở lại, Admin Nhà xe Phương Trang
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtext" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="h-10 w-64 rounded-lg border border-border02 bg-white pl-10 pr-4 text-sm focus:border-primary01 focus:outline-none"
                        />
                    </div>

                    <button className="relative rounded-lg bg-white p-2 text-subtext hover:bg-secondary02 hover:text-text border border-border02">
                        <Bell className="h-5 w-5" />
                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                    </button>

                    <div className="flex items-center gap-3">
                        <img
                            src="https://ui-avatars.com/api/?name=Admin+User&background=5d866c&color=fff"
                            alt="Admin"
                            className="h-10 w-10 rounded-full border-2 border-white shadow-sm"
                        />
                        <div className="hidden md:block">
                            <p className="text-sm font-medium text-text">Admin User</p>
                            <p className="text-xs text-subtext">Quản trị viên</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Metrics Section */}
            <DashboardMetrics />

            {/* Charts Section */}
            <DashboardCharts />

            {/* Recent Activity Section */}
            <RecentActivity />
        </div>
    );
}
