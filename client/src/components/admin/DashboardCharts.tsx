'use client';

import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend,
} from 'recharts';

const revenueData = [
    { name: 'T2', value: 4000000 },
    { name: 'T3', value: 3000000 },
    { name: 'T4', value: 2000000 },
    { name: 'T5', value: 2780000 },
    { name: 'T6', value: 1890000 },
    { name: 'T7', value: 2390000 },
    { name: 'CN', value: 3490000 },
];

const occupancyData = [
    { name: 'T2', rate: 65 },
    { name: 'T3', rate: 59 },
    { name: 'T4', rate: 80 },
    { name: 'T5', rate: 81 },
    { name: 'T6', rate: 56 },
    { name: 'T7', rate: 95 },
    { name: 'CN', rate: 90 },
];

const DashboardCharts = () => {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Revenue Chart */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-border02">
                <h3 className="mb-6 text-lg font-bold text-foreground">Doanh thu 7 ngày qua</h3>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={revenueData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#5d866c" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#5d866c" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#e7e7e7"
                            />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#a9a9a9' }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#a9a9a9' }}
                                tickFormatter={(value) => `${value / 1000000}M`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    borderRadius: '8px',
                                    border: 'none',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                }}
                                formatter={(value: number) => [
                                    `${value.toLocaleString()} ₫`,
                                    'Doanh thu',
                                ]}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#5d866c"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorValue)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Occupancy Chart */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-border02">
                <h3 className="mb-6 text-lg font-bold text-foreground">Tỉ lệ lấp đầy</h3>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={occupancyData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#e7e7e7"
                            />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#a9a9a9' }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#a9a9a9' }}
                                unit="%"
                            />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    borderRadius: '8px',
                                    border: 'none',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                }}
                            />
                            <Bar
                                dataKey="rate"
                                fill="#c2a68c"
                                radius={[6, 6, 0, 0]}
                                barSize={40}
                                name="Tỉ lệ"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardCharts;
