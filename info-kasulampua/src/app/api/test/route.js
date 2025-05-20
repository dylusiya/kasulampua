// // For App Router (Next.js 13+): app/api/test/route.js
// export async function GET() {
//     return Response.json({ 
//       message: 'API is working!',
//       timestamp: new Date().toISOString()
//     });
//   }
  
//   export async function POST(request) {
//     const body = await request.json();
//     return Response.json({ 
//       message: 'POST API is working!',
//       received: body,
//       timestamp: new Date().toISOString()
//     });
//   }
  
//   // For Pages Router (Next.js 12-): pages/api/test.js
//   // export default function handler(req, res) {
//   //   if (req.method === 'GET') {
//   //     res.status(200).json({ 
//   //       message: 'API is working!',
//   //       timestamp: new Date().toISOString()
//   //     });
//   //   } else if (req.method === 'POST') {
//   //     res.status(200).json({ 
//   //       message: 'POST API is working!',
//   //       received: req.body,
//   //       timestamp: new Date().toISOString()
//   //     });
//   //   } else {
//   //     res.status(405).json({ error: 'Method not allowed' });
//   //   }
//   // }