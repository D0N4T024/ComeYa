// ApiService.js
//import CookieManager from './CookieService';

import axios from 'axios';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://localhost:7057/ComeYa/',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const token = localStorage.getItem('token');
    if (token) {
      this.api.defaults.headers.common['Authorization'] = `bearer ${token}`;
    }
  }
  
  async get(endpoint, params = null) {
    try {
      const response = await this.api.get(endpoint, { params });
      // CookieManager.setCookie(endpoint,response);
      // var cookie = CookieManager.getCookie(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async post(endpoint, data) {
    try {
      const response = await this.api.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async patch(endpoint, data) {
    try {
      const response = await this.api.patch(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async put(endpoint, data) {
    try {
      const response = await this.api.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete(endpoint, data) {
    try {
      const response = await this.api.delete(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Puedes agregar más métodos según tus necesidades (put, delete, etc.)
}

export default new ApiService();
