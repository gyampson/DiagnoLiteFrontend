import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, Globe, Wifi, WifiOff, Download, Upload, CircleHelp as HelpCircle, LogOut, Shield, Bell, ChevronRight } from 'lucide-react-native';

export default function ProfileScreen() {
  const [userInfo, setUserInfo] = useState({
    name: 'Dr. Sarah Mensah',
    id: 'HW-0234',
    facility: 'Kumasi Rural Health Center',
    region: 'Ashanti Region, Ghana'
  });
  
  const [settings, setSettings] = useState({
    notifications: true,
    autoSync: false,
    offlineMode: true,
    language: 'English'
  });

  const [isOnline, setIsOnline] = useState(false);
  const [syncStatus, setSyncStatus] = useState('last synced 2 hours ago');

  const handleSync = () => {
    if (!isOnline) {
      Alert.alert('Offline Mode', 'Connect to internet to sync data with central server.');
      return;
    }
    
    Alert.alert(
      'Sync Data',
      'This will upload diagnostic records and download latest guidelines. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sync', onPress: performSync }
      ]
    );
  };

  const performSync = () => {
    setSyncStatus('syncing...');
    setTimeout(() => {
      setSyncStatus('synced just now');
      Alert.alert('Success', 'Data synchronized successfully.');
    }, 2000);
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => {} }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>Manage your account and app settings</Text>
        </View>

        {/* User Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <User size={20} color="#2563EB" />
            <Text style={styles.sectionTitle}>Health Worker Information</Text>
          </View>
          
          <View style={styles.userCard}>
            <View style={styles.userAvatar}>
              <User size={32} color="#FFFFFF" />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userInfo.name}</Text>
              <Text style={styles.userDetail}>ID: {userInfo.id}</Text>
              <Text style={styles.userDetail}>{userInfo.facility}</Text>
              <Text style={styles.userDetail}>{userInfo.region}</Text>
            </View>
          </View>
        </View>

        {/* Connection Status */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            {isOnline ? (
              <Wifi size={20} color="#059669" />
            ) : (
              <WifiOff size={20} color="#DC2626" />
            )}
            <Text style={styles.sectionTitle}>Connection Status</Text>
          </View>
          
          <View style={styles.connectionCard}>
            <View style={styles.connectionStatus}>
              <Text style={styles.connectionText}>
                {isOnline ? 'Online' : 'Offline Mode'}
              </Text>
              <View style={[
                styles.connectionIndicator,
                { backgroundColor: isOnline ? '#059669' : '#DC2626' }
              ]} />
            </View>
            <Text style={styles.syncStatus}>{syncStatus}</Text>
            
            <TouchableOpacity 
              style={[styles.syncButton, !isOnline && styles.syncButtonDisabled]}
              onPress={handleSync}
            >
              {isOnline ? (
                <Upload size={20} color={isOnline ? '#FFFFFF' : '#94A3B8'} />
              ) : (
                <Download size={20} color="#94A3B8" />
              )}
              <Text style={[styles.syncButtonText, !isOnline && styles.syncButtonTextDisabled]}>
                {isOnline ? 'Sync Now' : 'No Connection'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Settings size={20} color="#2563EB" />
            <Text style={styles.sectionTitle}>App Settings</Text>
          </View>
          
          <View style={styles.settingsList}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Bell size={20} color="#64748B" />
                <Text style={styles.settingLabel}>Notifications</Text>
              </View>
              <Switch
                value={settings.notifications}
                onValueChange={(value) => setSettings(prev => ({ ...prev, notifications: value }))}
                trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
                thumbColor={settings.notifications ? '#2563EB' : '#64748B'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <WifiOff size={20} color="#64748B" />
                <Text style={styles.settingLabel}>Offline Mode</Text>
              </View>
              <Switch
                value={settings.offlineMode}
                onValueChange={(value) => setSettings(prev => ({ ...prev, offlineMode: value }))}
                trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
                thumbColor={settings.offlineMode ? '#2563EB' : '#64748B'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Upload size={20} color="#64748B" />
                <Text style={styles.settingLabel}>Auto Sync</Text>
              </View>
              <Switch
                value={settings.autoSync}
                onValueChange={(value) => setSettings(prev => ({ ...prev, autoSync: value }))}
                trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
                thumbColor={settings.autoSync ? '#2563EB' : '#64748B'}
              />
            </View>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Globe size={20} color="#64748B" />
                <Text style={styles.settingLabel}>Language</Text>
              </View>
              <View style={styles.settingValue}>
                <Text style={styles.settingValueText}>{settings.language}</Text>
                <ChevronRight size={16} color="#64748B" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.menuItem}>
            <HelpCircle size={20} color="#64748B" />
            <Text style={styles.menuItemText}>Help & Support</Text>
            <ChevronRight size={16} color="#64748B" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Shield size={20} color="#64748B" />
            <Text style={styles.menuItemText}>Privacy Policy</Text>
            <ChevronRight size={16} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#DC2626" />
            <Text style={styles.logoutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>DiagnoLite v1.0.0</Text>
          <Text style={styles.footerText}>Licensed for rural healthcare use</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  userAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  userDetail: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 2,
  },
  connectionCard: {
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 8,
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  connectionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
  },
  connectionIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  syncStatus: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    borderRadius: 6,
    gap: 6,
  },
  syncButtonDisabled: {
    backgroundColor: '#E2E8F0',
  },
  syncButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  syncButtonTextDisabled: {
    color: '#94A3B8',
  },
  settingsList: {
    gap: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: '#1E293B',
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValueText: {
    fontSize: 14,
    color: '#64748B',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#DC2626',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 2,
  },
});