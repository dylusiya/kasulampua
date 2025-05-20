"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Logo Component
const Logo = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#40D940"/>
    <path d="M14 34V14H24C26.2091 14 28 15.7909 28 18V22C28 24.2091 26.2091 26 24 26H18V34H14Z" fill="white"/>
    <path d="M30 34V20H34V34H30Z" fill="white"/>
    <path d="M30 14V18H34V14H30Z" fill="white"/>
  </svg>
);

// Admin users data
const adminUsers = [
  {
    username: 'admin',
    password: 'admin123',
    name: 'Administrator',
    role: 'admin'
  },
  {
    username: 'operator',
    password: 'operator123',
    name: 'Operator',
    role: 'operator'
  }
];

export default function LoginClient() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already logged in
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user && user.isLoggedIn) {
      router.push('/akomodasi');
    }
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing again
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if user exists
    const user = adminUsers.find(
      user => user.username === formData.username && user.password === formData.password
    );
    
    if (user) {
      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify({
        username: user.username,
        name: user.name,
        role: user.role,
        isLoggedIn: true
      }));
      
      // Redirect to akomodasi page
      router.push('/akomodasi');
    } else {
      setError('Username atau password salah');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-snowymint-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login Admin Konreg PDRB
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Masuk untuk mengelola data akomodasi
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-snowymint-800 focus:border-snowymint-800 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-snowymint-800 focus:border-snowymint-800 sm:text-sm"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-snowymint-800 hover:bg-snowymint-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-snowymint-700 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Memproses...' : 'Masuk'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Demo Credentials
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <span className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700">
                  Username: admin
                </span>
              </div>
              <div>
                <span className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700">
                  Password: admin123
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}