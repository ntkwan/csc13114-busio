'use client';

import React from 'react';
import Link from 'next/link';
import { Bus, Home, MoveLeft } from 'lucide-react';
import Button from '@/components/ui-components/Button';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-secondary02 p-4 overflow-hidden relative">
            {/* Decorative Background Elements */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-primary02/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary01/10 rounded-full blur-3xl animate-pulse delay-700" />

            <div className="relative z-10 text-center max-w-2xl mx-auto">
                {/* Animated 404 & Bus */}
                <div className="relative mb-8">
                    <div className="text-[150px] font-black text-primary02/20 leading-none select-none">
                        404
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="relative">
                            <div className="animate-bounce">
                                <Bus className="h-32 w-32 text-primary02 drop-shadow-2xl" />
                            </div>
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black/10 rounded-[100%] blur-sm animate-pulse" />
                        </div>
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
                    Oops! Chuyến xe này không tồn tại
                </h1>

                <p className="text-lg text-subtext mb-10 max-w-lg mx-auto">
                    Có vẻ như bạn đã đi lạc đường. Trang bạn đang tìm kiếm không tồn tại hoặc đã bị
                    di chuyển.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/">
                        <Button
                            className="min-w-[200px] h-12 bg-primary02 hover:bg-primary01 text-white shadow-lg shadow-primary02/30 hover:shadow-primary02/50 transition-all hover:-translate-y-1"
                            icon={<Home className="w-5 h-5" />}
                        >
                            Về trang chủ
                        </Button>
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center justify-center min-w-[200px] h-12 rounded-xl border-2 border-primary02 text-primary02 font-medium hover:bg-primary02/5 transition-all"
                    >
                        <MoveLeft className="w-5 h-5 mr-2" />
                        Quay lại trang trước
                    </button>
                </div>
            </div>

            {/* Footer Text */}
            <div className="absolute bottom-8 text-sm text-subtext/60">
                Error Code: 404_PAGE_NOT_FOUND
            </div>
        </div>
    );
}
