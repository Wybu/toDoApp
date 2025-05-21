import React from "react";
import { SafeAreaView, View, Image, Text, TextInput, ImageBackground, TouchableOpacity, ScrollView, Modal } from "react-native";
import { useNewProjectFunctions } from "./newprojectfunc";
import styles from "./newprojectstyles";

/**
 * Date Picker Modal Component
 */
const DatePickerModal = ({ visible, selectedDate, setSelectedDate, onConfirm, onCancel }) => {
	const [currentDate, setCurrentDate] = React.useState(selectedDate);
	
	// Create arrays for days, months, and years for the pickers
	const days = Array.from({ length: 31 }, (_, i) => i + 1);
	const months = [
		"Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", 
		"Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
	];
	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
	
	const handleDayChange = (day) => {
		const newDate = new Date(currentDate);
		newDate.setDate(day);
		setCurrentDate(newDate);
	};
	
	const handleMonthChange = (monthIndex) => {
		const newDate = new Date(currentDate);
		newDate.setMonth(monthIndex);
		setCurrentDate(newDate);
	};
	
	const handleYearChange = (year) => {
		const newDate = new Date(currentDate);
		newDate.setFullYear(year);
		setCurrentDate(newDate);
	};
	
	const handleConfirm = () => {
		setSelectedDate(currentDate);
		onConfirm(currentDate);
	};
	
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={onCancel}
		>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContent}>
					<Text style={styles.modalTitle}>Chọn Ngày</Text>
					
					<View style={styles.datePickerContainer}>
						{/* Day Picker */}
						<View style={styles.pickerColumn}>
							<Text style={styles.pickerLabel}>Ngày</Text>
							<ScrollView style={styles.picker}>
								{days.map((day) => (
									<TouchableOpacity
										key={`day-${day}`}
										style={[
											styles.pickerItem,
											currentDate.getDate() === day && styles.pickerItemSelected
										]}
										onPress={() => handleDayChange(day)}
									>
										<Text 
											style={[
												styles.pickerItemText,
												currentDate.getDate() === day && styles.pickerItemTextSelected
											]}
										>
											{day}
										</Text>
									</TouchableOpacity>
								))}
							</ScrollView>
						</View>
						
						{/* Month Picker */}
						<View style={styles.pickerColumn}>
							<Text style={styles.pickerLabel}>Tháng</Text>
							<ScrollView style={styles.picker}>
								{months.map((month, index) => (
									<TouchableOpacity
										key={`month-${index}`}
										style={[
											styles.pickerItem,
											currentDate.getMonth() === index && styles.pickerItemSelected
										]}
										onPress={() => handleMonthChange(index)}
									>
										<Text 
											style={[
												styles.pickerItemText,
												currentDate.getMonth() === index && styles.pickerItemTextSelected
											]}
										>
											{month}
										</Text>
									</TouchableOpacity>
								))}
							</ScrollView>
						</View>
						
						{/* Year Picker */}
						<View style={styles.pickerColumn}>
							<Text style={styles.pickerLabel}>Năm</Text>
							<ScrollView style={styles.picker}>
								{years.map((year) => (
									<TouchableOpacity
										key={`year-${year}`}
										style={[
											styles.pickerItem,
											currentDate.getFullYear() === year && styles.pickerItemSelected
										]}
										onPress={() => handleYearChange(year)}
									>
										<Text 
											style={[
												styles.pickerItemText,
												currentDate.getFullYear() === year && styles.pickerItemTextSelected
											]}
										>
											{year}
										</Text>
									</TouchableOpacity>
								))}
							</ScrollView>
						</View>
					</View>
					
					<View style={styles.modalButtons}>
						<TouchableOpacity style={styles.modalButtonCancel} onPress={onCancel}>
							<Text style={styles.modalButtonText}>Hủy</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.modalButtonConfirm} onPress={handleConfirm}>
							<Text style={styles.modalButtonText}>Xác nhận</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};

/**
 * Màn hình tạo dự án mới
 */
