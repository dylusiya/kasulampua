"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Icon components
const StarIcon = ({ filled = true }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#FFD700" : "none"} stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF4500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const LightbulbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6"></path>
    <path d="M10 22h4"></path>
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14"></path>
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  );

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

// Menu Icon for mobile
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

// Close Icon for mobile menu
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// Placeholder data
const initialData = {
    "hotel": [
      {
        "name": "Hotel Aria Barito Banjarmasin",
        "address": "Jl. MT. Haryono No.16-20, Kertak Baru Ulu, Kec. Banjarmasin Tengah, Kota Banjarmasin, Kalimantan Selatan 70111",
        "category": "Hotel Bintang 4",
        "rating": 4.4,
        "distance": 1.8,
        "time": 5,
        "description": "abcde",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Hotel%20Aria%20Barito%20Banjarmasin%2C%20Jl.%20MT.%20Haryono%20No.16-20%2C%20Kertak%20Baru%20Ulu%2C%20Kec.%20Banjarmasin%20Tengah%2C%20Kota%20Banjarmasin%2C%20Kalimantan%20Selatan%2070111",
        "id": "hotel_1746727351379_tsf5r7",
        "image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/b7/f5/9b/aria-barito-hotel.jpg",
        "source": "https://www.ariabaritohotel.com/",
        "selected": true
      },
      {
        "name": "Swiss-Belhotel Borneo Banjarmasin",
        "address": "Jl. Pangeran Antasari No.18-20, Pekapuran Laut, Kec. Banjarmasin Tengah, Kota Banjarmasin, Kalimantan Selatan 70114",
        "category": "Hotel Bintang 4",
        "rating": 4.3,
        "distance": 2.5,
        "time": 8,
        "description": "Hotel mewah dengan pemandangan kota, pusat kebugaran, dan beberapa pilihan tempat makan.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Swiss-Belhotel%20Borneo%20Banjarmasin%2C%20Jl.%20Pangeran%20Antasari%20No.18-20%2C%20Pekapuran%20Laut%2C%20Kec.%20Banjarmasin%20Tengah%2C%20Kota%20Banjarmasin%2C%20Kalimantan%20Selatan%2070114",
        "id": "hotel_1746727351379_r59yci",
        "image": "https://dbijapkm3o6fj.cloudfront.net/resources/1758,1004,1,6,4,0,600,450/-4601-/20240301190007/swiss-belhotel-borneo-banjarmasin.jpeg",
        "source": "https://www.swiss-belhotel.com/en-gb/swiss-belhotel-borneo-banjarmasin",
        "selected": true
      },
      {
        "name": "Rattan Inn",
        "address": "Jl. A. Yani No.KM.4,5, Pemurus Baru, Kec. Banjarmasin Sel., Kota Banjarmasin, Kalimantan Selatan 70249",
        "category": "Hotel Bintang 4",
        "rating": 4.2,
        "distance": 3.2,
        "time": 10,
        "description": "Hotel nyaman dengan fasilitas lengkap termasuk kolam renang dan restoran.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Rattan%20Inn%2C%20Jl.%20A.%20Yani%20No.KM.4%2C5%2C%20Pemurus%20Baru%2C%20Kec.%20Banjarmasin%20Sel.%2C%20Kota%20Banjarmasin%2C%20Kalimantan%20Selatan%2070249",
        "id": "hotel_1746727351379_4q30n9",
        "image": "https://www.rattan-inn.com/images/room/DELUXE%20POOL%20TERRACE.jpg",
        "source": "https://www.rattan-inn.com/",
        "selected": true
      },
      {
        "name": "Summer Bed 'n Breakfast Hotel",
        "address": "Jl. Banua Anyar No.22, Sungai Jingah, Kec. Banjarmasin Utara, Kota Banjarmasin, Kalimantan Selatan 70123",
        "category": "Hotel Budget",
        "rating": 4.6,
        "distance": 3.8,
        "time": 12,
        "description": "Akomodasi bergaya minimalis dengan kamar-kamar bersih dan cafe yang nyaman.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Summer%20Bed%20%26%20Cafe%20Banjarmasin%2C%20Jl.%20Banua%20Anyar%20No.22%2C%20Sungai%20Jingah%2C%20Kec.%20Banjarmasin%20Utara%2C%20Kota%20Banjarmasin%2C%20Kalimantan%20Selatan%2070123",
        "id": "hotel_1746727351379_806k25",
        "image": "https://asset-2.tstatic.net/tribunnews/foto/bank/images/wisata-banjarmasin_20151222_102918.jpg",
        "source": "https://www.instagram.com/summerbedandcafe/?hl=en",
        "selected": true
      },
      {
        "name": "Favehotel Ahmad Yani Banjarmasin",
        "address": "Jl. Ahmad Yani No.39, Sungai Baru, Kec. Banjarmasin Tengah, Kota Banjarmasin, Kalimantan Selatan 70233",
        "category": "Hotel Bintang 3",
        "rating": 4.1,
        "distance": 1.6,
        "time": 7,
        "description": "Hotel modern dengan harga terjangkau dan lokasi strategis.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Favehotel%20Ahmad%20Yani%20Banjarmasin%2C%20Jl.%20Ahmad%20Yani%20No.39%2C%20Sungai%20Baru%2C%20Kec.%20Banjarmasin%20Tengah%2C%20Kota%20Banjarmasin%2C%20Kalimantan%20Selatan%2070233",
        "id": "hotel_1746727351379_26qrfl",
        "image": "https://images.archipelagohotels.com/favehotels/v1/FaveAhmadYaniBanjarmasin/Gallery/Front1.jpg?d=1600x1060&location=center&imagetype=webp",
        "source": "https://banjarmasin.favehotels.com/",
        "selected": true
      },
      {
        "name": "Hotel Banjarmasin International",
        "address": "Jl. Jenderal Ahmad Yani No. 14, Banjarmasin, Kalimantan Selatan, Indonesia",
        "category": "Hotel Bintang 3",
        "rating": 3.9,
        "distance": 1.1,
        "time": 6,
        "description": "Hotel dengan kamar-kamar simpel, restoran, dan fasilitas pertemuan.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Hotel%20Banjarmasin%20International%2C%20Jl.%20Jenderal%20Ahmad%20Yani%20No.%2014%2C%20Banjarmasin%2C%20Kalimantan%20Selatan%2C%20Indonesia",
        "id": "hotel_1746727351379_kddgmm",
        "image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/2b/8b/02/hotel-hbi-banjarmasin.jpg?w=500&h=-1&s=1",
        "source": "Tidak ada homepage, informasi dari Google Maps",
        "selected": true
      },
      {
        "name": "G'Sign Hotel Banjarmasin",
        "address": "Jl. A. Yani No.KM.6, RW.003, Pemurus Luar, Kec. Banjarmasin Tim., Kota Banjarmasin, Kalimantan Selatan 70248",
        "category": "Hotel Bintang 3",
        "rating": 4,
        "distance": 4.8,
        "time": 14,
        "description": "Hotel modern dengan kamar-kamar ber-AC, restoran, dan Wi-Fi gratis.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=G'Sign%20Hotel%20Banjarmasin%2C%20Jl.%20A.%20Yani%20No.KM.6%2C%20RW.003%2C%20Pemurus%20Luar%2C%20Kec.%20Banjarmasin%20Tim.%2C%20Kota%20Banjarmasin%2C%20Kalimantan%20Selatan%2070248",
        "id": "hotel_1746727351379_86u7dr",
        "image": "https://gsignhotel.com/wp-content/uploads/2024/04/view-hotel-1-scaled.jpg",
        "source": "https://www.gsignhotel.com/banjarmasin/",
        "selected": true
      },
      {
        "name": "Hotel Palm Banjarmasin",
        "address": "Jl. Mayjend Sutoyo S No.18, Kertak Baru Ulu, Kec. Banjarmasin Tengah, Kota Banjarmasin, Kalimantan Selatan 70117",
        "category": "Hotel Bintang 3",
        "rating": 4,
        "distance": 0.8,
        "time": 3,
        "description": "Hotel yang terletak strategis di pusat kota Banjarmasin.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Hotel%20Palm%20Banjarmasin%2C%20Jl.%20Mayjend%20Sutoyo%20S%20No.18%2C%20Kertak%20Baru%20Ulu%2C%20Kec.%20Banjarmasin%20Tengah%2C%20Kota%20Banjarmasin%2C%20Kalimantan%20Selatan%2070117",
        "id": "hotel_1746729521029_9gth7l",
        "image": "https://pix10.agoda.net/hotelImages/239774/-1/a515d9a5ffccf5b18a0728c67faecb61.jpg?ca=9&ce=1&s=1024x768",
        "source": "https://www.google.com/search?q=Hotel%20Palm%20Banjarmasin",
        "selected": true
      }
    ],
    "rumahMakan": [
      {
        "name": "Soto Banjar Bang Amat",
        "address": "Jl. Sultan Adam No.12, Sungai Miai, Kec. Banjarmasin Utara, Kota Banjarmasin, Kalimantan Selatan 70123",
        "category": "Soto Banjar",
        "rating": 4.5,
        "distance": 3.2,
        "time": 10,
        "description": "Soto Banjar otentik dengan kuah yang kaya rempah dan rasa yang khas.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Soto%20Banjar%20Bang%20Amat%2C%20Jl.%20Sultan%20Adam%20No.12%2C%20Sungai%20Miai%2C%20Kec.%20Banjarmasin%20Utara%2C%20Kota%20Banjarmasin%2C%20Kalimantan%20Selatan%2070123",
        "id": "rumahMakan_1746750887300_xligt7",
        "image": "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/571f3250-1b30-49a7-b9f4-86e4fe9ba02f_Go-Biz_20220119_151028.jpeg",
        "source": "https://www.google.com/search?q=Soto%20Banjar%20Bang%20Amat",
        "selected": true
      },
      {
        "name": "Lontong Orari",
        "address": "Jl. Sultan Adam RT.21 No.28, Sungai Miai, Kec. Banjarmasin Utara, Kota Banjarmasin, Kalimantan Selatan 70123",
        "category": "Lontong",
        "rating": 4.6,
        "distance": 2.9,
        "time": 9,
        "description": "Lontong dengan kuah yang gurih dan taburan bawang goreng yang renyah.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Lontong%20Orari%2C%20Jl.%20Sultan%20Adam%20RT.21%20No.28%2C%20Sungai%20Miai%2C%20Kec.%20Banjarmasin%20Utara%2C%20Kota%20Banjarmasin%2C%20Kalimantan%20Selatan%2070123",
        "id": "rumahMakan_1746750887300_5a97qw",
        "image": "https://indonesiatraveler.id/wp-content/uploads/2020/02/Lontong-orari3.jpg",
        "source": "https://www.google.com/search?q=Lontong%20Orari",
        "selected": true
      },
      {
        "name": "Mie Bancir Agus Sasirangan",
        "address": "Jl. Ahmad Yani No.10, Sungai Baru, Kec. Banjarmasin Tengah, Kota Banjarmasin, Kalimantan Selatan 70233",
        "category": "Mie Bancir",
        "rating": 4.4,
        "distance": 5.8,
        "time": 15,
        "description": "Mie Bancir khas Banjarmasin dengan cita rasa yang unik dan lezat.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Mie%20Bancir%20Agus%20Sasirangan%2C%20Jl.%20Ahmad%20Yani%20No.10%2C%20Sungai%20Baru%2C%20Kec.%20Banjarmasin%20Tengah%2C%20Kota%20Banjarmasin%2C%20Kalimantan%20Selatan%2070233",
        "id": "rumahMakan_1746750887301_pluur",
        "image": "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/eed16684-b9c8-4c35-961a-21f90fd41a2e_restaurant-image_1623851378485.jpg",
        "source": "https://www.google.com/search?q=Mie%20Bancir%20Agus%20Sasirangan",
        "selected": true
      }
    ],
    "perbelanjaan": [
      {
        "name": "Duta Mall Banjarmasin",
        "address": "Jl. A. Yani No.KM. 2,5, Melayu, Kec. Banjarmasin Tengah, Kota Banjarmasin, Kalimantan Selatan 70232",
        "category": "Pusat Perbelanjaan",
        "rating": 4.4,
        "distance": 1.8,
        "time": 7,
        "description": "Mall terbesar di Banjarmasin dengan berbagai toko retail, restoran, dan bioskop.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Duta%20Mall%20Banjarmasin%2C%20Jl.%20A.%20Yani%20No.KM.%202%2C5%2C%20Melayu%2C%20Kec.%20Banjarmasin%20Tengah%2C%20Kota%20Banjarmasin%2C%20Kalimantan%20Selatan%2070232",
        "id": "perbelanjaan_1746751421823_fwfd6",
        "image": "https://yopiesalon.com/wp-content/uploads/2024/06/Dutamall.jpg",
        "source": "https://www.dutamall.co.id",
        "selected": true
      },
      {
        "name": "Lotte Grosir Banjarmasin",
        "address": "Jl. Ahmad Yani Km. 7, Kertak Hanyar, Kec. Kertak Hanyar, Kabupaten Banjar, Kalimantan Selatan 70651",
        "category": "Grosir",
        "rating": 4.3,
        "distance": 6.5,
        "time": 15,
        "description": "Toko grosir yang menjual berbagai macam produk kebutuhan sehari-hari dengan harga yang terjangkau.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Lotte%20Grosir%20Banjarmasin%2C%20Jl.%20Ahmad%20Yani%20Km.%207%2C%20Kertak%20Hanyar%2C%20Kec.%20Kertak%20Hanyar%2C%20Kabupaten%20Banjar%2C%20Kalimantan%20Selatan%2070651",
        "id": "perbelanjaan_1746751421824_3utkm",
        "image": "https://asset-2.tstatic.net/banjarmasin/foto/bank/images/lotte-mart-banjarmasin.jpg",
        "source": "https://lottegrosir.co.id/store-locator/banjarmasin",
        "selected": true
      },
      {
        "name": "Q Mall Banjarbaru",
        "address": "Jl. Ahmad Yani Km. 36, Loktabat Utara, Kec. Banjarbaru Utara, Kota Banjar Baru, Kalimantan Selatan 70712",
        "category": "Pusat Perbelanjaan",
        "rating": 4.3,
        "distance": 18.8,
        "time": 35,
        "description": "Pusat perbelanjaan modern dengan berbagai toko retail, restoran, dan hiburan.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Q%20Mall%20Banjarbaru%2C%20Jl.%20Ahmad%20Yani%20Km.%2036%2C%20Loktabat%20Utara%2C%20Kec.%20Banjarbaru%20Utara%2C%20Kota%20Banjar%20Baru%2C%20Kalimantan%20Selatan%2070712",
        "id": "perbelanjaan_1746751421824_oxv7mr",
        "image": "https://kfmap.asia/storage/thumbs/storage/photos/ID.BJB.RT.QMALL/ID.BJB.RT.QMALL_1.jpg",
        "source": "https://www.qmallbjb.com/",
        "selected": true
      }
    ],
    "transportasi": [
      {
        "name": "Bandara Internasional Syamsudin Noor",
        "address": "Jl. Angkasa, Landasan Ulin, Kota Banjar Baru, Kalimantan Selatan 70724",
        "category": "Bandara",
        "rating": 4.6,
        "distance": 27,
        "time": 45,
        "description": "Bandara Internasional yang melayani penerbangan domestik dan internasional di Kalimantan Selatan.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Bandara%20Internasional%20Syamsudin%20Noor%2C%20Jl.%20Angkasa%2C%20Landasan%20Ulin%2C%20Kota%20Banjar%20Baru%2C%20Kalimantan%20Selatan%2070724",
        "id": "transportasi_1746751714714_5m0q9a",
        "image": "https://syamsudinnoor-airport.co.id/frontend/uploads/defaults/UbYLJZ20220126100850.jpg",
        "source": "https://syamsudinnoor-airport.co.id/",
        "selected": true
      },
      {
        "id": "transportasi1746752064045",
        "name": "Trans Banjarbakula (Teman Bus)",
        "address": "Teman Bus Kota Banjarmasin Banjarbaru Barito Kuala Tanah Laut & Kab.Banjar",
        "category": "Bus",
        "rating": 4,
        "distance": 0,
        "time": 0,
        "description": "",
        "image": "https://www.bingkaibanua.com/wp-content/uploads/2022/02/images-2022-02-27T174145.351.jpeg",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Trans%20Banjarbakul%20(Teman%20Bus)%2C%20Teman%20Bus%20Kota%20Banjarmasin%20Banjarbaru%20Barito%20Kuala%20Tanah%20Laut%20%26%20Kab.Banjar",
        "source": "https://www.instagram.com/transbanjarbakulaofficial/?hl=en"
      }
    ],
    "masjid": [
      {
        "name": "Masjid Raya Sabilal Muhtadin",
        "address": "Jl. Jenderal Sudirman No.1, Antasan Besar, Kec. Banjarmasin Tengah, Kota Banjarmasin, Kalimantan Selatan 70114",
        "category": "Masjid Agung",
        "rating": 4.7,
        "distance": 2.5,
        "time": 10,
        "description": "Masjid terbesar dan termegah di Banjarmasin, menjadi ikon kota.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Masjid%20Raya%20Sabilal%20Muhtadin%2C%20Jl.%20Jenderal%20Sudirman%20No.1%2C%20Antasan%20Besar%2C%20Kec.%20Banjarmasin%20Tengah%2C%20Kota%20Banjarmasin%2C%20Kalimantan%20Selatan%2070114",
        "id": "masjid_1746752135096_eh5z2v",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Masjid_Raya_Sabilal_Muhtadi_depan.jpg/330px-Masjid_Raya_Sabilal_Muhtadi_depan.jpg",
        "source": "https://id.wikipedia.org/wiki/Masjid_Raya_Sabilal_Muhtadin",
        "selected": true
      }
    ]
  };

