import React from 'react';
import { Headphones, Banknote, Shield } from 'lucide-react';

const ServiceSection: React.FC = () => {
    const services = [
        {
            icon: <Headphones className="w-8 h-8 text-primary02" />,
            title: 'Hỗ trợ 24/7',
            description: 'Hỗ trợ mọi lúc thông qua chat, email hoặc điện thoại',
        },
        {
            icon: <Banknote className="w-8 h-8 text-primary02" />,
            title: 'Chính sách hoàn tiền',
            description:
                'Cung cấp tùy chọn hỗ nguồn đựng mua vé có thể hoàn tiền với các điều khoản rõ ràng',
        },
        {
            icon: <Shield className="w-8 h-8 text-primary02" />,
            title: 'Thanh toán an toàn',
            description: 'Tích hợp cổng thanh toán bảo mật giúp người dùng thanh toán vé',
        },
    ];

    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-primary02 mb-4">
                        DỊCH VỤ <span className="text-black">CỦA CHÚNG TÔI</span>
                    </h2>
                    <p className="text-text text-xl max-w-2xl mx-auto">
                        Chúng tôi mang đến trải nghiệm đặt vé tiện lợi, an toàn và đáng tin cậy.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-8xl mx-auto">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-secondary02 border border-border01 rounded-lg  py-6 text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
                        >
                            <div className="mb-3 flex items-center justify-center gap-2">
                                <div className="flex justify-center">
                                    <div className="p-4 bg-border02 rounded-full">
                                        {service.icon}
                                    </div>
                                </div>
                                <h3 className="text-[26px] font-bold text-primary02">
                                    {service.title}
                                </h3>
                            </div>
                            <p className="text-text text-base leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceSection;
