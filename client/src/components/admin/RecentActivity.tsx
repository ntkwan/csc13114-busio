'use client';

import React from 'react';
import { Star, User } from 'lucide-react';

const recentFeedback = [
    {
        id: 1,
        user: 'Nguyễn Văn A',
        rating: 5,
        comment: 'Xe chạy êm, tài xế thân thiện. Rất hài lòng!',
        time: '2 giờ trước',
        avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=random',
    },
    {
        id: 2,
        user: 'Trần Thị B',
        rating: 4,
        comment: 'Giờ khởi hành hơi trễ một chút nhưng dịch vụ tốt.',
        time: '5 giờ trước',
        avatar: 'https://ui-avatars.com/api/?name=Tran+Thi+B&background=random',
    },
    {
        id: 3,
        user: 'Lê Văn C',
        rating: 5,
        comment: 'Tuyệt vời! Sẽ ủng hộ lần sau.',
        time: '1 ngày trước',
        avatar: 'https://ui-avatars.com/api/?name=Le+Van+C&background=random',
    },
];

const recentBookings = [
    {
        id: 'BK001',
        user: 'Phạm Văn D',
        route: 'Sài Gòn - Đà Lạt',
        seats: 'A1, A2',
        total: '500,000 ₫',
        status: 'success',
        time: '10 phút trước',
    },
    {
        id: 'BK002',
        user: 'Hoàng Thị E',
        route: 'Sài Gòn - Nha Trang',
        seats: 'B3',
        total: '350,000 ₫',
        status: 'pending',
        time: '30 phút trước',
    },
    {
        id: 'BK003',
        user: 'Vũ Văn F',
        route: 'Đà Lạt - Sài Gòn',
        seats: 'C1, C2, C3',
        total: '750,000 ₫',
        status: 'success',
        time: '1 giờ trước',
    },
];

const RecentActivity = () => {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Recent Feedback */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-border02">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-foreground">Feedback gần nhất</h3>
                    <button className="text-sm font-medium text-primary02 hover:text-primary01">
                        Xem tất cả
                    </button>
                </div>
                <div className="space-y-6">
                    {recentFeedback.map((item) => (
                        <div key={item.id} className="flex space-x-4">
                            <img
                                src={item.avatar}
                                alt={item.user}
                                className="h-10 w-10 rounded-full"
                            />
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-semibold text-foreground">
                                        {item.user}
                                    </h4>
                                    <span className="text-xs text-subtext">{item.time}</span>
                                </div>
                                <div className="flex items-center mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-3 w-3 ${
                                                i < item.rating
                                                    ? 'text-yellow-400 fill-yellow-400'
                                                    : 'text-border01'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <p className="mt-1 text-sm text-text line-clamp-2">
                                    {item.comment}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Bookings */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-border02">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-foreground">Booking gần nhất</h3>
                    <button className="text-sm font-medium text-primary02 hover:text-primary01">
                        Xem tất cả
                    </button>
                </div>
                <div className="space-y-4">
                    {recentBookings.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between p-4 rounded-xl bg-secondary02"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="h-10 w-10 rounded-full bg-secondary01 flex items-center justify-center">
                                    <User className="h-5 w-5 text-primary02" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-foreground">
                                        {item.user}
                                    </h4>
                                    <p className="text-xs text-subtext">
                                        {item.route} • {item.seats}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-foreground">{item.total}</p>
                                <span
                                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                        item.status === 'success'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}
                                >
                                    {item.status === 'success' ? 'Thành công' : 'Chờ xử lý'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecentActivity;
