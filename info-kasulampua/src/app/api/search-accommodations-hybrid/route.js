// // app/api/search-accommodations-hybrid/route.js
// import { GoogleGenerativeAI } from '@google/generative-ai';

// // Add CORS headers if needed
// function addCorsHeaders(response) {
//   response.headers.set('Access-Control-Allow-Origin', '*');
//   response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
//   return response;
// }

// export async function OPTIONS() {
//   return addCorsHeaders(new Response(null, { status: 204 }));
// }

// export async function GET() {
//   const response = Response.json({
//     message: 'Hybrid search endpoint',
//     status: 'OK',
//     googleApiExists: !!process.env.GOOGLE_PLACES_API_KEY,
//     geminiApiExists: !!process.env.GOOGLE_GEMINI_API_KEY,
//     modes: ['speed', 'accuracy', 'balanced']
//   });
  
//   return addCorsHeaders(response);
// }

// export async function POST(request) {
//   try {
//     const { location, category, radius = 5, priority = 'balanced' } = await request.json();
    
//     console.log('Hybrid search called with:', { location, category, radius, priority });
    
//     if (!location || !category) {
//       const response = Response.json({
//         success: false,
//         error: 'Location and category required'
//       }, { status: 400 });
      
//       return addCorsHeaders(response);
//     }

//     let results = [];
//     let source = [];
//     let cost = 0;

//     try {
//       switch (priority) {
//         case 'speed':
//           console.log('Using AI only search');
//           results = await searchWithAI(location, category, radius);
//           source = ['ai'];
//           cost = 0;
//           break;
          
//         case 'accuracy':
//           console.log('Using Google only search');
//           results = await searchWithGoogle(location, category, radius * 1000, 5);
//           source = ['google_places'];
//           cost = 2;
//           break;
          
//         case 'balanced':
//         default:
//           console.log('Using hybrid search');
//           try {
//             // Try Google first
//             const googleResults = await searchWithGoogle(location, category, radius * 1000, 2);
            
//             // Then AI
//             const aiResults = await searchWithAI(location, category, radius);
            
//             // Combine and deduplicate
//             results = [...googleResults, ...aiResults];
//             results = deduplicateResults(results).slice(0, 5);
            
//             source = ['google_places', 'ai'];
//             cost = 2;
//           } catch (error) {
//             console.error('Google error in hybrid, using AI fallback:', error);
//             results = await searchWithAI(location, category, radius);
//             source = ['ai_fallback'];
//             cost = 0;
//           }
//           break;
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       // Final fallback
//       results = generateMockData(location, category, radius);
//       source = ['mock'];
//       cost = 0;
//     }
    
//     const responseData = {
//       success: true,
//       data: results,
//       source: source,
//       cost: {
//         requests: cost,
//         estimate: cost > 0 ? '$0.037' : 'Free'
//       }
//     };
    
//     console.log('Returning response:', responseData);
    
//     const response = Response.json(responseData);
//     return addCorsHeaders(response);
    
//   } catch (error) {
//     console.error('Fatal error in hybrid search:', error);
    
//     const response = Response.json({
//       success: false,
//       error: error.message,
//       fallback: true
//     }, { status: 500 });
    
//     return addCorsHeaders(response);
//   }
// }

// async function searchWithGoogle(location, category, radius, limit) {
//   console.log('searchWithGoogle called');
  
//   const apiKey = process.env.GOOGLE_PLACES_API_KEY;
//   if (!apiKey) {
//     throw new Error('Google Places API key missing');
//   }
  
//   // For now, return mock data to avoid API costs during testing
//   // Uncomment below for real implementation
//   /*
//   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/search-places`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       location,
//       category,
//       radius,
//       limit
//     })
//   });
  
//   if (!response.ok) {
//     throw new Error('Google Places API failed');
//   }
  
//   const data = await response.json();
//   return data.data || [];
//   */
  
//   // Mock data for testing
//   return generateMockData(location, category, radius/1000, true).slice(0, limit);
// }

// async function searchWithAI(location, category, radius) {
//   console.log('searchWithAI called');
  
//   const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
//   if (!apiKey) {
//     throw new Error('Gemini API key missing');
//   }
  
//   try {
//     const genAI = new GoogleGenerativeAI(apiKey);
//     const model = genAI.getGenerativeModel({ 
//       model: 'gemini-1.5-flash'
//     });

