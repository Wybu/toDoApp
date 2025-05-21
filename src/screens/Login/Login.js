// filepath: e:\todoapp\src\screens\Login\Login.js
import React from "react";
import { SafeAreaView, View, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useLoginFunctions } from "./loginfunc";
import styles from "./loginstyles";

/**
 * Màn hình đăng nhập
 */
export default (props) => {
  const {
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
    handleFacebookLogin
  } = useLoginFunctions(props);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/0i7l5kiy_expires_30_days.png"}}
        resizeMode="stretch"
        style={styles.backgroundImage}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {/* Header space */}
          <View style={styles.headerSpace} />

          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome Back!</Text>
          </View>

          {/* Subtitle */}
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>Make your time!  </Text>
          </View>

          {/* Email input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.textInput}
            />
          </View>

          {/* Password input */}
          <View style={styles.passwordContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                style={styles.passwordInput}
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={onTogglePasswordVisibility}
              >
                <Image
                  source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/6emj4oh3_expires_30_days.png"}}
                  resizeMode="stretch"
                  style={styles.passwordToggleIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot password */}
          <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Quên mật khẩu</Text>
            </TouchableOpacity>
          </View>

          {/* Login button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={onLogin}
          >
            <Text style={styles.loginButtonText}>Đăng Nhập</Text>
          </TouchableOpacity>

          {/* Create account */}
          <View style={styles.createAccountContainer}>
            <Text style={styles.createAccountPrompt}>Bạn chưa có tài khoản?</Text>
            <TouchableOpacity onPress={onCreateAccount}>
              <Text style={styles.createAccountLink}>Tạo tài khoản</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>Hoặc</Text>
            <View style={styles.divider} />
          </View>

          {/* Social login buttons */}
          <View style={styles.socialLoginContainer}>
            {/* Google login */}
            <TouchableOpacity
              style={styles.socialLoginButton}
              onPress={handleGoogleLogin}
            >
              <Image
                source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/ls7hmkiz_expires_30_days.png"}}
                resizeMode="stretch"
                style={styles.googleIcon}
              />
              <Text style={styles.socialLoginText}>Google</Text>
            </TouchableOpacity>

            {/* Facebook login */}
            <TouchableOpacity
              style={styles.socialLoginButtonLast}
              onPress={handleFacebookLogin}
            >
              <Image
                source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/g9e717fx_expires_30_days.png"}}
                resizeMode="stretch"
                style={styles.facebookIcon}
              />
              <Text style={styles.socialLoginText}>Facebook</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};
