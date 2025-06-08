"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Icon components
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
        "name": "Hotel Galaxy Banjarmasin",
        "address": "Jl. Jend. Ahmad Yani No.KM. 2,5, Banjarmasin Tengah, Kota Banjarmasin, Kalimantan Selatan 70234",
        "category": "Hotel Bintang 4",
        "rating": 4.6,
        "distance": 0,
        "time": 0,
        "description": "Hotel nyaman dengan fasilitas lengkap dan lokasi strategis dekat pusat kota.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Hotel%20Galaxy%20Banjarmasin",
        "id": "hotel_1746727351379_galaxy",
        "image": "https://pix10.agoda.net/hotelImages/549048/0/b99f2a44c56aa50331905da111c227dd.jpg",
        "source": "https://www.instagram.com/galaxyhotelbjm/?hl=en",
        "selected": true
      },
      {
        "name": "FUGO Hotel Banjarmasin",
        "address": "Jl. Ahmad Yani KM. 2 No.98, Banjarmasin Tengah, Kota Banjarmasin, Kalimantan Selatan 70236",
        "category": "Hotel Bintang 4",
        "rating": 4.6,
        "distance": 0.45,
        "time": 1,
        "description": "Hotel bintang empat terbaru dengan desain modern dan fasilitas mewah.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=FUGO%20Hotel%20Banjarmasin",
        "id": "hotel_1746727351379_fugo",
        "image": "https://banjarmasin.fugohotels.com/assets/img/facilities/Pool.jpg",
        "source": "https://banjarmasin.fugohotels.com/",
        "selected": true
      },
      
      {
        "name": "Swiss-Belhotel Borneo Banjarmasin",
        "address": "Jl. Pangeran Antasari No.18-20, Pekapuran Laut, Kec. Banjarmasin Tengah, Kota Banjarmasin, Kalimantan Selatan 70114",
        "category": "Hotel Bintang 4",
        "rating": 4.5,
        "distance": 1,
        "time": 5,
        "description": "Hotel mewah dengan pemandangan kota, pusat kebugaran, dan beberapa pilihan tempat makan.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Swiss-Belhotel%20Borneo%20Banjarmasin%2C%20Jl.%20Pangeran%20Antasari%20No.18-20%2C%20Pekapuran%20Laut%2C%20Kec.%20Banjarmasin%20Tengah%2C%20Kota%20Banjarmasin%2C%20Kalimantan%20Selatan%2070114",
        "id": "hotel_1746727351379_r59yci",
        "image": "https://dbijapkm3o6fj.cloudfront.net/resources/1758,1004,1,6,4,0,600,450/-4601-/20240301190007/swiss-belhotel-borneo-banjarmasin.jpeg",
        "source": "https://www.swiss-belhotel.com/en-gb/swiss-belhotel-borneo-banjarmasin",
        "selected": true
      },     
      
      {
        "name": "Favehotel Ahmad Yani Banjarmasin",
        "address": "Jl. Ahmad Yani No.39, Sungai Baru, Kec. Banjarmasin Tengah, Kota Banjarmasin, Kalimantan Selatan 70233",
        "category": "Hotel Bintang 3",
        "rating": 4.8,
        "distance": 1.1,
        "time": 5,
        "description": "Hotel modern dengan harga terjangkau dan lokasi strategis.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Favehotel%20Ahmad%20Yani%20Banjarmasin%2C%20Jl.%20Ahmad%20Yani%20No.39%2C%20Sungai%20Baru%2C%20Kec.%20Banjarmasin%20Tengah%2C%20Kota%20Banjarmasin%2C%20Kalimantan%20Selatan%2070233",
        "id": "hotel_1746727351379_26qrfl",
        "image": "https://images.archipelagohotels.com/favehotels/v1/FaveAhmadYaniBanjarmasin/Gallery/Front1.jpg?d=1600x1060&location=center&imagetype=webp",
        "source": "https://banjarmasin.favehotels.com/",
        "selected": true
      },
      {
        "name": "Hotel Aria Barito Banjarmasin",
        "address": "Jl. MT. Haryono No.16-20, Kertak Baru Ulu, Kec. Banjarmasin Tengah, Kota Banjarmasin, Kalimantan Selatan 70111",
        "category": "Hotel Bintang 3",
        "rating": 4.3,
        "distance": 2.8,
        "time": 9,
        "description": "abcde",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Hotel%20Aria%20Barito%20Banjarmasin%2C%20Jl.%20MT.%20Haryono%20No.16-20%2C%20Kertak%20Baru%20Ulu%2C%20Kec.%20Banjarmasin%20Tengah%2C%20Kota%20Banjarmasin%2C%20Kalimantan%20Selatan%2070111",
        "id": "hotel_1746727351379_tsf5r7",
        "image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/b7/f5/9b/aria-barito-hotel.jpg",
        "source": "https://www.ariabaritohotel.com/",
        "selected": true
      },
      {
        "name": "G'Sign Hotel Banjarmasin",
        "address": "Jl. A. Yani No.KM.6, RW.003, Pemurus Luar, Kec. Banjarmasin Tim., Kota Banjarmasin, Kalimantan Selatan 70248",
        "category": "Hotel Bintang 4",
        "rating": 4.3,
        "distance": 3,
        "time": 8,
        "description": "Hotel modern dengan kamar-kamar ber-AC, restoran, dan Wi-Fi gratis.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=G'Sign%20Hotel%20Banjarmasin%2C%20Jl.%20A.%20Yani%20No.KM.6%2C%20RW.003%2C%20Pemurus%20Luar%2C%20Kec.%20Banjarmasin%20Tim.%2C%20Kota%20Banjarmasin%2C%20Kalimantan%20Selatan%2070248",
        "id": "hotel_1746727351379_86u7dr",
        "image": "https://gsignhotel.com/wp-content/uploads/2024/04/view-hotel-1-scaled.jpg",
        "source": "https://www.gsignhotel.com/banjarmasin/",
        "selected": true
      },      
      {
        "name": "Best World Kindai Hotel",
        "address": "Jl. A. Yani No.KM 4,5, Pemurus Baru, Kec. Banjarmasin Selatan, Kota Banjarmasin, Kalimantan Selatan 70249",
        "category": "Hotel Bintang 4",
        "rating": 4.6,
        "distance": 2.8,
        "time": 8,
        "description": "Hotel modern dengan fasilitas pertemuan, restoran elegan, dan kamar nyaman.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Best%20World%20Kindai%20Hotel%20Banjarmasin",
        "id": "hotel_1746727351379_kindai",
        "image": "https://pix8.agoda.net/hotelImages/4426207/0/3e6cff596a465c4590c6e0e57d7e5b3c.jpeg",
        "source": "https://kindaihotelgroup.com/",
        "selected": true
      },                  
      {
        "name": "Rattan Inn",
        "address": "Jl. A. Yani No.KM.4,5, Pemurus Baru, Kec. Banjarmasin Sel., Kota Banjarmasin, Kalimantan Selatan 70249",
        "category": "Hotel Bintang 4",
        "rating": 4.2,
        "distance": 4.4,
        "time": 11,
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
        "rating": 4.4,
        "distance": 2.6,
        "time": 9,
        "description": "Akomodasi bergaya minimalis dengan kamar-kamar bersih dan cafe yang nyaman.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Summer%20Bed%20%26%20Cafe%20Banjarmasin%2C%20Jl.%20Banua%20Anyar%20No.22%2C%20Sungai%20Jingah%2C%20Kec.%20Banjarmasin%20Utara%2C%20Kota%20Banjarmasin%2C%20Kalimantan%20Selatan%2070123",
        "id": "hotel_1746727351379_806k25",
        "image": "https://asset-2.tstatic.net/tribunnews/foto/bank/images/wisata-banjarmasin_20151222_102918.jpg",
        "source": "https://www.instagram.com/summerbedandcafe/?hl=en",
        "selected": true
      },
    ],
    "rumahMakan": [
      {
        "name": "Depot Bakso Sapi Pal 1",
        "address": "Jl. A. Yani Km 1 No. 10 RT.20, Sungai Baru, Banjarmasin Tengah, Kota Banjarmasin, Kalimantan Selatan 70122",
        "category": "Wisata Kuliner",
        "rating": 4.4,
        "distance": 0.7,
        "time": 3,
        "description": "Depot legendaris di Banjarmasin yang terkenal dengan bakso sapi, mie ayam, pangsit kuah, dan gado-gado. Kuah kaldu yang gurih dan daging bakso yang lembut menjadi ciri khasnya. Tempat ini ramai dikunjungi oleh pecinta kuliner lokal dan wisatawan.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Depot+Bakso+Sapi+Pal+1+Banjarmasin",
        "id": "destinasi_1746760000011",
        "image": "https://cdn.rri.co.id/berita/Banjarmasin/o/1713869635993-IMG_20240423_182329/v0n8xa412mf2qv6.jpeg",
        "source": "https://www.tripadvisor.co.id/Restaurant_Review-g303950-d6374926-Reviews-Depot_Bakso_Sapi_Pal_1-Banjarmasin_South_Kalimantan_Kalimantan.html",
        "selected": true
      },
      {
        "name": "Saraba Nyaman Floating Restaurant",
        "address": "Depan Kantor Pemko Banjarmasin, Jl. RE Martadinata No.2, Banjarmasin City, South Kalimantan 70111",
        "category": "Wisata Kuliner",
        "rating": 4.7,
        "distance": 2.4,
        "time": 8,
        "description": "Restoran terapung di tepi Sungai Martapura yang menyajikan masakan khas Banjar dalam suasana santai dengan pemandangan sungai. Cocok untuk keluarga, buka puasa, dan santai sore.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Saraba+Nyaman+Floating+Restaurant+Banjarmasin",
        "id": "destinasi_1746760000006",
        "image": "https://asset-2.tstatic.net/banjarmasinposttravel/foto/bank/images/Suasana-di-Floating-Restaurant-Saraba-Nyaman-Banjarmasin1.jpg",
        "source": "https://www.facebook.com/warungsarabanyaman/posts/saraba-nyaman-floating-restaurant-di-jl-re-martadinata-depan-kantor-pemko-banjar/4816223605113490/",
        "selected": true
      },
      {
        "name": "Lontong Orari",
        "address": "Jl. Sultan Adam RT.21 No.28, Sungai Miai, Kec. Banjarmasin Utara, Kota Banjarmasin, Kalimantan Selatan 70123",
        "category": "Lontong",
        "rating": 4.4,
        "distance": 2.6,
        "time": 11,
        "description": "Lontong dengan kuah yang gurih dan taburan bawang goreng yang renyah.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Lontong%20Orari%2C%20Jl.%20Sultan%20Adam%20RT.21%20No.28%2C%20Sungai%20Miai%2C%20Kec.%20Banjarmasin%20Utara%2C%20Kota%20Banjarmasin%2C%20Kalimantan%20Selatan%2070123",
        "id": "rumahMakan_1746750887300_5a97qw",
        "image": "https://indonesiatraveler.id/wp-content/uploads/2020/02/Lontong-orari3.jpg",
        "source": "https://www.google.com/search?q=Lontong%20Orari",
        "selected": true
      },
      {
        "name": "Warung Nasi Kuning Rahmat",
        "address": "Jl. Pahlawan No.18 RT.08 RW.02, Seberang Mesjid, Banjarmasin Tengah, Kalimantan Selatan 70115",
        "category": "Nasi Kuning & Sarapan Khas Banjar",
        "rating": 4.9,
        "distance": 2.6,
        "time": 11,
        "description": "Warung legendaris yang telah berdiri sejak 1994, menyajikan nasi kuning khas Banjar dengan lauk seperti ikan gabus semur, ayam, dan telur. Cocok untuk sarapan pagi dengan harga terjangkau.",
        "googleMapsUrl": "https://maps.app.goo.gl/fRFM7qGpkENYbw2p8",
        "id": "destinasi_1746760000009",
        "image": "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/2fd7f20a-1ab6-41e6-aa7e-4b3afa2250ab_Go-Biz_20230125_212803.jpeg",
        "source": "https://www.kompas.tv/article/74341/warung-nasi-kuning-ini-legenda-di-banjarmasin",
        "selected": true
      },
      {
        "name": "Waroeng Pondok Bahari",
        "address": "Jl. Simpang Kapten Piere Tendean No.108, RT.016/RW.002, Gadang, Banjarmasin Tengah, Kota Banjarmasin, Kalimantan Selatan 70231",
        "category": "Wisata Kuliner",
        "rating": 4.2,
        "distance": 3,
        "time": 10,
        "description": "Restoran tradisional Banjar yang buka 24 jam, menyajikan berbagai hidangan khas seperti nasi kuning haruan, soto daging, sop buntut, dan ayam goreng. Pengunjung menikmati suasana lesehan di rumah kayu bergaya Banjar, menciptakan pengalaman kuliner yang autentik.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Waroeng+Pondok+Bahari+Banjarmasin",
        "id": "destinasi_1746760000007",
        "image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/01/c6/f1/warung-pondok-bahari.jpg",
        "source": "https://www.tripadvisor.co.id/Restaurant_Review-g303950-d10798305-Reviews-Warung_Pondok_Bahari-Banjarmasin_South_Kalimantan_Kalimantan.html",
        "selected": true
      },
      {
        "name": "Soto Banjar Bang Amat",
        "address": "Jl. Sultan Adam No.12, Sungai Miai, Kec. Banjarmasin Utara, Kota Banjarmasin, Kalimantan Selatan 70123",
        "category": "Soto Banjar",
        "rating": 4.5,
        "distance": 4.2,
        "time": 15,
        "description": "Soto Banjar otentik dengan kuah yang kaya rempah dan rasa yang khas.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Soto%20Banjar%20Bang%20Amat%2C%20Jl.%20Sultan%20Adam%20No.12%2C%20Sungai%20Miai%2C%20Kec.%20Banjarmasin%20Utara%2C%20Kota%20Banjarmasin%2C%20Kalimantan%20Selatan%2070123",
        "id": "rumahMakan_1746750887300_xligt7",
        "image": "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/571f3250-1b30-49a7-b9f4-86e4fe9ba02f_Go-Biz_20220119_151028.jpeg",
        "source": "https://www.google.com/search?q=Soto%20Banjar%20Bang%20Amat",
        "selected": true
      },
      {
        "name": "Mie Bancir Agus Sasirangan",
        "address": "Jl. Ahmad Yani No.10, Sungai Baru, Kec. Banjarmasin Tengah, Kota Banjarmasin, Kalimantan Selatan 70233",
        "category": "Mie Bancir",
        "rating": 4.3,
        "distance": 7,
        "time": 21,
        "description": "Mie Bancir khas Banjarmasin dengan cita rasa yang unik dan lezat.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Mie%20Bancir%20Agus%20Sasirangan%2C%20Jl.%20Ahmad%20Yani%20No.10%2C%20Sungai%20Baru%2C%20Kec.%20Banjarmasin%20Tengah%2C%20Kota%20Banjarmasin%2C%20Kalimantan%20Selatan%2070233",
        "id": "rumahMakan_1746750887301_pluur",
        "image": "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/eed16684-b9c8-4c35-961a-21f90fd41a2e_restaurant-image_1623851378485.jpg",
        "source": "https://www.google.com/search?q=Mie%20Bancir%20Agus%20Sasirangan",
        "selected": true
      },
      {
        "name": "Depot Sari Patin",
        "address": "Jl. Brigjend H. Hasan Basri No. 53 RT 16, Sungai Miai, Banjarmasin Utara, Kalimantan Selatan 70123",
        "category": "Wisata Kuliner",
        "rating": 4.9,
        "distance": 5,
        "time": 16,
        "description": "Depot Sari Patin adalah restoran khas Banjar yang berdiri sejak 2002, terkenal dengan menu andalan patin sungai bakar berbumbu khas, pepes patin, serta sambal jeruk dan mangga. Tempat makan ini menawarkan suasana nyaman dengan pilihan duduk lesehan atau meja, cocok untuk keluarga maupun acara santai.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Depot+Sari+Patin+Banjarmasin",
        "id": "destinasi_1746760000008",
        "image": "https://saripatin.com/wp-content/uploads/2025/02/Menu-Sari-Patin-Watermark_01-scaled.jpg",
        "source": "https://saripatin.com/",
        "selected": true
      }

    ],
    "perbelanjaan": [
      {
        "name": "Duta Mall Banjarmasin",
        "address": "Jl. A. Yani No.KM. 2,5, Melayu, Kec. Banjarmasin Tengah, Kota Banjarmasin, Kalimantan Selatan 70232",
        "category": "Pusat Perbelanjaan",
        "rating": 4.4,
        "distance": 0.5,
        "time": 4,
        "description": "Mall terbesar di Banjarmasin dengan berbagai toko retail, restoran, dan bioskop.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Duta%20Mall%20Banjarmasin%2C%20Jl.%20A.%20Yani%20No.KM.%202%2C5%2C%20Melayu%2C%20Kec.%20Banjarmasin%20Tengah%2C%20Kota%20Banjarmasin%2C%20Kalimantan%20Selatan%2070232",
        "id": "perbelanjaan_1746751421823_fwfd6",
        "image": "https://yopiesalon.com/wp-content/uploads/2024/06/Dutamall.jpg",
        "source": "https://www.dutamall.co.id",
        "selected": true
      },
      {
        "name": "Alfamart Express RS Ulin",
        "address": "Jl. A Yani No.43, RSUD Ulin, Kel. Sei/Sungai Baru, Banjarmasin Tengah, Kalimantan Selatan 70233",
        "category": "Minimarket",
        "rating": 4.0,
        "distance": 0.5,
        "time": 3,
        "description": "Alfamart Express yang terletak dekat dengan RSUD Ulin, menyediakan kebutuhan sehari-hari dengan jam operasional hingga malam.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Alfamart%20Express%20RS%20Ulin%20Banjarmasin",
        "id": "alfamart_ulin_bjm",
        "image": "https://upload.wikimedia.org/wikipedia/commons/9/9e/ALFAMART_LOGO_BARU.png",
        "source": "https://www.google.com/maps/search/?api=1&query=Alfamart%20Express%20RS%20Ulin%20Banjarmasin",
        "selected": true
      },
      {
        "name": "Alfamart A Yani Km 4",
        "address": "Jl. A. Yani Kel No.Km 4, Kebun Bunga, Kec. Banjarmasin Tim., Kota Banjarmasin, Kalimantan Selatan 70235",
        "category": "Minimarket",
        "rating": 4.2,
        "distance": 1.2,
        "time": 6,
        "description": "Alfamart menyediakan kebutuhan sehari-hari dengan jam operasional hingga malam.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Alfamart%20Ahmad%20Yani%20Km%204%20Banjarmasin",
        "id": "alfamart_ayani_bjm",
        "image": "https://upload.wikimedia.org/wikipedia/commons/9/9e/ALFAMART_LOGO_BARU.png",
        "source": "https://www.google.com/maps/search/?api=1&query=Alfamart%20Ahmad%20Yani%20Km%204%20Banjarmasin",
        "selected": true
      },
      {
      "name": "Indomaret Veteran 1",
      "address": "Jl. Veteran Sungai Bilu No.65, Sungai Bilu, Kec. Banjarmasin Timur, Kota Banjarmasin, Kalimantan Selatan 70236",
      "category": "Minimarket",
      "rating": 4.2,
      "distance": 1.9,
      "time": 9,
      "description": "Minimarket yang menyediakan berbagai kebutuhan harian seperti makanan, minuman, dan produk rumah tangga. Terletak strategis di kawasan Sungai Bilu, Banjarmasin.",
      "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Indomaret+Veteran+1+Banjarmasin",
      "id": "destinasi_1746760000014",
      "image": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Logo_Indomaret.png",
      "source": "https://www.google.com/maps/search/?api=1&query=Indomaret+Veteran+1+Banjarmasin",
      "selected": true
      },
      {
        "name": "Q Mall Banjarbaru",
        "address": "Jl. Ahmad Yani Km. 36, Loktabat Utara, Kec. Banjarbaru Utara, Kota Banjar Baru, Kalimantan Selatan 70712",
        "category": "Pusat Perbelanjaan",
        "rating": 4.4,
        "distance": 35.5,
        "time": 65,
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
        "id": "transportasi_grab",
        "name": "Grab",
        "address": "Banjarmasin, Banjarbaru, dan sekitarnya",
        "category": "Transportasi Online",
        "rating": 4.5,
        "distance": 0,
        "time": 0,
        "description": "Layanan transportasi online yang tersedia di seluruh area Banjarmasin dan Banjarbaru, meliputi GrabCar dan GrabBike.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/f/f6/Grab_Logo.svg",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Grab%20Banjarmasin",
        "source": "https://www.grab.com/id/"
      },
      {
        "id": "transportasi_gojek",
        "name": "Gojek",
        "address": "Banjarmasin, Banjarbaru, dan sekitarnya",
        "category": "Transportasi Online",
        "rating": 4.5,
        "distance": 0,
        "time": 0,
        "description": "Layanan transportasi online seperti GoRide dan GoCar yang tersedia luas di Banjarmasin dan Banjarbaru.",
        "image": "https://lelogama.go-jek.com/post_featured_image/Super-App-Gojek-Banner.jpg",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Gojek%20Banjarmasin",
        "source": "https://www.gojek.com/"
      },
      {
        "id": "transportasi_maxim",
        "name": "Maxim",
        "address": "Banjarmasin, Banjarbaru, dan sekitarnya",
        "category": "Transportasi Online",
        "rating": 4.3,
        "distance": 0,
        "time": 0,
        "description": "Layanan transportasi online ekonomis yang tersedia di Banjarmasin, Banjarbaru, dan sekitarnya, meliputi mobil dan motor.",
        "image": "https://logowik.com/content/uploads/images/maxim2941.jpg",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Maxim%20Banjarmasin",
        "source": "https://taximaxim.com/id/"
      },
      {
        "id": "transportasi_kuorderid",
        "name": "Kuorder.id Express",
        "address": "Banjarmasin, Banjarbaru, dan sekitarnya",
        "category": "Transportasi Online",
        "rating": 4.4,
        "distance": 0,
        "time": 0,
        "description": "Layanan pengiriman lokal dan antar kota yang cepat, aman, dan efisien. Menyediakan layanan instan, reguler, dan hemat untuk kebutuhan pengiriman barang dan belanja online di Banjarmasin, Banjarbaru, dan Martapura.",
        "image": "https://kuorder.id/wp-content/uploads/2024/07/kuorder-id.png",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Kuorder.id%20Express%20Banjarmasin",
        "source": "https://www.instagram.com/kuorderid/"
      },
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
    "ibadah": [
      {
        "id": "destinasi_katedral_keluarga_kudus",
        "name": "Katedral Keluarga Kudus Banjarmasin",
        "address": "Jl. Lambung Mangkurat No. 40, Kertak Baru Ilir, Banjarmasin Tengah, Kalimantan Selatan 70111",
        "category": "Gereja Katolik",
        "rating": 4.7,
        "distance": 2.1,
        "time": 7,
        "description": "Gereja Katolik bergaya neo-gotik yang diresmikan pada 28 Juni 1931. Merupakan pusat Keuskupan Banjarmasin dan aktif menyelenggarakan misa harian serta kegiatan keagamaan lainnya.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Katedral+Keluarga+Kudus+Banjarmasin",
        "image": "https://upload.wikimedia.org/wikipedia/commons/e/e7/Gereja_Katedral_Banjarmasin.jpg",
        "source": "https://id.wikipedia.org/wiki/Katedral_Banjarmasin",
        "selected": true
      },      
      {
        "name": "Masjid Raya Sabilal Muhtadin",
        "address": "Jl. Jenderal Sudirman No.1, Antasan Besar, Kec. Banjarmasin Tengah, Kota Banjarmasin, Kalimantan Selatan 70114",
        "category": "Masjid",
        "rating": 4.7,
        "distance": 2.5,
        "time": 7,
        "description": "Masjid terbesar dan termegah di Banjarmasin, menjadi ikon kota.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Masjid%20Raya%20Sabilal%20Muhtadin%2C%20Jl.%20Jenderal%20Sudirman%20No.1%2C%20Antasan%20Besar%2C%20Kec.%20Banjarmasin%20Tengah%2C%20Kota%20Banjarmasin%2C%20Kalimantan%20Selatan%2070114",
        "id": "masjid_1746752135096_eh5z2v",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Masjid_Raya_Sabilal_Muhtadi_depan.jpg/330px-Masjid_Raya_Sabilal_Muhtadi_depan.jpg",
        "source": "https://id.wikipedia.org/wiki/Masjid_Raya_Sabilal_Muhtadin",
        "selected": true
      },
      {
        "id": "destinasi_kelenteng_suci_nurani",
        "name": "Kelenteng Suci Nurani",
        "address": "Jl. Kapten Piere Tendean RT.35, Kelurahan Gadang, Banjarmasin Tengah, Kalimantan Selatan 70117",
        "category": "Kelenteng",
        "rating": 5.0,
        "distance": 2.5,
        "time": 11,
        "description": "Kelenteng Suci Nurani, didirikan pada tahun 1898, merupakan salah satu kelenteng tertua di Banjarmasin dan menjadi saksi sejarah komunitas Tionghoa di Kalimantan Selatan. Terletak di Kampung Pecinan Laut, kelenteng ini mempertahankan arsitektur khas Tiongkok dengan prinsip feng shui, serta dihiasi ornamen naga dan altar yang kaya makna spiritual.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Kelenteng+Suci+Nurani+Banjarmasin",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Klenteng_Soetji_Nurani_%282%29.jpg/1920px-Klenteng_Soetji_Nurani_%282%29.jpg",
        "source": "https://id.wikipedia.org/wiki/Kelenteng_Suci_Nurani",
        "selected": true
      },
      
      {
        "id": "destinasi_vihara_dhammasoka",
        "name": "Vihara Dhammasoka Banjarmasin",
        "address": "Jl. Kapten Piere Tendean Gg. Vihara No.37, RT.41/13, Kelurahan Gadang, Banjarmasin Tengah, Kalimantan Selatan 70112",
        "category": "Vihara",
        "rating": 4.6,
        "distance": 3.1,
        "time": 10,
        "description": "Vihara Dhammasoka adalah vihara Theravada terbesar di Banjarmasin, didirikan pada awal 2000-an untuk memenuhi kebutuhan umat Buddha yang berkembang. Terletak di kawasan Kampung Pecinan Laut, vihara ini menjadi pusat kegiatan keagamaan dan sosial bagi komunitas Buddha setempat.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Vihara+Dhammasoka+Banjarmasin",
        "image": "https://upload.wikimedia.org/wikipedia/commons/0/00/Vihara_Dhammasoka.jpg",
        "source": "https://sanghatheravadaindonesia.or.id/vihara-binaan-sti/vihara-dhammasoka/",
        "selected": true
      },
      {
        "id": "destinasi_pura_agung_jagat_natha",
        "name": "Pura Agung Jagat Natha Banjarmasin",
        "address": "Jl. Gatot Subroto No.36, Pengambangan, Banjarmasin Timur, Kalimantan Selatan 70239",
        "category": "Pura",
        "rating": 4.7,
        "distance": 2.7,
        "time": 11,
        "description": "Pura Agung Jagat Natha adalah satu-satunya pura Hindu di Kota Banjarmasin, diresmikan pada 2 Mei 2015. Pura ini terdiri dari tiga bagian utama: ruang utama untuk ibadah, ruang tengah untuk kegiatan keagamaan, dan ruang luar untuk aktivitas sosial. Selain menjadi pusat ibadah, pura ini juga menjadi simbol eksistensi umat Hindu di Kalimantan Selatan.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Pura+Agung+Jagat+Natha+Banjarmasin",
        "image": "https://upload.wikimedia.org/wikipedia/commons/d/d5/Pura_Agung_Jagat_Natha_Banjarmasin_001.jpg",
        "source": "https://id.wikipedia.org/wiki/Pura_Agung_Jagat_Natha",
        "selected": true
      },
      {
        "id": "destinasi_gke_eppata_banjarmasin",
        "name": "Gereja Kalimantan Evangelis (GKE) Eppata Banjarmasin",
        "address": "Jl. Piere Tendean, Gadang, Banjarmasin Tengah, Kalimantan Selatan 70111",
        "category": "Gereja Protestan",
        "rating": 4.7,
        "distance": 3,
        "time": 9,
        "description": "GKE Eppata adalah gereja Protestan yang aktif di Banjarmasin, bagian dari sinode Gereja Kalimantan Evangelis. Gereja ini dikenal dengan pelayanan lintas etnis dan kegiatan pemuda yang dinamis, termasuk ibadah mingguan dan live streaming.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Gereja+Kalimantan+Evangelis+Eppata+Banjarmasin",
        "image": "https://upload.wikimedia.org/wikipedia/commons/c/c3/GKE_Eppata_Banjarmasin.jpg",
        "source": "https://www.instagram.com/sppeppata/",
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
  const sections = ['hotel', 'rumahMakan', 'perbelanjaan', 'transportasi', 'ibadah'];
  
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

  // Navigation functions for mobile
  const getCurrentSectionIndex = () => sections.indexOf(activeCategory);

  const goToPrevSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex > 0) {
      setActiveCategory(sections[currentIndex - 1]);
      setFilterCategory('Semua');
    }
  };

  const goToNextSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex < sections.length - 1) {
      setActiveCategory(sections[currentIndex + 1]);
      setFilterCategory('Semua');
    }
  };

  const hasPrevSection = () => getCurrentSectionIndex() > 0;
  const hasNextSection = () => getCurrentSectionIndex() < sections.length - 1;

  const getPrevSectionName = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex > 0) {
      return categoryLabels[sections[currentIndex - 1]];
    }
    return '';
  };

  const getNextSectionName = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex < sections.length - 1) {
      return categoryLabels[sections[currentIndex + 1]];
    }
    return '';
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
    ibadah: 'Tempat Ibadah'
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
              <Link href="/" onClick={handleNavItemClick} className="font-medium text-gray-800 hover:text-snowymint-900 transition-colors">
                Beranda
              </Link>
              <Link href="/kegiatan" className="font-medium text-gray-800 hover:text-snowymint-900 transition-colors">
                Kegiatan
              </Link>
              <Link href="/akomodasi" className="font-medium text-gray-800 hover:text-snowymint-900 transition-colors border-b-2 border-snowymint-900">
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
              <a href="/wisata" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm">Wisata</a>
              <a href="/galeri" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm">Galeri</a>
              <a href="/kontak" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm">Kontak</a>
              <a href="/tentang" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm">Tentang</a>
              
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