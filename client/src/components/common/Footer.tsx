import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Mail, Phone } from 'lucide-react';

interface FooterProps {
    className?: string;
}

const quickLinks = [
    { label: 'Chính sách', href: '/policy' },
    { label: 'Chính sách bảo mật', href: '/privacy' },
    { label: 'Chính sách xử lý tranh chấp khiếu nại', href: '/dispute' },
    { label: 'Chính sách vận chuyển', href: '/shipping' },
    { label: 'Chính sách bảo hành', href: '/warranty' },
    { label: 'Quy chế hoạt động', href: '/operation' },
    { label: 'Chính sách thanh toán', href: '/payment' },
];

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
    return (
        <footer className={`bg-secondary02 ${className}`}>
            <div className="w-full max-w-[1440px] h-auto lg:h-[424px] mx-auto px-4 md:px-8 lg:px-4 pt-10 pb-5">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-10 h-full">
                    <div className="flex items-center justify-center ">
                        <Image
                            src="/favicon.svg"
                            alt="Logo BusIO"
                            width={225}
                            height={225}
                            className="object-contain w-40 h-40 lg:w-[190px] lg:h-[190px]"
                            priority
                        />
                    </div>

                    <div
                        className="relative w-full h-64 lg:h-1/3 rounded-sm overflow-hidden border items-center justify-center border-gray-200 mb-4"
                        style={{ minHeight: '330px' }}
                    >
                        <iframe
                            src="https://maps.google.com/maps?hl=en&q=University%20of%20Science%20-%20VNUHCM&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                    <div className="flex flex-col items-start justify-center w-full">
                        <h3 className="text-[16px] lg:text-[18px] font-bold text-primary02 mb-4">
                            BusIO
                        </h3>
                        <div className="space-y-4 w-full">
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-black mt-1 shrink-0" size={20} />
                                <span className="text-black text-[14px] lg:text-[16px]">
                                    227 Nguyễn Văn Cừ, Phường Chợ Quán, Quận 5, Thành phố Hồ Chí
                                    Minh
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-black shrink-0" size={20} />
                                <a
                                    href="mailto:busio.support@gmail.com"
                                    className="text-black transition-colors text-[14px] lg:text-[16px]"
                                >
                                    busio.support@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-black shrink-0" size={20} />
                                <a
                                    href="tel:19007373"
                                    className="text-black transition-colors text-[14px] lg:text-[16px]"
                                >
                                    1900 10 0 có
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-6">
                            <a href="#" className="hover:opacity-80 transition-opacity">
                                <Image src="/zalo.png" alt="Zalo" width={35} height={35} />
                            </a>
                            <a href="#" className="hover:opacity-80 transition-opacity">
                                <Image src="/facebook.png" alt="Facebook" width={35} height={35} />
                            </a>
                            <a href="#" className="hover:opacity-80 transition-opacity">
                                <Image src="/google.png" alt="Google" width={35} height={35} />
                            </a>
                        </div>
                    </div>

                    <div className="space-y-4 flex flex-col items-start justify-center w-full">
                        <h3 className="text-[16px] lg:text-[18px] font-bold text-primary02 mb-4">
                            Liên kết nhanh
                        </h3>
                        <div className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-primary01 transition-colors group"
                                >
                                    <span className="text-primary01">»</span>
                                    <span className="group-hover:translate-x-1 transition-transform text-[14px] lg:text-[16px]">
                                        {link.label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-primary01 text-white text-center py-4">
                <p className="text-[18px] lg:text-[20px] font-normal">
                    Copyright 2025 @ Công ty Cổ phần Bến Xe Miền Tây
                </p>
            </div>
        </footer>
    );
};

export default Footer;
