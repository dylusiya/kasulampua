'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

// Icon components
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);


const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

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

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

// Data timeline dengan detail lengkap
const timelineDetailData = [
  {
    date: "11 Juni 2025",
    events: [
      {
        title: "Kedatangan Peserta",
        time: "",
        icon: "user-group",
        details: [
          "Penjemputan peserta di Bandara Internasional Syamsudin Noor",
          "Check-in hotel dan pengambilan perlengkapan kegiatan",
          "Istirahat dan persiapan welcome dinner"
        ]
      },
      {
        title: "Welcome Dinner",
        time: "(18.30-19.30)",
        icon: "user-group",
        details: [
          "Lokasi: Ballroom Hotel Rattan Inn Banjarmasin",
          "Jamuan makan malam dan networking session",
          "Pengenalan panitia dan peserta"
        ]
      },
      {
        title: "High Level Meeting",
        time: "(19.30-21.30)",
        icon: "message-circle",
        details: [
          "Evaluasi Pelaksanaan Hasil Kesepakatan Konreg PDRB Kasulampua Tahun 2024",
          "Tindak Lanjut Evaluasi dan Perumusan Kesepakatan selanjutnya",
          "Penentuan Tuan Rumah Konreg PDRB Kasulampua selanjutnya"
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
        icon: "message-circle",
        details: [
          "Lokasi: Ballroom Hotel Rattan Inn Banjarmasin",
          "Laporan Ketua Panitia",
          "Sambutan Kepala BPS Provinsi Kalsel",
          "Sambutan dan Pembukaan oleh Kepala BPS RI"
        ]
      },
      {
        title: "Keynote Speech",
        time: "(10.15-10.30)",
        icon: "message-circle",
        details: [
          "Presentasi oleh Kepala BPS RI",
          "Tema: Peningkatan Kualitas Statistik Ekonomi Regional dalam Era Digital"
        ]
      },
      {
        title: "Coffee Break",
        time: "(10.30-10.45)",
        icon: "user-group",
        details: [
          "Lokasi: Foyer Ballroom Hotel Rattan Inn Banjarmasin"
        ]
      },
      {
        title: "Pemaparan Materi",
        time: "(10.45-12.00)",
        icon: "message-circle",
        details: [
          "Panel Diskusi dengan tema Pemanfaatan Big Data untuk Peningkatan Kualitas PDRB",
          "Narasumber:",
          "- Bappenas: Materi .........",
          "- Bank Indonesia: Materi .........",
          "- Kementerian Keuangan: Materi .........",
          "- Kementerian Pertanian: Materi .........",
          "- Pelaku Usaha: Materi ........."
        ]
      },
      {
        title: "ISHOMA",
        time: "(12.00-13.00)",
        icon: "user-group",
        details: [
          "Lokasi: Restoran Hotel Rattan Inn Banjarmasin"
        ]
      },
      {
        title: "Kunjungan ke Stand UMKM",
        time: "(13.00-15.00)",
        icon: "map",
        details: [
          "Lokasi: Exhibition Hall Hotel Rattan Inn Banjarmasin",
          "Pameran produk UMKM khas Kalimantan Selatan",
          "Demo pembuatan sasirangan dan kerajinan khas daerah",
          "Peragaan seni dan budaya lokal",
          "Sampling kuliner tradisional Banjar"
        ]
      }
    ]
  },
  {
    date: "13 Juni 2025",
    events: [
      {
        title: "Kunjungan ke Geopark Meratus",
        time: "(08.00-12.00)",
        icon: "map",
        details: [
          "Kumpul di Lobby Hotel pukul 07.30",
          "Perjalanan menuju Geopark Meratus",
          "Pemaparan pengelolaan kawasan konservasi",
          "Hiking dan foto di spot Meratus"
        ]
      },
      {
        title: "ISHOMA",
        time: "(12.00-13.00)",
        icon: "user-group",
        details: [
          "Lokasi: Restoran area Geopark Meratus"
        ]
      },
      {
        title: "Kunjungan ke CBS Martapura",
        time: "(13.30-16.00)",
        icon: "map",
        details: [
          "Kunjungan ke pusat pengrajin batu permata",
          "Penjelasan proses pembuatan kerajinan",
          "Belanja oleh-oleh dan produk khas Martapura"
        ]
      }
    ]
  },
  {
    date: "14 Juni 2025",
    events: [
      {
        title: "Check-out Hotel",
        time: "(sebelum 12.00)",
        icon: "user-group",
        details: [
          "Pengumpulan kunci kamar",
          "Pengembalian perlengkapan (jika ada)"
        ]
      },
      {
        title: "Antar ke Bandara (Opsional)",
        time: "(sesuai jadwal penerbangan)",
        icon: "map",
        details: [
          "Antar jemput ke Bandara Internasional Syamsudin Noor",
          "Koordinasi dengan panitia untuk pengaturan waktu"
        ]
      }
    ]
  }
];

// Data materi
const materiData = [
  {
    id: "materi1",
    title: "Materi 1 PDRB",
    format: "PDF",
    size: "3.2 MB",
    date: "10 Juni 2025"
  },
  {
    id: "materi2",
    title: "Materi 2",
    format: "PPTX",
    size: "8.5 MB",
    date: "11 Juni 2025"
  },
  {
    id: "materi3",
    title: "Materi 3",
    format: "PDF",
    size: "4.7 MB",
    date: "12 Juni 2025"
  },
  {
    id: "materi4",
    title: "Materi 4",
    format: "ZIP",
    size: "15.3 MB",
    date: "12 Juni 2025"
  }
];

// Data notula
const notulaData = [
  {
    id: "notula1",
    title: "Notula High Level Meeting",
    tanggal: "11 Juni 2025",
    format: "PDF",
    size: "1.2 MB"
  },
  {
    id: "notula2",
    title: "Notula Pembukaan Konreg PDRB",
    tanggal: "12 Juni 2025",
    format: "PDF",
    size: "0.9 MB"
  },
  {
    id: "notula3",
    title: "Notula Penutupan & Kesimpulan",
    tanggal: "13 Juni 2025",
    format: "PDF",
    size: "2.1 MB"
  }
];

// Component untuk TimelineDetail yang akan menampilkan timeline lengkap
const TimelineDetailComponent = () => {
  const [expandedEvents, setExpandedEvents] = useState({});

  // Toggle event details
  const toggleEventDetails = (dayIndex, eventIndex) => {
    const key = `${dayIndex}-${eventIndex}`;
    setExpandedEvents(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Check if event is expanded
  const isEventExpanded = (dayIndex, eventIndex) => {
    const key = `${dayIndex}-${eventIndex}`;
    return expandedEvents[key] || false;
  };

  useEffect(() => {
    // Expand all events on initial load
    const initialExpandState = {};
    timelineDetailData.forEach((day, dayIndex) => {
      day.events.forEach((_, eventIndex) => {
        initialExpandState[`${dayIndex}-${eventIndex}`] = false
      });
    });
    setExpandedEvents(initialExpandState);
  }, []);

  // Function to get icon based on string name
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'user-group':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        );
      case 'message-circle':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        );
      case 'map':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
            <line x1="8" y1="2" x2="8" y2="18"></line>
            <line x1="16" y1="6" x2="16" y2="22"></line>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        );
    }
  };

  return (
    <div className="w-full max-w-5xl">
      {timelineDetailData.map((day, dayIndex) => (
        <div key={dayIndex} className="mb-12">
          {/* Day Header */}
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-orange-400 text-white flex flex-col items-center justify-center font-bold shadow-md">
              <span className="text-xl md:text-2xl">{day.date.split(' ')[0]}</span>
              <span className="text-xs md:text-sm">{day.date.split(' ')[1]}</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg md:text-xl font-bold text-snowymint-900">{day.date}</h3>
              <p className="text-sm text-gray-600">{day.events.length} Kegiatan</p>
            </div>
          </div>
          
          {/* Day Events */}
          <div className="space-y-4 pl-8 border-l-2 border-orange-300">
            {day.events.map((event, eventIndex) => {
              // Determine icon color based on icon type
              let iconBgColor = "bg-orange-400";
              let borderColor = "border-orange-400";
              
              if (event.icon === 'message-circle') {
                iconBgColor = "bg-blue-400";
                borderColor = "border-blue-400";
              } else if (event.icon === 'map') {
                iconBgColor = "bg-red-400";
                borderColor = "border-red-400";
              }
              
              const isExpanded = isEventExpanded(dayIndex, eventIndex);
              
              return (
                <div key={eventIndex} className={`bg-white rounded-lg shadow-md p-4 transition-all ${isExpanded ? 'border-l-4 ' + borderColor : ''}`}>
                  {/* Event Header - Clickable to expand */}
                  <div 
                    className="flex items-start cursor-pointer"
                    onClick={() => toggleEventDetails(dayIndex, eventIndex)}
                  >
                    {/* Event icon */}
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white mr-4 flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBgColor}`}>
                        {getIconComponent(event.icon)}
                      </div>
                    </div>
                    
                    {/* Event title and time */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-lg text-snowymint-900">{event.title}</h4>
                          {event.time && <p className="text-orange-500 text-sm">{event.time}</p>}
                        </div>
                        <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                          <ChevronDownIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Event Details - Expandable */}
                  {isExpanded && event.details.length > 0 && (
                    <div className="pl-14 mt-3 pt-3 border-t border-gray-100">
                      <ul className="space-y-2">
                        {event.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="text-gray-700 flex items-start">
                            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-2"></span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function InformasiPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('lokasi');

  const handleNavItemClick = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'lokasi':
        return (
          <div>
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Lokasi Kegiatan</h1>
            
            {/* Google Maps Embed */}
            <div className="rounded-lg overflow-hidden shadow-md h-80 md:h-96 mb-6">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.0122921081984!2d114.61954897493564!3d-3.34710779662763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2de426b44dbf1aa1%3A0xd84955d98eb2a0af!2sRattan%20Inn%20Hotel%20Banjarmasin!5e0!3m2!1sen!2sid!4v1746757201996!5m2!1sen!2sid" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 mb-8">
                <div className="flex flex-col">
                    <h3 className="font-semibold text-lg mb-2">Hotel Rattan Inn Banjarmasin</h3>
                    <p className="text-gray-600 mb-2">Jl. A. Yani No.KM.4,5, Pemurus Baru, Kec. Banjarmasin Sel., Kota Banjarmasin, Kalimantan Selatan 70249</p>
                    <div className="flex items-center mb-2">
                    <CalendarIcon className="w-5 h-5 mr-2 text-orange-500" />
                    <span>11-14 Juni 2025</span>
                    </div>
                </div>
                </div>
          </div>
        );
    case 'jadwal':
        return (
            <div>
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Jadwal Kegiatan</h1>
            <div className="flex justify-start">
                <TimelineDetailComponent />
            </div>
            </div>
        );
      case 'materi':
        return (
          <div>
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Materi Kegiatan</h1>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Judul Materi
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Format
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ukuran
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unduh
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {materiData.map((materi) => (
                    <tr key={materi.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{materi.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{materi.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {materi.format}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {materi.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <a href="#" className="text-snowymint-800 hover:text-snowymint-900 flex items-center">
                          <DownloadIcon className="w-5 h-5 mr-1" />
                          <span>Unduh</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-snowymint-100 rounded-lg p-4 shadow-md flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">Unduh Semua Materi</h3>
                <p className="text-sm text-gray-600">Dapatkan semua materi dalam satu file ZIP</p>
              </div>
              <a href="#" className="bg-snowymint-800 text-white px-4 py-2 rounded hover:bg-snowymint-900 transition-colors flex items-center">
                <DownloadIcon className="w-5 h-5 mr-2" />
                <span>Unduh (25.3 MB)</span>
              </a>
            </div>
          </div>
        );
      case 'notula':
        return (
          <div>
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Notula Kegiatan</h1>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Judul Notula
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Format
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ukuran
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unduh
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {notulaData.map((notula) => (
                    <tr key={notula.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{notula.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{notula.tanggal}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {notula.format}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {notula.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <a href="#" className="text-snowymint-800 hover:text-snowymint-900 flex items-center">
                          <DownloadIcon className="w-5 h-5 mr-1" />
                          <span>Unduh</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-snowymint-100 rounded-lg p-4 shadow-md flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">Unduh Semua Notula</h3>
                <p className="text-sm text-gray-600">Dapatkan semua notula dalam satu file ZIP</p>
              </div>
              <a href="#" className="bg-snowymint-800 text-white px-4 py-2 rounded hover:bg-snowymint-900 transition-colors flex items-center">
                <DownloadIcon className="w-5 h-5 mr-2" />
                <span>Unduh (6.8 MB)</span>
              </a>
            </div>
          </div>
        );
      default:
        return <div>Pilih menu di samping untuk melihat informasi</div>;
    }
  };

  // Render breadcrumbs based on active section
  const renderBreadcrumbs = () => {
    let sectionName = "Informasi";
    
    switch (activeSection) {
      case 'lokasi':
        sectionName = "Lokasi Kegiatan";
        break;
      case 'jadwal':
        sectionName = "Jadwal Kegiatan";
        break;
      case 'materi':
        sectionName = "Materi";
        break;
      case 'notula':
        sectionName = "Notula";
        break;
    }
    
    return (
      <div className="flex items-center space-x-2">
        <Link href="/kegiatan" className="text-snowymint-800">Kegiatan</Link>
        <span className="text-gray-400">›</span>
        <span className="font-medium">{sectionName}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white text-gray-800 shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-3 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <img 
                  src="/logo/logo-kasulampua-warna.svg" 
                  alt="KONREG PDRB KASULAMPUA Logo" 
                  className="h-8 md:h-12"
                />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="font-medium text-gray-800 hover:text-snowymint-900 transition-colors">
                Beranda
              </Link>
              <Link href="/kegiatan" className="font-medium text-gray-800 hover:text-snowymint-900 transition-colors border-b-2 border-snowymint-900">
                Kegiatan
              </Link>
              <Link href="/akomodasi" className="font-medium text-gray-800 hover:text-snowymint-900 transition-colors">
                Akomodasi
              </Link>
              <Link href="/wisata" className="font-medium text-gray-800 hover:text-snowymint-900 transition-colors">
                Wisata
              </Link>
              <Link href="/galeri" className="font-medium text-gray-800 hover:text-snowymint-900 transition-colors">
                Galeri
              </Link>
              <Link href="/#kontak" className="font-medium text-gray-800 hover:text-snowymint-900 transition-colors">
                Kontak
              </Link>
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
              <Link href="/" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm">
                Beranda
              </Link>
              <Link href="/kegiatan" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm bg-snowymint-300">
                Kegiatan
              </Link>
              <Link href="/akomodasi" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm">
                Akomodasi
              </Link>
              <Link href="/wisata" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm">
                Wisata
              </Link>
              <Link href="/galeri" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm">
                Galeri
              </Link>
              <Link href="/#kontak" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm">
                Kontak
              </Link>
              
              {/* Mobile Sidebar Categories */}
              <div className="border-t mt-2 pt-2">
                <p className="text-sm font-medium text-gray-600 px-3 mb-1">Informasi Kegiatan:</p>
                <button
                  onClick={() => handleSectionClick('lokasi')}
                  className={`block w-full text-left py-2 px-6 text-sm ${activeSection === 'lokasi' ? 'bg-snowymint-300 text-snowymint-900 font-medium' : 'hover:bg-snowymint-200'}`}
                >
                  Lokasi Kegiatan
                </button>
                <button
                  onClick={() => handleSectionClick('jadwal')}
                  className={`block w-full text-left py-2 px-6 text-sm ${activeSection === 'jadwal' ? 'bg-snowymint-300 text-snowymint-900 font-medium' : 'hover:bg-snowymint-200'}`}
                >
                  Jadwal Kegiatan
                </button>
                <button
                  onClick={() => handleSectionClick('materi')}
                  className={`block w-full text-left py-2 px-6 text-sm ${activeSection === 'materi' ? 'bg-snowymint-300 text-snowymint-900 font-medium' : 'hover:bg-snowymint-200'}`}
                >
                  Materi
                </button>
                <button
                  onClick={() => handleSectionClick('notula')}
                  className={`block w-full text-left py-2 px-6 text-sm ${activeSection === 'notula' ? 'bg-snowymint-300 text-snowymint-900 font-medium' : 'hover:bg-snowymint-200'}`}
                >
                  Notula
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>
      
      <div className="flex flex-col md:flex-row pt-16">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 bg-gray-50 md:min-h-screen p-4">
          <h2 className="text-lg font-semibold mb-4">Informasi</h2>
          <nav>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => handleSectionClick('lokasi')}
                  className={`w-full text-left p-2 rounded transition-colors cursor-pointer ${activeSection === 'lokasi' ? 'bg-snowymint-100 text-snowymint-900' : 'hover:bg-gray-100'}`}
                >
                  <div className="flex items-center">
                    <span>Lokasi Kegiatan</span>
                  </div>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionClick('jadwal')}
                  className={`w-full text-left p-2 rounded transition-colors cursor-pointer ${activeSection === 'jadwal' ? 'bg-snowymint-100 text-snowymint-900' : 'hover:bg-gray-100'}`}
                >
                  <div className="flex items-center">
                    <span>Jadwal Kegiatan</span>
                  </div>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionClick('materi')}
                  className={`w-full text-left p-2 rounded transition-colors cursor-pointer ${activeSection === 'materi' ? 'bg-snowymint-100 text-snowymint-900' : 'hover:bg-gray-100'}`}
                >
                  <div className="flex items-center">
                    <span>Materi</span>
                  </div>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionClick('notula')}
                  className={`w-full text-left p-2 rounded transition-colors cursor-pointer ${activeSection === 'notula' ? 'bg-snowymint-100 text-snowymint-900' : 'hover:bg-gray-100'}`}
                >
                  <div className="flex items-center">
                    <span>Notula</span>
                  </div>
                </button>
              </li>
            </ul>
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-4">
          <div className="mb-6">
            {renderBreadcrumbs()}
          </div>
          
          {renderContent()}
        </main>
      </div>
      
      {/* Footer */}
      <footer className="bg-snowymint-950 text-white py-6 md:py-8 mt-8">
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
                <li><Link href="/" className="text-snowymint-100 hover:text-white text-xs md:text-sm">Beranda</Link></li>
                <li><Link href="/kegiatan" className="text-snowymint-100 hover:text-white text-xs md:text-sm">Kegiatan</Link></li>
                <li><Link href="/akomodasi" className="text-snowymint-100 hover:text-white text-xs md:text-sm">Akomodasi</Link></li>
                <li><Link href="/wisata" className="text-snowymint-100 hover:text-white text-xs md:text-sm">Wisata</Link></li>
                <li><Link href="/galeri" className="text-snowymint-100 hover:text-white text-xs md:text-sm">Galeri</Link></li>
                <li><Link href="/#kontak" className="text-snowymint-100 hover:text-white text-xs md:text-sm">Kontak</Link></li>
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
                  <EmailIcon className="mr-1 flex-shrink-0 w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-snowymint-100 text-xs">bps6300@bps.go.id </span>
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