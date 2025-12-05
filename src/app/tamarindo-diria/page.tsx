'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type TourType = 'skyline' | 'sunset' | 'next-level-skyline' | 'next-level-sunset' | '';
type HotelType = 'tamarindo-diria' | 'jardin-eden' | '';
type TimeSlot = '8:00 AM' | '11:00 AM' | '3:00 PM' | '5:00 PM';

interface FormData {
  nombre: string;
  adultos: number;
  ninos: number;
  fecha: string;
  horario: TimeSlot | '';
  tipoTour: TourType;
  conTransporte: boolean;
  hotel: HotelType;
  pickupTime: string;
  chk: string;
}

// Datos hardcodeados de disponibilidad (true = disponible, false = lleno)
const availabilityData: Record<string, Record<TimeSlot, boolean>> = {
  // Noviembre 2025 - algunas fechas con tours llenos
  '2025-11-20': { '8:00 AM': true, '11:00 AM': false, '3:00 PM': true, '5:00 PM': true },
  '2025-11-21': { '8:00 AM': false, '11:00 AM': false, '3:00 PM': true, '5:00 PM': true },
  '2025-11-22': { '8:00 AM': true, '11:00 AM': true, '3:00 PM': false, '5:00 PM': false },
  '2025-11-23': { '8:00 AM': false, '11:00 AM': false, '3:00 PM': false, '5:00 PM': true },
  '2025-11-24': { '8:00 AM': true, '11:00 AM': true, '3:00 PM': true, '5:00 PM': true },
  '2025-11-25': { '8:00 AM': true, '11:00 AM': false, '3:00 PM': false, '5:00 PM': true },
  '2025-11-26': { '8:00 AM': false, '11:00 AM': true, '3:00 PM': true, '5:00 PM': false },
  '2025-11-27': { '8:00 AM': true, '11:00 AM': true, '3:00 PM': false, '5:00 PM': true },
  '2025-11-28': { '8:00 AM': false, '11:00 AM': false, '3:00 PM': false, '5:00 PM': false }, // Black Friday - todo lleno
  '2025-11-29': { '8:00 AM': true, '11:00 AM': false, '3:00 PM': true, '5:00 PM': true },
  '2025-11-30': { '8:00 AM': true, '11:00 AM': true, '3:00 PM': true, '5:00 PM': false },
  // Diciembre 2025
  '2025-12-01': { '8:00 AM': true, '11:00 AM': true, '3:00 PM': true, '5:00 PM': true },
  '2025-12-05': { '8:00 AM': false, '11:00 AM': true, '3:00 PM': false, '5:00 PM': true },
  '2025-12-06': { '8:00 AM': true, '11:00 AM': false, '3:00 PM': true, '5:00 PM': false },
  '2025-12-07': { '8:00 AM': false, '11:00 AM': false, '3:00 PM': true, '5:00 PM': true },
  '2025-12-10': { '8:00 AM': true, '11:00 AM': true, '3:00 PM': false, '5:00 PM': false },
  '2025-12-15': { '8:00 AM': false, '11:00 AM': false, '3:00 PM': false, '5:00 PM': false }, // Lleno
  '2025-12-20': { '8:00 AM': true, '11:00 AM': false, '3:00 PM': true, '5:00 PM': true },
  '2025-12-24': { '8:00 AM': false, '11:00 AM': true, '3:00 PM': false, '5:00 PM': false }, // Nochebuena
  '2025-12-25': { '8:00 AM': false, '11:00 AM': false, '3:00 PM': false, '5:00 PM': false }, // Navidad - cerrado/lleno
  '2025-12-31': { '8:00 AM': true, '11:00 AM': false, '3:00 PM': false, '5:00 PM': true },
};

// Por defecto todo disponible
const getAvailability = (dateStr: string): Record<TimeSlot, boolean> => {
  return availabilityData[dateStr] || {
    '8:00 AM': true,
    '11:00 AM': true,
    '3:00 PM': true,
    '5:00 PM': true
  };
};

