// filepath: E:\demo\src\screens\HomeScreen\homescreenfunc.js
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

/**
 * Tập hợp các hàm xử lý sự kiện cho màn hình Home
 */
 const user = auth().currentUser;
const homeScreenHandlers = {
  /**
   * Xử lý khi nhấn vào avatar
   */
  handleAvatarPress: () => {
    auth().signOut();
  },

  /**
   * Xử lý khi chọn một dự án
   * @param {string} projectName Tên dự án được chọn
   */
  handleProjectPress: (projectName) => {
    Alert.alert(`${projectName} được chọn`);
  },

  /**
   * Xử lý khi người dùng tìm kiếm
   * @param {string} searchText Nội dung tìm kiếm
   */
  handleSearch: (searchText) => {
    console.log('Tìm kiếm:', searchText);
    // Xử lý tìm kiếm ở đây
  },

  /**
   * Xử lý khi nhấn vào các nút điều hướng
   * @param {string} buttonName Tên nút được nhấn
   */
  handleNavigation: (buttonName) => {
    Alert.alert(`${buttonName} được chọn`);
  },

  /**
   * Xử lý khi nhấn nút thêm mới (+)
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


