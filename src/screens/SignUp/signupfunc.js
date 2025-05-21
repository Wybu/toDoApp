// filepath: e:\demo\src\screens\SignUp\signupfunc.js
import { Alert } from 'react-native';

/**
 * Tập hợp các hàm xử lý sự kiện cho các nút bấm
 */
const buttonHandlers = {
  /**
   * Chuyển trạng thái hiển thị mật khẩu
   * @param {boolean} currentState Trạng thái hiện tại
   * @returns {boolean} Trạng thái mới
   */
  togglePasswordVisibility: (currentState) => {
    return !currentState;
  },

  /**
   * Kiểm tra mật khẩu và xác nhận mật khẩu có khớp nhau không
   * @param {string} password Mật khẩu
   * @param {string} confirmPassword Xác nhận mật khẩu
   * @returns {boolean} True nếu 2 mật khẩu khớp nhau, ngược lại là False
   */
  checkPasswordsMatch: (password, confirmPassword) => {
    if (password && confirmPassword) {
      return password === confirmPassword;
    }
    return true; // Nếu một trong hai trường trống thì không hiện cảnh báo
  },

  /**
   * Xử lý gửi mã xác thực
   * @param {string} email Email người dùng
   * @param {string} password Mật khẩu người dùng
   * @param {string} confirmPassword Xác nhận mật khẩu
   */
  handleSendCode: (email, password, confirmPassword,navigation) => {
    // Kiểm tra các trường dữ liệu
    if (!email.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập email');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập mật khẩu');
      return;
    }

    if (!confirmPassword.trim()) {
      Alert.alert('Lỗi', 'Vui lòng xác nhận mật khẩu');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
      return;
    }

   if (navigation) {
         navigation.navigate('UserInfor',{email,password});
       } else {
         Alert.alert('Chuyển hướng', 'Không thể chuyển');
       }
  },

  /**
   * Xử lý chuyển đến màn hình đăng nhập
   * @param {object} navigation Đối tượng navigation
   */
  navigateToLogin: (navigation) => {
    if (navigation) {
      navigation.navigate('Login');
    } else {
      Alert.alert('Chuyển hướng', 'Không thể chuyển đến màn tạo tài khoản');
    }
  },

  /**
   * Xử lý quay lại màn hình trước đó
   * @param {object} navigation Đối tượng navigation
   */
  navigateBack: (navigation) => {
    if (navigation) {
      navigation.goBack();
    } else {
      Alert.alert('Quay lại', 'Không thể quay về màn hình trước');
    }
  }
};

export default buttonHandlers;