const NewProject = (props) => {
	// Use the custom hook for state and handlers
	const {
		projectName,
		setProjectName,
		description,
		setDescription,
		startDate,
		endDate,
		attachedFiles,
			teamLeaders,
		teamMembers,
		newLeaderEmail,
		setNewLeaderEmail,
		newMemberEmail,
		setNewMemberEmail,
		handleBackPress,
		handleRemoveMember,
		handleRemoveLeader,
		handleAddMember,
		handleAddLeader,
		handleSelectStartDate,
		handleSelectEndDate,
		handleFileUpload,
		handleRemoveFile,
		handleCreateProject,
		handleNavigation,
		handleAddNew,
		// Date picker modal props
		datePickerVisible,
		selectedDate,
		setSelectedDate,
		handleConfirmDate,
		handleCancelDate
	} = useNewProjectFunctions(props);

	return (
		<SafeAreaView style={styles.container}>
			{/* Header section */}
			<View style={styles.header}>
				{/* Back button - clickable */}
				<TouchableOpacity
					onPress={handleBackPress}
					style={styles.backButton}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/p9w5yrct_expires_30_days.png"}}
						resizeMode = {"stretch"}
						style={styles.backButtonImage}
					/>
				</TouchableOpacity>
				<View style={styles.titleContainer}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/nizabede_expires_30_days.png"}}
						resizeMode = {"stretch"}
						style={styles.titleIcon}
					/>
					<Text style={styles.titleText}>
						{"Project mới "}
					</Text>
				</View>
			</View>
			<View style={styles.divider} />

			{/* Main content area with scroll */}
			<ScrollView style={styles.contentContainer}>
				{/* Project name section */}
				<Text style={styles.sectionTitle}>
					{"Tên project"}
				</Text>
				<TextInput
					placeholder={"Tên project"}
					value={projectName}
					onChangeText={setProjectName}
					style={styles.textInput}
				/>

				{/* Description section */}
				<Text style={styles.sectionTitle}>
					{"Mô tả"}
				</Text>
				<TextInput
					placeholder={"Mô tả"}
					value={description}
					onChangeText={setDescription}
					multiline={true}
					style={styles.textAreaInput}
				/>

				{/* Team leader section */}
				<Text style={styles.sectionTitle}>
					{"Nhóm Trưởng"}
				</Text>
				<View style={styles.emailListContainer}>
					{/* List of team leaders */}
					{teamLeaders.map((leader, index) => (
						<View key={index} style={styles.emailItem}>
							<Text style={styles.emailText}>{leader.email}</Text>
							<TouchableOpacity
								onPress={() => handleRemoveLeader(leader.email)}
								style={styles.removeEmailButton}>
								<Text style={styles.removeEmailText}>X</Text>
							</TouchableOpacity>
						</View>
					))}

					{/* Add new leader input */}
					<View style={styles.emailInputContainer}>
						<TextInput
							placeholder="Nhập email nhóm trưởng"
							value={newLeaderEmail}
							onChangeText={setNewLeaderEmail}
							style={styles.emailInput}
							keyboardType="email-address"
							autoCapitalize="none"
						/>
						<TouchableOpacity
							onPress={handleAddLeader}
							style={styles.addEmailButton}>
							<Text style={styles.addEmailText}>Thêm</Text>
						</TouchableOpacity>
					</View>
				</View>

				{/* Team members section */}
				<Text style={styles.sectionTitle}>
					{"Thành viên"}
				</Text>
				<View style={styles.emailListContainer}>
					{/* List of team members */}
					{teamMembers.map((member, index) => (
						<View key={index} style={styles.emailItem}>
							<Text style={styles.emailText}>{member.email}</Text>
							<TouchableOpacity
								onPress={() => handleRemoveMember(member.email)}
								style={styles.removeEmailButton}>
								<Text style={styles.removeEmailText}>X</Text>
							</TouchableOpacity>
						</View>
					))}

					{/* Add new member input */}
					<View style={styles.emailInputContainer}>
						<TextInput
							placeholder="Nhập email thành viên"
							value={newMemberEmail}
							onChangeText={setNewMemberEmail}
							style={styles.emailInput}
							keyboardType="email-address"
							autoCapitalize="none"
						/>
						<TouchableOpacity
							onPress={handleAddMember}
							style={styles.addEmailButton}>
							<Text style={styles.addEmailText}>Thêm</Text>
						</TouchableOpacity>
					</View>
				</View>

				{/* Date sections */}
				<View style={styles.rowContainer}>
					<View style={styles.halfWidth}>
						<Text style={styles.sectionTitle}>
							{"Ngày bắt đầu"}
						</Text>
						<TouchableOpacity
							style={styles.datePickerButton}
							onPress={handleSelectStartDate}>
							<Text style={styles.datePickerText}>
								{startDate || "Chọn ngày bắt đầu"}
							</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.halfWidth}>
						<Text style={styles.sectionTitle}>
							{"Ngày kết thúc"}
						</Text>
						<TouchableOpacity
							style={styles.datePickerButton}
							onPress={handleSelectEndDate}>
							<Text style={styles.datePickerText}>
								{endDate || "Chọn ngày kết thúc"}
							</Text>
						</TouchableOpacity>
					</View>
				</View>

				{/* File Attachment Section */}
				<Text
					style={[styles.sectionTitle, { marginTop: 10 }]}>
					{"Đính kèm tệp"}
				</Text>
				<View style={{ marginBottom: 15 }}>
					{/* File upload area */}
					<TouchableOpacity
						style={styles.fileUploadButton}
						onPress={handleFileUpload}>
						<Text style={styles.datePickerText}>
							{"Chọn tệp để tải lên"}
						</Text>
						<View style={styles.addIconContainer}>
							<Text style={styles.addIconText}>+</Text>
						</View>
					</TouchableOpacity>

					{/* Attached files */}
					{attachedFiles.map((file, index) => (
						<View key={index} style={styles.fileItemContainer}>
							<View style={styles.fileInfoContainer}>
								<Image
									source={{uri: file.icon}}
									resizeMode={"stretch"}
									style={styles.fileIcon}
								/>
								<Text style={styles.fileName} numberOfLines={1} ellipsizeMode="middle">
									{file.name}
								</Text>
							</View>
							<TouchableOpacity
								onPress={() => handleRemoveFile(file.name)}
								style={{ padding: 5 }}>
								<Text style={{ color: "#FF4D4D", fontSize: 14 }}>X</Text>
							</TouchableOpacity>
						</View>
					))}
				</View>

				{/* Continue button */}
				<View style={styles.createButtonContainer}>
					<TouchableOpacity
						style={styles.createButton}
						onPress={handleCreateProject}>
						<Text style={styles.createButtonText}>
							{"Tạo Project"}
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>

			{/* Date Picker Modal */}
			<DatePickerModal 
				visible={datePickerVisible}
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
				onConfirm={handleConfirmDate}
				onCancel={handleCancelDate}
			/>

			{/* Navigation bar from HomeScreen */}
			<View style={styles.navigationBar}>
				<TouchableOpacity
					style={styles.navButton}
					onPress={() => handleNavigation('Home')}
				>
					<Image
						source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/qnikzozz_expires_30_days.png"}}
						resizeMode={"stretch"}
						style={styles.navIcon}
					/>
					<Text style={styles.navText}>{"Home"}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.navButton}
					onPress={() => handleNavigation('Chat')}
				>
					<Image
						source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/vi6di51d_expires_30_days.png"}}
						resizeMode={"stretch"}
						style={styles.navIcon}
					/>
					<Text style={styles.navText}>{"Chat"}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.addButton}
					onPress={handleAddNew}
				>
					<Text style={styles.addButtonText}>{"+"}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.navButton}
					onPress={() => handleNavigation('Calendar')}
				>
					<Image
						source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/s0s92snh_expires_30_days.png"}}
						resizeMode={"stretch"}
						style={styles.navIcon}
					/>
					<Text style={styles.navText}>{"Calendar"}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.navButton}
					onPress={() => handleNavigation('Notification')}
				>
					<Image
						source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/6xkhq5ng_expires_30_days.png"}}
						resizeMode={"stretch"}
						style={styles.navIcon}
					/>
					<Text style={[styles.navText, {textAlign: "center"}]}>{"Notification"}</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default NewProject;
