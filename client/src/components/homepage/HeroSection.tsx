'use client';

import React from 'react';
import Lottie from 'lottie-react';
import HeroSectionAnimation from '@/assets/lottie/Bus-Transport.json';
import SearchBox from '@/components/common/SearchBox';

const HeroSection: React.FC = () => {
    return (
        <section className="relative min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:min-h-[900px]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 p-4 lg:py-10">
                <div className="flex flex-col justify-center">
                    <h1 className="font-ranchers text-8xl sm:text-9xl font-extrabold text-primary02 mb-4">
                        BUS.IO
                    </h1>

                    <p className="text-[#FFD042] text-2xl sm:text-3xl font-semibold mb-4">
                        Đặt vé xe khách nhanh chóng — An tâm cho mọi hành trình
                    </p>

                    <p className="text-black leading-relaxed text-xl sm:text-2xl">
                        BusIO giúp bạn dễ dàng tìm kiếm, so sánh và đặt vé xe khách chỉ trong vài
                        giây. Hàng trăm tuyến đường, nhà xe uy tín, giá minh bạch và thanh toán tiện
                        lợi.
                    </p>
                </div>

                <div className="flex items-center justify-center relative">
                    <Lottie
                        animationData={HeroSectionAnimation}
                        loop
                        autoplay
                        className="w-[380px] sm:w-[420px] md:w-[480px] lg:w-[520px] object-contain"
                    />
                </div>
            </div>

            <div className="w-full flex items-center justify-center mt-4 mb-10 ">
                <SearchBox
                    variant="default"
                    // onSearch={handleSearch}
                    className="w-full max-w-6xl"
                />
            </div>
        </section>
    );
};

export default HeroSection;
