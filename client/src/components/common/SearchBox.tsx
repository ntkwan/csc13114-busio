'use client';

import React, { useState, useRef } from 'react';
import { ArrowLeftRight, Search, Calendar } from 'lucide-react';
import Image from 'next/image';
import { Button, DatePicker, Select } from '@/components/ui-components';
import { vietnamProvinceOptions } from '@/constants/vietnamProvinces';

export type SearchBoxVariant = 'default' | 'swap' | 'schedule';

interface SearchData {
    departure?: string;
    destination?: string;
    dateRange?: string;
}

interface SearchBoxProps {
    variant?: SearchBoxVariant;
    onSearch?: (data: SearchData) => void;
    className?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ variant = 'default', onSearch, className = '' }) => {
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [dateRange, setDateRange] = useState('');
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const dateInputRef = useRef<HTMLDivElement>(null);

    const handleSwapLocations = () => {
        const temp = departure;
        setDeparture(destination);
        setDestination(temp);
    };

    const handleSearch = () => {
        if (variant === 'schedule') {
            onSearch?.({ departure, destination });
        } else {
            onSearch?.({ departure, destination, dateRange });
        }
    };

    const handleDateInputClick = () => {
        setIsDatePickerOpen(true);
    };

    const handleDateSelect = (dates: { departureDate: string; returnDate: string }) => {
        if (dates.returnDate) {
            setDateRange(`${dates.departureDate} - ${dates.returnDate}`);
        } else {
            setDateRange(dates.departureDate);
        }
        setIsDatePickerOpen(false);
    };

    const containerStyles = {
        default:
            'w-full min-h-[122px] bg-[#F3F3F3] border border-border01 rounded-lg shadow-md p-4 sm:px-6 lg:px-[30px] sm:py-6 lg:py-[33px] mx-auto',
        swap: 'w-full w-auto min-h-[97px] bg-[#F3F3F3] border border-border01 p-4 sm:px-6 lg:px-[30px] sm:py-4 lg:py-[23px] mx-auto',
        schedule:
            'w-full max-w-[1171px] min-h-[90px] bg-[#F3F3F3] rounded-lg border border-border01 p-2 sm:px-2 lg:px-[20px] sm:py-4 lg:py-[20px] mx-auto',
    };

    const gapStyles = {
        default: 'gap-4 lg:gap-4',
        swap: 'gap-4 lg:gap-6',
        schedule: 'gap-4 lg:gap-6',
    };

    if (variant === 'schedule') {
        return (
            <div className={`${containerStyles.schedule} ${className}`}>
                <div
                    className={`flex flex-col sm:flex-row items-stretch sm:items-center ${gapStyles.schedule}`}
                >
                    <div className="relative flex-1">
                        <div className="w-full h-[55px] bg-white rounded-lg border border-border01 focus-within:border-primary01 flex items-center px-4 gap-3.5">
                            <Select
                                options={vietnamProvinceOptions}
                                value={departure}
                                onChange={setDeparture}
                                placeholder="Chọn điểm đi"
                                searchable
                                clearable
                                className="w-full"
                                icon={
                                    <Image
                                        src="/home/fromicon.png"
                                        alt="From"
                                        width={50}
                                        height={50}
                                    />
                                }
                            />
                        </div>
                    </div>

                    <div className="relative flex-1">
                        <div className="w-full h-[55px] bg-white rounded-lg border border-border01 focus-within:border-primary01 flex items-center px-4 gap-3.5">
                            <Select
                                options={vietnamProvinceOptions}
                                value={destination}
                                onChange={setDestination}
                                placeholder="Chọn điểm đến"
                                searchable
                                clearable
                                className="w-full"
                                icon={
                                    <Image src="/home/toicon.png" alt="To" width={50} height={50} />
                                }
                            />
                        </div>
                    </div>

                    <Button
                        onClick={handleSearch}
                        variant="standard"
                        size="large"
                        className="flex items-center gap-2"
                    >
                        <Search className="w-4 h-4 mr-2" />
                        <span className="text-base">Tìm kiếm</span>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className={`${containerStyles[variant]} ${className}`}>
            <div
                className={`flex flex-col xl:flex-row items-stretch xl:items-center ${variant === 'swap' ? 'justify-center max-w-6xl mx-auto' : ''} ${gapStyles[variant]} relative`}
            >
                <div
                    className={`relative flex-1 xl:flex-none ${variant === 'swap' ? 'xl:w-[350px]' : 'xl:w-[300px]'}`}
                >
                    <div
                        className={`relative flex-1 xl:flex-none ${variant === 'swap' ? 'xl:w-[350px]' : 'xl:w-[300px]'}`}
                    >
                        <Select
                            options={vietnamProvinceOptions}
                            value={departure}
                            onChange={setDeparture}
                            placeholder="Chọn điểm đi"
                            searchable
                            clearable
                            className="w-full"
                            icon={
                                <Image src="/home/fromicon.png" alt="From" width={50} height={50} />
                            }
                        />
                    </div>
                </div>

                {(variant === 'default' || variant === 'swap') && (
                    <button
                        onClick={handleSwapLocations}
                        className="xl:hidden absolute transform -translate-x-1/2 bg-primary02 hover:bg-primary01 transition-colors duration-200 rounded-full p-2 text-white z-20"
                        style={{
                            top: 'calc(49px)',
                            left: '50%',
                        }}
                        title="Đổi điểm đi/đến"
                    >
                        <ArrowLeftRight className="w-4 h-4 transform transition-transform duration-300 hover:rotate-270 rotate-90" />
                    </button>
                )}

                {(variant === 'default' || variant === 'swap') && (
                    <button
                        onClick={handleSwapLocations}
                        className="hidden xl:block absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary02 hover:bg-primary01 transition-colors duration-200 text-white p-2 rounded-full shadow-md z-10"
                        style={{ left: variant === 'swap' ? 'calc(316px)' : 'calc(300px + 9px)' }}
                        title="Đổi điểm đi/đến"
                    >
                        <ArrowLeftRight className="w-3 h-3 transform transition-transform duration-300 hover:rotate-180" />
                    </button>
                )}

                <div
                    className={`relative flex-1 lg:flex-none ${variant === 'swap' ? 'xl:w-[350px]' : 'xl:w-[300px]'}`}
                >
                    <div
                        className={`relative flex-1 xl:flex-none ${variant === 'swap' ? 'xl:w-[350px]' : 'xl:w-[300px]'}`}
                    >
                        <Select
                            options={vietnamProvinceOptions}
                            value={destination}
                            onChange={setDestination}
                            placeholder="Chọn điểm đến"
                            searchable
                            clearable
                            className="w-full"
                            icon={<Image src="/home/toicon.png" alt="To" width={50} height={50} />}
                        />
                    </div>
                </div>

                <div
                    className={`relative flex-1 xl:flex-none ${variant === 'swap' ? 'xl:w-[350px]' : 'xl:w-[300px]'}`}
                    ref={dateInputRef}
                >
                    <div
                        className="w-full h-[55px] bg-white rounded-lg border border-border01 focus-within:border-primary01 flex items-center px-4 gap-3.5 cursor-pointer"
                        onClick={handleDateInputClick}
                    >
                        <Calendar className="w-6 h-6 text-text" />
                        <input
                            type="text"
                            placeholder="Ngày đi - Ngày về"
                            value={dateRange}
                            readOnly
                            className="flex-1 outline-none text-base text-text placeholder-text cursor-pointer"
                        />
                    </div>

                    {isDatePickerOpen && (
                        <div className="absolute top-full left-0 z-50 mt-2">
                            <DatePicker
                                isOpen={isDatePickerOpen}
                                onClose={() => setIsDatePickerOpen(false)}
                                onDateSelect={handleDateSelect}
                            />
                        </div>
                    )}
                </div>

                <Button
                    onClick={handleSearch}
                    variant="standard"
                    size="large"
                    className="flex items-center gap-2 xl:w-[120px] whitespace-nowrap"
                >
                    <Search className="w-4 h-4 mr-2" />
                    <span className="text-base">
                        {variant === 'swap' ? 'Thay đổi' : 'Tìm kiếm'}
                    </span>
                </Button>
            </div>
        </div>
    );
};

export default SearchBox;
