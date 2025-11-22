'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
    isOpen: boolean;
    onClose: () => void;
    onDateSelect: (date: { departureDate: string; returnDate: string }) => void;
}

const monthNames = [
    'Tháng 01',
    'Tháng 02',
    'Tháng 03',
    'Tháng 04',
    'Tháng 05',
    'Tháng 06',
    'Tháng 07',
    'Tháng 08',
    'Tháng 09',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
];

const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    const prevMonth = new Date(year, month - 1, 0);
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
        days.push({
            date: prevMonth.getDate() - i,
            isCurrentMonth: false,
            fullDate: new Date(year, month - 1, prevMonth.getDate() - i),
        });
    }

    for (let day = 1; day <= daysInMonth; day++) {
        days.push({
            date: day,
            isCurrentMonth: true,
            fullDate: new Date(year, month, day),
        });
    }

    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
        days.push({
            date: day,
            isCurrentMonth: false,
            fullDate: new Date(year, month + 1, day),
        });
    }

    return days;
};

const DatePicker: React.FC<DatePickerProps> = ({ isOpen, onClose, onDateSelect }) => {
    const [tripType, setTripType] = useState<'oneway' | 'roundtrip'>('roundtrip');
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 8));
    const [selectedDeparture, setSelectedDeparture] = useState<Date | null>(null);
    const [selectedReturn, setSelectedReturn] = useState<Date | null>(null);

    if (!isOpen) return null;

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentMonth((prev) => {
            const newMonth = new Date(prev);
            if (direction === 'prev') {
                newMonth.setMonth(prev.getMonth() - 1);
            } else {
                newMonth.setMonth(prev.getMonth() + 1);
            }
            return newMonth;
        });
    };

    const handleDateClick = (date: Date) => {
        if (tripType === 'oneway') {
            setSelectedDeparture(date);
            setSelectedReturn(null);
        } else {
            if (!selectedDeparture || (selectedDeparture && selectedReturn)) {
                setSelectedDeparture(date);
                setSelectedReturn(null);
            } else if (date >= selectedDeparture) {
                setSelectedReturn(date);
            } else {
                setSelectedDeparture(date);
                setSelectedReturn(null);
            }
        }
    };

    const handleConfirm = () => {
        if (selectedDeparture) {
            const departureDate = selectedDeparture.toLocaleDateString('vi-VN');
            const returnDate = selectedReturn ? selectedReturn.toLocaleDateString('vi-VN') : '';
            onDateSelect({
                departureDate,
                returnDate: tripType === 'roundtrip' ? returnDate : '',
            });
            onClose();
        }
    };

    const isDateSelected = (date: Date) => {
        return (
            (selectedDeparture && date.toDateString() === selectedDeparture.toDateString()) ||
            (selectedReturn && date.toDateString() === selectedReturn.toDateString())
        );
    };

    const isDateInRange = (date: Date) => {
        if (selectedDeparture && selectedReturn) {
            return date >= selectedDeparture && date <= selectedReturn;
        }
        return false;
    };

    const currentMonthDays = getDaysInMonth(currentMonth);
    const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
    const nextMonthDays = getDaysInMonth(nextMonth);

    return (
        <div className="bg-white rounded-lg shadow-2xl border border-border01 w-[580px]">
            <div className="px-4 py-3 border-b border-border01">
                <div className="flex justify-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="tripType"
                            checked={tripType === 'roundtrip'}
                            onChange={() => setTripType('roundtrip')}
                            className="w-4 h-4 text-primary01 border-border01 focus:ring-primary01"
                        />
                        <span className="text-text font-medium text-sm">Khứ hồi</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="tripType"
                            checked={tripType === 'oneway'}
                            onChange={() => setTripType('oneway')}
                            className="w-4 h-4 text-primary01 border-border01 focus:ring-primary01"
                        />
                        <span className="text-text font-medium text-sm">Một chiều</span>
                    </label>
                </div>
            </div>

            <div className="p-4">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <button
                                onClick={() => navigateMonth('prev')}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4 text-text" />
                            </button>
                            <h3 className="font-semibold text-text text-base">
                                {monthNames[currentMonth.getMonth()]}/{currentMonth.getFullYear()}
                            </h3>
                            <div className="w-6" />
                        </div>

                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {dayNames.map((day) => (
                                <div
                                    key={day}
                                    className="text-center text-xs font-semibold text-text py-1"
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1">
                            {currentMonthDays.map((day, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleDateClick(day.fullDate)}
                                    className={`
                                            w-8 h-8 text-xs rounded-full hover:bg-blue-50 transition-colors font-medium
                                            ${!day.isCurrentMonth ? 'text-border01' : 'text-text'}
                                            ${isDateSelected(day.fullDate) ? 'bg-primary01 text-white hover:bg-primary01' : ''}
                                            ${isDateInRange(day.fullDate) && !isDateSelected(day.fullDate) ? 'bg-secondary01' : ''}
                                        `}
                                >
                                    {day.date}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-6" />
                            <h3 className="font-semibold text-text text-base">
                                {monthNames[nextMonth.getMonth()]}/{nextMonth.getFullYear()}
                            </h3>
                            <button
                                onClick={() => navigateMonth('next')}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <ChevronRight className="w-4 h-4 text-text" />
                            </button>
                        </div>

                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {dayNames.map((day) => (
                                <div
                                    key={day}
                                    className="text-center text-xs font-semibold text-text py-1"
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1">
                            {nextMonthDays.map((day, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleDateClick(day.fullDate)}
                                    className={`
                                            w-8 h-8 text-xs rounded-full hover:bg-blue-50 transition-colors font-medium
                                            ${!day.isCurrentMonth ? 'text-border01' : 'text-text'}
                                            ${isDateSelected(day.fullDate) ? 'bg-primary01 text-white hover:bg-primary01' : ''}
                                            ${isDateInRange(day.fullDate) && !isDateSelected(day.fullDate) ? 'bg-secondary01' : ''}
                                        `}
                                >
                                    {day.date}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 py-3 border-t border-border01 flex justify-end gap-2">
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-text border border-border01 rounded-lg bg-gray-50 hover:bg-gray-200 transition-colors font-medium text-sm"
                >
                    Hủy
                </button>
                <button
                    onClick={handleConfirm}
                    disabled={!selectedDeparture}
                    className="px-4 py-2 bg-primary01 text-white rounded-lg hover:bg-primary02 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium text-sm"
                >
                    Xác nhận
                </button>
            </div>
        </div>
    );
};

export default DatePicker;
