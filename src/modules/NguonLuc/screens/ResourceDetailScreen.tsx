import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PieChart } from 'react-native-svg-charts';

interface ResourceDetailScreenProps {
  route: {
    params: {
      projectId: string;
    };
  };
}

const ResourceDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Mock data - sẽ được thay thế bằng data thật từ API
  const resourceData = {
    totalBudget: 1000,
    remainingBudget: 79,
    currentMonthSpent: 544,
    pieData: [
      {
        value: 30,
        key: 1,
        svg: { fill: '#FF6B6B' },
      },
      {
        value: 25,
        key: 2,
        svg: { fill: '#4ECDC4' },
      },
      {
        value: 25,
        key: 3,
        svg: { fill: '#45B7D1' },
      },
      {
        value: 20,
        key: 4,
        svg: { fill: '#96CEB4' },
      },
    ],
  };

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
        <View style={styles.chartContainer}>
          <PieChart
            style={styles.chart}
            data={resourceData.pieData}
            innerRadius="75%"
            padAngle={0}
          />
          <View style={styles.chartCenter}>
            <Text style={styles.chartCenterText}>
              {resourceData.remainingBudget}%
            </Text>
            <Text style={styles.chartCenterLabel}>Còn lại</Text>
          </View>
        </View>

        <View style={styles.budgetInfo}>
          <Text style={styles.budgetText}>
            Ngân sách tổng: {resourceData.totalBudget}$
          </Text>
          <Text style={styles.budgetText}>
            Ngân sách còn lại: {resourceData.remainingBudget}%
          </Text>
          <Text style={styles.budgetText}>
            Ngân sách tháng này: {resourceData.currentMonthSpent}$
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.moreButton}
          onPress={() => navigation.navigate('CostDetail')}
        >
          <Text style={styles.moreButtonText}>⋮</Text>
        </TouchableOpacity>
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
  chartContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  chart: {
    height: '100%',
  },
  chartCenter: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartCenterText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  chartCenterLabel: {
    color: '#b0bec5',
    fontSize: 16,
  },
  budgetInfo: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#3949ab',
    borderRadius: 12,
  },
  budgetText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8,
  },
  moreButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3949ab',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButtonText: {
    color: 'white',
    fontSize: 24,
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

export default ResourceDetailScreen; 