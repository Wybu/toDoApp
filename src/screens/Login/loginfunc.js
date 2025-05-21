// filepath: e:\todoapp\src\screens\Login\loginfunc.js
import { useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

/**
 * Hook containing login functionality
 */
export const useLoginFunctions = (props) => {
  // State management
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Toggle password visibility
   */
  const onTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  /**
   * Handle login with Firebase
   */
  const onLogin = async () => {
    // Kiểm tra trường dữ liệu
    if (!email.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập email');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập mật khẩu');
      return;
    }

    try {
      setIsLoading(true);
      const lowerCaseEmail = email.toLowerCase();
      // Thực hiện đăng nhập với Firebase
      const userCredential = await auth().signInWithEmailAndPassword(lowerCaseEmail, password);
      console.log('Đăng nhập thành công:', userCredential.user);
      Alert.alert('Thành công', 'Đăng nhập thành công!');
    } catch (error) {
      // Xử lý lỗi đăng nhập - hiển thị thông báo đơn giản cho người dùng
      console.error('Lỗi đăng nhập:', error);
      Alert.alert('Lỗi', 'Tài khoản hoặc mật khẩu không đúng');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle navigate to signup
   */
  const onCreateAccount = () => {
    if (props.navigation) {
      props.navigation.navigate('Signup');
    } else {
      Alert.alert('Chuyển hướng', 'Không thể chuyển đến màn hình đăng ký');
    }
  };

  /**
   * Handle forgot password with Firebase
   */
  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập email để đặt lại mật khẩu');
      return;
    }

    try {
      setIsLoading(true);
      // Gửi email đặt lại mật khẩu
      await auth().sendPasswordResetEmail(email);
      Alert.alert(
        'Thành công',
        'Một email đặt lại mật khẩu đã được gửi đến địa chỉ email của bạn'
      );
    } catch (error) {
      let errorMessage = 'Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại.';

      if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email không hợp lệ.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'Không tìm thấy người dùng với email này.';
      }

      console.error('Lỗi đặt lại mật khẩu:', error);
      Alert.alert('Lỗi', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle Google login
   */
  const handleGoogleLogin = () => {
    // TODO: Implement Google login
    Alert.alert('Thông báo', 'Chức năng đăng nhập bằng Google sẽ được phát triển sau');
  };

  /**
   * Handle Facebook login
   */
  const handleFacebookLogin = () => {
    // TODO: Implement Facebook login
    Alert.alert('Thông báo', 'Chức năng đăng nhập bằng Facebook sẽ được phát triển sau');
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    passwordVisible,
    onTogglePasswordVisibility,
    onLogin,
    onCreateAccount,
    handleForgotPassword,
    handleGoogleLogin,
    handleFacebookLogin,
    isLoading
  };
};