//     const categoryMap = {
//       hotel: 'hotel',
//       rumahMakan: 'rumah makan atau restoran atau warung makan',
//       perbelanjaan: 'pusat perbelanjaan atau toko atau mall',
//       transportasi: 'terminal atau stasiun atau tempat transportasi',
//       masjid: 'masjid'
//     };

//     const prompt = `Cari dan berikan daftar ${categoryMap[category]} yang terdekat dengan ${location} di Indonesia dalam radius ${radius} km.

// Format hasil dalam JSON dengan struktur berikut (hanya JSON, tanpa teks lain):
// [
//   {
//     "name": "Nama tempat",
//     "address": "Alamat lengkap",
//     "category": "Kategori spesifik",
//     "rating": 4.5,
//     "distance": 1.2,
//     "time": 8,
//     "description": "Deskripsi singkat"
//   }
// ]`;

//     const result = await model.generateContent(prompt);
//     let responseText = await result.response.text();
    
//     // Clean up response
//     responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
//     const jsonStart = responseText.indexOf('[');
//     const jsonEnd = responseText.lastIndexOf(']');
    
//     if (jsonStart !== -1 && jsonEnd !== -1) {
//       responseText = responseText.substring(jsonStart, jsonEnd + 1);
//     }
    
//     const accommodations = JSON.parse(responseText);
    
//     return accommodations.map(item => ({
//       id: `ai_${category}_${Date.now()}_${Math.random().toString(36).substring(7)}`,
//       name: String(item.name || 'Nama tidak tersedia'),
//       address: String(item.address || 'Alamat tidak tersedia'),
//       category: String(item.category || 'Umum'),
//       rating: Math.min(Math.max(parseFloat(item.rating) || 4.0, 1.0), 5.0),
//       distance: Math.min(Math.max(parseFloat(item.distance) || 1.0, 0.1), radius),
//       time: Math.max(parseInt(item.time) || 5, 1),
//       description: String(item.description || 'Deskripsi tidak tersedia'),
//       image: '/api/placeholder/400/300',
//       isRealData: false
//     }));
    
//   } catch (error) {
//     console.error('AI search error:', error);
//     // Fallback to mock data
//     return generateMockData(location, category, radius);
//   }
// }

// function deduplicateResults(results) {
//   const seen = new Set();
//   return results.filter(item => {
//     const key = `${item.name.toLowerCase()}_${item.address.toLowerCase().substring(0, 20)}`;
//     if (seen.has(key)) return false;
//     seen.add(key);
//     return true;
//   });
// }

// function generateMockData(location, category, radius, isGoogle = false) {
//   const baseResults = {
//     hotel: [
//       { name: `Hotel ${location}`, category: 'Budget', rating: 4.2, distance: 0.8, time: 4, description: `Hotel di ${location}`, address: `Jl. ${location} No. 123` },
//       { name: `${location} Plaza Hotel`, category: 'Bintang 3', rating: 4.5, distance: 1.2, time: 6, description: `Hotel modern di ${location}`, address: `Jl. ${location} Raya No. 45` },
//     ],
//     rumahMakan: [
//       { name: `Warung ${location}`, category: 'Lokal', rating: 4.3, distance: 0.5, time: 3, description: `Masakan lokal`, address: `Jl. ${location} No. 12` },
//       { name: `Bakso ${location}`, category: 'Fast Food', rating: 4.1, distance: 0.7, time: 4, description: `Bakso enak`, address: `Jl. ${location} No. 34` },
//     ],
//     perbelanjaan: [
//       { name: `Mall ${location}`, category: 'Mall', rating: 4.0, distance: 1.5, time: 8, description: `Pusat belanja`, address: `Jl. ${location} No. 56` },
//     ],
//     transportasi: [
//       { name: `Terminal ${location}`, category: 'Terminal', rating: 3.8, distance: 2.0, time: 10, description: `Terminal bus`, address: `Jl. ${location} No. 78` },
//     ],
//     masjid: [
//       { name: `Masjid ${location}`, category: 'Masjid', rating: 4.7, distance: 0.3, time: 2, description: `Masjid besar`, address: `Jl. ${location} No. 90` },
//     ]
//   };
  
//   return (baseResults[category] || baseResults.hotel)
//     .filter(item => item.distance <= radius)
//     .map(item => ({
//       ...item,
//       id: `${isGoogle ? 'google' : 'mock'}_${category}_${Date.now()}_${Math.random().toString(36).substring(7)}`,
//       image: '/api/placeholder/400/300',
//       isRealData: isGoogle
//     }));
// }