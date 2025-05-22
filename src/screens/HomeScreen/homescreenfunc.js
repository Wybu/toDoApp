// filepath: E:\demo\src\screens\HomeScreen\homescreenfunc.js
import { Alert, Animated } from 'react-native';
import auth from '@react-native-firebase/auth';

/**
 * Tập hợp các hàm xử lý sự kiện cho màn hình Home
 */
const homeScreenHandlers = {
  /**
   * Xử lý khi nhấn vào avatar - mở modal
   * @param {Function} setModalVisible - Function để set state modal visible
   * @param {Animated.Value} slideAnim - Animated value cho slide animation
   */
  handleAvatarPress: (setModalVisible, slideAnim) => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  },

  /**
   * Xử lý đóng modal
   * @param {Animated.Value} slideAnim - Animated value cho slide animation
   * @param {number} screenWidth - Chiều rộng màn hình
   * @param {Function} setModalVisible - Function để set state modal visible
   */
  handleCloseModal: (slideAnim, screenWidth, setModalVisible) => {
    Animated.timing(slideAnim, {
      toValue: screenWidth,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  },

  /**
   * Xử lý đăng xuất
   * @param {Function} handleCloseModal - Function để đóng modal
   */
  handleLogout: (handleCloseModal) => {
    handleCloseModal();
    setTimeout(() => {
      auth().signOut();
    }, 300);
  },

  /**
   * Xử lý xem thông tin profile (để trống theo yêu cầu)
   */
  handleViewProfile: () => {
    console.log('View profile pressed');
    // Để trống theo yêu cầu
  },

  /**
   * Xử lý khi chọn một dự án
   * @param {string} projectName Tên dự án được chọn
   * @param {string} projectId ID của dự án
   * @param {object} navigation Navigation object
   */
  handleProjectPress: (projectName, projectId, navigation) => {
    console.log('Project pressed:', projectName, 'ID:', projectId);
    if (navigation) {
      navigation.navigate('ProjectManagement', {
        projectName: projectName,
        projectId: projectId
      });
    } else {
      Alert.alert('Lỗi', 'Không thể chuyển đến');
    }
  },

  /**
   * Xử lý khi nhấn vào các nút điều hướng
   * @param {string} tabName Tên tab được nhấn
   */
  handleNavigation: (tabName) => {
    console.log(`Navigate to ${tabName}`);
    // Thêm logic điều hướng tương ứng
    switch (tabName) {
      case 'Home':
        // Đã ở trang Home
        break;
      case 'Chat':
        // Điều hướng đến Chat
        break;
      case 'Calendar':
        // Điều hướng đến Calendar
        break;
      case 'Notification':
        // Điều hướng đến Notification
        break;
      default:
        console.log('Unknown navigation tab:', tabName);
    }
  },

  /**
   * Xử lý khi nhấn nút thêm mới (+)
   * @param {object} navigation Navigation object
   */
  handleAddNew: (navigation) => {
    if (navigation) {
      navigation.navigate('NewProject');
    } else {
      Alert.alert('Lỗi', 'Không thể chuyển đến');
    }
  }
};

export default homeScreenHandlers;