// // app/api/search-accommodations/route.js
// import { GoogleGenerativeAI } from '@google/generative-ai';

// export const runtime = 'edge';

// export async function POST(request) {
//   try {
//     console.log('=== Search API called ===');
    
//     const body = await request.json();
//     const { location, category, radius = 5 } = body;
    
//     console.log('Request body:', { location, category, radius });
    
//     if (!location || !category) {
//       return Response.json({
//         success: false,
//         error: 'Location and category are required'
//       }, { status: 400 });
//     }

//     // Check if API key exists
//     const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
//     console.log('API Key exists:', !!apiKey);
    
//     if (!apiKey) {
//       console.error('Gemini API key is missing from environment');
//       return Response.json({
//         success: true,
//         data: generateFallbackData(location, category, radius),
//         fallback: true,
//         error: 'API key missing'
//       });
//     }

//     try {
//       console.log('Initializing Google Generative AI...');
//       const genAI = new GoogleGenerativeAI(apiKey);
      
//       // Use gemini-1.5-flash model which is available in free tier
//       const model = genAI.getGenerativeModel({ 
//         model: 'gemini-2.0-flash-001',
//         generationConfig: {
//           temperature: 0.7,
//           topP: 0.95,
//           topK: 64,
//           maxOutputTokens: 8192,
//         }
//       });
      
//       console.log('Model initialized successfully');

//       const categoryMap = {
//         hotel: 'hotel',
//         rumahMakan: 'rumah makan atau restoran atau warung makan',
//         perbelanjaan: 'pusat perbelanjaan atau toko atau mall',
//         transportasi: 'terminal atau stasiun atau tempat transportasi',
//         masjid: 'masjid'
//       };

//       const prompt = `Cari dan berikan daftar ${categoryMap[category]} yang terdekat dengan ${location} di Kalimantan Selatan dalam radius ${radius} km.

// Berikan hasil dalam format JSON dengan struktur berikut (hanya JSON, tanpa teks lain):
// [
//   {
//     "name": "Nama tempat",
//     "address": "Alamat lengkap",
//     "category": "Kategori spesifik",
//     "rating": 4.5,
//     "distance": 1.2,
//     "time": 8,
//     "description": "Deskripsi singkat"
//     "source": "Tautan homepage atau google mengenai tempat tersebut"
//   }
// ]

// Berikan 3-15 hasil yang realistis untuk area ${location} dalam radius ${radius} km. Pastikan:
// - Rating antara 3.0 - 5.0
// - Jarak MAKSIMAL ${radius} km dari ${location}
// - Jarak minimal 0.5 km
// - Waktu tempuh 2-${Math.max(radius * 3, 10)} menit
// - Pastikan tempatnya asli bukan dibuat-buat dengan memberikan sumber

// Jangan berikan teks selain JSON!`;

//       console.log('Sending request to Gemini...');
//       const result = await model.generateContent(prompt);
//       console.log('Gemini response received');
      
//       // Get the response
//       const response = await result.response;
      
//       // Check if the response is blocked
//       if (response.candidates && response.candidates[0].finishReason === 'SAFETY') {
//         console.log('Response blocked by safety filters');
//         throw new Error('Content blocked by safety filters');
//       }
      
//       let responseText = await response.text();
//       console.log('Raw AI Response:', responseText);
      
//       // Clean the response - remove markdown formatting
//       responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
//       // Remove any text before the JSON array
//       const jsonStart = responseText.indexOf('[');
//       const jsonEnd = responseText.lastIndexOf(']');
      
//       if (jsonStart !== -1 && jsonEnd !== -1) {
//         responseText = responseText.substring(jsonStart, jsonEnd + 1);
//       }
      
//       console.log('Cleaned AI Response:', responseText);
      
//       // Parse the JSON
//       const accommodations = JSON.parse(responseText);
      
