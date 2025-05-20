// app/utils/auth.js

/**
 * Utility functions for authentication
 */

// Admin users data
export const adminUsers = [
    {
      username: 'admin',
      password: 'admin123',
      name: 'Administrator',
      role: 'admin',
      permissions: ['create', 'read', 'update', 'delete']
    },
    {
      username: 'operator',
      password: 'operator123',
      name: 'Operator',
      role: 'operator',
      permissions: ['read', 'update']
    }
  ];
  
  /**
   * Check if user is authenticated
   * @returns {Object|null} User object if authenticated, null otherwise
   */
  export const getUser = () => {
    if (typeof window === 'undefined') {
      return null;
    }
    
    try {
      const userData = JSON.parse(localStorage.getItem('user') || 'null');
      if (userData && userData.isLoggedIn) {
        return userData;
      }
      return null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  };
  
  /**
   * Check if user has permission
   * @param {string} permission Permission to check
   * @returns {boolean} True if user has permission, false otherwise
   */
  export const hasPermission = (permission) => {
    const user = getUser();
    if (!user) return false;
    
    // Find the user in adminUsers to get permissions
    const userWithPermissions = adminUsers.find(u => u.username === user.username);
    if (!userWithPermissions) return false;
    
    return userWithPermissions.permissions.includes(permission);
  };
  
  /**
   * Login user
   * @param {string} username Username
   * @param {string} password Password
   * @returns {Object|null} User object if login successful, null otherwise
   */
  export const login = (username, password) => {
    const user = adminUsers.find(
      user => user.username === username && user.password === password
    );
    
    if (user) {
      const userData = {
        username: user.username,
        name: user.name,
        role: user.role,
        isLoggedIn: true
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    }
    
    return null;
  };
  
  /**
   * Logout user
   */
  export const logout = () => {
    localStorage.removeItem('user');
  };
  
  /**
   * Save data to localStorage
   * @param {string} key Key to save data under
   * @param {Object} data Data to save
   */
  export const saveToLocalStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
      return false;
    }
  };
  
  /**
   * Get data from localStorage
   * @param {string} key Key to get data from
   * @param {Object} defaultValue Default value if key doesn't exist
   * @returns {Object} Data from localStorage or defaultValue
   */
  export const getFromLocalStorage = (key, defaultValue = null) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return defaultValue;
    }
  };