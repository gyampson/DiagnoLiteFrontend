import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  User,
  Clock,
  Download,
  Trash2,
  HelpCircle,
  Info,
  LogOut,
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import Colors from '@/constants/colors';
import Button from '@/components/Button';
import { useDiagnosis } from '@/hooks/use-diagnosis-store';
import { useAuth } from '@/hooks/use-auth-store';

export default function SettingsScreen() {
  const { recentDiagnoses } = useDiagnosis();
  const { user, logout } = useAuth();
  const [offlineMode, setOfflineMode] = useState<boolean>(true);
  const [saveImages, setSaveImages] = useState<boolean>(true);
  const [dataSync, setDataSync] = useState<boolean>(false);

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/login');
        },
      },
    ]);
  };

  const clearAllData = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to clear all saved diagnoses and settings? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear Data',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              Alert.alert('Success', 'All data has been cleared successfully.');
            } catch (error) {
              console.error('Error clearing data:', error);
              Alert.alert('Error', 'Failed to clear data. Please try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Profile</Text>
        <View style={styles.profileCard}>
          <View style={styles.profileIconContainer}>
            <User size={32} color={Colors.primary} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {user?.name || 'Healthcare Worker'}
            </Text>
            <Text style={styles.profileRole}>
              {user?.facility || 'Rural Health Provider'}
            </Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Offline Mode</Text>
            <Text style={styles.settingDescription}>
              Use app without internet connection
            </Text>
          </View>
          <Switch
            value={offlineMode}
            onValueChange={setOfflineMode}
            trackColor={{ false: Colors.disabled, true: Colors.primary }}
            thumbColor={Colors.white}
            testID="offline-mode-switch"
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Save Diagnostic Images</Text>
            <Text style={styles.settingDescription}>
              Store images locally for reference
            </Text>
          </View>
          <Switch
            value={saveImages}
            onValueChange={setSaveImages}
            trackColor={{ false: Colors.disabled, true: Colors.primary }}
            thumbColor={Colors.white}
            testID="save-images-switch"
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Data Synchronization</Text>
            <Text style={styles.settingDescription}>
              Sync data when internet is available
            </Text>
          </View>
          <Switch
            value={dataSync}
            onValueChange={setDataSync}
            trackColor={{ false: Colors.disabled, true: Colors.primary }}
            thumbColor={Colors.white}
            testID="data-sync-switch"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Diagnosis History</Text>

        {recentDiagnoses.length > 0 ? (
          recentDiagnoses.map((diagnosis, index) => (
            <View key={index} style={styles.historyItem}>
              <View style={styles.historyInfo}>
                <Clock
                  size={16}
                  color={Colors.textLight}
                  style={styles.historyIcon}
                />
                <Text style={styles.historyDate}>
                  {new Date(diagnosis.date).toLocaleDateString()} at{' '}
                  {new Date(diagnosis.date).toLocaleTimeString()}
                </Text>
              </View>
              <Text style={styles.historySymptoms}>
                {diagnosis.symptoms.length} symptoms recorded
              </Text>
              {diagnosis.results.length > 0 && (
                <Text style={styles.historyResult}>
                  Top match: {diagnosis.results[0].disease.name} (
                  {diagnosis.results[0].matchPercentage}%)
                </Text>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.emptyHistory}>
            No diagnosis history available
          </Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Management</Text>

        <TouchableOpacity
          style={styles.dataButton}
          testID="download-data-button"
        >
          <Download
            size={20}
            color={Colors.primary}
            style={styles.dataButtonIcon}
          />
          <Text style={styles.dataButtonText}>Download Offline Data</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.dataButton, styles.dangerButton]}
          onPress={clearAllData}
          testID="clear-data-button"
        >
          <Trash2
            size={20}
            color={Colors.error}
            style={styles.dataButtonIcon}
          />
          <Text style={[styles.dataButtonText, styles.dangerText]}>
            Clear All Data
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.dataButton, styles.logoutButton]}
          onPress={handleLogout}
          testID="logout-button"
        >
          <LogOut
            size={20}
            color={Colors.error}
            style={styles.dataButtonIcon}
          />
          <Text style={[styles.dataButtonText, styles.dangerText]}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>

        <View style={styles.aboutCard}>
          <Text style={styles.aboutTitle}>DiagnoLite</Text>
          <Text style={styles.aboutVersion}>Version 1.0.0</Text>
          <Text style={styles.aboutDescription}>
            An offline AI-based diagnostic tool for rural healthcare workers.
            DiagnoLite helps perform basic diagnostic assessments without
            internet connectivity.
          </Text>

          <View style={styles.aboutButtons}>
            <Button
              title="Help & Support"
              variant="outline"
              size="small"
              onPress={() => {}}
              style={styles.aboutButton}
              icon={<HelpCircle size={16} color={Colors.primary} />}
              testID="help-button"
            />
            <Button
              title="About Us"
              variant="outline"
              size="small"
              onPress={() => {}}
              style={styles.aboutButton}
              icon={<Info size={16} color={Colors.primary} />}
              testID="about-us-button"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  profileCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.highlight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 12,
    color: Colors.textLight,
    fontStyle: 'italic',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: Colors.textLight,
  },
  historyItem: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  historyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyIcon: {
    marginRight: 8,
  },
  historyDate: {
    fontSize: 14,
    color: Colors.textLight,
  },
  historySymptoms: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 4,
  },
  historyResult: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  emptyHistory: {
    fontSize: 14,
    color: Colors.textLight,
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 16,
  },
  dataButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  dangerButton: {
    borderColor: Colors.error,
    borderWidth: 1,
  },
  logoutButton: {
    borderColor: Colors.error,
    borderWidth: 1,
    backgroundColor: Colors.error + '10',
  },
  dataButtonIcon: {
    marginRight: 12,
  },
  dataButtonText: {
    fontSize: 16,
    color: Colors.text,
  },
  dangerText: {
    color: Colors.error,
  },
  aboutCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  aboutVersion: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 12,
  },
  aboutDescription: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  aboutButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  aboutButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});
