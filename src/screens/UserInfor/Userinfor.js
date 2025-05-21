// filepath: e:\todoapp\src\screens\UserInfor\Userinfor.js
import React from "react";
import { SafeAreaView, View, ImageBackground, ScrollView, Image, Text, TextInput, TouchableOpacity } from "react-native";
import { useUserinforFunctions } from "./userinforfunc";
import { styles } from "./userinfostyles";

export default (props) => {
	const {
		textInput1,
		onChangeTextInput1,
		textInput2,
		onChangeTextInput2,
		textInput3,
		onChangeTextInput3,
		dateInput,
		handleDateInput,
		handleStartButton,
		handleBackButton,
		gender,
		setGender,
		errors
	} = useUserinforFunctions(props);

	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground
				source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/5pe6us09_expires_30_days.png"}}
				resizeMode={'stretch'}
				style={styles.backgroundImage}>
				<ScrollView style={styles.scrollView}>
					<View style={styles.header}>
						<TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
							<Image
								source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/2x92vrt3_expires_30_days.png"}}
								resizeMode={"stretch"}
								style={styles.backIcon}
							/>
						</TouchableOpacity>
						<Text style={styles.headerText}>
							{"Thông tin cá nhân"}
						</Text>
					</View>

					<View style={styles.formContainer}>
						<View style={styles.inputContainer}>
							<Text style={styles.labelText}>
								{"Họ và Tên"}
							</Text>
							<TextInput
								placeholder={"Tên người dùng"}
								value={textInput1}
								onChangeText={onChangeTextInput1}
								style={styles.textInput}
							/>
						</View>

						<View style={styles.inputContainer}>
							<Text style={styles.labelText}>
								{"Ngày sinh"}
							</Text>
							<TextInput
								placeholder={"DD/MM/YYYY"}
								value={dateInput}
								onChangeText={handleDateInput}
								keyboardType="numeric"
								maxLength={10}
								style={styles.textInput}
							/>
						</View>

						{/* Gender Selection */}
						<View style={styles.inputContainer}>
							<Text style={styles.labelText}>
								{"Giới tính"}
							</Text>
							<View style={styles.genderContainer}>
								<TouchableOpacity
									style={[styles.genderOption, gender === 'Nam' && styles.selectedGender]}
									onPress={() => setGender('Nam')}>
									<Text style={[styles.genderText, gender === 'Nam' && styles.selectedGenderText]}>
										{"Nam"}
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={[styles.genderOption, gender === 'Nữ' && styles.selectedGender]}
									onPress={() => setGender('Nữ')}>
									<Text style={[styles.genderText, gender === 'Nữ' && styles.selectedGenderText]}>
										{"Nữ"}
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={[styles.genderOption, gender === 'Khác' && styles.selectedGender]}
									onPress={() => setGender('Khác')}>
									<Text style={[styles.genderText, gender === 'Khác' && styles.selectedGenderText]}>
										{"Khác"}
									</Text>
								</TouchableOpacity>
							</View>
						</View>

						<View style={styles.inputContainer}>
							<Text style={styles.labelText}>
								{"Số điện thoại"}
							</Text>
							<TextInput
								placeholder={"XXXXXXXXXXX"}
								value={textInput2}
								onChangeText={onChangeTextInput2}
								keyboardType="numeric"
								style={styles.textInput}
							/>
						</View>

						<View style={styles.lastInputContainer}>
							<Text style={styles.labelText}>
								{"Địa chỉ"}
							</Text>
							<TextInput
								placeholder={"Địa chỉ"}
								value={textInput3}
								onChangeText={onChangeTextInput3}
								style={styles.textInput}
							/>
						</View>

						<TouchableOpacity
							style={styles.startButton}
							onPress={handleStartButton}>
							<Text style={styles.buttonText}>
								{"Bắt đầu thôi !!"}
							</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</ImageBackground>
		</SafeAreaView>
	)
}
