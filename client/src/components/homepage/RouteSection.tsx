import React from 'react';
import { Button } from '@/components/ui-components';
import { Wifi, PlugZap, Monitor, GlassWater } from 'lucide-react';

const RouteSection: React.FC = () => {
    const routes = [
        {
            id: 1,
            from: 'Bến Xe Nguyễn Văn Cừ',
            to: 'Vũng Tàu',
            price: '110.000',
            duration: '6h 10m',
            amenities: ['Wifi', 'Tivi', 'Nước lọc', 'Cống sạc'],
        },
        {
            id: 2,
            from: 'Bến Xe Nguyễn Văn Cừ',
            to: 'Vũng Tàu',
            price: '110.000',
            duration: '6h 10m',
            amenities: ['Wifi', 'Tivi', 'Nước lọc', 'Cống sạc'],
        },
        {
            id: 3,
            from: 'Bến Xe Nguyễn Văn Cừ',
            to: 'Vũng Tàu',
            price: '110.000',
            duration: '6h 10m',
            amenities: ['Wifi', 'Tivi', 'Nước lọc', 'Cống sạc'],
        },
    ];

    const getAmenityIcon = (amenity: string) => {
        switch (amenity) {
            case 'Wifi':
                return <Wifi className="w-4 h-4" />;
            case 'Tivi':
                return <Monitor className="w-4 h-4" />;
            case 'Nước lọc':
                return <GlassWater className="w-4 h-4" />;
            case 'Cống sạc':
                return <PlugZap className="w-4 h-4" />;
            default:
                return null;
        }
    };

    return (
        <section
            className="py-20 relative"
            style={{
                backgroundImage: `url('/home/routeimage.png')`,
                backgroundSize: '1600px auto',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">
                        <span className="text-primary02">TUYẾN ĐƯỜNG</span>{' '}
                        <span className="text-black">PHỔ BIẾN</span>
                    </h2>
                    <p className="text-text text-xl max-w-6xl mx-auto">
                        Khám phá những tuyến xe khách được tìm kiếm và lựa chọn nhiều nhất. Chúng
                        tôi gợi ý các hành trình tiện lợi, phù hợp với nhu cầu đi lại hằng ngày cũng
                        như những chuyến đi xa của bạn.{' '}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {routes.map((route) => (
                        <div
                            key={route.id}
                            className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
                        >
                            <div className="p-6">
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-3 relative">
                                        <div className="text-left flex-1">
                                            <span className="text-xs text-text block mb-2">Từ</span>
                                            <span className="font-semibold text-base text-primary02 wrap-break-word">
                                                {route.from}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-center flex-1 px-1 relative">
                                            <div className="h-0 border-t-2 border-dotted border-text flex-1"></div>

                                            <div className="mx-1 border-2 border-dashed border-text rounded-full px-3 py-1 bg-white z-10">
                                                <span className="text-sm font-semibold text-primary01">
                                                    {route.duration}
                                                </span>
                                            </div>

                                            <div className="h-0 border-t-2 border-dotted border-text flex-1"></div>
                                        </div>

                                        <div className="text-right flex-1">
                                            <span className="text-xs text-text block mb-2">
                                                Đến
                                            </span>
                                            <span className="font-semibold text-base text-primary02 wrap-break-word">
                                                {route.to}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 mb-4 py-2 border-t border-b border-border02">
                                    {route.amenities.map((amenity, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-1 text-xs italic text-text"
                                        >
                                            {getAmenityIcon(amenity)}
                                            <span>{amenity}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="text-2xl font-bold text-primary02">
                                        {route.price}
                                    </div>
                                    <Button variant="outline" size="medium">
                                        Mua vé
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RouteSection;
