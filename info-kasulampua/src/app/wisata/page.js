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

const SmartphoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>
);

// Placeholder data
const initialData = {
  "destinasiWisata": [    
    {
    "id": "destinasi_menara_pandang_banjarmasin",
    "name": "Menara Pandang Banjarmasin",
    "address": "Jl. Kapten Pierre Tendean No.07, RT.16/RW.2, Gadang, Banjarmasin Tengah, Kalimantan Selatan 70123",
    "category": "Landmark",
    "rating": 4.4,
    "distance": 2.9,
    "time": 10,
    "description": "Bisa dicapai dalam 10 menit dari pusat kota via Jl. Sudirman. Disarankan menggunakan ojek online, tersedia area parkir dekat dermaga Siring.",
    "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Menara+Pandang+Banjarmasin",
    "image": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhNBdEQclaDpdc14GSFbviCnwIFwGODtRrOzlJgqJ-B8gS5QSaNvklHQzdGDdNzfRvt1zQ7DzhBWWIM3Q7NFdR3mp8b8La2k6GzogKU8mS7CUo0jV8Spzvmt_w8kHstTUOfu2x6xWC5JQgk/s1600/Slider-2-Menara_Pandang-BanjarmasinTourism.jpg",
    "source": "https://disbudporapar.banjarmasinkota.go.id/2018/10/menara-pandang-banjarmasin.html",
    "selected": true
    },

  {
    "name": "Pasar Terapung Siring",
    "address": "Jl. Jend. Sudirman, Banjarmasin Tengah, Kota Banjarmasin, Kalimantan Selatan",
    "category": "Wisata Budaya",
    "rating": 4.4,
    "distance": 3,
    "time": 10,
    "description": "Terletak di Siring, mudah dijangkau dengan berjalan kaki dari pusat kota atau naik ojek online. Akses terbaik pagi hari.",
    "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Pasar%20Terapung%20Siring%20Banjarmasin",
    "id": "destinasi_1746760000007",
    "image": "https://asset.kompas.com/crops/4tUHnFkPBJO4wCf4BFXuhEtQZMk=/0x0:3000x2000/750x500/data/photo/2023/01/14/63c1faaa86ccc.jpg",
    "source": "https://www.google.com/maps/search/?api=1&query=Pasar%20Terapung%20Siring%20Banjarmasin",
    "selected": true
  },
  {
    "id": "destinasi_kampung_sasirangan_sungai_jingah",
    "name": "Kampung Sasirangan Sungai Jingah",
    "address": "Jl. Sungai Jingah RT.17/RW.01, Kelurahan Sungai Jingah, Banjarmasin Utara, Kalimantan Selatan 70121",
    "category": "Desa Wisata",
    "rating": 4.6,
    "distance": 6.4,
    "time": 18,
    "description": "Naik kendaraan pribadi atau ojek online sekitar 15 sampai 20 menit dari kota. Akses jalan kecil, cocok untuk motor dan mobil kecil.",
    "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Kampung+Sasirangan+Sungai+Jingah+Banjarmasin",
    "image": "https://jadesta.com/imgpost/57047.jpg",
    "source": "https://jadesta.kemenparekraf.go.id/desa/kampung_sasirangan_sungai_jingah",
    "selected": true
 },

  {
    "name": "Pulau Kembang",
    "address": "Sungai Barito, Barito Kuala, Kalimantan Selatan",
    "category": "Wisata Alam",
    "rating": 4.1,
    "distance": 39.4,
    "time": 84,
    "description": "Naik perahu dari dermaga Siring ke Pulau Kembang, perjalanan sungai sekitar 30 menit. Sewa perahu bisa rombongan.",
    "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Pulau%20Kembang%20Barito%20Kuala",
    "id": "destinasi_1746760000008",
    "image": "https://indonesiakaya.com/wp-content/uploads/2020/10/Biaya_memasuki_Pulau_Kembang_dikenakan_tarif_sebesar_5_000_rupiah_orangnya-1.jpg",
    "source": "https://www.google.com/maps/search/?api=1&query=Pulau%20Kembang%20Barito%20Kuala",
    "selected": true
  },
  {
    "name": "Amanah Borneo Park",
    "address": "Jl. Taruna Bhakti, Palam, Kec. Cempaka, Kota Banjarbaru, Kalimantan Selatan",
    "category": "Taman Hiburan Keluarga",
    "rating": 3.9,
    "distance": 36,
    "time": 58,
    "description": "Dari Banjarmasin ke Banjarbaru sekitar 1 jam via Jl. A. Yani, lalu ke Jl. Taruna Bhakti. Ideal pakai mobil pribadi atau sewa.",
    "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Amanah%20Borneo%20Park",
    "id": "destinasi_1746760000004",
    "image": "https://kec-cempaka.banjarbarukota.go.id/wp-content/uploads/2019/10/WhatsApp-Image-2019-10-08-at-14.44.24-1024x768.jpeg",
    "source": "https://amanahborneopark.co.id/",
    "selected": true
  },
  {
    "id": "destinasi_masjid_agung_al_karomah",
    "name": "Masjid Agung Al-Karomah Martapura",
    "address": "Jl. Ahmad Yani, Cindai Alus, Kec. Martapura, Kabupaten Banjar, Kalimantan Selatan 70611",
    "category": "Tempat Ibadah",
    "rating": 4.8,
    "distance": 38.9,
    "time": 71,
    "description": "Bisa dicapai dalam 1 jam dari Banjarmasin via Jl. A. Yani. Masjid berada di pinggir jalan utama, mudah dikenali",
    "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Masjid+Agung+Al-Karomah+Martapura",
    "image": "https://smart.kalselprov.go.id/uploads/foto/al_karomah_mtp1.png",
    "source": "https://id.wikipedia.org/wiki/Masjid_Agung_Al-Karomah",
    "selected": true
    },
    {
    "id": "destinasi_tahura_sultan_adam",
    "name": "Tahura Sultan Adam Mandiangin",
    "address": "Desa Mandiangin Barat, Kecamatan Karang Intan, Kabupaten Banjar, Kalimantan Selatan 70661",
    "category": "Wisata Alam",
    "rating": 4.7,
    "distance": 50.3,
    "time": 85,
    "description": "Sekitar 1,5 jam dari Banjarmasin ke Mandiangin via Karang Intan. Akses jalan bagus, tapi tidak ada angkutan umum langsung.",
    "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Tahura+Sultan+Adam+Mandiangin",
    "image": "https://dispar.kalselprov.go.id/wp-content/uploads/2025/03/Gapura_Tahura_Sultan_Adam-2048x893.jpg",
    "source": "https://regional.kompas.com/read/2022/11/16/232829878/tahura-sultan-adam-di-kalimantan-selatan-daya-tarik-harga-tiket-dan-rute",
    "selected": true
    },
    {
        "name": "Bukit Matang Kaladan",
        "address": "Kecamatan Aranio, Kabupaten Banjar, Kalimantan Selatan",
        "category": "Wisata Alam",
        "rating": 4.3,
        "distance": 56.6,
        "time": 76,
        "description": "Akses via Bendungan Riam Kanan, lalu trekking 15 sampai 30 menit. Disarankan pakai kendaraan pribadi dan sepatu outdoor.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Bukit%20Matang%20Kaladan",
        "id": "destinasi_1746760000006",
        "image": "https://meratusgeopark.org/wp-content/uploads/2023/10/DJI_0034-scaled.jpg",
        "source": "https://dewatiket.id/blog/tempat-wisata-di-banjarbaru/",
        "selected": true
    },
  ],
  "kulinerKhas": [
    
    {
        "name": "Ketupat Kandangan Kaum",
        "address": "Jl. Pangeran Antasari, Melayu, Banjarmasin Tengah, Kota Banjarmasin, Kalimantan Selatan",
        "category": "Kuliner Khas",
        "rating": 4.6,
        "distance": 3.9,
        "time": 10,
        "description": "Tempat legendaris di Banjarmasin yang menyajikan ketupat Kandangan dengan ikan gabus atau patin dalam kuah santan gurih berempah.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Ketupat%20Kandangan%20Kaum%2C%20Banjarmasin",
        "id": "kuliner_1746770000002",
        "image": "https://asset-2.tstatic.net/banjarmasin/foto/bank/images/kuliner-kalsel-ketupat-kandangan-warung-kaum4.jpg",
        "source": "https://www.instagram.com/warung.kaum/?hl=en",
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
        "name": "Nasi Itik Tenda Biru",
        "address": "Jl. A. Yani Km 36, Samping Pom Bensin, Gambut, Kabupaten Banjar, Kalimantan Selatan",
        "category": "Kuliner Khas",
        "rating": 4.9,
        "distance": 12,
        "time": 22,
        "description": "Warung legendaris yang menyajikan nasi itik khas Gambut dengan bumbu habang yang kaya rempah, disajikan dengan nasi hangat dan sambal khas Tenda Biru.",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Nasi%20Itik%20Tenda%20Biru%2C%20Gambut%2C%20Kalimantan%20Selatan",
        "id": "kuliner_1746770000003",
        "image": "https://upload.wikimedia.org/wikipedia/commons/6/62/Nasi_Itik_Gambut_Tenda_Biru.JPG",
        "source": "https://www.instagram.com/tenda_biru_bjb/?hl=en",
        "selected": true
        }

  ],
  "olehOleh": [
    {
    "name": "Toko Andalas",
    "address": "Jl. Perintis Kemerdekaan No. 12, Pasar Lama, Banjarmasin Tengah, Kalimantan Selatan",
    "category": "Oleh-oleh Kuliner & Cendera Mata",
    "rating": 4.4,
    "distance": 3.7,
    "time": 11,
    "description": "Menjual berbagai makanan khas seperti ikan saluang, dodol kandangan, rabuk ikan haruan, serta cendera mata khas Kalimantan.",
    "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Toko+Andalas+Banjarmasin",
    "id": "toko_oleh2_001",
    "image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/81/ce/4a/toko-oleh-oleh-andalas.jpg",
    "source": "https://www.instagram.com/oleholehbanjarmasinandalas",
    "selected": true
  },
  {
    "name": "Pusat Oleh-oleh Galuh Banjar",
    "address": "Jl. S. Parman No. 5, Belitung Selatan, Banjarmasin Barat, Kalimantan Selatan",
    "category": "Oleh-oleh Kuliner & Kain Sasirangan",
    "rating": 4.4,
    "distance": 3.9,
    "time": 12,
    "description": "Menawarkan berbagai makanan khas Banjarmasin seperti amplang, dodol kandangan, serta kain sasirangan dan suvenir lainnya.",
    "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Pusat+Oleh+oleh+Galuh+Banjar+Banjarmasin",
    "id": "toko_oleh2_002",
    "image": "https://cdn.idntimes.com/content-images/community/2023/09/snapinstaapp-31486759-969522513207393-303490833041063936-n-1080-4e99c9153ffc58bc10ca9cd5bdccf58e-e4e840c6d68e8212f63b0b854b33ad50.jpg",
    "source": "https://www.instagram.com/oleholehbanjarmasin",
    "selected": true
  },
  {
    "name": "Sentra Matahari",
    "address": "Jl. Ahmad Yani KM 33 No. 12, Banjarbaru, Kalimantan Selatan",
    "category": "Pusat Oleh-oleh Khas Kalimantan",
    "rating": 4.6,
    "distance": 32,
    "time": 55,
    "description": "Menjual beragam oleh-oleh khas Kalimantan seperti amplang, mandai, ikan saluang, dan kerajinan tangan.",
    "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Sentra+Matahari+Banjarbaru",
    "id": "toko_oleh2_004",
    "image": "https://img.tokoa.id/db2/user/37097.jpg",
    "source": "https://www.instagram.com/sentra_matahari/",
    "selected": true
  },
  {
  "name": "Pertokoan Cahaya Bumi Selamat (CBS)",
  "address": "Jalan Ahmad Yani Km. 40, Martapura, Kabupaten Banjar, Kalimantan Selatan",
  "category": "Pusat Perbelanjaan & Wisata Belanja",
  "rating": 4.5,
  "distance": 38.8,
  "time": 68,
  "description": "CBS Martapura adalah pusat perbelanjaan yang terkenal dengan berbagai toko permata, oleh-oleh khas Kalimantan Selatan, dan kerajinan tangan. Kawasan ini juga menjadi ikon wisata di Martapura, dengan fasilitas taman dan area bermain keluarga.",
  "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Pertokoan%20Cahaya%20Bumi%20Selamat%20Martapura",
  "id": "destinasi_1746760000005",
  "image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/a2/dd/5d/img-20150723-130052-largejpg.jpg",
  "source": "https://www.tripadvisor.com/Attraction_Review-g3224216-d6538777-Reviews-Pertokoan_Cahaya_Bumi_Selamat-Martapura_South_Kalimantan_Kalimantan.html",
  "selected": true
}
  ]
};

