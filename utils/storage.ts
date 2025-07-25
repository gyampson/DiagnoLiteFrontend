import AsyncStorage from '@react-native-async-storage/async-storage';
import { PatientRecord, DiagnosisResult, ImageAnalysis } from '@/types/diagnosis';

const STORAGE_KEYS = {
  PATIENT_RECORDS: 'patient_records',
  USER_SETTINGS: 'user_settings',
  SYNC_TIMESTAMP: 'last_sync',
  OFFLINE_QUEUE: 'offline_queue'
};

export class LocalStorage {
  // Patient Records
  static async savePatientRecord(record: PatientRecord): Promise<void> {
    try {
      const existingRecords = await this.getPatientRecords();
      const updatedRecords = [...existingRecords, record];
      await AsyncStorage.setItem(
        STORAGE_KEYS.PATIENT_RECORDS, 
        JSON.stringify(updatedRecords)
      );
    } catch (error) {
      console.error('Error saving patient record:', error);
      throw new Error('Failed to save patient record');
    }
  }

  static async getPatientRecords(): Promise<PatientRecord[]> {
    try {
      const records = await AsyncStorage.getItem(STORAGE_KEYS.PATIENT_RECORDS);
      return records ? JSON.parse(records) : [];
    } catch (error) {
      console.error('Error retrieving patient records:', error);
      return [];
    }
  }

  static async updatePatientRecord(id: string, updates: Partial<PatientRecord>): Promise<void> {
    try {
      const records = await this.getPatientRecords();
      const updatedRecords = records.map(record => 
        record.id === id ? { ...record, ...updates } : record
      );
      await AsyncStorage.setItem(
        STORAGE_KEYS.PATIENT_RECORDS, 
        JSON.stringify(updatedRecords)
      );
    } catch (error) {
      console.error('Error updating patient record:', error);
      throw new Error('Failed to update patient record');
    }
  }

  // User Settings
  static async saveUserSettings(settings: any): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.USER_SETTINGS, 
        JSON.stringify(settings)
      );
    } catch (error) {
      console.error('Error saving user settings:', error);
      throw new Error('Failed to save settings');
    }
  }

  static async getUserSettings(): Promise<any> {
    try {
      const settings = await AsyncStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
      return settings ? JSON.parse(settings) : null;
    } catch (error) {
      console.error('Error retrieving user settings:', error);
      return null;
    }
  }

  // Sync Management
  static async updateSyncTimestamp(): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.SYNC_TIMESTAMP, 
        new Date().toISOString()
      );
    } catch (error) {
      console.error('Error updating sync timestamp:', error);
    }
  }

  static async getLastSyncTimestamp(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.SYNC_TIMESTAMP);
    } catch (error) {
      console.error('Error retrieving sync timestamp:', error);
      return null;
    }
  }

  // Offline Queue for when connectivity returns
  static async addToOfflineQueue(data: any): Promise<void> {
    try {
      const queue = await this.getOfflineQueue();
      const updatedQueue = [...queue, { ...data, timestamp: Date.now() }];
      await AsyncStorage.setItem(
        STORAGE_KEYS.OFFLINE_QUEUE, 
        JSON.stringify(updatedQueue)
      );
    } catch (error) {
      console.error('Error adding to offline queue:', error);
    }
  }

  static async getOfflineQueue(): Promise<any[]> {
    try {
      const queue = await AsyncStorage.getItem(STORAGE_KEYS.OFFLINE_QUEUE);
      return queue ? JSON.parse(queue) : [];
    } catch (error) {
      console.error('Error retrieving offline queue:', error);
      return [];
    }
  }

  static async clearOfflineQueue(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.OFFLINE_QUEUE);
    } catch (error) {
      console.error('Error clearing offline queue:', error);
    }
  }

  // General storage utilities
  static async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
    } catch (error) {
      console.error('Error clearing all data:', error);
      throw new Error('Failed to clear data');
    }
  }

  static async getStorageSize(): Promise<number> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      let totalSize = 0;
      
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          totalSize += new Blob([value]).size;
        }
      }
      
      return totalSize;
    } catch (error) {
      console.error('Error calculating storage size:', error);
      return 0;
    }
  }
}