export default function AkomodasiPage() {
  const router = useRouter();
  
  // State for data
  const [activeCategory, setActiveCategory] = useState('hotel');
  const [data, setData] = useState(initialData);
  const [filterCategory, setFilterCategory] = useState('Semua');
  
  // User state - null means guest
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mobile states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  
  // Admin CRUD states
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    address: '',
    category: '',
    rating: 4.0,
    distance: 0,
    time: 0,
    description: '',
    image: '',
    googleMapsUrl: '',
    source: '' // Tambahkan ini
  });
  
  
  // AI Search states
  const [showAISearch, setShowAISearch] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchRadius, setSearchRadius] = useState(5); // Default 5 km
  const [searchedItems, setSearchedItems] = useState([]);
  const [aiSearchLoading, setAiSearchLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showVerification, setShowVerification] = useState(false);
  
  // Check user authentication and load data
  useEffect(() => {
    // Load user from localStorage (could be null for guests)
    const userData = JSON.parse(localStorage.getItem('user') || 'null');
    
    // Set user state (will be null for guests)
    setUser(userData);
    
    // Load saved data from localStorage
    let savedData = JSON.parse(localStorage.getItem('akomodasiData') || 'null');
    
    if (savedData) {
      // Pastikan semua item dalam data memiliki properti source
      for (const category in savedData) {
        if (Array.isArray(savedData[category])) {
          savedData[category] = savedData[category].map(item => ({
            ...item,
            // Jika item belum punya source, buat berdasarkan nama
            source: item.source || `https://www.google.com/search?q=${encodeURIComponent(item.name)}`
          }));
        }
      }
      
      setData(savedData);
      // Simpan kembali data yang sudah dipastikan memiliki source
      localStorage.setItem('akomodasiData', JSON.stringify(savedData));
    }
    
    setIsLoading(false);
  }, []);
  
  // Handle sidebar navigation click
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setFilterCategory('Semua');
    setShowMobileSidebar(false); // Close mobile sidebar
  };

  // Handle navigation item click
  const handleNavItemClick = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };
  
  // Get unique subcategories for filter
  const getSubcategories = () => {
    const items = data[activeCategory] || [];
    const categories = ['Semua', ...new Set(items.map(item => item.category))];
    return categories;
  };
  
  // Filter items by subcategory
  const getFilteredItems = () => {
    const items = data[activeCategory] || [];
    if (filterCategory === 'Semua') return items;
    return items.filter(item => item.category === filterCategory);
  };
  
  // Form handlers (only available for logged-in users)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleImageChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      image: value
    });
  };

  // Handle logout