//       // Validate and sanitize the response with radius consideration
//       const validatedAccommodations = accommodations.map(item => ({
//         name: String(item.name || 'Nama tidak tersedia'),
//         address: String(item.address || 'Alamat tidak tersedia'),
//         category: String(item.category || 'Umum'),
//         rating: Math.min(Math.max(parseFloat(item.rating) || 4.0, 1.0), 5.0),
//         distance: Math.min(Math.max(parseFloat(item.distance) || 1.0, 0.1), radius), // Ensure distance doesn't exceed radius
//         time: Math.max(parseInt(item.time) || 5, 1),
//         description: String(item.description || 'Deskripsi tidak tersedia'),
//         googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ', ' + (item.address || location))}`,
//         id: `${category}_${Date.now()}_${Math.random().toString(36).substring(7)}`,
//         image: String('https://placehold.co/400x300.png'),
//         source: String(item.source || 'Sumber tidak tersedia')
//       }));
      
//       // Filter out results that exceed the radius
//       const filteredAccommodations = validatedAccommodations.filter(item => item.distance <= radius);
      
//       console.log('Successfully processed data, returning results');
//       console.log(`Found ${filteredAccommodations.length} results within ${radius} km`);
//       return Response.json({
//         success: true,
//         data: filteredAccommodations
//       });
      
//     } catch (aiError) {
//       console.error('=== AI Error ===');
//       console.error('Error name:', aiError.name);
//       console.error('Error message:', aiError.message);
//       console.error('Error stack:', aiError.stack);
      
//       // Check for specific Gemini errors
//       if (aiError.message.includes('API_KEY_INVALID')) {
//         console.error('Invalid API key detected');
//       } else if (aiError.message.includes('RATE_LIMIT_EXCEEDED')) {
//         console.error('Rate limit exceeded');
//       }
      
//       // Fallback to mock data if AI fails
//       const mockData = generateFallbackData(location, category, radius);
//       return Response.json({
//         success: true,
//         data: mockData,
//         fallback: true,
//         error: `AI Error: ${aiError.message}`
//       });
//     }
    
//   } catch (error) {
//     console.error('=== General Error ===');
//     console.error('Error:', error);
    
//     // Return mock data on any failure
//     const mockData = generateFallbackData('default', 'hotel', 5);
//     return Response.json({
//       success: true,
//       data: mockData,
//       fallback: true,
//       error: error.message
//     });
//   }
// }

