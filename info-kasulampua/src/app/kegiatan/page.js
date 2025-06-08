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

const MailIcon = () => (
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
        time: "(sepanjang hari)",
        icon: "user-group",
        details: [
          "Check-in hotel masing-masing",
          "Koordinasi awal dengan panitia"
        ]
      }
    ]
  },
  {
    date: "12 Juni 2025",
    events: [
      {
        title: "Registrasi Peserta",
        time: "(08.30–09.00)",
        icon: "user-group",
        details: [
          "Lokasi: Galaxy Hotel Banjarmasin"
        ]
      },
      {
        title: "Pembukaan",
        time: "(08.30–09.00)",
        icon: "message-circle",
        details: [
          "Tarian Penyambutan – Panitia",
          "Menyanyikan Lagu Indonesia Raya",
          "Pembacaan Doa – Kanwil Kemenag Provinsi Kalimantan Selatan"
        ]
      },
      {
        title: "Sesi Pembukaan dan Launching",
        time: "(09.00–10.00)",
        icon: "message-circle",
        details: [
          "Laporan Penyelenggara Konreg PDRB Kasulampua 2025 – Kepala Bappeda Provinsi Kalimantan Selatan",
          "Opening Speech & Launching Portal Satu Data KASULAMPUA – Kepala BPS RI",
          "Sambutan & Pembukaan oleh Gubernur Kalimantan Selatan",
          "Penyerahan Plakat – Panitia",
          "Foto Bersama – Panitia",
          "Kunjungan ke Stand UMKM – DJPb Provinsi Kalimantan Selatan"
        ]
      },
      {
        title: "Coffee Break",
        time: "(10.00–10.15)",
        icon: "coffee",
        details: [
          "Disediakan oleh Panitia"
        ]
      },
      {
        title: "Opening Speech Narasumber",
        time: "(10.15–10.30)",
        icon: "message-circle",
        details: [
          "Deputi Neraca dan Analisis Statistik – BPS RI"
        ]
      },
      {
        title: "Pemaparan Materi",
        time: "(10.30–12.30)",
        icon: "message-circle",
        details: [
          "Moderator: BAPPENAS RI",
          "- Arah Kebijakan Nasional Penguatan Perekonomian dan Sinergi Pembangunan Kasulampua – BAPPENAS RI",
          "- Transformasi Ekonomi Kerakyatan dan Digitalisasi di KASULAMPUA – BPS RI",
          "- Dukungan Bank Indonesia pada Ekonomi Inklusif Kawasan Kasulampua – Bank Indonesia",
          "- Dukungan Kementerian Keuangan pada Pertumbuhan Ekonomi Kasulampua – Kementerian Keuangan RI",
          "- Diskusi – Panitia"
        ]
      },
      {
        title: "ISHOMA",
        time: "(12.30–13.30)",
        icon: "user-group",
        details: [
          "Lokasi: Restoran Galaxy Hotel Banjarmasin – Panitia"
        ]
      },
      {
        title: "Pemaparan Hasil Rumusan Kesepakatan",
        time: "(13.30–14.30)",
        icon: "message-circle",
        details: [
          "Kepala BPS Provinsi Kalimantan Selatan"
        ]
      },
      {
        title: "Penutupan",
        time: "(15.00–15.30)",
        icon: "message-circle",
        details: []
      }
    ]
  },
  {
    date: "13 Juni 2025",
    events: [
      {
        title: "Kepulangan Peserta",
        time: "(sesuai jadwal penerbangan)",
        icon: "map",
        details: [
        ]
      }
    ]
  }
];


// Data dokumen terkait kegiatan
const dokumenData = [
  {
    id: "dokumen1", 
    title: "Surat Pemberitahuan Konreg PDRB",
    format: "PDF",
    size: "281 kb",
    date: "15 Mei 2025",
    driveLink: "https://drive.google.com/file/d/1NFsYEgsOAixkAytMIsqlcbO6zKkEl2KI/view?usp=sharing"
  },
]