export default function WisataPage() {
  // State for data
  const [activeCategory, setActiveCategory] = useState('destinasiWisata');
  const [data, setData] = useState(initialData);
  const [filterCategory, setFilterCategory] = useState('Semua');
  // Define sections order for navigation
  const sections = ['destinasiWisata', 'kulinerKhas', 'olehOleh'];
  
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
    source: ''
  });
  
  // Check user authentication and load data
  useEffect(() => {
    // Load user from localStorage (could be null for guests)
    const userData = JSON.parse(localStorage.getItem('user') || 'null');
    
    // Set user state (will be null for guests)
    setUser(userData);
    
    // Load saved data from localStorage
    let savedData = JSON.parse(localStorage.getItem('wisataData') || 'null');
    
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
      localStorage.setItem('wisataData', JSON.stringify(savedData));
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
    window.location.href = '/login';
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
    link.download = `kasulampua_wisata_${new Date().toISOString().split('T')[0]}.json`;
        
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
    localStorage.setItem('wisataData', JSON.stringify({
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
      source: ''
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
      localStorage.setItem('wisataData', JSON.stringify(updatedData));
    }
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
    }
  };
  
  const categoryLabels = {
    destinasiWisata: 'Destinasi Wisata',
    kulinerKhas: 'Kuliner Khas',
    olehOleh: 'Oleh-Oleh'
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
              <Link href="/akomodasi" className="font-medium text-gray-800 hover:text-snowymint-900 transition-colors">
                Akomodasi
              </Link>
              <Link href="/wisata" className="font-medium text-gray-800 hover:text-snowymint-900 transition-colors border-b-2 border-snowymint-900">
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
              <a href="/akomodasi" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm">Akomodasi</a>
              <a href="/wisata" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm bg-snowymint-300">Wisata</a>
              <a href="/galeri" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm">Galeri</a>
              <a href="/kontak" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm">Kontak</a>
              <a href="/tentang" onClick={handleNavItemClick} className="block py-2 hover:bg-snowymint-300 px-3 rounded text-sm">Tentang</a>
              
              {/* Mobile Category Selection */}
              <div className="border-t mt-2 pt-2">
                <p className="text-sm font-medium text-gray-600 px-3 mb-1">Kategori Wisata:</p>
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
                      setShowAddForm(true);
                      setMobileMenuOpen(false);
                    }} 
                    className="block w-full text-left py-2 hover:bg-snowymint-300 px-3 rounded text-sm"
                  >
                    Tambah {categoryLabels[activeCategory]}
                  </button>
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
          <h2 className="text-lg font-semibold mb-4">Wisata</h2>
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

          {/* Sidapakase App Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center mb-3">
              <SmartphoneIcon />
              <h3 className="font-semibold text-blue-900 ml-2">Aplikasi Sidapakase</h3>
            </div>
            <p className="text-sm text-blue-800 mb-3">
              Download aplikasi resmi Dinas Pariwisata Kalimantan Selatan untuk informasi wisata terlengkap!
            </p>
            <a 
              href="https://play.google.com/store/apps/details?id=com.sidapakase.sidapakasemigrate"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
            >
              <SmartphoneIcon />
              <span className="ml-2">Download di Play Store</span>
            </a>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <span className="text-snowymint-800">Wisata</span>
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
                {categoryLabels[activeCategory]} di Kalimantan Selatan
              </h1>
            </div>
            
            {/* Admin buttons - hidden for mobile in nav */}
            {isAdmin && (
              <div className="hidden md:flex space-x-3">
                <button 
                  onClick={() => setShowAddForm(true)} 
                  className="bg-snowymint-800 text-white px-4 py-2 rounded hover:bg-snowymint-900 transition-colors cursor-pointer"
                >
                  Tambah {categoryLabels[activeCategory]}
                </button>
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
          
          {/* Sidapakase App Info - Mobile */}
          <div className="md:hidden mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center mb-3">
              <SmartphoneIcon />
              <h3 className="font-semibold text-blue-900 ml-2">Aplikasi Sidapakase</h3>
            </div>
            <p className="text-sm text-blue-800 mb-3">
              Download aplikasi resmi Dinas Pariwisata Kalimantan Selatan untuk informasi wisata terlengkap!
            </p>
            <a 
              href="https://play.google.com/store/apps/details?id=com.sidapakase.sidapakasemigrate"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
            >
              <SmartphoneIcon />
              <span className="ml-2">Download di Play Store</span>
            </a>
          </div>
          
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
                        <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-snowymint-900 hover:text-snowymint-700 transition-colors">{item.name}</h3>
                    </a>
                    <p className="text-gray-600 text-xs mb-2 md:mb-3 line-clamp-2">{item.address}</p>
                    <p className="text-gray-700 text-xs md:text-sm mb-3 line-clamp-3">{item.description}</p>
                    <div className="flex items-center justify-between mb-3">
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