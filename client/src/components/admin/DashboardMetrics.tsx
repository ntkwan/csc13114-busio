'use client';

import React from 'react';
import { DollarSign, Ticket, Bus, Users } from 'lucide-react';

const metrics = [
    {
        title: 'Doanh thu hôm nay',
        value: '12,500,000 ₫',
        change: '+15%',
        isPositive: true,
        icon: DollarSign,
        color: 'bg-green-500',
    },
    {
        title: 'Vé đã bán hôm nay',
        value: '45',
        change: '+8%',
        isPositive: true,
        icon: Ticket,
        color: 'bg-blue-500',
    },
    {
        title: 'Số chuyến đang chạy',
        value: '12',
        change: '0%',
        isPositive: true,
        icon: Bus,
        color: 'bg-purple-500',
    },
    {
        title: 'Tỉ lệ lấp đầy',
        value: '85%',
        change: '-2%',
        isPositive: false,
        icon: Users,
        color: 'bg-orange-500',
    },
];

const DashboardMetrics = () => {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((item, index) => (
                <div
                    key={index}
                    className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-border02"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-subtext">{item.title}</p>
                            <p className="mt-2 text-3xl font-bold text-foreground">{item.value}</p>
                        </div>
                        <div className={`rounded-xl p-3 ${item.color} bg-opacity-10`}>
                            <item.icon
                                className={`h-6 w-6 ${item.color.replace('bg-', 'text-')}`}
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span
                            className={`font-medium ${
                                item.isPositive ? 'text-green-600' : 'text-red-600'
                            }`}
                        >
                            {item.change}
                        </span>
                        <span className="ml-2 text-subtext">so với hôm qua</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardMetrics;