// Data notula
const notulaData = [
  {
    id: "notula1",
    title: "Notula Coming Soon",
    tanggal: "12 Juni 2025",
    format: "PDF",
    size: "1.2 MB",
    driveLink: "https://drive.google.com/file/d/your-notula-id-1/view"
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

  // Define sections order for navigation
  const sections = ['lokasi', 'jadwal', 'dokumen', 'notula'];
  const sectionTitles = {
    'lokasi': 'Lokasi Kegiatan',
    'jadwal': 'Jadwal Kegiatan', 
    'dokumen': 'Dokumen Terkait',
    'notula': 'Materi dan Notula'
  };

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

  // Navigation functions
  const getCurrentSectionIndex = () => sections.indexOf(activeSection);
  
  const goToPrevSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1]);
    }
  };

  const goToNextSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1]);
    }
  };

  const hasPrevSection = () => getCurrentSectionIndex() > 0;
  const hasNextSection = () => getCurrentSectionIndex() < sections.length - 1;

  const getPrevSectionName = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex > 0) {
      return sectionTitles[sections[currentIndex - 1]];
    }
    return '';
  };

  const getNextSectionName = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex < sections.length - 1) {
      return sectionTitles[sections[currentIndex + 1]];
    }
    return '';
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
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.1039649910103!2d114.59888117493567!3d-3.3244832966503246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2de423e4212fce4b%3A0x32f154230278af69!2sGalaxy%20Hotel%20Banjarmasin!5e0!3m2!1sen!2sid!4v1748420068220!5m2!1sen!2sid" 
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
                    <h3 className="font-semibold text-lg mb-2">Galaxy Hotel Banjarmasin</h3>
                    <p className="text-gray-600 mb-2">Jalan A. Yani KM 2,5 No.138, Sungai Baru, Kec. Banjarmasin Tengah, Kota Banjarmasin, Kalimantan Selatan 70233</p>
                    <div className="flex items-center mb-2">
                    <CalendarIcon className="w-5 h-5 mr-2 text-orange-500" />
                    <span>Kamis, 12 Juni 2025</span>
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
      case 'dokumen':
        return (
          <div>
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Dokumen Terkait Kegiatan</h1>
            
            {/* Mobile Card Layout */}
            <div className="md:hidden space-y-4">
              {dokumenData.map((dokumen) => (
                <div key={dokumen.id} className="bg-white rounded-lg shadow-md p-4 border">
                  <h3 className="font-medium text-gray-900 mb-2">{dokumen.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between items-center">
                      <span>Tanggal:</span>
                      <span>{dokumen.date}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Format:</span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {dokumen.format}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Ukuran:</span>
                      <span>{dokumen.size}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t">
                    <a 
                      href={dokumen.driveLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center w-full bg-snowymint-800 hover:bg-snowymint-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      <DownloadIcon className="w-4 h-4 mr-2" />
                      <span>Unduh Dokumen</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table Layout */}
            <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Judul Dokumen
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
                  {dokumenData.map((dokumen) => (
                    <tr key={dokumen.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{dokumen.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{dokumen.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {dokumen.format}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dokumen.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <a href={dokumen.driveLink} target="_blank" rel="noopener noreferrer" className="text-snowymint-800 hover:text-snowymint-900 flex items-center">
                          <DownloadIcon className="w-5 h-5 mr-1" />
                          <span>Unduh</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'notula':
        return (
          <div>
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Materi dan Notula Kegiatan</h1>
            
            {/* Mobile Card Layout */}
            <div className="md:hidden space-y-4">
              {notulaData.map((notula) => (
                <div key={notula.id} className="bg-white rounded-lg shadow-md p-4 border">
                  <h3 className="font-medium text-gray-900 mb-2">{notula.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between items-center">
                      <span>Tanggal:</span>
                      <span>{notula.tanggal}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Format:</span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {notula.format}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Ukuran:</span>
                      <span>{notula.size}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t">
                    <a 
                      href="#" 
                      className="flex items-center justify-center w-full bg-snowymint-800 hover:bg-snowymint-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      <DownloadIcon className="w-4 h-4 mr-2" />
                      <span>Unduh Dokumen</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table Layout */}
            <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Judul
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
      case 'dokumen':
        sectionName = "Dokumen";
        break;
      case 'notula':
        sectionName = "Materi dan Notula";
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
              <Link href="/kontak" className="font-medium text-gray-800 hover:text-snowymint-900 transition-colors">
                Kontak
              </Link>
              <Link href="/tentang" className="font-medium text-gray-800 hover:text-snowymint-900 transition-colors">
                Tentang
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
              <Link href="/kontak" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm">
                Kontak
              </Link>
              <Link href="/tentang" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm">
                Tentang
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
                  onClick={() => handleSectionClick('dokumen')}
                  className={`block w-full text-left py-2 px-6 text-sm ${activeSection === 'dokumen' ? 'bg-snowymint-300 text-snowymint-900 font-medium' : 'hover:bg-snowymint-200'}`}
                >
                  Dokumen Terkait
                </button>
                <button
                  onClick={() => handleSectionClick('notula')}
                  className={`block w-full text-left py-2 px-6 text-sm ${activeSection === 'notula' ? 'bg-snowymint-300 text-snowymint-900 font-medium' : 'hover:bg-snowymint-200'}`}
                >
                  Materi dan Notula
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
                  onClick={() => handleSectionClick('dokumen')}
                  className={`w-full text-left p-2 rounded transition-colors cursor-pointer ${activeSection === 'dokumen' ? 'bg-snowymint-100 text-snowymint-900' : 'hover:bg-gray-100'}`}
                >
                  <div className="flex items-center">
                    <span>Dokumen Terkait</span>
                  </div>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionClick('notula')}
                  className={`w-full text-left p-2 rounded transition-colors cursor-pointer ${activeSection === 'notula' ? 'bg-snowymint-100 text-snowymint-900' : 'hover:bg-gray-100'}`}
                >
                  <div className="flex items-center">
                    <span>Materi dan Notula</span>
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

          {/* Mobile Section Navigation - Only visible on mobile */}
          <div className="md:hidden mb-6">
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
              <button
                onClick={goToPrevSection}
                disabled={!hasPrevSection()}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  hasPrevSection() 
                    ? 'text-snowymint-800 hover:bg-snowymint-100 hover:text-snowymint-900' 
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <span>{hasPrevSection() ? getPrevSectionName() : 'Sebelumnya'}</span>
              </button>
              
              <button
                onClick={goToNextSection}
                disabled={!hasNextSection()}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  hasNextSection() 
                    ? 'text-snowymint-800 hover:bg-snowymint-100 hover:text-snowymint-900' 
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>{hasNextSection() ? getNextSectionName() : 'Selanjutnya'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
          
          {renderContent()}
        </main>
      </div>
      
      {/* Footer */}
      <footer className="bg-snowymint-950 text-white py-6 md:py-8">
        <div className="container mx-auto px-3 md:px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
            {/* Logo and Description - Full width on mobile */}
            <div className="col-span-2 md:col-span-1 text-left">
              <div className="flex items-center justify-start mb-3">
                <img 
                  src="/logo/logo-kasulampua-warna-putih.svg" 
                  alt="KONREG PDRB KASULAMPUA Logo" 
                  className="h-8 md:h-12"
                />
              </div>
              <p className="text-sm text-snowymint-100 mb-3">
                Pusat Informasi Peserta Konsultasi Regional PDRB Kalimantan, Sulawesi, Maluku, dan Papua (Kasulampua)
              </p>

              {/* Contact Information */}
              <div>
                <h3 className="font-bold text-sm md:text-base mb-3">Kontak</h3>
                <ul className="space-y-3 text-xs md:text-sm">
                  <li className="flex items-start">
                    <div className="w-8 h-8 md:w-8 md:h-8 rounded-full bg-snowymint-100 text-snowymint-900 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <MapPinIcon className="w-3 h-3 md:w-3 md:h-3" />
                    </div>
                    <span className="text-snowymint-100">Sekretariat Konreg PDRB Kasulampua 2025, Jl. Soekarno Hatta/Trikora No 7 Banjarbaru</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-8 h-8 md:w-8 md:h-8 rounded-full bg-snowymint-100 text-snowymint-900 flex items-center justify-center mr-3 flex-shrink-0">
                      <PhoneIcon className="w-3 h-3 md:w-3 md:h-3 text-white" />
                    </div>
                    <span className="text-snowymint-100">0511 6749001</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-8 h-8 md:w-8 md:h-8 rounded-full bg-snowymint-100 text-snowymint-900 flex items-center justify-center mr-3 flex-shrink-0">
                      <MailIcon className="w-3 h-3 md:w-3 md:h-3 text-white" />
                    </div>
                    <span className="text-snowymint-100">bps6300@bps.go.id</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Pemerintah Daerah */}
            <div className="text-left">
              <h3 className="font-bold text-sm md:text-base mb-3">Pemerintah Daerah</h3>
              <ul className="space-y-2 text-xs md:text-sm">
                <li><a href="https://kalselprov.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Kalimantan Selatan</a></li>
                <li><a href="https://kalteng.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Kalimantan Tengah</a></li>
                <li><a href="https://kaltimprov.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Kalimantan Timur</a></li>
                <li><a href="https://kalbarprov.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Kalimantan Barat</a></li>
                <li><a href="https://kaltaraprov.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Kalimantan Utara</a></li>

                <li><a href="https://sulselprov.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Sulawesi Selatan</a></li>
                <li><a href="https://sultengprov.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Sulawesi Tengah</a></li>
                <li><a href="https://sulutprov.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Sulawesi Utara</a></li>
                <li><a href="https://sulbarprov.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Sulawesi Barat</a></li>
                <li><a href="https://sultraprov.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Sulawesi Tenggara</a></li>

                <li><a href="https://gorontaloprov.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Gorontalo</a></li>

                <li><a href="https://malukuprov.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Maluku</a></li>
                <li><a href="https://malutprov.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Maluku Utara</a></li>

                <li><a href="https://www.papua.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Papua</a></li>
                <li><a href="https://papuabaratprov.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Papua Barat</a></li>
                <li><a href="https://papuatengahprov.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Papua Tengah</a></li>
                <li><a href="https://papuaselatan.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Papua Selatan</a></li>
                <li><a href="https://papuabaratdayaprov.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Papua Barat Daya</a></li>
                <li><a href="https://papuapegunungan.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Papua Pegunungan</a></li>
              </ul>
            </div>
            
            {/* BPS */}
            <div className="text-left">
              <h3 className="font-bold text-sm md:text-base mb-3">Badan Pusat Statistik</h3>
              <ul className="space-y-2 text-xs md:text-sm">
                <li><a href="https://kalsel.bps.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BPS Provinsi Kalimantan Selatan</a></li>
                <li><a href="https://kalteng.bps.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BPS Provinsi Kalimantan Tengah</a></li>
                <li><a href="https://kaltim.bps.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BPS Provinsi Kalimantan Timur</a></li>
                <li><a href="https://kalbar.bps.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BPS Provinsi Kalimantan Barat</a></li>
                <li><a href="https://kaltara.bps.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BPS Provinsi Kalimantan Utara</a></li>

                <li><a href="https://sulsel.bps.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BPS Provinsi Sulawesi Selatan</a></li>
                <li><a href="https://sulteng.bps.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BPS Provinsi Sulawesi Tengah</a></li>
                <li><a href="https://sulut.bps.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BPS Provinsi Sulawesi Utara</a></li>
                <li><a href="https://sulbar.bps.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BPS Provinsi Sulawesi Barat</a></li>
                <li><a href="https://gorontalo.bps.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BPS Provinsi Gorontalo</a></li>

                <li><a href="https://maluku.bps.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BPS Provinsi Maluku</a></li>
                <li><a href="https://malut.bps.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BPS Provinsi Maluku Utara</a></li>

                <li><a href="https://papua.bps.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BPS Provinsi Papua</a></li>
                <li><a href="https://papuabarat.bps.go.id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BPS Provinsi Papua Barat</a></li>
              </ul>
            </div>

            {/* Bank Indonesia */}
            <div className="text-left">
              <h3 className="font-bold text-sm md:text-base mb-3">Bank Indonesia</h3>
              <ul className="space-y-2 text-xs md:text-sm">
                <li><a href="https://www.bi.go.id/id/tentang-bi/profil/organisasi/Pages/Kantor-Perwakilan-Provinsi-Kalimantan-Selatan.aspx" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BI KP Kalimantan Selatan</a></li>
                <li><a href="https://www.bi.go.id/id/tentang-bi/profil/organisasi/Pages/Kantor-Perwakilan-Kalimantan-Tengah.aspx" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BI KP Kalimantan Tengah</a></li>
                <li><a href="https://www.bi.go.id/id/tentang-bi/profil/organisasi/Pages/Kantor-Perwakilan-Provinsi-Kalimantan-Timur.aspx" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BI KP Kalimantan Timur</a></li>
                <li><a href="https://www.bi.go.id/id/tentang-bi/profil/organisasi/Pages/Kantor-Perwakilan-Kalimantan-Barat.aspx" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BI KP Kalimantan Barat</a></li>
                <li><a href="https://www.bi.go.id/id/tentang-bi/profil/organisasi/Pages/Kantor-Perwakilan-Kalimantan-Utara.aspx" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BI KP Kalimantan Utara</a></li>

                <li><a href="https://www.bi.go.id/id/tentang-bi/profil/organisasi/Pages/Kantor-Perwakilan-Sulawesi-Selatan.aspx" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BI KP Sulawesi Selatan</a></li>
                <li><a href="https://www.bi.go.id/id/tentang-bi/profil/organisasi/Pages/Kantor-Perwakilan-Sulawesi-Tengah.aspx" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BI KP Sulawesi Tengah</a></li>
                <li><a href="https://www.bi.go.id/id/tentang-bi/profil/organisasi/Pages/Kantor-Perwakilan-Sulawesi-Utara.aspx" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BI KP Sulawesi Utara</a></li>
                <li><a href="https://www.bi.go.id/id/tentang-bi/profil/organisasi/Pages/Kantor-Perwakilan-Sulawesi-Barat.aspx" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BI KP Sulawesi Barat</a></li>
                <li><a href="https://www.bi.go.id/id/tentang-bi/profil/organisasi/Pages/Kantor-Perwakilan-Gorontalo.aspx" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BI KP Gorontalo</a></li>

                <li><a href="https://www.bi.go.id/id/tentang-bi/profil/organisasi/Pages/Kantor-Perwakilan-Provinsi-Maluku.aspx" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BI KP Maluku</a></li>
                <li><a href="https://www.bi.go.id/id/tentang-bi/profil/organisasi/Pages/Kantor-Perwakilan-Maluku-Utara.aspx" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BI KP Maluku Utara</a></li>

                <li><a href="https://www.bi.go.id/id/tentang-bi/profil/organisasi/Pages/Kantor-Perwakilan-Papua.aspx" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BI KP Papua</a></li>
                <li><a href="https://www.bi.go.id/id/tentang-bi/profil/organisasi/Pages/Kantor-Perwakilan-Papua-Barat.aspx" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">BI KP Papua Barat</a></li>
              </ul>
            </div>

            {/* DJPB */}
            <div className="text-left">
              <h3 className="font-bold text-sm md:text-base mb-3">DJPB</h3>
              <ul className="space-y-2 text-xs md:text-sm">
                <li><a href="https://djpb.kemenkeu.go.id/kanwil/kalsel/id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">DJPb Kalimantan Selatan</a></li>
                <li><a href="https://djpb.kemenkeu.go.id/kanwil/kalteng/id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">DJPb Kalimantan Tengah</a></li>
                <li><a href="https://djpb.kemenkeu.go.id/kanwil/kaltim/id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">DJPb Kalimantan Timur</a></li>
                <li><a href="https://djpb.kemenkeu.go.id/kanwil/kalbar/id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">DJPb Kalimantan Barat</a></li>
                <li><a href="https://djpb.kemenkeu.go.id/kanwil/kaltara/id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">DJPb Kalimantan Utara</a></li>

                <li><a href="https://djpb.kemenkeu.go.id/kanwil/sulsel/id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">DJPb Sulawesi Selatan</a></li>
                <li><a href="https://djpb.kemenkeu.go.id/kanwil/sulteng/id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">DJPb Sulawesi Tengah</a></li>
                <li><a href="https://djpb.kemenkeu.go.id/kanwil/sulut/id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">DJPb Sulawesi Utara</a></li>
                <li><a href="https://djpb.kemenkeu.go.id/kanwil/sulbar/id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">DJPb Sulawesi Barat</a></li>
                <li><a href="https://djpb.kemenkeu.go.id/kanwil/gorontalo/id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">DJPb Gorontalo</a></li>

                <li><a href="https://djpb.kemenkeu.go.id/kanwil/maluku/id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">DJPb Maluku</a></li>
                <li><a href="https://djpb.kemenkeu.go.id/kanwil/malut/id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">DJPb Maluku Utara</a></li>

                <li><a href="https://djpb.kemenkeu.go.id/kanwil/papua/id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">DJPb Papua</a></li>
                <li><a href="https://djpb.kemenkeu.go.id/kanwil/papua-barat/id/" className="text-snowymint-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">DJPb Papua Barat</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-snowymint-900 mt-6 md:mt-8 pt-4 md:pt-6 text-center">
            <p className="text-xs text-snowymint-200">© 2025 Pusat Informasi Konreg PDRB Kasulampua. Hak Cipta Dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}