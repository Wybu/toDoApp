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
   * @param {string} buttonName Tên nút được nhấn
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