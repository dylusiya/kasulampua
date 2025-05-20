'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
// Icon components
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
    <circle cx="12" cy="13" r="4"></circle>
  </svg>
);

// Tambahkan definisi untuk ChevronLeftIcon
const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

// Tambahkan definisi untuk ChevronRightIcon
const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const UserGroupIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const MessageCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
    <line x1="8" y1="2" x2="8" y2="18"></line>
    <line x1="16" y1="6" x2="16" y2="22"></line>
  </svg>
);

// Data timeline
const timelineData = [
  {
    date: "11 Juni 2025",
    events: [
      {
        title: "Kedatangan Peserta",
        time: "",
        icon: UserGroupIcon,
        details: []
      },
      {
        title: "Welcome Dinner",
        time: "(18.30-19.30)",
        icon: UserGroupIcon,
        details: []
      },
      {
        title: "High Level Meeting",
        time: "(19.30-21.30)",
        icon: MessageCircleIcon,
        details: [
          "• Evaluasi Pelaksanaan Hasil Kesepakatan Konreg PDRB Kasulampua Tahun 2024",
          "• Tindak Lanjut Evaluasi dan Perumusan Kesepakatan selanjutnya",
          "• Penentuan Tuan Rumah Konreg PDRB Kasulampua selanjutnya"
        ]
      }
    ]
  },
  {
    date: "12 Juni 2025",
    events: [
      {
        title: "Pembukaan Konreg",
        time: "(08.30-10.00)",
        icon: MessageCircleIcon,
        details: []
      },
      {
        title: "Keynote Speech",
        time: "(10.15-10.30)",
        icon: MessageCircleIcon,
        details: [
          "Kepala BPS RI"
        ]
      },
      {
        title: "Pemaparan Materi",
        time: "(10.30-12.00)",
        icon: MessageCircleIcon,
        details: [
          "Bappenas, BPS, Bank Indonesia, Kementerian Keuangan, Kementerian Pertanian, Pelaku Usaha"
        ]
      },
      {
        title: "Kunjungan ke Stand UMKM",
        time: "",
        icon: MapIcon,
        details: []
      }
    ]
  },
  {
    date: "13 Juni 2025",
    events: [
      {
        title: "Kunjungan ke Geopark Meratus",
        time: "",
        icon: MapIcon,
        details: []
      },
      {
        title: "Kunjungan ke CBS Martapura",
        time: "",
        icon: MapIcon,
        details: []
      }
    ]
  }
];

