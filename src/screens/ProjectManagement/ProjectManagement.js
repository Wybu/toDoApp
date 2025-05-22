import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import styles from './projectmanagementstyles';
import projectFunctions from './projectmanagementfunc';

/**
 * Màn hình quản lý dự án bất động sản
 */
const ProjectManagementScreen = (props) => {
  // State management
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get project data from navigation params
  const projectName = props.route?.params?.projectName || 'Unknown Project';
  const projectId = props.route?.params?.projectId;

  // Fetch project data from Firebase
  useEffect(() => {
    const fetchProjectData = async () => {
      if (!projectId) {
        console.log('No project ID provided');
        setLoading(false);
        return;
      }

      try {
        const projectDoc = await firestore()
          .collection('projects')
          .doc(projectId)
          .get();

        if (projectDoc.exists) {
          const data = projectDoc.data();
          setProjectData({
            id: projectDoc.id,
            ...data
          });
        } else {
          console.log('No project found with ID:', projectId);
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [projectId]);

  // Helper function to format date
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';

    let date;
    if (timestamp.toDate) {
      // Firestore timestamp
      date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else {
      // String date
      date = new Date(timestamp);
    }

    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Component-specific handler functions
  const onBackPress = () => {
    projectFunctions.handleBackPress(props.navigation);
  };

  const onAddProgress = () => {
    projectFunctions.handleAddProgress();
  };

  const onAddResource = () => {
    projectFunctions.handleAddResource();
  };

  const onEditTasks = () => {
    projectFunctions.handleEditTasks();
  };

  const onAddTask = () => {
    projectFunctions.handleAddTask();
  };

  // Loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Đang tải dữ liệu dự án...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Error state if no project data found
  if (!projectData) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {!projectId ? 'Không có ID dự án' : 'Không tìm thấy dữ liệu dự án'}
          </Text>
          <TouchableOpacity onPress={onBackPress} style={styles.backToHomeButton}>
            <Text style={styles.backToHomeText}>Quay lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />

      <View style={styles.topSpacer} />

      {/* Header section */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onBackPress}
          style={styles.backButton}>
          <Image
            source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/p9w5yrct_expires_30_days.png"}}
            resizeMode={"contain"}
            style={styles.backButtonImage}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            {"Chi tiết dự án"}
          </Text>
        </View>
        <View style={styles.backButton} />
      </View>
      <View style={styles.divider} />

      {/* Project Title Section */}
      <View style={styles.projectTitleSection}>
        <Text style={styles.projectTitle}>{projectData.name || 'Tên dự án không xác định'}</Text>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Image
                source={{uri: "https://cdn-icons-png.flaticon.com/512/2370/2370264.png"}}
                resizeMode={"contain"}
                style={styles.statIcon}
              />
            </View>
            <Text style={styles.statLabel}>Ngày bắt đầu</Text>
            <Text style={styles.statValue}>{formatDate(projectData.startDate)}</Text>
          </View>

          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Image
                source={{uri: "https://cdn-icons-png.flaticon.com/512/2991/2991112.png"}}
                resizeMode={"contain"}
                style={styles.statIcon}
              />
            </View>
            <Text style={styles.statLabel}>Ngày kết thúc</Text>
            <Text style={styles.statValue}>{formatDate(projectData.endDate)}</Text>
          </View>
        </View>
      </View>

      {/* Project Summary */}
      <View style={styles.summarySection}>
        <Text style={styles.summaryTitle}>Tóm tắt dự án</Text>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>
            {projectData.description || 'Chưa có mô tả cho dự án này'}
          </Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={onAddProgress}>
          <View style={styles.menuLeft}>
            <Image
              source={{uri: "https://cdn-icons-png.flaticon.com/512/8901/8901239.png"}}
              resizeMode={"contain"}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Tiến độ công việc</Text>
          </View>
          <View style={styles.addIconContainer}>
            <Text style={styles.addIconText}>+</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={onAddResource}>
          <View style={styles.menuLeft}>
            <Image
              source={{uri: "https://cdn-icons-png.flaticon.com/512/3209/3209074.png"}}
              resizeMode={"contain"}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Nguồn lực dự án</Text>
          </View>
          <View style={styles.addIconContainer}>
            <Text style={styles.addIconText}>+</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={onEditTasks}>
          <View style={styles.menuLeft}>
            <Image
              source={{uri: "https://cdn-icons-png.flaticon.com/512/2387/2387635.png"}}
              resizeMode={"contain"}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Danh sách việc cần làm</Text>
          </View>
          <View style={styles.editIconContainer}>
            <Text style={styles.editIconText}>✎</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Add Task Button */}
      <View style={styles.createButtonContainer}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={onAddTask}>
          <Text style={styles.createButtonText}>
            {"Thêm công việc"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom indicator */}
      <View style={styles.bottomIndicator} />
    </SafeAreaView>
  );
};

export default ProjectManagementScreen;