const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };
  
    // Handle download data
    const handleDownloadData = () => {
        // Get the latest data from state
        const dataToDownload = JSON.stringify(data, null, 2);
            
        // Create a blob with the data
        const blob = new Blob([dataToDownload], { type: 'application/json' });
            
        // Create a URL for the blob
        const url = URL.createObjectURL(blob);
            
        // Create a link element
        const link = document.createElement('a');
            
        // Set link properties
        link.href = url;
        link.download = `kasulampua_akomodasi_${new Date().toISOString().split('T')[0]}.json`;
            
        // Append to body
        document.body.appendChild(link);
            
        // Trigger download
        link.click();
            
        // Clean up
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
    };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a random ID if adding new item
    const newItem = {
      ...formData,
      id: editingItem ? editingItem.id : `${activeCategory}${Date.now()}`,
      // Generate Google Maps URL if not provided
      googleMapsUrl: formData.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formData.name + ', ' + formData.address)}`,
       // Generate Source URL if not provided
      source: formData.source || `https://www.google.com/search?q=${encodeURIComponent(formData.name)}`
    };
    
    // Update data based on whether we're editing or adding
    if (editingItem) {
      const updatedItems = data[activeCategory].map(item => 
        item.id === editingItem.id ? newItem : item
      );
      setData({
        ...data,
        [activeCategory]: updatedItems
      });
    } else {
      setData({
        ...data,
        [activeCategory]: [...data[activeCategory], newItem]
      });
    }
    
    // Save to localStorage
    localStorage.setItem('akomodasiData', JSON.stringify({
      ...data,
      [activeCategory]: editingItem 
        ? data[activeCategory].map(item => item.id === editingItem.id ? newItem : item)
        : [...data[activeCategory], newItem]
    }));
    
    // Reset form
    resetForm();
  };
  
  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      address: '',
      category: '',
      rating: 4.0,
      distance: 0,
      time: 0,
      description: '',
      image: '',
      googleMapsUrl: '',
      source: '' // Tambahkan ini
    });
    setEditingItem(null);
    setShowAddForm(false);
  };
  
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      ...item
    });
    setShowAddForm(true);
  };
  
  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus item ini?')) {
      const updatedItems = data[activeCategory].filter(item => item.id !== id);
      const updatedData = {
        ...data,
        [activeCategory]: updatedItems
      };
      setData(updatedData);
      
      // Save to localStorage
      localStorage.setItem('akomodasiData', JSON.stringify(updatedData));
    }
  };
  
  // AI Search handlers
  const handleAISearch = async () => {
    if (!searchLocation.trim()) {
      alert('Silakan masukkan lokasi yang ingin dicari');
      return;
    }
    
    if (searchRadius < 0.5) {
      alert('Radius minimal adalah 0.5 km');
      return;
    }
    
    if (searchRadius > 50) {
      alert('Radius maksimal adalah 50 km');
      return;
    }
    
    setAiSearchLoading(true);
    
    try {
      console.log('Searching for:', { location: searchLocation, category: activeCategory, radius: searchRadius });
      
      const response = await fetch('/api/search-accommodations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: searchLocation,
          category: activeCategory,
          radius: searchRadius
        })
      });
      
      const result = await response.json();
      
      if (result.success && result.data && result.data.length > 0) {
        setSearchedItems(result.data);
        setSelectedItems(result.data.map(item => ({ ...item, selected: true })));
        
        // Show warning if using fallback data
        if (result.fallback) {
          alert('AI sedang tidak tersedia, menampilkan data contoh. Silakan coba lagi nanti.');
        }
      } else {
        alert('Tidak ada hasil ditemukan untuk lokasi tersebut');
        setSearchedItems([]);
        setSelectedItems([]);
      }
    } catch (error) {
      console.error('AI Search error:', error);
      alert('Terjadi kesalahan saat mencari data. Silakan coba lagi.');
      setSearchedItems([]);
      setSelectedItems([]);
    } finally {
      setAiSearchLoading(false);
    }
  };
  
  // Handle selection toggle for bulk verification
  const handleItemToggle = (id) => {
    setSelectedItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };
  
  // Handle bulk import after verification
  const handleBulkImport = () => {
    const itemsToImport = selectedItems.filter(item => item.selected);
    
    if (itemsToImport.length === 0) {
      alert('Pilih minimal satu item untuk diimport');
      return;
    }
    
    // Add selected items to current category
    const updatedData = {
      ...data,
      [activeCategory]: [...data[activeCategory], ...itemsToImport]
    };
    
    setData(updatedData);
    localStorage.setItem('akomodasiData', JSON.stringify(updatedData));
    
    // Reset states
    setShowVerification(false);
    setShowAISearch(false);
    setSearchedItems([]);
    setSelectedItems([]);
    setSearchLocation('');
    setSearchRadius(5); // Reset to default
    
    alert(`Berhasil mengimport ${itemsToImport.length} item`);
  };
  
  // Function to handle clicking outside modals
  const handleModalOutsideClick = (e, setterFunction) => {
    // If the click target is the backdrop (not a descendant)
    if (e.target === e.currentTarget) {
      setterFunction(false);
      // Reset form states if closing the add/edit form
      if (setterFunction === setShowAddForm) {
        resetForm();
      }
      // Reset search states if closing AI search
      if (setterFunction === setShowAISearch) {
        setSearchedItems([]);
        setSelectedItems([]);
        setSearchLocation('');
        setSearchRadius(5);
      }
    }
  };
  
  const categoryLabels = {
    hotel: 'Hotel',
    rumahMakan: 'Rumah Makan',
    perbelanjaan: 'Perbelanjaan',
    transportasi: 'Transportasi',
    masjid: 'Masjid'
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-snowymint-50 transition-opacity duration-500">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-snowymint-800"></div>
      </div>
    );
  }
  
  const subcategories = getSubcategories();
  const filteredItems = getFilteredItems();
  
  // Check if user is logged in and has admin privileges
  const isAdmin = user && user.isLoggedIn;
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header - Updated to match homepage */}
      <header className="bg-white text-gray-800 shadow-sm fixed top-0 left-0 right-0 z-50">
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
              <Link href="/" onClick={handleNavItemClick} className="font-medium text-gray-800 hover:text-snowymint-900 transition-colors">
                Beranda
              </Link>
              <Link href="/kegiatan" className="font-medium text-gray-800 hover:text-snowymint-900 transition-colors">
                Kegiatan
              </Link>
              <Link href="/akomodasi" className="font-medium text-gray-800 hover:text-snowymint-900 transition-colors border-b-2 border-snowymint-900">
                Akomodasi
              </Link>
              <a href="#wisata" className="font-medium text-gray-800 hover:text-snowymint-900 transition-colors">Wisata</a>
              <a href="#galeri" className="font-medium text-gray-800 hover:text-snowymint-900 transition-colors">Galeri</a>
              <a href="#kontak" className="font-medium text-gray-800 hover:text-snowymint-900 transition-colors">Kontak</a>
              {isAdmin && (
                <button 
                  onClick={handleLogout} 
                  className="bg-snowymint-800 text-white px-3 py-1 rounded text-sm flex items-center hover:bg-snowymint-900 transition-colors cursor-pointer"
                >
                  <LogoutIcon />
                  <span className="ml-1">Logout</span>
                </button>
              )}
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
              <a href="/kegiatan" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm">Kegiatan</a>
              <a href="/akomodasi" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm bg-snowymint-300">Akomodasi</a>
              <a href="#wisata" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm">Wisata</a>
              <a href="#galeri" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm">Galeri</a>
              <a href="#kontak" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm">Kontak</a>
              
              {/* Mobile Category Selection */}
              <div className="border-t mt-2 pt-2">
                <p className="text-sm font-medium text-gray-600 px-3 mb-1">Kategori Akomodasi:</p>
                {Object.keys(categoryLabels).map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`block w-full text-left py-2 px-6 text-sm ${activeCategory === category ? 'bg-snowymint-300 text-snowymint-900 font-medium' : 'hover:bg-snowymint-200'}`}
                  >
                    {categoryLabels[category]}
                  </button>
                ))}
              </div>
              
              {/* Admin menu items for mobile */}
              {isAdmin && (
                <div className="border-t mt-2 pt-2">
                    <button 
                    onClick={() => {
                        setShowAISearch(true);
                        setMobileMenuOpen(false);
                    }} 
                    className="block w-full text-left py-2 hover:bg-snowymint-300 px-3 rounded text-sm"
                    >
                    Cari dengan AI
                    </button>
                    <button 
                    onClick={() => {
                        setShowAddForm(true);
                        setMobileMenuOpen(false);
                    }} 
                    className="block w-full text-left py-2 hover:bg-snowymint-300 px-3 rounded text-sm"
                    >
                    Tambah {categoryLabels[activeCategory]}
                    </button>
                    {/* Tambahkan tombol download di sini */}
                    <button 
                    onClick={() => {
                        handleDownloadData();
                        setMobileMenuOpen(false);
                    }} 
                    className="block w-full text-left py-2 hover:bg-snowymint-300 px-3 rounded text-sm"
                    >
                    Download Data
                    </button>
                    <button 
                    onClick={handleLogout} 
                    className="block w-full text-left py-2 hover:bg-snowymint-300 px-3 rounded text-sm text-red-600"
                    >
                    Logout
                    </button>
                </div>
                )}
            </nav>
          )}
        </div>
      </header>
      
      <div className="flex flex-col md:flex-row pt-16">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 bg-gray-50 md:min-h-screen p-4">
          <h2 className="text-lg font-semibold mb-4">Akomodasi</h2>
          <nav>
            <ul className="space-y-1">
              {Object.keys(categoryLabels).map(category => (
                <li key={category}>
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className={`w-full text-left p-2 rounded transition-colors cursor-pointer ${activeCategory === category ? 'bg-snowymint-100 text-snowymint-900' : 'hover:bg-gray-100'}`}
                  >
                    {categoryLabels[category]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <span className="text-snowymint-800">Akomodasi</span>
                <span className="text-gray-400">›</span>
                <span className="font-medium">{categoryLabels[activeCategory]}</span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold mt-2 text-gray-800">
                Daftar {categoryLabels[activeCategory]} di Sekitar Lokasi Kegiatan
              </h1>
            </div>
            
            {/* Admin buttons - hidden for mobile in nav */}
            {isAdmin && (
                <div className="hidden md:flex space-x-3">
                    <button 
                    onClick={() => setShowAISearch(true)} 
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors cursor-pointer flex items-center"
                    >
                    <SearchIcon />
                    <span className="ml-2">Cari dengan AI</span>
                    </button>
                    <button 
                    onClick={() => setShowAddForm(true)} 
                    className="bg-snowymint-800 text-white px-4 py-2 rounded hover:bg-snowymint-900 transition-colors cursor-pointer"
                    >
                    Tambah {categoryLabels[activeCategory]}
                    </button>
                    {/* Tambahkan tombol download di sini */}
                    <button 
                    onClick={handleDownloadData} 
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors cursor-pointer flex items-center"
                    >
                    <DownloadIcon />
                    <span className="ml-2">Download Data</span>
                    </button>
                </div>
            )}
          </div>
          
          {/* Tips Box */}
          {/* <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 flex items-start">
            <div className="text-yellow-600 mr-3">
              <LightbulbIcon />
            </div>
            <div>
              <p className="font-semibold text-yellow-800">Tips:</p>
              <p className="text-yellow-700">gunakan GrabFood untuk kemudahan memesan makanan/minuman</p>
            </div>
          </div> */}
          
          {/* Filter dropdown */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Tampilkan berdasarkan kategori:</p>
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border rounded px-3 py-2 w-full md:w-64 cursor-pointer hover:border-snowymint-800 transition-colors"
            >
              {subcategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
         {/* Item Grid - Updated to match homepage theme */}
        <section className="py-6 md:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white p-3 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="h-32 md:h-40 w-full rounded-md mx-auto mb-2 md:mb-3 overflow-hidden">
                    <img src={item.image || 'https://placehold.co/400x300.png'} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                    <a href={item.source || `https://www.google.com/search?q=${encodeURIComponent(item.name)}`} target="_blank" rel="noopener noreferrer">
                        <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-snowymint-900">{item.name}</h3>
                    </a>
                    <p className="text-gray-600 text-xs mb-2 md:mb-3 line-clamp-2">{item.address}</p>
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center text-xs md:text-sm">
                            <StarIcon />
                            <span className="ml-1">{item.rating}</span>
                        </div>
                        <div className="flex items-center text-gray-600 text-xs md:text-sm">
                            <LocationIcon />
                            <span className="ml-1">{item.distance} km • {item.time} mnt</span>
                        </div>
                    </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a 
                      href={item.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ', ' + item.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-snowymint-800 text-white px-3 py-1 rounded text-sm hover:bg-snowymint-900 transition-colors cursor-pointer inline-block"
                    >
                      Lihat Peta →
                    </a>
                    
                    {/* Only show edit and delete buttons for admins */}
                    {isAdmin && (
                      <>
                        <button 
                          onClick={() => handleEdit(item)} 
                          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)} 
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors cursor-pointer"
                        >
                          Hapus
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Add/Edit Form Modal - Only show if admin is logged in */}
          {isAdmin && showAddForm && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={(e) => handleModalOutsideClick(e, setShowAddForm)}
            >
              <div className="bg-white p-4 md:p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg md:text-xl font-bold mb-4">
                  {editingItem ? `Edit ${categoryLabels[activeCategory]}` : `Tambah ${categoryLabels[activeCategory]} Baru`}
                </h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                      <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                        <input
                          type="number"
                          name="rating"
                          value={formData.rating}
                          onChange={handleInputChange}
                          step="0.1"
                          min="1"
                          max="5"
                          className="w-full p-2 border rounded"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Jarak (km)</label>
                        <input
                          type="number"
                          name="distance"
                          value={formData.distance}
                          onChange={handleInputChange}
                          step="0.1"
                          min="0"
                          className="w-full p-2 border rounded"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Waktu (menit)</label>
                        <input
                          type="number"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          min="0"
                          className="w-full p-2 border rounded"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        rows="3"
                      ></textarea>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleImageChange}
                            placeholder="https://example.com/image.jpg"
                            className="w-full p-2 border rounded"
                        />
                        {formData.image && (
                            <div className="mt-2 h-40 overflow-hidden rounded">
                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Link Google Maps (opsional)</label>
                      <input
                        type="url"
                        name="googleMapsUrl"
                        value={formData.googleMapsUrl}
                        onChange={handleInputChange}
                        placeholder="https://www.google.com/maps/..."
                        className="w-full p-2 border rounded"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Kosongkan untuk generate otomatis berdasarkan nama dan alamat
                      </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Link Sumber (opsional)</label>
                        <input
                            type="url"
                            name="source"
                            value={formData.source}
                            onChange={handleInputChange}
                            placeholder="https://www.example.com/..."
                            className="w-full p-2 border rounded"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Kosongkan untuk generate otomatis pencarian Google berdasarkan nama
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-end gap-3 mt-2">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-snowymint-800 text-white rounded hover:bg-snowymint-900 transition-colors cursor-pointer"
                      >
                        {editingItem ? 'Update' : 'Simpan'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {/* AI Search Modal */}
          {isAdmin && showAISearch && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={(e) => handleModalOutsideClick(e, setShowAISearch)}
            >
              <div className="bg-white p-4 md:p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg md:text-xl font-bold mb-4">Cari {categoryLabels[activeCategory]} dengan AI</h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lokasi yang ingin dicari:
                  </label>
                  <div className="flex flex-col space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Lokasi Pencarian
                        </label>
                        <input
                          type="text"
                          value={searchLocation}
                          onChange={(e) => setSearchLocation(e.target.value)}
                          placeholder="Masukkan nama lokasi"
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Radius Pencarian (km)
                        </label>
                        <input
                          type="number"
                          min="0.5"
                          max="50"
                          step="0.5"
                          value={searchRadius}
                          onChange={(e) => setSearchRadius(parseFloat(e.target.value) || 5)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleAISearch}
                      disabled={!searchLocation || aiSearchLoading}
                      className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {aiSearchLoading ? 'Mencari...' : `Cari dalam radius ${searchRadius} km`}
                    </button>
                  </div>
                </div>
                
                {/* Search Results */}
                {searchedItems.length > 0 && (
                  <div className="mt-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                      <h3 className="font-semibold">Hasil Pencarian dalam radius {searchRadius} km:</h3>
                      <span className="text-sm text-gray-500">{searchedItems.length} hasil ditemukan</span>
                    </div>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {searchedItems.map((item) => (
                        <div key={item.id} className="border rounded p-3 flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedItems.find(i => i.id === item.id)?.selected || false}
                            onChange={() => handleItemToggle(item.id)}
                            className="mr-3 cursor-pointer"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.address}</p>
                            <a className="text-sm text-blue-600" target="_blank" href={item.source}>{item.source}</a>
                            <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 mt-1 gap-2">
                              <div className="flex items-center">
                                <StarIcon filled={false} />
                                <span className="ml-1">{item.rating}</span>
                              </div>
                              <div className="flex items-center">
                                <LocationIcon />
                                <span className="ml-1">{item.distance} km • {item.time} mnt</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 flex flex-col sm:flex-row justify-end gap-3">
                      <button
                        onClick={() => setShowVerification(true)}
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors cursor-pointer"
                      >
                        Verifikasi & Import
                      </button>
                      <button
                        onClick={() => {
                          setShowAISearch(false);
                          setSearchedItems([]);
                          setSelectedItems([]);
                          setSearchLocation('');
                          setSearchRadius(5); // Reset to default
                        }}
                        className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        Tutup
                      </button>
                    </div>
                  </div>
                )}
                
                {/* No results state */}
                {!aiSearchLoading && searchedItems.length === 0 && searchLocation && (
                  <div className="mt-4 text-center text-gray-500">
                    Tidak ada hasil untuk pencarian &ldquo;{searchLocation}&rdquo;. Coba kata kunci lain.
                  </div>
                )}
                
                {/* Loading state */}
                {aiSearchLoading && (
                  <div className="mt-4 flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-600"></div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Verification Modal */}
          {isAdmin && showVerification && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4"
              onClick={(e) => handleModalOutsideClick(e, setShowVerification)}
            >
              <div className="bg-white p-4 md:p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg md:text-xl font-bold mb-4">Verifikasi Data Sebelum Import</h2>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-3">
                    Periksa dan edit data sebelum disimpan. Anda dapat mengedit informasi atau menghapus centang untuk item yang tidak ingin diimport.
                  </p>
                </div>
                
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {selectedItems.filter(item => item.selected).map((item, index) => (
                    <div key={item.id} className="border rounded p-4">
                      <div className="flex items-center mb-3">
                        <input
                          type="checkbox"
                          checked={item.selected}
                          onChange={() => handleItemToggle(item.id)}
                          className="mr-3 cursor-pointer"
                        />
                        <h3 className="font-semibold">Item {index + 1}</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              setSelectedItems(prev => 
                                prev.map(i => 
                                  i.id === item.id ? { ...i, name: newValue } : i
                                )
                              );
                            }}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                          <input
                            type="text"
                            value={item.address}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              setSelectedItems(prev => 
                                prev.map(i => 
                                  i.id === item.id ? { ...i, address: newValue } : i
                                )
                              );
                            }}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                          <input
                            type="text"
                            value={item.category}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              setSelectedItems(prev => 
                                prev.map(i => 
                                  i.id === item.id ? { ...i, category: newValue } : i
                                )
                              );
                            }}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                          <input
                            type="number"
                            step="0.1"
                            min="1"
                            max="5"
                            value={item.rating}
                            onChange={(e) => {
                              const newValue = parseFloat(e.target.value);
                              setSelectedItems(prev => 
                                prev.map(i => 
                                  i.id === item.id ? { ...i, rating: newValue } : i
                                )
                              );
                            }}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Jarak (km)</label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            value={item.distance}
                            onChange={(e) => {
                              const newValue = parseFloat(e.target.value);
                              setSelectedItems(prev => 
                                prev.map(i => 
                                  i.id === item.id ? { ...i, distance: newValue } : i
                                )
                              );
                            }}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Waktu (menit)</label>
                          <input
                            type="number"
                            min="0"
                            value={item.time}
                            onChange={(e) => {
                              const newValue = parseInt(e.target.value);
                              setSelectedItems(prev => 
                                prev.map(i => 
                                  i.id === item.id ? { ...i, time: newValue } : i
                                )
                              );
                            }}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                        <textarea
                          value={item.description}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            setSelectedItems(prev => 
                              prev.map(i => 
                                i.id === item.id ? { ...i, description: newValue } : i
                              )
                            );
                          }}
                          className="w-full p-2 border rounded"
                          rows="2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
                  <button
                    onClick={handleBulkImport}
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors cursor-pointer order-1 sm:order-none"
                  >
                    Import {selectedItems.filter(item => item.selected).length} Item
                  </button>
                  <button
                    onClick={() => setShowVerification(false)}
                    className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer order-2 sm:order-none"
                  >
                    Kembali
                  </button>
                </div>
              </div>
            </div>
          )}
          </section>
        </main>
      </div>
    </div>
  );
}