// // Fallback function for when AI fails
// function generateFallbackData(location, category, radius = 5) {
//   const baseResults = {
//     hotel: [
//       { 
//         name: `Hotel ${location} Plaza`, 
//         category: 'Bintang 4', 
//         rating: 4.3, 
//         distance: Math.min(0.8, radius), 
//         time: 5, 
//         description: `Hotel modern dekat ${location}`, 
//         address: `Jl. ${location} No. 123` 
//       },
//       { 
//         name: `${location} Boutique Hotel`, 
//         category: 'Bintang 3', 
//         rating: 4.5, 
//         distance: Math.min(1.2, radius), 
//         time: 7, 
//         description: `Boutique hotel dengan desain unik`, 
//         address: `Jl. ${location} Raya No. 45` 
//       },
//       { 
//         name: `Red Door ${location}`, 
//         category: 'Budget', 
//         rating: 4.0, 
//         distance: Math.min(1.5, radius), 
//         time: 8, 
//         description: `Budget hotel yang nyaman`, 
//         address: `Jl. ${location} No. 78` 
//       },
//     ],
//     rumahMakan: [
//       { 
//         name: `Warung ${location}`, 
//         category: 'Lokal', 
//         rating: 4.6, 
//         distance: Math.min(0.5, radius), 
//         time: 3, 
//         description: `Masakan tradisional khas ${location}`, 
//         address: `Jl. ${location} No. 12` 
//       },
//       { 
//         name: `Bakso Pak Kumis ${location}`, 
//         category: 'Fast Food', 
//         rating: 4.4, 
//         distance: Math.min(0.7, radius), 
//         time: 4, 
//         description: `Bakso terkenal di ${location}`, 
//         address: `Jl. ${location} No. 34` 
//       },
//       { 
//         name: `Cafe ${location} Corner`, 
//         category: 'Cafe', 
//         rating: 4.2, 
//         distance: Math.min(1.0, radius), 
//         time: 6, 
//         description: `Cafe dengan WiFi cepat`, 
//         address: `Jl. ${location} No. 56` 
//       },
//     ],
//     perbelanjaan: [
//       { 
//         name: `Mall ${location}`, 
//         category: 'Mall', 
//         rating: 4.2, 
//         distance: Math.min(1.5, radius), 
//         time: 8, 
//         description: `Pusat perbelanjaan ${location}`, 
//         address: `Jl. ${location} No. 56` 
//       },
//       { 
//         name: `Pasar ${location}`, 
//         category: 'Pasar Tradisional', 
//         rating: 4.0, 
//         distance: Math.min(0.8, radius), 
//         time: 5, 
//         description: `Pasar tradisional ${location}`, 
//         address: `Jl. ${location} No. 78` 
//       },
//       { 
//         name: `Toko ${location}`, 
//         category: 'Toko Serbaguna', 
//         rating: 3.8, 
//         distance: Math.min(0.3, radius), 
//         time: 3, 
//         description: `Toko serbaguna ${location}`, 
//         address: `Jl. ${location} No. 89` 
//       },
//     ],
//     transportasi: [
//       { 
//         name: `Terminal ${location}`, 
//         category: 'Terminal', 
//         rating: 3.8, 
//         distance: Math.min(2.0, radius), 
//         time: 10, 
//         description: `Terminal transportasi ${location}`, 
//         address: `Jl. ${location} No. 78` 
//       },
//       { 
//         name: `Stasiun ${location}`, 
//         category: 'Stasiun Kereta', 
//         rating: 4.1, 
//         distance: Math.min(1.8, radius), 
//         time: 9, 
//         description: `Stasiun kereta ${location}`, 
//         address: `Jl. ${location} No. 90` 
//       },
//       { 
//         name: `Bandara ${location}`, 
//         category: 'Bandara', 
//         rating: 4.2, 
//         distance: Math.min(8.5, radius), 
//         time: 25, 
//         description: `Bandara ${location}`, 
//         address: `Kawasan Bandara ${location}` 
//       },
//     ],
//     masjid: [
//       { 
//         name: `Masjid Agung ${location}`, 
//         category: 'Masjid', 
//         rating: 4.9, 
//         distance: Math.min(0.3, radius), 
//         time: 5, 
//         description: `Masjid utama di ${location}`, 
//         address: `Jl. ${location} No. 90` 
//       },
//       { 
//         name: `Masjid Jami' ${location}`, 
//         category: 'Masjid Jami\'', 
//         rating: 4.8, 
//         distance: Math.min(0.5, radius), 
//         time: 7, 
//         description: `Masjid Jami' ${location}`, 
//         address: `Jl. ${location} No. 100` 
//       },
//       { 
//         name: `Masjid Al-Ikhlas ${location}`, 
//         category: 'Masjid', 
//         rating: 4.6, 
//         distance: Math.min(1.2, radius), 
//         time: 8, 
//         description: `Masjid dengan fasilitas lengkap`, 
//         address: `Jl. ${location} No. 110` 
//       },
//     ]
//   };
  
//   // Filter results that are within radius
//   const results = (baseResults[category] || baseResults.hotel)
//     .filter(item => item.distance <= radius)
//     .map(item => ({
//       ...item,
//       googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ', ' + (item.address || location))}`,
//       id: `${category}_${Date.now()}_${Math.random().toString(36).substring(7)}`,
//       image: '/api/placeholder/400/300'
//     }));
  
//   return results;
// }

// // GET handler for testing
// export async function GET() {
//   return Response.json({
//     message: 'Search accommodations API is running',
//     methods: ['POST'],
//     status: 'OK',
//     model: 'gemini-1.5-flash',
//     timestamp: new Date().toISOString()
//   });
// }