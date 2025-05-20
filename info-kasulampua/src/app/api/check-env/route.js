// // app/api/check-env/route.js

// export async function GET() {
//     const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    
//     return Response.json({
//       hasApiKey: !!apiKey,
//       apiKeyLength: apiKey ? apiKey.length : 0,
//       apiKeyPreview: apiKey ? `${apiKey.substring(0, 5)}...${apiKey.substring(apiKey.length - 5)}` : null,
//       nodeEnv: process.env.NODE_ENV,
//       timestamp: new Date().toISOString()
//     });
//   }