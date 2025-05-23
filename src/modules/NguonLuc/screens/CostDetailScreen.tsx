import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface CostItem {
  id: string;
  description: string;
  amount: number;
}

const CostDetailScreen = () => {
  const navigation = useNavigation();

  // Mock data - sẽ được thay thế bằng data thật từ API
  const costs: CostItem[] = [
    { id: '1', description: 'Thuê bản quyền phần mềm', amount: 100 },
    { id: '2', description: 'Thuê bản quyền phần mềm', amount: 100 },
    { id: '3', description: 'Thuê bản quyền phần mềm', amount: 100 },
    { id: '4', description: 'Thuê bản quyền phần mềm', amount: 100 },
    { id: '5', description: 'Thuê bản quyền phần mềm', amount: 45 },
  ];

  const CostItem = ({ item }: { item: CostItem }) => (
    <View style={styles.costItem}>
      <View style={styles.costInfo}>
        <Text style={styles.costDescription}>{item.description}</Text>
        <Text style={styles.costAmount}>{item.amount}$</Text>
      </View>
      <TouchableOpacity style={styles.noteButton}>
        <Text style={styles.noteButtonText}>Nhập ghi chú</Text>
        <Text style={styles.arrowIcon}>→</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nguồn lực dự án</Text>
      </View>

      <Text style={styles.sectionTitle}>Dự Án</Text>

      <ScrollView style={styles.content}>
        {costs.map(cost => (
          <CostItem key={cost.id} item={cost} />
        ))}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>💬</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🔔</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a237e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    color: 'white',
    fontSize: 24,
    marginRight: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  costItem: {
    backgroundColor: '#3949ab',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  costInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  costDescription: {
    color: 'white',
    fontSize: 16,
  },
  costAmount: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#283593',
    padding: 12,
    borderRadius: 8,
  },
  noteButtonText: {
    color: '#b0bec5',
    fontSize: 14,
  },
  arrowIcon: {
    color: 'white',
    fontSize: 18,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#283593',
  },
  navItem: {
    padding: 8,
  },
  navIcon: {
    fontSize: 24,
  },
});

export default CostDetailScreen; 