const timeSlots: TimeSlot[] = ['8:00 AM', '11:00 AM', '3:00 PM', '5:00 PM'];
const timeSlotLabels: Record<TimeSlot, string> = {
  '8:00 AM': '8',
  '11:00 AM': '11',
  '3:00 PM': '3',
  '5:00 PM': '5'
};

export default function TamarindoDiriaBooking() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10, 1)); // Noviembre 2025
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<TimeSlot | ''>('');
  const [step, setStep] = useState<'calendar' | 'form'>('calendar');
  
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    adultos: 1,
    ninos: 0,
    fecha: '',
    horario: '',
    tipoTour: '',
    conTransporte: false,
    hotel: '',
    pickupTime: '',
    chk: ''
  });

  const [showWarning, setShowWarning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const formatDateStr = (year: number, month: number, day: number): string => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isDatePast = (dateStr: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(dateStr + 'T00:00:00');
    return checkDate < today;
  };

  const handleDateClick = (dateStr: string) => {
    if (isDatePast(dateStr)) return;
    setSelectedDate(dateStr);
    setSelectedTime('');
  };

  const handleTimeSelect = (time: TimeSlot) => {
    const availability = getAvailability(selectedDate);
    if (!availability[time]) return;
    
    setSelectedTime(time);
    setFormData(prev => ({
      ...prev,
      fecha: selectedDate,
      horario: time,
      tipoTour: ''
    }));
    setStep('form');
  };

  const getToursForTime = (time: TimeSlot | ''): { value: TourType; label: string }[] => {
    if (time === '5:00 PM') {
      return [
        { value: 'sunset', label: 'Sunset Canopy Tour' },
        { value: 'next-level-sunset', label: 'Next Level Sunset' }
      ];
    }
    return [
      { value: 'skyline', label: 'Skyline Canopy Tour' },
      { value: 'next-level-skyline', label: 'Next Level Skyline' }
    ];
  };

  const calculatePickupTime = (horario: string, hotel: HotelType): string => {
    if (!horario || !hotel) return '';

    const timeMatch = horario.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!timeMatch) return '';

    let hours = parseInt(timeMatch[1]);
    const minutes = parseInt(timeMatch[2]);
    const period = timeMatch[3].toUpperCase();

    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    const subtractMinutes = hotel === 'tamarindo-diria' ? 40 : 35;
    let totalMinutes = hours * 60 + minutes - subtractMinutes;

    if (totalMinutes < 0) totalMinutes += 24 * 60;

    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;

    const displayHours = newHours > 12 ? newHours - 12 : (newHours === 0 ? 12 : newHours);
    const displayPeriod = newHours >= 12 ? 'PM' : 'AM';

    return `${displayHours}:${newMinutes.toString().padStart(2, '0')} ${displayPeriod}`;
  };

  const checkTimeWarning = (fecha: string, horario: string): boolean => {
    if (!fecha || !horario) return false;

    const now = new Date();
    const costaRicaOffset = -6 * 60;
    const localOffset = now.getTimezoneOffset();
    const costaRicaNow = new Date(now.getTime() + (localOffset + costaRicaOffset) * 60000);

    const selectedDateObj = new Date(fecha + 'T00:00:00');

    if (selectedDateObj.toDateString() !== costaRicaNow.toDateString()) {
      return false;
    }

    const timeMatch = horario.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!timeMatch) return false;

    let tourHours = parseInt(timeMatch[1]);
    const tourMinutes = parseInt(timeMatch[2]);
    const period = timeMatch[3].toUpperCase();

    if (period === 'PM' && tourHours !== 12) tourHours += 12;
    if (period === 'AM' && tourHours === 12) tourHours = 0;

    const tourTime = new Date(selectedDateObj);
    tourTime.setHours(tourHours, tourMinutes, 0, 0);

    const timeDiff = tourTime.getTime() - costaRicaNow.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    return hoursDiff < 2 && hoursDiff > 0;
  };

  useEffect(() => {
    if (formData.conTransporte && formData.hotel && formData.horario) {
      const pickup = calculatePickupTime(formData.horario, formData.hotel);
      setFormData(prev => ({ ...prev, pickupTime: pickup }));
    } else {
      setFormData(prev => ({ ...prev, pickupTime: '' }));
    }
  }, [formData.horario, formData.hotel, formData.conTransporte]);

  useEffect(() => {
    const warning = checkTimeWarning(formData.fecha, formData.horario);
    setShowWarning(warning);
  }, [formData.fecha, formData.horario]);

  useEffect(() => {
    if (!formData.conTransporte) {
      setFormData(prev => ({ ...prev, hotel: '', pickupTime: '' }));
    }
  }, [formData.conTransporte]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (showWarning) {
      alert('⚠️ La reserva es en menos de 2 horas.\n\nPor favor llame directamente a Skyline Canopy Tour para confirmar disponibilidad.');
      return;
    }

    setIsSubmitting(true);

    const tours = getToursForTime(formData.horario as TimeSlot);
    const bookingData = {
      ...formData,
      tourLabel: tours.find(t => t.value === formData.tipoTour)?.label,
      hotelLabel: formData.hotel === 'tamarindo-diria' ? 'Tamarindo Diria' : formData.hotel === 'jardin-eden' ? 'Jardín del Edén' : 'Sin transporte',
      fechaFormateada: new Date(formData.fecha + 'T00:00:00').toLocaleDateString('es-CR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      timestamp: new Date().toISOString()
    };

    console.log('Booking data to send:', bookingData);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);

    setTimeout(() => {
      setSubmitSuccess(false);
      setStep('calendar');
      setSelectedDate('');
      setSelectedTime('');
      setFormData({
        nombre: '',
        adultos: 1,
        ninos: 0,
        fecha: '',
        horario: '',
        tipoTour: '',
        conTransporte: false,
        hotel: '',
        pickupTime: '',
        chk: ''
      });
    }, 3000);
  };

  const goBack = () => {
    setStep('calendar');
    setSelectedTime('');
    setFormData(prev => ({ ...prev, tipoTour: '' }));
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const days = [];

    // Empty cells for days before the first day of month
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-20 md:h-24" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDateStr(year, month, day);
      const isPast = isDatePast(dateStr);
      const availability = getAvailability(dateStr);
      const isSelected = selectedDate === dateStr;
      const hasAnyAvailable = Object.values(availability).some(v => v);

      days.push(
        <div
          key={day}
          onClick={() => !isPast && handleDateClick(dateStr)}
          className={`h-20 md:h-24 p-1 md:p-2 rounded-xl border transition-all ${
            isPast
              ? 'bg-white/5 border-white/5 opacity-40 cursor-not-allowed'
              : isSelected
              ? 'bg-[#C9A227]/20 border-[#C9A227] cursor-pointer'
              : hasAnyAvailable
              ? 'bg-white/5 border-white/10 hover:border-[#C9A227]/50 cursor-pointer hover:bg-white/10'
              : 'bg-red-500/10 border-red-500/30 cursor-not-allowed'
          }`}
        >
          <div className={`text-sm md:text-base font-semibold mb-1 ${
            isSelected ? 'text-[#E6BE4D]' : isPast ? 'text-white/30' : 'text-white'
          }`}>
            {day}
          </div>
          
          {/* Availability dots */}
          {!isPast && (
            <div className="flex flex-wrap gap-1">
              {timeSlots.map((slot) => (
                <div
                  key={slot}
                  className="flex items-center gap-0.5"
                  title={`${slot}: ${availability[slot] ? 'Disponible' : 'Lleno'}`}
                >
                  <span className="text-[8px] md:text-[10px] text-white/50">{timeSlotLabels[slot]}</span>
                  <div className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ${
                    availability[slot] ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <main className="min-h-screen overflow-hidden relative">
      {/* Fixed background with image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/background.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
      </div>

      {/* Subtle gold glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[#E6BE4D]/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-20 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-white tracking-wide">
              GRUPO <span className="text-[#E6BE4D]">OROZ</span> CR
            </Link>
            <div className="flex items-center gap-3">
              <Link 
                href="/tamarindo-diria/proximas" 
                className="px-3 py-1.5 text-xs font-medium text-white/70 hover:text-[#E6BE4D] bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
              >
                📅 Próximas Reservas
              </Link>
              <Link 
                href="/tamarindo-diria/anteriores" 
                className="px-3 py-1.5 text-xs font-medium text-white/70 hover:text-[#E6BE4D] bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
              >
                📋 Reservas Anteriores
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="relative z-10 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Logo Skyline */}
          <div className="flex justify-center mb-4">
            <div className="relative h-16 w-40">
              <Image
                src="/logos/skyline.png"
                alt="Skyline Canopy Tour"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
              Tamarindo Diria / Jardín del Edén
            </h1>
            <p className="text-[#E6BE4D]">Reservas Skyline Canopy Tour</p>
          </div>

          {step === 'calendar' ? (
            <>
              {/* Legend */}
              <div className="flex justify-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-white/70 text-sm">Disponible</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-white/70 text-sm">Lleno</span>
                </div>
              </div>

              {/* Calendar */}
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-4 md:p-6 mb-6">
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                    className="p-2 text-white/70 hover:text-[#E6BE4D] hover:bg-white/10 rounded-lg transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h2 className="text-xl md:text-2xl font-bold text-white">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h2>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                    className="p-2 text-white/70 hover:text-[#E6BE4D] hover:bg-white/10 rounded-lg transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
                  {dayNames.map(day => (
                    <div key={day} className="text-center text-white/50 text-xs md:text-sm font-medium py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 md:gap-2">
                  {renderCalendar()}
                </div>
              </div>

              {/* Selected Date - Time Selection */}
              {selectedDate && (
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-[#C9A227]/30 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Selecciona el horario para el{' '}
                    <span className="text-[#E6BE4D]">
                      {new Date(selectedDate + 'T00:00:00').toLocaleDateString('es-CR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long'
                      })}
                    </span>
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {timeSlots.map((slot) => {
                      const availability = getAvailability(selectedDate);
                      const isAvailable = availability[slot];
                      
                      return (
                        <button
                          key={slot}
                          onClick={() => isAvailable && handleTimeSelect(slot)}
                          disabled={!isAvailable}
                          className={`p-4 rounded-xl font-medium transition-all ${
                            isAvailable
                              ? 'bg-gradient-to-r from-[#996515] via-[#C9A227] to-[#E6BE4D] text-slate-950 hover:shadow-lg hover:shadow-[#C9A227]/40 hover:-translate-y-0.5'
                              : 'bg-red-500/20 text-red-300 cursor-not-allowed border border-red-500/30'
                          }`}
                        >
                          <div className="text-lg font-bold">{slot}</div>
                          <div className="text-xs mt-1 opacity-80">
                            {isAvailable ? 'Disponible' : 'Lleno'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Form Step */
            <div className="max-w-2xl mx-auto">
              {/* Back Button */}
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-white/70 hover:text-[#E6BE4D] mb-6 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver al calendario
              </button>

              {/* Selected Date/Time Badge */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#C9A227]/20 border border-[#C9A227]/30 rounded-full">
                  <span className="text-white">
                    {new Date(formData.fecha + 'T00:00:00').toLocaleDateString('es-CR', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short'
                    })}
                  </span>
                  <span className="text-[#E6BE4D] font-bold">{formData.horario}</span>
                </div>
              </div>

              {/* Warning Message */}
              {showWarning && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <p className="text-red-300 font-semibold">¡Atención! Reserva con menos de 2 horas de anticipación</p>
                      <p className="text-red-200/80 text-sm mt-1">
                        Por favor llame directamente a Skyline Canopy Tour para confirmar disponibilidad.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-green-300 font-semibold">¡Reserva enviada exitosamente!</p>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 md:p-8 space-y-6">
                
                {/* Tipo de Tour */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Tipo de Tour
                  </label>
                  <select
                    required
                    value={formData.tipoTour}
                    onChange={(e) => setFormData({ ...formData, tipoTour: e.target.value as TourType })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#C9A227]/50 focus:ring-1 focus:ring-[#C9A227]/50 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-slate-900">Seleccionar tour...</option>
                    {getToursForTime(formData.horario as TimeSlot).map((tour) => (
                      <option key={tour.value} value={tour.value} className="bg-slate-900">
                        {tour.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Nombre */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Nombre del Cliente
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#C9A227]/50 focus:ring-1 focus:ring-[#C9A227]/50 transition-all"
                    placeholder="Nombre completo"
                  />
                </div>

                {/* Adultos y Niños */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Adultos
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={formData.adultos}
                      onChange={(e) => setFormData({ ...formData, adultos: parseInt(e.target.value) || 1 })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#C9A227]/50 focus:ring-1 focus:ring-[#C9A227]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Niños
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.ninos}
                      onChange={(e) => setFormData({ ...formData, ninos: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#C9A227]/50 focus:ring-1 focus:ring-[#C9A227]/50 transition-all"
                    />
                  </div>
                </div>

                {/* Transporte */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-3">
                    ¿Incluye Transporte?
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, conTransporte: false })}
                      className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                        !formData.conTransporte
                          ? 'bg-gradient-to-r from-[#996515] via-[#C9A227] to-[#E6BE4D] text-slate-950'
                          : 'bg-white/10 text-white/60 border border-white/20 hover:bg-white/20'
                      }`}
                    >
                      Sin Transporte
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, conTransporte: true })}
                      className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                        formData.conTransporte
                          ? 'bg-gradient-to-r from-[#996515] via-[#C9A227] to-[#E6BE4D] text-slate-950'
                          : 'bg-white/10 text-white/60 border border-white/20 hover:bg-white/20'
                      }`}
                    >
                      Con Transporte
                    </button>
                  </div>
                  
                  {/* Leyenda Sin Transporte */}
                  {!formData.conTransporte && (
                    <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <p className="text-blue-300 text-sm flex items-center gap-2">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Recomiéndele a sus clientes llegar 10 minutos antes de la hora del tour.
                      </p>
                    </div>
                  )}
                </div>

                {/* Hotel Pickup */}
                {formData.conTransporte && (
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Punto de Recogida
                    </label>
                    <select
                      required={formData.conTransporte}
                      value={formData.hotel}
                      onChange={(e) => setFormData({ ...formData, hotel: e.target.value as HotelType })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#C9A227]/50 focus:ring-1 focus:ring-[#C9A227]/50 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-slate-900">Seleccionar hotel...</option>
                      <option value="tamarindo-diria" className="bg-slate-900">Tamarindo Diria</option>
                      <option value="jardin-eden" className="bg-slate-900">Jardín del Edén</option>
                    </select>
                  </div>
                )}

                {/* Pickup Time - Auto calculated */}
                {formData.pickupTime && (
                  <div className="p-4 bg-[#C9A227]/10 border border-[#C9A227]/30 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">Hora de Pickup:</span>
                      <span className="text-[#E6BE4D] font-bold text-lg">{formData.pickupTime}</span>
                    </div>
                    <p className="text-white/50 text-xs mt-1">
                      {formData.hotel === 'tamarindo-diria' ? '40 minutos' : '35 minutos'} antes del tour
                    </p>
                  </div>
                )}

                {/* CHK */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    CHK (Código de Confirmación)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.chk}
                    onChange={(e) => setFormData({ ...formData, chk: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#C9A227]/50 focus:ring-1 focus:ring-[#C9A227]/50 transition-all"
                    placeholder="Ingresar código CHK"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || showWarning}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all ${
                    isSubmitting || showWarning
                      ? 'bg-white/20 text-white/40 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#996515] via-[#C9A227] to-[#E6BE4D] text-slate-950 hover:shadow-lg hover:shadow-[#C9A227]/40 hover:-translate-y-0.5'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Enviando...
                    </span>
                  ) : showWarning ? (
                    'Llamar a Skyline'
                  ) : (
                    'Enviar Reserva'
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Footer info */}
          <p className="text-center text-white/40 text-sm mt-8">
            Skyline Canopy Tour · Santa Cruz, Guanacaste
          </p>
        </div>
      </div>
    </main>
  );
}