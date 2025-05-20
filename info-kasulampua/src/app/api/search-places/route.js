// // app/api/search-places/route.js

// export async function POST(request) {
//     try {
//       const { location, category, radius = 5000, limit = 2 } = await request.json();
      
//       if (!location || !category) {
//         return Response.json({
//           success: false,
//           error: 'Location and category required'
//         }, { status: 400 });
//       }
  
//       const apiKey = process.env.GOOGLE_PLACES_API_KEY;
      
//       if (!apiKey) {
//         return Response.json({
//           success: false,
//           error: 'Google Places API key missing'
//         }, { status: 500 });
//       }
  
//       // Map category ke Google Places type
//       const typeMap = {
//         hotel: 'lodging',
//         rumahMakan: 'restaurant',
//         perbelanjaan: 'shopping_mall',
//         transportasi: 'transit_station',
//         masjid: 'mosque'
//       };
  
//       const type = typeMap[category] || 'lodging';
  
//       // 1. Geocode lokasi untuk mendapat koordinat
//       const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`;
      
//       const geocodeResponse = await fetch(geocodeUrl);
//       const geocodeData = await geocodeResponse.json();
      
//       if (!geocodeData.results?.length) {
//         throw new Error('Location not found');
//       }
  
//       const { lat, lng } = geocodeData.results[0].geometry.location;
  
//       // 2. Nearby Search dengan limit dan radius
//       const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${apiKey}`;
      
//       const placesResponse = await fetch(placesUrl);
//       const placesData = await placesResponse.json();
  
//       if (placesData.status === 'ZERO_RESULTS') {
//         return Response.json({
//           success: true,
//           data: [],
//           source: 'google_places',
//           message: 'No results found'
//         });
//       }
  
//       // 3. Format hasil
//       const results = placesData.results.slice(0, limit).map((place) => {
//         // Hitung jarak
//         const distance = calculateDistance(
//           lat, lng, 
//           place.geometry.location.lat, 
//           place.geometry.location.lng
//         );
        
//         return {
//           id: place.place_id,
//           name: place.name,
//           address: place.vicinity,
//           category: place.types?.[0] || type,
//           rating: place.rating || 4.0,
//           distance: parseFloat(distance.toFixed(1)),
//           time: Math.round(distance * 2), // Estimasi 2 menit per km
//           description: `${place.name} - ${place.vicinity}`,
//           image: place.photos ? 
//             `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place.photos[0].photo_reference}&key=${apiKey}` :
//             '/api/placeholder/400/300',
//           isRealData: true,
//           googleMapsUrl: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`
//         };
//       });
  
//       return Response.json({
//         success: true,
//         data: results,
//         source: 'google_places',
//         cost: {
//           geocode: 1,
//           nearby: 1,
//           total: 2,
//           price: '$0.037'
//         }
//       });
  
//     } catch (error) {
//       console.error('Google Places error:', error);
      
//       return Response.json({
//         success: false,
//         error: error.message,
//         fallback: true
//       }, { status: 500 });
//     }
//   }
  
//   // Fungsi untuk menghitung jarak
//   function calculateDistance(lat1, lon1, lat2, lon2) {
//     const R = 6371; // Radius earth in km
//     const dLat = deg2rad(lat2 - lat1);
//     const dLon = deg2rad(lon2 - lon1);
//     const a = 
//       Math.sin(dLat/2) * Math.sin(dLat/2) +
//       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
//       Math.sin(dLon/2) * Math.sin(dLon/2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//     return R * c;
//   }
  
//   function deg2rad(deg) {
//     return deg * (Math.PI/180);
//   }
  
//   // Endpoint untuk testing
//   export async function GET() {
//     return Response.json({
//       message: 'Google Places API endpoint',
//       status: 'OK',
//       apiKeyExists: !!process.env.GOOGLE_PLACES_API_KEY
//     });
//   }