const TimelineComponent = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.75;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">

    {/* Left scroll button */}
    <button 
      onClick={() => scroll('left')} 
      className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md ${!canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'hover:bg-snowymint-200'}`}
      disabled={!canScrollLeft}
      style={{ left: '-12px' }}  // Tambahkan style ini
    >
      <ChevronLeftIcon />
    </button>
      {/* Timeline container */}
      <div 
        className="overflow-x-auto hide-scrollbar pb-4 px-8" 
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        <div className="flex space-x-6 md:space-x-8 min-w-min py-4">
          {timelineData.map((day, dayIndex) => (
            <div key={dayIndex} className="flex-none w-72 md:w-80 relative">
              {/* Day circle */}
              <div className="relative mb-4 flex justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-orange-400 text-white flex flex-col items-center justify-center font-bold shadow-md z-10">
                  {/* Tampilkan hanya tanggal (digit angka) */}
                  <span className="text-xl md:text-2xl">
                    {day.date.split(' ')[0]}
                  </span>
                  {/* Tampilkan bulan */}
                  <span className="text-xs md:text-sm">
                    {day.date.split(' ')[1]}
                  </span>
                </div>
                
                {/* Connector line between days */}
                {dayIndex < timelineData.length - 1 && (
                  <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-orange-300"></div>
                )}
                {dayIndex > 0 && (
                  <div className="absolute top-1/2 right-1/2 w-full h-0.5 bg-orange-300"></div>
                )}
              </div>
              
              {/* Day events */}
              <div className="space-y-3">
                {day.events.map((event, eventIndex) => {
                  const EventIcon = event.icon;
                  const iconType = event.icon === UserGroupIcon ? "bg-orange-400" : 
                                  event.icon === MessageCircleIcon ? "bg-blue-400" : "bg-red-400";
                  
                  return (
                    <div key={eventIndex} className="bg-white rounded-lg shadow-md p-3 md:p-4">
                      <div className="flex items-start">
                        {/* Event icon */}
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white mr-3 flex-shrink-0 mt-0.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${iconType}`}>
                            <EventIcon className="w-4 h-4" />
                          </div>
                        </div>
                        
                        {/* Event content - without details */}
                        <div>
                          <h4 className="font-semibold text-base md:text-lg text-snowymint-900">{event.title}</h4>
                          {event.time && <p className="text-orange-500 text-xs md:text-sm">{event.time}</p>}
                          {/* Removed the details section */}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
    {/* Right scroll button */}
    <button 
      onClick={() => scroll('right')} 
      className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md ${!canScrollRight ? 'opacity-50 cursor-not-allowed' : 'hover:bg-snowymint-200'}`}
      disabled={!canScrollRight}
      style={{ right: '-12px' }}  // Tambahkan style ini
    >
      <ChevronRightIcon />
    </button>
      
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
      `}</style>
    </div>
  );
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavItemClick = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-snowymint-100 text-gray-800 shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-3 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="/logo/logo-kasulampua-warna.svg" 
                alt="KONREG PDRB KASULAMPUA Logo" 
                className="h-8 md:h-12"
              />
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#beranda" className="font-medium text-gray-800 hover:text-snowymint-900 transition-colors">Beranda</a>
              <Link href="/kegiatan" className="font-medium text-gray-800 hover:text-snowymint-900 transition-colors">
                Kegiatan
              </Link>
              <Link href="/akomodasi" className="font-medium text-gray-800 hover:text-snowymint-900 transition-colors">
                Akomodasi
              </Link>
              <a href="#wisata" className="font-medium text-gray-800 hover:text-snowymint-900 transition-colors">Wisata</a>
              <a href="#galeri" className="font-medium text-gray-800 hover:text-snowymint-900 transition-colors">Galeri</a>
              <a href="#kontak" className="font-medium text-gray-800 hover:text-snowymint-900 transition-colors">Kontak</a>
            </nav>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
                {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="pt-3 pb-1 space-y-1 md:hidden">
              <a href="#beranda" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm">Beranda</a>
              <a href="#kegiatan" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm">Kegiatan</a>
              <Link href="/kegiatan" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm">
                Kegiatan
              </Link>
              <Link href="/akomodasi" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm">
                Akomodasi
              </Link>
              <a href="#wisata" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm">Wisata</a>
              <a href="#galeri" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm">Galeri</a>
              <a href="#kontak" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm">Kontak</a>
            </nav>
          )}
        </div>
      </header>
      
      {/* Hero Section with Background Image - REDUCED HEIGHT */}
      <section className="relative pt-16 pb-4 md:pt-20 md:pb-10" id="beranda">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="/images/backgrounds/bg-utama.jpg" 
            alt="Background of Indonesian islands" 
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-snowymint-100 to-snowymint-600/40"></div>
        </div>
        
        <div className="container mx-auto px-3 py-4 md:py-10 relative z-10">
          <div className="max-w-xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-3 mb-1">
            <div className="h-8 w-8 md:h-12 md:w-12 flex items-center justify-center">
              <img 
                src="/logo/logo-bi.png" 
                alt="Logo Bank Indonesia" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="h-10 w-10 md:h-14 md:w-14 flex items-center justify-center"> {/* Size berbeda */}
              <img 
                src="/logo/logo-pemprov-kalsel.png" 
                alt="Logo Pemprov Kalimantan Selatan" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="h-8 w-10 md:h-12 md:w-14 flex items-center justify-center"> {/* Rasio aspek berbeda */}
              <img 
                src="/logo/logo-bps.png" 
                alt="Logo Badan Pusat Statistik" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
            <h2 className="text-snowymint-900 text-base md:text-xl font-medium mb-0.5">KONSULTASI REGIONAL PDRB KASULAMPUA</h2>
            <h1 className="text-pattensblue-900 text-4xl md:text-7xl font-bold mb-1 md:mb-2 whitespace-nowrap">PUSAT INFORMASI</h1>
            <p className="text-pattensblue-900 mb-3 md:mb-4 font-normal text-xs md:text-sm max-w-xs mx-auto md:max-w-none">Selamat datang di Pusat Informasi Peserta Konsultasi Regional PDRB Kalimantan, Sulawesi, Maluku, dan Papua (Kasulampua).</p>
            <div className="flex justify-center">
              {/* UPDATED: Increased button size for better visibility and touch targets */}
              <a href="https://wa.me/6285123456789" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-medium transition-colors text-center flex items-center justify-center text-sm md:text-base">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Bergabung ke WA Grup
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-6 md:py-12">
        <div className="container mx-auto px-3 md:px-4">
          <h2 className="text-xl md:text-3xl font-bold text-center mb-4 md:mb-8 text-snowymint-900">Cari Informasi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-8">
            <div className="bg-white p-3 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-6 w-6 md:h-10 md:w-10 rounded-full bg-snowymint-200 text-snowymint-900 flex items-center justify-center mb-2 md:mb-3">
                <ClockIcon className="w-3 h-3 md:w-5 md:h-5" />
              </div>
              <Link href="/kegiatan" className="font-medium text-gray-800 hover:text-snowymint-900 transition-colors">
                Informasi Kegiatan
              </Link>
              <p className="text-gray-600 font-normal text-xs md:text-sm">Dapatkan informasi terkini mengenai kegiatan PDRB di wilayah Kasulampua</p>
            </div>
            
            <div className="bg-white p-3 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-6 w-6 md:h-10 md:w-10 rounded-full bg-snowymint-200 text-snowymint-900 flex items-center justify-center mb-2 md:mb-3">
                <MapPinIcon className="w-3 h-3 md:w-5 md:h-5" />
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-snowymint-900">
              <Link href="/akomodasi" className="font-medium text-gray-800 hover:text-snowymint-900 transition-colors">
                Informasi Akomodasi
              </Link>
              </h3>
              <p className="text-gray-600 font-normal text-xs md:text-sm">Pilihan penginapan dan transportasi untuk mendukung mobilitas kegiatan</p>
            </div>
            
            <div className="bg-white p-3 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-6 w-6 md:h-10 md:w-10 rounded-full bg-snowymint-200 text-snowymint-900 flex items-center justify-center mb-2 md:mb-3">
                <CameraIcon className="w-3 h-3 md:w-5 md:h-5" />
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-snowymint-900">Wisata Daerah</h3>
              <p className="text-gray-600 font-normal text-xs md:text-sm">Rekomendasi tempat wisata untuk mengisi waktu luang selama kegiatan</p>
            </div>
          </div>
        </div>
      </section>
      

      {/* Timeline Section */}
      <section className="py-10 bg-green-50" id="kegiatan">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl md:text-3xl font-bold text-center mb-4 md:mb-8 text-snowymint-900">Timeline Kegiatan</h2>
          
          {/* Gunakan TimelineComponent yang sudah ada */}
          <TimelineComponent />
          
          <div className="text-center mt-8">
            <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-md font-medium transition-colors">
              Lihat Jadwal Lengkap
            </button>
          </div>
        </div>
      </section>
            
      {/* Footer */}
      <footer className="bg-snowymint-950 text-white py-6 md:py-8">
        <div className="container mx-auto px-3 md:px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div>
              <div className="flex items-center mb-3 justify-center sm:justify-start">
                <img 
                  src="/logo/logo-kasulampua-warna-putih.svg" 
                  alt="KONREG PDRB KASULAMPUA Logo" 
                  className="h-8 md:h-12"
                />
              </div>
              <p className="text-xs text-snowymint-100 mb-3 text-center sm:text-left">Pusat Informasi Peserta Konsultasi Regional PDRB Kalimantan, Sulawesi, Maluku, dan Papua (Kasulampua)</p>
            </div>
            
            <div className="mt-0">
              <h3 className="font-bold text-sm md:text-base mb-2 text-center sm:text-left">Menu</h3>
              <ul className="space-y-0.5 md:space-y-1 text-center sm:text-left">
                <li><a href="#beranda" className="text-snowymint-100 hover:text-white text-xs md:text-sm">Beranda</a></li>
                <li><a href="/kegiatan" className="text-snowymint-100 hover:text-white text-xs md:text-sm">Kegiatan</a></li>
                <li><a href="/akomodasi" className="text-snowymint-100 hover:text-white text-xs md:text-sm">Akomodasi</a></li>
                <li><a href="#wisata" className="text-snowymint-100 hover:text-white text-xs md:text-sm">Wisata</a></li>
                <li><a href="#galeri" className="text-snowymint-100 hover:text-white text-xs md:text-sm">Galeri</a></li>
                <li><a href="#kontak" className="text-snowymint-100 hover:text-white text-xs md:text-sm">Kontak</a></li>
              </ul>
            </div>
            
            <div className="mt-0">
              <h3 className="font-bold text-sm md:text-base mb-2 text-center sm:text-left">Wilayah</h3>
              <ul className="space-y-0.5 md:space-y-1 text-center sm:text-left">
                <li><a href="#" className="text-snowymint-100 hover:text-white text-xs md:text-sm">Kalimantan</a></li>
                <li><a href="#" className="text-snowymint-100 hover:text-white text-xs md:text-sm">Sulawesi</a></li>
                <li><a href="#" className="text-snowymint-100 hover:text-white text-xs md:text-sm">Maluku</a></li>
                <li><a href="#" className="text-snowymint-100 hover:text-white text-xs md:text-sm">Papua</a></li>
              </ul>
            </div>
            
            <div className="mt-0">
              <h3 className="font-bold text-sm md:text-base mb-2 text-center sm:text-left">Kontak</h3>
              <ul className="space-y-1 text-xs md:text-sm">
                <li className="flex items-start justify-center sm:justify-start">
                  <MapPinIcon className="mr-1 mt-0.5 flex-shrink-0 w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-snowymint-100">Jl. Soekarno Hatta/Trikora No 7 Banjarbaru</span>
                </li>
                <li className="flex items-center justify-center sm:justify-start">
                  <PhoneIcon className="mr-1 flex-shrink-0 w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-snowymint-100">0511 6749001</span>
                </li>
                <li className="flex items-center justify-center sm:justify-start">
                  <MailIcon className="mr-1 flex-shrink-0 w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-snowymint-100 text-xs">bps6300@bps.go.id</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-snowymint-900 mt-4 md:mt-6 pt-3 md:pt-4 text-center">
            <p className="text-xs text-snowymint-200">© 2025 Pusat Informasi Konreg PDRB Kasulampua. Hak Cipta Dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}