import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Clock, 
  Camera, 
  Stethoscope, 
  ChevronRight,
  Calendar,
  User,
  TrendingUp
} from 'lucide-react-native';

interface HistoryItem {
  id: string;
  type: 'symptom' | 'image';
  date: string;
  patient: string;
  condition: string;
  confidence: number;
  status: 'pending' | 'treated' | 'referred';
}

const historyData: HistoryItem[] = [
  {
    id: '1',
    type: 'symptom',
    date: '2025-01-15',
    patient: 'Patient #A001',
    condition: 'Malaria (Suspected)',
    confidence: 78,
    status: 'treated'
  },
  {
    id: '2',
    type: 'image',
    date: '2025-01-14',
    patient: 'Patient #A002',
    condition: 'Possible Skin Infection',
    confidence: 72,
    status: 'referred'
  },
  {
    id: '3',
    type: 'symptom',
    date: '2025-01-14',
    patient: 'Patient #A003',
    condition: 'Common Viral Infection',
    confidence: 65,
    status: 'treated'
  },
  {
    id: '4',
    type: 'image',
    date: '2025-01-13',
    patient: 'Patient #A004',
    condition: 'Buruli Ulcer (Possible)',
    confidence: 68,
    status: 'referred'
  },
  {
    id: '5',
    type: 'symptom',
    date: '2025-01-12',
    patient: 'Patient #A005',
    condition: 'Malaria (Suspected)',
    confidence: 82,
    status: 'treated'
  }
];

export default function DiagnosticHistory() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'symptom' | 'image'>('all');

  const filteredHistory = selectedFilter === 'all' 
    ? historyData 
    : historyData.filter(item => item.type === selectedFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'treated': return '#059669';
      case 'referred': return '#EA580C';
      case 'pending': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'symptom' 
      ? <Stethoscope size={20} color="#2563EB" />
      : <Camera size={20} color="#2563EB" />;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStats = () => {
    const total = historyData.length;
    const treated = historyData.filter(item => item.status === 'treated').length;
    const referred = historyData.filter(item => item.status === 'referred').length;
    
    return { total, treated, referred };
  };

  const stats = getStats();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Diagnostic History</Text>
          <Text style={styles.subtitle}>Recent patient assessments and outcomes</Text>
        </View>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <User size={24} color="#2563EB" />
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total Cases</Text>
          </View>
          <View style={styles.statCard}>
            <TrendingUp size={24} color="#059669" />
            <Text style={styles.statNumber}>{stats.treated}</Text>
            <Text style={styles.statLabel}>Treated</Text>
          </View>
          <View style={styles.statCard}>
            <Calendar size={24} color="#EA580C" />
            <Text style={styles.statNumber}>{stats.referred}</Text>
            <Text style={styles.statLabel}>Referred</Text>
          </View>
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'all' && styles.filterButtonActive]}
            onPress={() => setSelectedFilter('all')}
          >
            <Text style={[styles.filterText, selectedFilter === 'all' && styles.filterTextActive]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'symptom' && styles.filterButtonActive]}
            onPress={() => setSelectedFilter('symptom')}
          >
            <Stethoscope size={16} color={selectedFilter === 'symptom' ? '#FFFFFF' : '#64748B'} />
            <Text style={[styles.filterText, selectedFilter === 'symptom' && styles.filterTextActive]}>
              Symptoms
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'image' && styles.filterButtonActive]}
            onPress={() => setSelectedFilter('image')}
          >
            <Camera size={16} color={selectedFilter === 'image' ? '#FFFFFF' : '#64748B'} />
            <Text style={[styles.filterText, selectedFilter === 'image' && styles.filterTextActive]}>
              Images
            </Text>
          </TouchableOpacity>
        </View>

        {/* History List */}
        <View style={styles.historyList}>
          {filteredHistory.map((item) => (
            <TouchableOpacity key={item.id} style={styles.historyCard}>
              <View style={styles.historyCardHeader}>
                <View style={styles.historyCardLeft}>
                  {getTypeIcon(item.type)}
                  <View style={styles.historyCardInfo}>
                    <Text style={styles.historyPatient}>{item.patient}</Text>
                    <View style={styles.historyDateContainer}>
                      <Clock size={14} color="#64748B" />
                      <Text style={styles.historyDate}>{formatDate(item.date)}</Text>
                    </View>
                  </View>
                </View>
                <ChevronRight size={20} color="#64748B" />
              </View>
              
              <View style={styles.historyCardBody}>
                <Text style={styles.historyCondition}>{item.condition}</Text>
                <Text style={styles.historyConfidence}>Confidence: {item.confidence}%</Text>
                
                <View style={styles.historyCardFooter}>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(item.status) }
                  ]}>
                    <Text style={styles.statusText}>
                      {item.status.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  filterButtonActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  filterText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  historyList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  historyCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  historyCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  historyCardInfo: {
    flex: 1,
  },
  historyPatient: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  historyDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  historyDate: {
    fontSize: 14,
    color: '#64748B',
  },
  historyCardBody: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  historyCondition: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 4,
  },
  historyConfidence: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  historyCardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});