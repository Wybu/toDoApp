// filepath: e:\demo\src\screens\SignUp\Signup.js
import React, {useState, useEffect} from "react";
import { SafeAreaView, View, ImageBackground, ScrollView, Text, Image, TextInput, TouchableOpacity, } from "react-native";
import buttonHandlers from "./signupfunc";
import styles from "./signupstyles";

/**
 * Màn hình đăng ký tài khoản
 */
const SignupScreen = (props) => {
	// State management
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [passwordsMatch, setPasswordsMatch] = useState(true);

	// Function to toggle password visibility
	const onTogglePasswordVisibility = () => {
		setShowPassword(buttonHandlers.togglePasswordVisibility(showPassword));
	};

	// Function to toggle confirm password visibility
	const onToggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(buttonHandlers.togglePasswordVisibility(showConfirmPassword));
	};

	// Check password matching whenever password or confirmPassword changes
	useEffect(() => {
		setPasswordsMatch(buttonHandlers.checkPasswordsMatch(password, confirmPassword));
	}, [password, confirmPassword]);

	// Handle send verification code
	const onSendCode = () => {
		buttonHandlers.handleSendCode(email, password, confirmPassword,props.navigation);
	};

	// Handle navigation to login screen
	const onNavigateToLogin = () => {
		buttonHandlers.navigateToLogin(props.navigation);
	};

	// Handle back navigation
	const onNavigateBack = () => {
		buttonHandlers.navigateBack(props.navigation);
	};

	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground
				source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/jirjzxhc_expires_30_days.png"}}
				resizeMode="stretch"
				style={styles.backgroundImage}
				>
				<ScrollView style={styles.scrollView}>
					<View style={styles.headerRow}></View>
					<TouchableOpacity onPress={onNavigateBack}>
						<Image
							source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/qrdnyc8b_expires_30_days.png"}}
							resizeMode="stretch"
							style={styles.backButton}
						/>
					</TouchableOpacity>
					<View style={styles.titleContainer}>
						<Text style={styles.titleText}>{"Tạo tài khoản mới!!"}</Text>
					</View>
					<Text style={styles.subtitleText}>{"Make your time !  "}</Text>

					{/* Email input */}
					<View style={styles.inputContainer}>
						<Text style={styles.inputLabel}>{"Email"}</Text>
						<TextInput
							placeholder={"Email"}
							value={email}
							onChangeText={setEmail}
							style={styles.textInput}
						/>
					</View>

					{/* Password input */}
					<View style={styles.inputContainer}>
						<Text style={styles.inputLabel}>{"Password"}</Text>
						<View style={styles.passwordContainer}>
							<TextInput
								placeholder={"Password"}
								value={password}
								onChangeText={setPassword}
								secureTextEntry={!showPassword}
								style={styles.passwordInput}
							/>
							<TouchableOpacity onPress={onTogglePasswordVisibility} style={{paddingRight: 16}}>
								<Image
									source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/rr5m8jrq_expires_30_days.png"}}
									resizeMode="stretch"
									style={{width: 22, height: 23}}
								/>
							</TouchableOpacity>
						</View>
					</View>

					{/* Confirm Password input */}
					<View style={styles.inputContainer}>
						<Text style={styles.inputLabel}>{"Confirm password"}</Text>
						<View style={styles.passwordContainer}>
							<TextInput
								placeholder={"Nhập lại password"}
								value={confirmPassword}
								onChangeText={setConfirmPassword}
								secureTextEntry={!showConfirmPassword}
								style={styles.passwordInput}
							/>
							<TouchableOpacity onPress={onToggleConfirmPasswordVisibility} style={{paddingRight: 16}}>
								<Image
									source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/sr1qyxgq_expires_30_days.png"}}
									resizeMode="stretch"
									style={{width: 22, height: 25}}
								/>
							</TouchableOpacity>
						</View>
						{!passwordsMatch && (
							<Text style={styles.errorText}>Passwords do not match</Text>
						)}
					</View>


					<TouchableOpacity
						style={styles.sendCodeButton}
						onPress={onSendCode}>
						<Text style={styles.sendCodeText}>{"Tiếp tục"}</Text>
					</TouchableOpacity>

					{/* Login link */}
					<View style={styles.loginPromptContainer}>
						<Text style={styles.loginPromptText}>{"Đã có tài khoản ?"}</Text>
						<TouchableOpacity onPress={onNavigateToLogin}>
							<Text style={styles.loginLinkText}>{"Đăng nhập"}</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</ImageBackground>
		</SafeAreaView>
	);
};

export default SignupScreen;
