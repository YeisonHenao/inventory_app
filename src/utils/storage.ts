/* eslint-disable @typescript-eslint/no-explicit-any */
const STORAGE_KEY = 'auth_data';
const EXPIRATION_TIME = 8 * 60 * 60 * 1000; // 8 horas en milisegundos

interface StorageData {
  user: any;
  token: string;
  expiresAt: number;
}

const isBrowser = typeof window !== 'undefined';

export const storage = {
  setAuth(data: Omit<StorageData, 'expiresAt'>) {
    if (!isBrowser) return;
    
    const storageData: StorageData = {
      ...data,
      expiresAt: Date.now() + EXPIRATION_TIME,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
  },

  getAuth(): StorageData | null {
    if (!isBrowser) return null;
    
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;

    const parsedData: StorageData = JSON.parse(data);
    
    if (Date.now() > parsedData.expiresAt) {
      this.clearAuth();
      return null;
    }

    return parsedData;
  },

  clearAuth() {
    if (!isBrowser) return;
    localStorage.removeItem(STORAGE_KEY);
  },

  isAuthenticated(): boolean {
    if (!isBrowser) return false;
    const data = this.getAuth();
    return !!data;
  }
};
